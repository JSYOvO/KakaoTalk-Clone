import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        profileName: null,
        profileUrl: null,
        stateMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.profileName = action.payload.profileName;
            state.profileUrl = action.payload.profileUrl;
            state.stateMessage = action.payload.stateMessage;
        },
        logout: (state) => {
            state.email = null;
            state.profileName = null;
            state.profileUrl = null;
            state.stateMessage = null;
        }
    }
});

export const {login, logout} = userSlice.actions;
export const selectUser = state => state.user;
export const selectEmail = state => state.user.email;
export const selectProfileName = state => state.user.profileName;
export const selectProfileUrl = state => state.user.profileUrl;
export const selectStateMessage = state => state.user.stateMessage;
export default userSlice.reducer;