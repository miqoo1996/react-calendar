import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {combineReducers, createStore} from "redux";
import {CalendarReducer} from "./reducers/CalendarReducer";
import {AgencyReducer} from "./reducers/AgencyReducer";
import {CompanyReducer, UsersReducer} from "./reducers/CompanyReducer";
import {QuestionnaireReducer, SubQuestionnaire1Reducer} from "./reducers/QuestionnaireReducer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={createStore(combineReducers({
        calendar: CalendarReducer,
        agencies: AgencyReducer,
        company: CompanyReducer,
        users: UsersReducer,
        questionnaire: QuestionnaireReducer,
        subQuestionnaire1: SubQuestionnaire1Reducer,
    }))}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
