export interface Word {
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