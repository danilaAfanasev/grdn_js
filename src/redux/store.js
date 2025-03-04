import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    users: userReducer,
    auth: authReducer,
  },
});