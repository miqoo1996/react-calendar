const initialState = {selectedAgencies: [], items: [], event: {}, pagination: {}};

const AgencyReducer = (state = initialState, action) => {
    let {selectedAgencies, items, event, pagination}  = state;

    selectedAgencies = selectedAgencies.filter(id => id != action.payload.id);

    if (action.type === 'remove') {
        // removes on top, ...
    }

    if (action.type === 'add') {
        selectedAgencies.push(action.payload.id);
    }

    if (action.type === 'update-items') {
        if (action.payload?.items) {
            items = action.payload.items;
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
    };
};

export {
    AgencyReducer
}