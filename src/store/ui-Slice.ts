import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  isVisible: boolean;
  title: string;
  message: string;
  type: string;
}

export interface UiState { 
  toast: ToastState;
}

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
  } as UiState,
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
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
