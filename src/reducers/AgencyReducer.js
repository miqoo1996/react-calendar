const initialState = {selectedAgencies: [], selectedUsersData: [], items: [], event: {}, pagination: {}};

const AgencyReducer = (state = initialState, action) => {
    let {selectedAgencies, items, selectedUsersData, event, pagination}  = state;

    if (action.type === 'remove-agencies') {
        return {
            ...initialState,
        };
    }

    selectedAgencies = selectedAgencies.filter(id => id != action.payload.id);

    if (action.type === 'add') {
        selectedAgencies.push(action.payload.id);
    }

    if (action.type === 'update-items') {
        if (action.payload?.items) {
            items = action.payload.items;
        }
        if (action.payload?.selectedUsersData) {
            selectedUsersData = action.payload.selectedUsersData;
        }
        if (action.payload?.event) {
            event = action.payload.event;
        }
        if (action.payload?.pagination) {
            pagination = action.payload.pagination;
        }
        if (action.payload?.selectedAgencies) {
            selectedAgencies = action.payload?.selectedAgencies;
        }
    }

    return {
        ...state,
        selectedAgencies,
        event,
        pagination,
        items,
        selectedUsersData,
    };
};

export {
    AgencyReducer
}