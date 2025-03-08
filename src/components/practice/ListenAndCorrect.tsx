import { cn } from '@/lib/utils';
import { CirclePlay, PauseCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ListenAndCorrect = () => {
  const [play, setPlay] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // First detect if we're on the client
  useEffect(() => {
    setIsClient(true);
    // Initialize audio only on the client side
    if (typeof window !== 'undefined') {
      setAudio(new Audio('http://www.web-esl.com/sound/r3.mp3'));
    }
  }, []);

  const playAudio = () => {
    if (audio) {
      audio.play();
      setPlay(true);
    }
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setPlay(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-[20px]">
      <p className="font-semibold text-[32px] text-white">
        Listen and write correct sentence
      </p>
      <div className="flex flex-row items-center gap-5">
        <div className="h-max bg-transparent flex flex-col items-center justify-center">
          <div className="flex flex-row gap-x-2 items-center justify-center">
            <div
              className={cn(
                'rounded-full w-2 h-8 bg-gray-600/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-16 bg-gray-500/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-8 bg-gray-800/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-12 bg-gray-700/60',
                play && 'wave'
              )}
              style={{ '--i': '.2s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-24 bg-gray-600/60',
                play && 'wave'
              )}
              style={{ '--i': '.3s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-36 bg-gray-500/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-24 bg-gray-600/60',
                play && 'wave'
              )}
              style={{ '--i': '.3s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-12 bg-gray-700/60',
                play && 'wave'
              )}
              style={{ '--i': '.2s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-8 bg-gray-800/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-16 bg-gray-500/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
            <div
              className={cn(
                'rounded-full w-2 h-8 bg-gray-600/60',
                play && 'wave'
              )}
              style={{ '--i': '.4s' } as React.CSSProperties}
            ></div>
          </div>
        </div>
        {!play ? (
          <CirclePlay
            size={40}
            className="cursor-pointer"
            onClick={playAudio}
          />
        ) : (
          <PauseCircle
            size={40}
            className="cursor-pointer"
            onClick={pauseAudio}
          />
        )}
      </div>
      <textarea
        className="border border-[#A6A6A6] rounded-md w-full p-4 text-[18px] font-medium "
        placeholder="please enter your answer here..."
      />
      <div className="w-full flex flex-row ">
        <button className="ml-auto uppercase text-[16px] font-semibold rounded-full px-4 py-1 bg-black text-white">
          submit
        </button>
      </div>
      <style jsx>{`
        .wave {
          animation: wave 1s linear infinite;
        }

        @keyframes wave {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ListenAndCorrect;
