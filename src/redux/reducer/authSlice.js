import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../apiRequest";
import {logoutUser} from "../apiRequest";
import { reset } from "./userSlice";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: null,
      isLogin: false,
      errorMessage: null,
    },
    mss: false,
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    forgetPassword: {
      isFetching: false,
      error: false,
      sendEmail: false,
      infor: null,
    },
    resetPassword: {
      isFetching: false,
      error: false,
      success: false,
      info: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.login.isFetching = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.isFetching = false;
        state.login.currentUser = action.payload;
        state.login.error = null;
        state.login.mss = true;
        state.login.isLogin = true;
        state.login.errorMessage = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.login.isFetching = false;
        state.login.error = true;
        state.login.mss = false;
        state.login.isLogin = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.login.isFetching = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.login.isFetching = false;
        state.login.error = false;
        state.login.currentUser = null;
        state.login.mss = false;
        state.login.isLogin = false;
        reset();
      })
      .addCase(logoutUser.rejected, (state) => {
        state.login.isFetching = false;
        state.login.error = true;
      });
  },
  reducers: {
    // loginStart: (state) => {
    //   state.login.isFetching = true;
    //   state.error = null;
    // },
    // loginSuccess: (state, action) => {
    //   state.login.isFetching = false;
    //   state.login.currentUser = action.payload;
    //   state.login.error = null;
    //   state.login.mss = true;
    //   state.login.isLogin = true;
    //   state.login.errorMessage = null;
    // },
    // loginFailed: (state) => {
    //   state.login.isFetching = false;
    //   state.login.error = true;
    //   state.login.mss = false;
    //   state.login.isLogin = false;
    // },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
      state.register.error = false;
      state.register.success = false;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    // logoutStart: (state) => {
    //   state.login.isFetching = true;
    //   state.login.error = false;
    // },
    // logoutSuccess: (state) => {
    //   state.login.isFetching = false;
    //   state.login.error = false;
    //   state.login.currentUser = null;
    //   state.login.mss = false;
    //   state.login.isLogin = false;
    // },
    forgetStart: (state) => {
      state.forgetPassword.isFetching = true;
      state.forgetPassword.error = false;
      state.forgetPassword.sendEmail = false;
    },
    forgetSuccess: (state, action) => {
      state.forgetPassword.isFetching = false;
      state.forgetPassword.error = false;
      state.forgetPassword.sendEmail = true;
      state.forgetPassword.infor = action.payload;
    },
    forgetFailed: (state) => {
      state.forgetPassword.isFetching = false;
      state.forgetPassword.error = true;
      state.forgetPassword.sendEmail = false;
    },
    resetStart: (state) => {
      state.resetPassword.isFetching = true;
      state.resetPassword.error = false;
    },
    resetSuccess: (state, action) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.error = false;
      state.resetPassword.success = true;
      state.resetPassword.info = action.payload;
    },
    resetFailed: (state) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.error = true;
      state.resetPassword.success = false;
      state.resetPassword.info = null;
    },
  },
});

export const {
  // loginStart,
  // loginSuccess,
  // loginFailed,
  setErrorMessage,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  forgetFailed,
  forgetSuccess,
  forgetStart,
  resetStart,
  resetSuccess,
  resetFailed,
} = authSlice.actions;

export default authSlice.reducer;
