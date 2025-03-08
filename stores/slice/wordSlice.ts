import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a sample word for demonstration
const sampleWord = {
  word: 'vocabulary',
  type: 'noun',
  meaning: 'all the words that a person knows or uses',
  ipa: {
    uk: '/vəˈkæbjʊləri/',
    us: '/voʊˈkæbjʊleri/'
  },
  audio: 'https://example.com/audio/vocabulary.mp3',
  examples: {
    english: 'She has an extensive vocabulary.',
    vietnamese: 'Cô ấy có vốn từ vựng phong phú.'
  }
};

interface Word {
  word: string;
  type: string;
  meaning: string;
  ipa: {
    uk: string;
    us: string;
  };
  audio: string;
  examples: {
    english: string;
    vietnamese: string;
  };
}

interface WordsState {
  words: Word[];
  currentWord: Word | null;
}

const initialState: WordsState = {
  words: [sampleWord],
  currentWord: sampleWord,
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