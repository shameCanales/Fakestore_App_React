import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  isVisible: boolean;
  title: string;
  message: string;
  type: string;
}

interface mobileNav {
  isOpen: boolean;
}

export interface UiState {
  toast: ToastState;
  mobileNav: mobileNav;
}

const initialState: UiState = {
  toast: {
    isVisible: false,
    title: "",
    message: "",
    type: "", //error, success, info
  },
  mobileNav: {
    isOpen: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{ title: string; message: string; type?: string }>
    ) {
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
    openMobileNav(state) {
      state.mobileNav.isOpen = true;
    },
    closeMobileNav(state) {
      state.mobileNav.isOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
