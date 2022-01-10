import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    members: [],
}

const searchSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMembers: (state, {payload}) => {
            state.members = payload;
        },
    },
});

export const { addMembers } = searchSlice.actions;
export const getAllMembers = (state) => state;
export default searchSlice.reducer;
