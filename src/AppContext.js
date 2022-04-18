import {createContext} from "react";

export const AppContextDefaultValue = {
    apiUrl: "http://159.65.151.204:8888/api/calendar",
};

export const AppContext = createContext(AppContextDefaultValue);

export const CalendarContext = createContext({});