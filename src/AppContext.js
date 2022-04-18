import {createContext} from "react";

export const AppContextDefaultValue = {
    apiUrl: "http://cal.loc/api/calendar",
};

export const AppContext = createContext(AppContextDefaultValue);

export const CalendarContext = createContext({});