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

interface EditProfileModal {
  isEditing: boolean;
  idToEdit: number;
}

export interface UiState {
  toast: ToastState;
  mobileNav: mobileNav;
  editProfileModal: EditProfileModal;
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
  editProfileModal: {
    isEditing: false,
    idToEdit: 0,
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
    OpenEditProfileModal(state) {
      state.editProfileModal.isEditing = true;
    },
    closeEditProfileModal(state) {
      state.editProfileModal.isEditing = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
