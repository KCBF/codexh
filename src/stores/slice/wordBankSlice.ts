import { wordBanks } from './../../constants/wordBank';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word, WordBank } from '@/lib/types';

interface WordBankState {
  wordBanks: WordBank[];
}

const initialState: WordBankState = {
  wordBanks: wordBanks,
};

// Helper function to generate a deterministic ID based on title and timestamp
const generateDeterministicId = (title: string): string => {
  return `wordbank-${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
};

const wordBankSlice = createSlice({
  name: 'wordBank',
  initialState,
  reducers: {
    createNewWordBank: (
      state,
      action: PayloadAction<{
        title: string;
        words: Word[] | null;
        imageUrl: string | null;
      }>
    ) => {
      const { title, words, imageUrl } = action.payload;
      // Use ISO string format for the date to ensure consistency
      const createdOnString = new Date().toISOString();
      state.wordBanks.push({
        title: title,
        words: [],
        id: generateDeterministicId(title),
        createdOn: createdOnString,
        imageUrl: imageUrl || '',
      });
    },
    addWordsToWordBank: (
      state,
      action: PayloadAction<{
        wordBankId: string;
        words: Word[] | null;
      }>
    ) => {
      const { wordBankId, words } = action.payload;

      if (!words || words.length === 0) return;

      const wordBank = state.wordBanks.find(
        (wb: WordBank) => wb.id === wordBankId
      );

      if (wordBank) {
        const existingWordIds = new Set(wordBank.words.map((w) => w.id));
        const newWords = words.filter((word) => !existingWordIds.has(word.id));
        wordBank.words = [...wordBank.words, ...newWords];
      }
    },
    addManyWordsToManyBanks: (
      state,
      action: PayloadAction<{
        wordBankIdList: string[];
        words: Word[] | null;
      }>
    ) => {
      const { wordBankIdList, words } = action.payload;

      if (!words || words.length === 0) return;
      wordBankIdList.forEach((wordBankId) => {
        const wordBank = state.wordBanks.find(
          (wb: WordBank) => wb.id === wordBankId
        );

        if (wordBank) {
          const existingWordIds = new Set(wordBank.words.map((w) => w.id));
          const newWords = words.filter(
            (word) => !existingWordIds.has(word.id)
          );

          wordBank.words = [...wordBank.words, ...newWords];
        }
        console.log(wordBank);
      });
    },
    deleteWordFromWordBank: (
      state,
      action: PayloadAction<{
        wordBankId: string;
        wordId: string;
      }>
    ) => {
      const { wordBankId, wordId } = action.payload;
      const wordBankIndex = state.wordBanks.findIndex(
        (wb: WordBank) => wb.id === wordBankId
      );
      if (wordBankIndex !== -1) {
        state.wordBanks[wordBankIndex].words = state.wordBanks[
          wordBankIndex
        ].words.filter((word) => word.id !== wordId);
      }
    },
  },
});

export const {
  addWordsToWordBank,
  createNewWordBank,
  addManyWordsToManyBanks,
  deleteWordFromWordBank,
} = wordBankSlice.actions;
export default wordBankSlice.reducer;
