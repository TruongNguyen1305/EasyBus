import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/Services";

interface IUserState {
    user: User ;
    token: string ;
    isUsedApp: boolean;
    historySearch: any[];
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
    isUsedApp: false,
    historySearch: []
};
    

const slice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        LOGIN: (state, { payload: { user, access_token} }) => {
            state.user = user;
            state.token = access_token;
            state.historySearch = []
        },
        LOGOUT: (state, { payload: { } }) => {
            state.user = initialState.user;
            state.token = initialState.token;
            state.historySearch = []
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
        },
        UPDATE_HISTORY: (state, { payload: { search } }) => {
            state.historySearch = state.historySearch.filter(s => s.RouteId !== search.RouteId)
            state.historySearch = [search, ...state.historySearch]
        },
        CLEAR_HISTORY: (state, { payload: { } }) => {
            state.historySearch = []
        },
    },
});

export const { LOGIN, LOGOUT, SETISUSED, UPDATEUSER, CHANGE_FAVOURITE, UPDATE_HISTORY, CLEAR_HISTORY } = slice.actions;

export const userReducers = slice.reducer;