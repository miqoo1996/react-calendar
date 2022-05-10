import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AppContext} from "../AppContext";

const useBackendGoogleAuth = () => {
    const {apiUrl} = useContext(AppContext);
    const [authUrl, setAuthUrl] = useState('');

    useEffect(() => {
        axios.post(`${apiUrl}/user/social-auth/google`).then((response) => {
            setAuthUrl(response.url);
        });
    }, []);

    return {
        authUrl,
        accessToken: localStorage.getItem('google_access_token'),
    };
}

export default useBackendGoogleAuth;