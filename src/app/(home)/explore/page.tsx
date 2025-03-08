import React from 'react';
import SuggestVocabCard from './_components/SuggestVocabCard';
import LiveChallengsCard from './_components/LiveChallengsCard';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import NewsAndHighlightsCard from './_components/NewsAndHighlightsCard';
import ExploreCTA from '@/components/CTA/ExplorCTA';

const suggestItems = [
  {
    bg: '#EF6EA5',
    title: 'travel',
    desc: 'The most important terms to know when talking about travel...',
    words: 10,
    points: 20,
  },
  {
    bg: '#5E89ED',
    title: 'family',
    desc: 'Over 100 common words and phrases related to the family',
    words: 10,
    points: 20,
  },
  {
    bg: '#52C470',
    title: 'IELTS 8.0',
    desc: 'Vocabulary for IELTS is a spot that every examinee must mast...',
    words: 10,
    points: 20,
  },
  {
    bg: '#F2D147',
    title: 'TOEIC RE...',
    desc: 'It is a full and difficult TOEIC vocabulary',
    words: 10,
    points: 20,
  },
];

const recentWords = [
  {
    word: 'Job interview',
    color: '#EF6EA5',
  },
  {
    word: 'Climate change',
    color: '#52C470',
  },
  {
    word: 'Cultural exchange',
    color: '#5E89ED',
  },
  {
    word: 'Souvenirs',
    color: '#F2D147',
  },
  {
    word: 'Ecotourism',
    color: '#BF9BDE',
  },
];

const liveChallengs = [
  {
    imageUrl: '/asset/OBJECTS.png',
    title: 'Fluency Quest',
  },
  { imageUrl: '/asset/OBJECTS (1).png', title: 'English Rush' },
  { imageUrl: '/asset/OBJECTS (2).png', title: 'Adventure' },
];
const page = () => {
  return (
    <div className="overflow-x-hidden w-full relative">
      {/* CTA */}
      <ExploreCTA />
      {/* RECENT WORDS */}
      <div className="mt-10 gap-[16px] flex flex-col">
        <p className="text-[24px] font-bold">Recent Words</p>
        <div className="flex flex-row gap-[16px] max-w-[90%] overflow-x-scoll relative">
          {recentWords.map((item, index) => (
            <div
              key={index}
              className={` border px-4 py-2 rounded-[100px] w-max`}
              style={{ borderColor: item.color, color: item.color }}
            >
              <span>{item.word}</span>
            </div>
          ))}
        </div>
      </div>
      {/* LIVE CHALLENGE */}
      <div className="mt-10 flex flex-col gap-[32px]">
        <p className="text-[40px] font-bold">Live Challenges</p>
        <div className="grid grid-cols-4 w-[80%] gap-[5%]">
          {liveChallengs.map((item, index) => (
            <LiveChallengsCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
            />
          ))}

          <CircleChevronRight
            size={80}
            color="#A3A3A3"
            strokeWidth="1"
            className="relative top-[30%] -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>
      {/* Suggest Vocab List */}
      <div className="mt-10 flex w-[90%] flex-col gap-[32px]">
        <p className="text-[40px] font-bold">Suggest Vocab List</p>
        <div className="grid grid-cols-2 gap-x-[10%]  gap-y-10">
          {suggestItems.map((item, index) => (
            <SuggestVocabCard
              title={item.title}
              key={index}
              bg={item.bg}
              words={item.words}
              points={item.points}
              desc={item.desc}
            />
          ))}
        </div>
        <button className="border border-[#FF7A1A] rounded-[4px] uppercase text-[#FF7A1A] px-5 py-2 w-max relative left-[50%] -translate-x-1/2">
          Load More
        </button>
      </div>
      {/* NEWS AND HIGHLIGHTS */}
      <div className="mt-[80px] bg-[#DFE7FB] p-10 w-[90%] gap-[32px] flex flex-col">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-bold text-[40px]">News And Highlights</p>
          <div className="flex flex-row items-center gap-2">
            <CircleChevronLeft color="#A3A3A3" />
            <CircleChevronRight color="#A3A3A3" />
          </div>
        </div>
        <div className="flex flex-row gap-5 overflow-x-scroll relative">
          <NewsAndHighlightsCard />
          <NewsAndHighlightsCard />
          {/* <NewsAndHighlightsCard /> */}
        </div>
      </div>
      <div className="h-[50px]" />
    </div>
  );
};

export default page;
