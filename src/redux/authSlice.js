import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authed: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.authed = true;
    },
    logout: (state) => {
      state.authed = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;