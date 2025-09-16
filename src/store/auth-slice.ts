import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface ProfileData {
//   id: number | undefined;
//   email: string | undefined;
//   password: string | undefined;
//   name: string | undefined;
//   role: string | undefined;
//   avatar: string | undefined;
// }

export interface AuthState {
  //always export state for inference
  token: string | null;
  isLoggedIn: boolean;
  // profileData: ProfileData | null;
}

const initialToken = localStorage.getItem("token");

const initialState: AuthState = {
  token: initialToken || null, // token from localStorage or null if not present
  isLoggedIn: !!initialToken, // true if token exists, false otherwise
  // profileData: {
  //   id: undefined,
  //   email: undefined,
  //   password: undefined,
  //   name: undefined,
  //   role: undefined,
  //   avatar: undefined,
  // },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload; // set the token from the payload
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      // state.profileData = {
      //   id: undefined,
      //   email: undefined,
      //   password: undefined,
      //   name: undefined,
      //   role: undefined,
      //   avatar: undefined,
      // };
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("isFakeAdmin");
    },
    // setProfileData(state, action: PayloadAction<ProfileData>) {
    //   const { id, email, password, name, role, avatar } = action.payload;
    //   console.log("setted");
    //   // state.profileData = {
    //   //   id,
    //   //   email,
    //   //   password,
    //   //   name,
    //   //   role,
    //   //   avatar,
    //   // };
    //   localStorage.setItem("userData", JSON.stringify(action.payload));
    // },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
