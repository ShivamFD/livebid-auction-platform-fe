import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import auctionReducer from './auctionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    auctions: auctionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
      },
    }),
});

export default store;