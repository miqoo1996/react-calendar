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

export {
    CompanyReducer
}