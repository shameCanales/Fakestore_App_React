import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null, // token from localStorage or null if not present
    isLoggedIn: !!initialToken, // true if token exists, false otherwise
  },
  reducers: {
    login(state, action) {
      state.token = action.payload; // set the token from the payload
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
