import {useEffect, useState} from "react";

const useBackendGoogleAuth = () => {
    const [authUrl, setAuthUrl] = useState('');

    useEffect(() => {
        // TODO update access token if exists in backend
        // localStorage.setItem("google_access_token", null);
        console.log("fetch access token");
    }, []);

    useEffect(() => {
        // TODO fetch it from backend
        setAuthUrl('/');
        console.log("get auth url");
    }, []);

    return {
        authUrl,
        accessToken: localStorage.getItem('google_access_token')
    };
}

export default useBackendGoogleAuth;