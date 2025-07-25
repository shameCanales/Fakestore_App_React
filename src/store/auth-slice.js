import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null, // token from localStorage or null if not present
    isLoggedIn: !!initialToken, // true if token exists, false otherwise
    profileData: {},
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
      state.profileData = {};
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
    setProfileData(state, action) {
      const { id, email, password, name, role, avatar } = action.payload;

      state.profileData = {
        id,
        email,
        password,
        name,
        role,
        avatar,
      };
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
