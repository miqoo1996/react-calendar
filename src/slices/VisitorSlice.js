import {createSlice} from "@reduxjs/toolkit";

const VisitorSlice = createSlice({
    name: 'visitor',
    initialState: {
        isGuest: true,
        ipAddress: null,
    },
    reducers: {
        setIpAddress: (state, action) => {
            return {
                ...state,
                ipAddress: action.payload,
            }
        }
    },
});

const { setIpAddress } = VisitorSlice.actions;

export { setIpAddress };

export default VisitorSlice.reducer;