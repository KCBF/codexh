'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import WordBankCard from '../_components/WordBankCard';
import { CircleChevronRight } from 'lucide-react';
import WordDialog from '@/components/WordDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

const Page = () => {
  const wordBanks = useSelector(
    (state: RootState) => state.wordBanks.wordBanks
  );

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setAudio(new Audio());
    }
  }, []);

  // Return a simpler initial UI during SSR to avoid hydration mismatch
  if (!isClient) {
    return (
      <div>
        <div className="flex flex-row gap-10 mt-10 items-center">
          {wordBanks.map((bank, index) => (
            <WordBankCard
              key={index}
              urlImage={bank.imageUrl}
              title={bank.title}
              date={bank.createdOn}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-10 mt-10 items-center">
        {wordBanks.map((bank, index) => {
          return (
            <WordBankCard
              key={index}
              urlImage={bank.imageUrl}
              title={bank.title}
              date={bank.createdOn}
            />
          );
        })}

        <CircleChevronRight
          size={80}
          strokeWidth={1}
          color="#A3A3A3"
          className="cursor-pointer"
        />
      </div>

      {/* Preview */}
      <div className="mt-[80px] flex flex-col gap-[32px] ">
        <p className="text-[48px] font-bold">Preview</p>
        <div className="gap-3 flex flex-col items-start">
          {wordBanks[0].words.map((word, index) => {
            return (
              <WordDialog
                wordBank={wordBanks[0]}
                key={index}
                word={word}
                trigger={
                  <div className="flex flex-row items-center w-[80%] shadow-md cursor-pointer justify-between pr-5 z-0 relative ">
                    <div className="h-[60px] w-[2px] bg-[#EF6EA5] border border-[#EF6EA5]" />
                    <p className="text-[18px] text-[#EF6EA5] font-bold w-[100px]">
                      {word.word}
                    </p>
                    <p className="w-[600px] font-medium italic">
                      {word.examples.english}
                    </p>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (audio && typeof window !== 'undefined') {
                          audio.src = word.audio;
                          audio.play();
                        }
                      }}
                      className="z-10 relative"
                    >
                      <Image
                        src={'/volume-high.svg'}
                        alt=""
                        height={24}
                        width={24}
                        className="cursor-pointer"
                      />
                    </span>
                  </div>
                }
              />
            );
          })}
        </div>
        <button className="border border-[#FF7A1A] uppercase w-max text-[#FF7A1A] p-3 rounded-[4px] font-semibold text-[14px] relative left-[30%]">
          View more
        </button>
      </div>
    </div>
  );
};

export default Page;
