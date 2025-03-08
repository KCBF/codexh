'use client';
import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function Page() {
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
        <div className="flex justify-between items-center p-4 bg-purple-100">
          <h1 className="text-[#BF9BDE] font-bold text-[36px]">Vocake</h1>
          <UserButton />
        </div>
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
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-purple-100">
        <h1 className="text-[#BF9BDE] font-bold text-[36px]">Vocake</h1>
        <UserButton />
      </div>
      
      <div className="flex flex-row mt-[120px] px-[38px] pr-[64px] gap-8">
        {/* Word section */}
        <div className="flex-[2]">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-[56px]">{currentWord?.word}</p>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row px-4 py-2 gap-2 text-[16px] font-semibold rounded-[8px] border border-[#39A756] cursor-pointer">
                <span className="text-green-600">Add to notebook</span>
              </div>
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
          <div className="mt-4 mb-2">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">{currentWord?.type}</span>
          </div>
          <div className="flex flex-row items-center gap-[10px] mb-[24px]">
            <button className="flex items-center justify-center text-[#757575] h-[24px] w-[24px] border border-[#757575] rounded-[100px]">
              1
            </button>
            <p className="text-[24px] font-bold">{currentWord?.meaning}</p>
          </div>
          <div className="flex flex-col gap-[10px] left-5 relative">
            <p className="italic">{currentWord?.examples.english}</p>
            <p className="italic">{currentWord?.examples.vietnamese}</p>
          </div>
          <button className="uppercase bg-orange-100 text-orange-500 px-4 py-2 rounded-[100px] w-max font-semibold text-[12px] mt-[24px]">
            Show more Definitions and examples
          </button>
        </div>
        {/* Image */}
        <div className="flex-1 flex flex-col relative gap-[64px]">
          {currentWord && (
            <div className="bg-purple-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Learning Tips</h3>
              <p>Practice using "{currentWord.word}" in your daily conversations.</p>
              <p className="mt-2">Try to create sentences with this word.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="mt-12 px-[38px]">
        <div className="flex space-x-4 border-b">
          <button className="px-4 py-2 border-b-2 border-purple-500 font-medium">Collocations</button>
          <button className="px-4 py-2 text-gray-500">Word Family</button>
          <button className="px-4 py-2 text-gray-500">Synonyms</button>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Common Collocations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-medium">extensive vocabulary</span>
              <p className="text-sm text-gray-600 mt-1">A wide range of words that someone knows</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-medium">build vocabulary</span>
              <p className="text-sm text-gray-600 mt-1">To increase the number of words you know</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[50px]"></div>
    </div>
  );
}

