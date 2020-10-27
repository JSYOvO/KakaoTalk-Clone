import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';
import friendsReducer from '../features/friendsSlice.js';

export default configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer
  },
});
