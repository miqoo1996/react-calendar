import GlobalHelper from "../Helpers/GlobalHelper";

const initialState = {
    activeDate: GlobalHelper.date,
    timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone,
    selectedSlots: {},
};

const CalendarReducer = (state = initialState, action) => {
    if (action.type === 'change-active-date') {
        state.activeDate = action.payload.activeDate;
    }

    if (action.type === 'update-selected-slots') {
        state.selectedSlots[action.payload.userId] = action.payload.slotId;
    }

    return {
        ...state,
    };
};

export {
    CalendarReducer
}