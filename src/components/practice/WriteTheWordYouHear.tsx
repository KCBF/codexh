import React from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
const WriteTheWordYouHear = () => {
  const word = {
    word: 'ironic',
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/uki/ukiri/ukiridi011.mp3',
  };
  const [answer, setAnswer] = useState<string[]>([]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);

      if (word.word.split('').includes(event.key)) {
        setAnswer((prevAnswer) => [...prevAnswer, event.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  const playAudio = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(word.audio);
      audio.play();
    }
  };
  return (
    <div className="flex flex-col items-center justify-between gap-[50px]">
      <p className="font-bold text-[32px] text-white">
        Please type the word you hear
      </p>
      <div className="flex flex-row items-end gap-4">
        <Image
          src={'/Speaker.svg'}
          alt=""
          width={195}
          height={148}
          className="cursor-pointer"
          onClick={playAudio}
        />
        <Image src={'/Snail.svg'} alt="" width={67} height={40} />
      </div>
      {/* BLIND BOX */}
      <div className="flex flex-row gap-3 flex-wrap">
        {word.word.split('').map((w, index) => {
          let isActive = false;
          if (answer.includes(w)) {
            isActive = true;
          }
          return (
            <div
              key={index}
              className={cn(
                'border border-dashed h-[72px] w-[72px] rounded-[16px] overflow-hidden flex flex-row items-center justify-center p-2'
              )}
            >
              <span className="text-[48px] font-semibold">
                {isActive ? <>{w}</> : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WriteTheWordYouHear;
