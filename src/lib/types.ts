import { JSX } from 'react';
type Word = {
  id: string;
  type: string;
  audio: string;
  word: string;
  ipa: {
    uk: string;
    us: string;
  };
  meaning: string;
  examples: {
    english: JSX.Element;
    vietnamese: JSX.Element;
  };
};

type WordBank = {
  id: string;
  title: string;
  imageUrl: string;
  createdOn: string;
  words: Word[];
};

export type { Word, WordBank };
