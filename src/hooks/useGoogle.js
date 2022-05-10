import {useEffect, useContext, useState, useCallback} from "react";
import {AppContext} from "../AppContext";
import useBackendGoogleAuth from "./useBackendGoogleAuth";
import useGoogleCreateEvent from "./useGoogleCreateEvent";

let tokenClient;
let gapiInited = false;
let gisInited = false;

const formatEvents = (list) => {
    return list.map((item) => ({
        title: item.summary,
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
    }));
};

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
async function fetchEvents(date) {
    date = date || new Date();

    let response;

    try {
        const request = {
            'calendarId': 'primary',
            'timeMin': date.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 100000000,
            'orderBy': 'startTime',
        };
        response = await gapi.client.calendar.events.list(request);
    } catch (err) {
        console.log(err);
        return null;
    }

    return formatEvents(response.result.items);
}

/**
 * Use Google Service hook.
 *
 * @see https://dev.to/nouran96/google-calendar-events-with-react-544g
 * @returns {{events: unknown, setEvents: (value: unknown) => void}}
 */
const useGoogle = () => {
    const [isAppReady, setIsReady] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [accessTokenUpdated, setSuccessTokenUpdated] = useState({type: 'initial'});

    const {GOOGLE_SCOPES, GOOGLE_API_KEY, GOOGLE_CLIENT_ID} = useContext(AppContext);

    /* exported gapiLoaded */
    /* exported gisLoaded */
    /* exported handleAuthClick */
    /* exported handleSignoutClick */

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = GOOGLE_SCOPES;
    const CLIENT_ID = GOOGLE_CLIENT_ID;
    const API_KEY = GOOGLE_API_KEY;
    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function intializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        handleAppLoaded();

        if (localStorage.getItem("google_access_token")) {
            window.gapi.client.setToken({ access_token: localStorage.getItem("google_access_token") });
        }

        setIsUserLogged(gapi.client.getToken() !== null);
    }

    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        gapi.load('client', intializeGapiClient);
    }

    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        handleAppLoaded();
    }

    /**
     * Enables user interaction after all libraries are loaded.
     */
    function handleAppLoaded() {
        setIsReady(gapiInited && gisInited);
    }

    /**
     *  Sign in the user upon button click.
     */
    const handleAuthClick = useCallback(() => {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }

            const isNewToken = ! localStorage.getItem('google_access_token')

            localStorage.setItem('google_access_token', gapi.client.getToken()?.access_token);

            setIsUserLogged(true);

            if (isNewToken) {
                setSuccessTokenUpdated({type: "new_token"});
            }
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select an Google Account and asked for consent to share their data
            // when establishing a new session.

            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({prompt: ''});
        }
    }, [tokenClient, isAppReady]);

    /**
     *  Sign out the user upon button click.
     */
    const handleSignoutClick = useCallback(() => {
        try {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
            }
        } catch (e) {

        }

        setIsUserLogged(false);
        setSuccessTokenUpdated({type: "remove_token"});
        localStorage.removeItem('google_access_token');
    }, [isAppReady]);

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://apis.google.com/js/api.js";

        document.body.appendChild(script);

        script.addEventListener("load", () => {
            if (window.gapi) gapiLoaded();
        });
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://accounts.google.com/gsi/client";

        document.body.appendChild(script);

        script.addEventListener("load", () => {
            if (window.gapi) gisLoaded();
        });
    }, []);

    return {
        isAppReady,
        isUserLogged,
        accessTokenUpdated,
        handleAuthClick,
        handleSignoutClick,
    };
};

export default useGoogle;

export {
    useBackendGoogleAuth,
    useGoogleCreateEvent,
    formatEvents,
    fetchEvents,
};