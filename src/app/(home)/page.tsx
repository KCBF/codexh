'use client';
import React, { useEffect } from 'react';
import { Volume2 } from 'lucide-react';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import WordType from '@/components/WordType';
import HomeCTA from '@/components/CTA/HomeCTA';
import NavBarWithParams from '@/components/NavBarWithParams';
import Collocations from '@/components/Collocations';
import WordFamilySynonym from '@/components/WordFamilySynonym';
import { useState } from 'react';
import AddWordDialog from '@/components/AddWordToWordBankDialog';

const views = [
  { view: 'collocations', name: 'Collocations' },
  { view: 'word-family-synonym', name: 'Word Family And Synonyms' },
];

// Component for the home page search form
const HomeSearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <form onSubmit={handleSearch} className="flex items-center">
    <div className="relative flex-1 max-w-md">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input 
        type="text" 
        placeholder="Search Vocabulary" 
        className="w-full h-[50px] pl-12 pr-4 rounded-l-full border-0 focus:outline-none focus:ring-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <button 
      type="submit"
      className="h-[50px] px-6 bg-[#FF7A2F] text-white font-medium rounded-r-full"
    >
      English - Vietnamese
    </button>
  </form>
);

const Page = () => {
  const [tabView, setTabView] = useState<string>('collocations');
  const handleClickTav = (view: string) => {
    setTabView(view);
  };
  const currentWord = useSelector(
    (state: RootState) => state.words.currentWord
  );
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // First useEffect to detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Second useEffect to initialize audio only on the client side
  useEffect(() => {
    if (isClient && currentWord && currentWord.audio) {
      const newAudio = new Audio(currentWord.audio);
      setAudio(newAudio);
    }
  }, [currentWord, isClient]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };
  
  // Return a simpler initial UI during SSR to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="w-full">
        <HomeCTA />
        <div className="flex flex-row mt-[120px] px-[38px] pr-[64px] gap-8">
          <div className="flex-[2]">
            <div className="flex flex-row items-center justify-between">
              <p className="font-bold text-[56px]">{currentWord?.word}</p>
            </div>
            {/* Simplified content for SSR */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* CTA */}
      <HomeCTA />
      <div className="flex flex-row mt-[120px] px-[38px] pr-[64px] gap-8">
        {/* Word section */}
        <div className="flex-[2]">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-[56px]">{currentWord?.word}</p>
            <div className="flex flex-row items-center gap-2">
              <AddWordDialog
                word={currentWord}
                trigger={
                  <div className="flex flex-row px-4 py-2 gap-2 text-[16px] font-semibold rounded-[8px] border border-[#39A756] cursor-pointer">
                    <Image
                      src={'/stickynote.svg'}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span className="text-green-600">Add to notebook</span>
                  </div>
                }
              />

              <span className="uppercase text-[14px] text-[#776108] bg-[#F2D147] rounded-[4px] p-3">
                INTERMEDIATE
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            {/* UK pronunciation */}
            <div className="flex gap-2 items-center">
              <p className="text-[24px] font-semibold text-[#5E89ED]">UK</p>
              <Volume2
                className="text-[#5E89ED]"
                cursor={'pointer'}
                onClick={playAudio}
              />
              <p className="text-[24px] font-medium text-[#757575]">
                {currentWord?.ipa.uk}
              </p>
            </div>
            {/* US pronunicaiton */}
            <div className="flex gap-2 items-center">
              <p className="text-[24px] font-semibold text-[#E83080]">US</p>
              <Volume2
                className="text-[#E83080]"
                cursor={'pointer'}
                onClick={playAudio}
              />
              <p className="text-[24px] font-medium text-[#757575]">
                {currentWord?.ipa.us}
              </p>
            </div>
          </div>
          {/* Word type */}
          <WordType type={currentWord?.type || ''} />
          <div className="flex flex-row items-center gap-[10px] mb-[24px]">
            <button className="flex items-center justify-center text-[#757575] h-[24px] w-[24px] border border-[#757575] rounded-[100px]">
              1
            </button>
            <p className="text-[24px] font-bold">{currentWord?.meaning}</p>
            <Image src={'/translate.svg'} alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-[10px] left-5 relative">
            <p className="italic">{currentWord?.examples.english}</p>
            <p className="italic">{currentWord?.examples.vietnamese}</p>
          </div>
          <button className="uppercase bg-orange-100 text-orange-500 px-4 py-2 rounded-[100px] w-max font-semibold text-[12px] mt-[24px]">
            Show more Definitions and examples
          </button>
        </div>
        {/* MEME */}
        <div className="flex-1 flex flex-col relative gap-[64px]">
          <Image
            src={'/asset/Mask group.png'}
            alt=""
            width={320}
            height={454}
          />
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border border-dashed mt-10" />
      <div className="w-[70%] mt-[80px] flex flex-col gap-[48px]">
        {/* Nav bar */}
        <NavBarWithParams
          views={views}
          handleClick={handleClickTav}
          currentView={tabView}
        />
        {tabView == 'collocations' && <Collocations />}
        {tabView == 'word-family-synonym' && <WordFamilySynonym />}
      </div>
      <div className="h-[50px]"></div>
    </div>
  );
};

export default Page;
