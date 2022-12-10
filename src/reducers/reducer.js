import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friends: [],
}

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        updateFriends: (state, action) => {
            state.friends = action.payload;
        }
    }
});

export const { updateFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
