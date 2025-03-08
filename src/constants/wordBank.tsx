import { WordBank } from '@/lib/types';
import { words } from './words';
// Remove the uuid import as we'll use static IDs
// import { v4 as uuidv4 } from 'uuid';

// Use a fixed date string that will be the same on server and client
const fixedDate = new Date('2023-01-01T00:00:00Z').toISOString();

export const wordBanks: WordBank[] = [
  {
    id: 'family-wordbank-1', // Static ID instead of random UUID
    title: 'Family',
    imageUrl: '/asset/Isolation Mode.png',
    createdOn: fixedDate, // Use the fixed date string
    words: words.slice(10, 15),
  },
  {
    id: 'travel-wordbank-2', // Static ID instead of random UUID
    title: 'Travel',
    imageUrl: '/asset/Isolation Mode.png',
    createdOn: fixedDate, // Use the fixed date string
    words: words.slice(0, 10),
  },
];
