import { Word, WordBank } from './types';

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

export const wordBanksAdded = (word: Word | null, wordBanks: WordBank[]) => {
  const wordBanksAddedList = wordBanks.filter((wb) => {
    const wordBankFilter = wb.words.find((WordOfWb) => WordOfWb === word);
    if (wordBankFilter) {
      return wb;
    }
  });
  return wordBanksAddedList;
};
