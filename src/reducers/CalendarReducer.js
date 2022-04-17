import GlobalHelper from "../Helpers/GlobalHelper";

const initialState = {
    activeDate: GlobalHelper.getUTCDate(),
    timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone,
    selectedSlots: {},
};

const CalendarReducer = (state = initialState, action) => {
    if (action.type === 'remove-calendar') {
        return {
            ...initialState,
        };
    }

    if (action.type === 'change-active-date') {
        state.selectedSlots = {};
        state.activeDate = action.payload.activeDate;
    }

    if (action.type === 'update-selected-slots') {
        state.selectedSlots[action.payload.userId] = action.payload.slot;
    }

    return {
        ...state,
    };
};

export {
    CalendarReducer
}