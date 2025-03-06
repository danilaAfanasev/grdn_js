import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authed: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authed = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify({ authed: true, user: action.payload }));
    },
    logout: (state) => {
      state.authed = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;