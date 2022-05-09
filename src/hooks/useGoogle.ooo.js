// import {useState, useEffect, useContext} from "react";
// import {AppContext} from "../AppContext";
// import useGoogleCreateEvent from "./useGoogleCreateEvent";
//
// /**
//  * Use Google Service hook.
//  *
//  * @see https://dev.to/nouran96/google-calendar-events-with-react-544g
//  * @returns {{events: unknown, setEvents: (value: unknown) => void}}
//  */
// const useGoogle = () => {
//     const [events, setEvents] = useState(null);
//
//     const {GOOGLE_SCOPES, GOOGLE_API_KEY, GOOGLE_CLIENT_ID} = useContext(AppContext);
//
//     const formatEvents = (list) => {
//         return list.map((item) => ({
//             title: item.summary,
//             start: item.start.dateTime || item.start.date,
//             end: item.end.dateTime || item.end.date,
//         }));
//     };
//
//     const listUpcomingEvents = () => {
//         window.gapi.client.calendar.events
//             .list({
//                 // Fetch events from user's primary calendar
//                 calendarId: "primary",
//                 showDeleted: true,
//                 singleEvents: true,
//             })
//             .then(function (response) {
//                 let events = response.result.items;
//
//                 if (events.length > 0) {
//                     setEvents(formatEvents(events));
//                 }
//             });
//     };
//
//     const updateAccessToken = () => {
//         window.gapi.auth2.authorize({
//             client_id: GOOGLE_CLIENT_ID,
//             scope: GOOGLE_SCOPES,
//             prompt: 'none',
//             response_type: 'token id_token'
//         }, function(result) {
//             console.log(result);
//
//             if (!result.access_token) {
//                 // An error happened.
//                 return;
//             }
//
//             let accessToken = result.access_token;
//
//             localStorage.setItem("google_access_token", accessToken);
//         });
//     }
//
//     const openSignInPopup = () => {
//         window.gapi.auth2.authorize(
//             { client_id: GOOGLE_CLIENT_ID, scope: GOOGLE_SCOPES },
//             (res) => {
//                 if (res) {
//                     console.log(res);
//                     if (res.access_token)
//                         localStorage.setItem("google_access_token", res.access_token);
//
//                     // Load calendar events after authentication
//                     window.gapi.client.load("calendar", "v3", listUpcomingEvents);
//                 }
//             }
//         );
//         //updateAccessToken();
//     }
//
//     const initClient = () => {
//         if (!localStorage.getItem("google_access_token")) {
//             openSignInPopup();
//         } else {
//             // Get events if access token is found without sign in popup
//             fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${GOOGLE_API_KEY}&orderBy=startTime&singleEvents=true`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("google_access_token")}`,
//                 },
//             }).then((res) => {
//                 // Check if unauthorized status code is return open sign in popup
//                 if (res.status !== 401) {
//                     return res.json();
//                 } else {
//                     localStorage.removeItem("google_access_token");
//
//                     openSignInPopup();
//                 }
//             }).then((data) => {
//                 if (data?.items) {
//                     setEvents(formatEvents(data.items));
//                 }
//             });
//         }
//     };
//
//     const handleClientLoad = () => {
//         window.gapi.load("client:auth2", initClient);
//     };
//
//     useEffect(() => {
//         const script = document.createElement("script");
//         script.async = true;
//         script.defer = true;
//         script.src = "https://apis.google.com/js/api.js";
//
//         document.body.appendChild(script);
//
//         script.addEventListener("load", () => {
//             if (window.gapi) handleClientLoad();
//         });
//     }, []);
//
//     return {events, setEvents};
// };
//
// export default useGoogle;
//
// export {
//     useGoogleCreateEvent,
// };