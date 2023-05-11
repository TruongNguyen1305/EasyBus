import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/Services";


const slice = createSlice({
    name: "user",
    initialState: { user: null, token: null, isUsedApp: false },
    reducers: {
        LOGIN: (state, { payload: { user, access_token} }) => {
            state.user = user;
            state.token = access_token;
        },
        LOGOUT: (state, { payload: { } }) => {
            state.user = null;
            state.token = null;
        },
        SETISUSED: (state, { payload: { } }) => {
            state.isUsedApp = true
        },
        UPDATEUSER: (state, { payload: { user} }) => {
            state.user = user
        },
    },
});

export const { LOGIN, LOGOUT, SETISUSED, UPDATEUSER } = slice.actions;

export const userReducers = slice.reducer;