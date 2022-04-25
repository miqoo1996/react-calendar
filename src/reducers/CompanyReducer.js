import moment from "moment";

const initialState = {
    id: 0,
    teams: [
        {id: 0, users: []},
    ],
};

const CompanyReducer = (state = initialState, action) => {
    if (action.type === 'update-company') {
        state = action.payload;
    }

    return {
        ...state,
    };
};

const filtersInitialState = {
    usersFiltered: {},
    currentFilterDate: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const UsersReducer = (state = filtersInitialState, action) => {
    if (action.type === 'update-filtered-users') {
        state.usersFiltered = action.payload;

        const keys = Object.keys(state.usersFiltered);

        state.currentFilterDate = keys.length
            ? moment(keys[keys.length - 1]).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss")
            : moment(filtersInitialState.currentFilterDate).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss");
    }

    if (action.type === 'update-current-filter-date') {
        state.currentFilterDate = action.payload.value;
    }

    return {
        ...state,
    };
}

export {
    CompanyReducer,
    UsersReducer
}