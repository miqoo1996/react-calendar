import {createContext} from "react";

export const AppContextDefaultValue = {
    apiUrl: "https://booking-call-app.herokuapp.com/api",
    GOOGLE_SCOPES: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar",
    GOOGLE_API_KEY: "AIzaSyDEujdZt-SPte2quj583OQbidQwvMMFsRo",
    GOOGLE_CLIENT_ID: "113089812934-o1j0pv612t3sonmgjm6ffkf9538a38ss.apps.googleusercontent.com",
};

export const AppContext = createContext(AppContextDefaultValue);

export const CalendarContext = createContext({});