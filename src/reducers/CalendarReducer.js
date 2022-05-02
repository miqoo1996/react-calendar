import GlobalHelper from "../Helpers/GlobalHelper";

const initialState = {
    activeDate: GlobalHelper.getUTCDate().toString(),
    timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone,
    selectedSlots: [],
};

const CalendarReducer = (state = initialState, action) => {
    if (action.type === 'remove-calendar') {
        return {
            ...initialState,
        };
    }

    if (action.type === 'change-active-date') {
        state.activeDate = action.payload.activeDate.toString();
    }

    if (action.type === 'update-all-selected-slots') {
        state.selectedSlots = action.payload;
    }

    if (action.type === 'remove-selected-slots') {
        state.selectedSlots = state.selectedSlots.filter(s => s.userId !== action.payload.userId || (s.userId === action.payload.userId && s.date !== action.payload.date));
    }

    if (action.type === 'update-selected-slots') {
        const slot = {
            userId: action.payload.userId,
            date: action.payload.date,
            slot: action.payload.slot,
        };

        state.selectedSlots = state.selectedSlots.filter(s => s.userId !== action.payload.userId || (s.userId === action.payload.userId && s.date !== action.payload.date));

        state.selectedSlots.push(slot);
    }

    return {
        ...state,
    };
};

export {
    CalendarReducer
}