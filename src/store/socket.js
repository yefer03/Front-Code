import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: {},
    usersConnected: [],
  },
  reducers: {
    setSokect: (state, { payload }) => {
      state.socket = payload;
    },
    setUserConnected: (state, { payload }) => {
      console.log('desde socket: ', payload);
      state.usersConnected = payload;
    },
  },
});

export const { setSokect, setUserConnected } = socketSlice.actions;
