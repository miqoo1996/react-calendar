const initialState = {selectedUsers: [], items: [{id: 0}], event: {id: 0}, pagination: {}};

const AgencyReducer = (state = initialState, action) => {
    let {selectedUsers, items, event, pagination}  = state;

    if (action.type === 'remove-agencies') {
        return {
            ...initialState,
        };
    }

    if (action.type === 'update-company') {
        selectedUsers = []; // rollback on company update
    }

    if (action.type === 'remove-selected-user') {
        selectedUsers = selectedUsers.filter(user => user.id.toString() !== action.payload.id.toString());
    }

    if (action.type === 'add-selected-user') {
        selectedUsers = selectedUsers.filter(user => user.id.toString() !== action.payload.id.toString());

        selectedUsers.push(action.payload);

        selectedUsers = selectedUsers.filter(user => user.teamId.toString() === action.payload.teamId.toString());
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
        if (action.payload?.selectedUsers) {
            selectedUsers = action.payload?.selectedUsers;
        }
    }

    return {
        ...state,
        selectedUsers,
        event,
        pagination,
        items,
    };
};

export {
    AgencyReducer
}