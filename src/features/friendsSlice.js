import {createSlice} from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        info: null
    },
    reducers: {
        reset: (state, action) => {
            state.info = action.payload;
        }
    } 
});

export const { reset } = friendsSlice.actions;
export const selectFriends = state => state.friends;
export default friendsSlice.reducer;