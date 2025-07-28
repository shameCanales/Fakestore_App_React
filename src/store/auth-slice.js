import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null, // token from localStorage or null if not present
    isLoggedIn: !!initialToken, // true if token exists, false otherwise
    profileData: {},
    isFakeAdmin: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload; // set the token from the payload
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.profileData = {};
      state.isFakeAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("isFakeAdmin");
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
    setIsFakeAdmin(state) {
      state.isFakeAdmin = true;
      localStorage.setItem("isFakeAdmin", state.isFakeAdmin);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
