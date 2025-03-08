import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { words } from '@/constants/words';
import { Word } from '@/lib/types';

interface WordsState {
  words: Word[];
  currentWord: Word | null;
}

const initialState: WordsState = {
  words: words,
  currentWord: words[0],
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    findWord: (state, action: PayloadAction<string>) => {
      const word = state.words.find(
        (w) => w.word.toLowerCase() === action.payload.toLowerCase()
      );
      state.currentWord = word || null;
    },
  },
});

export const { findWord } = wordsSlice.actions;
export default wordsSlice.reducer;
