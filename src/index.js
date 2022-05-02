import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import { reduxBatch } from '@manaflair/redux-batch'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CalendarReducer} from "./reducers/CalendarReducer";
import {AgencyReducer} from "./reducers/AgencyReducer";
import {CompanyReducer, UsersReducer} from "./reducers/CompanyReducer";
import {QuestionnaireReducer, SubQuestionnaire1Reducer} from "./reducers/QuestionnaireReducer";
import VisitorSlice from "./slices/VisitorSlice";

const preloadedState = {

};

const reducer = {
    calendar: CalendarReducer,
    agencies: AgencyReducer,
    company: CompanyReducer,
    users: UsersReducer,
    questionnaire: QuestionnaireReducer,
    subQuestionnaire1: SubQuestionnaire1Reducer,
    VisitorSlice: VisitorSlice,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={configureStore({
        reducer,
        middleware: [logger],
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState,
        enhancers: [reduxBatch],
    })}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
