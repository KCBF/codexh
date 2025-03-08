import React from 'react';
import { cn } from '@/lib/utils';
const WordType = ({ type }: { type: string }) => {
  return (
    <div className="rounded-sm border-[1px] border-[#BFD0F8] flex flex-row w-max my-[24px] uppercase overflow-hidden">
      <p
        className={cn(
          'p-[8px] text-black  font-semibold border-r border-r-blue-200',
          type.toLowerCase() === 'adjective' ? 'bg-[#BFD0F8]' : 'bg-white'
        )}
      >
        Adjective
      </p>
      <p
        className={cn(
          'p-[8px] text-black font-semibold border-r border-r-blue-200',
          type.toLowerCase() === 'noun' ? 'bg-blue-200' : 'bg-white'
        )}
      >
        Noun
      </p>
      <p
        className={cn(
          'p-[8px] text-black font-semibold',
          type.toLowerCase() === 'verb' ? 'bg-[#BFD0F8]' : 'bg-white'
        )}
      >
        Verb
      </p>
    </div>
  );
};

export default WordType;
