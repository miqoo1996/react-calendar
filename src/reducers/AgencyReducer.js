const initialState = {selectedAgencies: [], items: []};

const AgencyReducer = (state = initialState, action) => {
    let {selectedAgencies, items}  = state;

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
        if (action.payload?.selectedAgencies) {
            selectedAgencies = action.payload?.selectedAgencies;
        }
    }

    return {
        ...state,
        selectedAgencies,
        items,
    };
};

export {
    AgencyReducer
}