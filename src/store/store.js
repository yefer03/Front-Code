import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { groupSlice } from './groups/groupSlice';
import { socketSlice } from './socket';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    socket: socketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
