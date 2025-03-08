'use client';
import { configureStore } from '@reduxjs/toolkit';
import { default as wordReducer } from './slice/wordSlice';
import { default as wordBankReducer } from './slice/wordBankSlice';

export const store = configureStore({
  reducer: {
    words: wordReducer,
    wordBanks: wordBankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
