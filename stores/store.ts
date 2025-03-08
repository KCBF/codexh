'use client';
import { configureStore } from '@reduxjs/toolkit';
import { default as wordReducer } from './slice/wordSlice';

export const store = configureStore({
  reducer: {
    words: wordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 