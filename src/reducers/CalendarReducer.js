import GlobalHelper from "../Helpers/GlobalHelper";

const initialState = {activeDate: GlobalHelper.date, timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone};

const CalendarReducer = (state = initialState, action) => {
    if (action.type === 'change-active-date') {
        state.activeDate = action.payload.activeDate;
    }

    return {
        ...state,
    };
};

export {
    CalendarReducer
}