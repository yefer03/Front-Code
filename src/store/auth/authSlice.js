import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: '',
    user: {
      groups: [],
    },
    userVisit: {},
    errorMessage: '',
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
    setImageUserProfile: (state, { payload }) => {
      state.user.imageProfile = payload;
    },
    setImageUserBanner: (state, { payload }) => {
      state.user.imageBanner = payload;
    },
    setError: (state, { payload }) => {
      state.errorMessage = payload;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    setUserVisit: (state, { payload }) => {
      state.userVisit = [];
      state.userVisit = payload;
    },
    leaveGroupStore: (state, { payload }) => {
      state.user.groups = state.user.groups.filter(
        (group) => group !== payload
      );
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  setError,
  clearErrorMessage,
  setImageUserProfile,
  setImageUserBanner,
  setUserVisit,
  leaveGroupStore,
} = authSlice.actions;
