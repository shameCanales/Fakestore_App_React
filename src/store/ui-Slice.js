import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

const toastState = {
  isVisible: false,
  title: "",
  message: "",
  type: "", //error, success, info
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toast: toastState,
  },
  reducers: {
    showToast(state, action) {
      state.toast = {
        isVisible: true,
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type || "info",
      };
    },
    hideToast(state) {
      state.toast = {
        isVisible: false,
        title: "",
        message: "",
        type: "info",
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
