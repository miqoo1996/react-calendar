import {createContext} from "react";

export const AppContextDefaultValue = {
    apiUrl: "http://127.0.0.1:8888/api/calendar",
};

export const AppContext = createContext(AppContextDefaultValue);

export const CalendarContext = createContext({});