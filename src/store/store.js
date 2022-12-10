import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from '../reducers/reducer';

export const store = configureStore({
    reducer: {
        friends: friendsReducer,
    }
})