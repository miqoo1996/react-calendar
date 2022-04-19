const initialState = {selectedUsers: [], selectedUsersData: [], items: [], event: {}, pagination: {}};

const AgencyReducer = (state = initialState, action) => {
    let {selectedUsers, items, selectedUsersData, event, pagination}  = state;

    if (action.type === 'remove-agencies') {
        return {
            ...initialState,
        };
    }

    selectedUsers = selectedUsers.filter(id => id != action.payload.id);

    if (action.type === 'add') {
        selectedUsers.push(action.payload.id);
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
        selectedUsersData,
    };
};

export {
    AgencyReducer
}