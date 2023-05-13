import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/Services";

interface IUserState {
    user: User ;
    token: string ;
    isUsedApp: boolean
}


const initialState: IUserState = {
    user: {
        id: '',
        fullName: '',
        email: '',
        favouriteBus: [''],
        favouriteStation: ['']
    },
    token: '',
    isUsedApp: false
};
    

const slice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        LOGIN: (state, { payload: { user, access_token} }) => {
            state.user = user;
            state.token = access_token;
        },
        LOGOUT: (state, { payload: { } }) => {
            state.user = initialState.user;
            state.token = initialState.token;
        },
        SETISUSED: (state, { payload: { } }) => {
            state.isUsedApp = true
        },
        UPDATEUSER: (state, { payload: { user} }) => {
            state.user = user
        },
        CHANGE_FAVOURITE: (state, { payload: { station, bus } }) => {
            state.user.favouriteBus = bus
            state.user.favouriteStation = station
        }
    },
});

export const { LOGIN, LOGOUT, SETISUSED, UPDATEUSER, CHANGE_FAVOURITE } = slice.actions;

export const userReducers = slice.reducer;