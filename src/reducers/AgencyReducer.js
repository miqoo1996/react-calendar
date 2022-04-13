const AgencyReducer = (state, action) => {
    let selectedAgencies  = state.selectedAgencies || [];

    selectedAgencies = selectedAgencies.filter(id => id !== action.payload.id);

    if (action.type === 'remove') {
        // removes on top, ...
    }

    if (action.type === 'add') {
        selectedAgencies.push(action.payload.id);
    }

    return {
        selectedAgencies
    };
};

export {
    AgencyReducer
}