import React from 'react';
import { CircleCheck } from 'lucide-react';
const MultipleChoices = () => {
  return (
    <div>
      <p className="text-[32px] font-medium">
        What does the word{' '}
        <span className="font-bold">&quot;courage&quot;</span> mean?
      </p>
      {/* CHOICES */}
      <div className="w-full items-center flex flex-col gap-[24px] mt-[32px] py-4">
        <div className="flex flex-row items-center w-[70%] justify-between border border-[#9B959F] p-2 rounded-[8px]">
          <span className="font-semibold text-[18px]">Fear</span>
          <CircleCheck color="#9B959F" size={24} strokeWidth={1.5} />
        </div>
        <div className="flex flex-row items-center w-[70%] justify-between border border-[#9B959F] p-2 rounded-[8px]">
          <span className="font-semibold text-[18px]">Bravery</span>
          <CircleCheck color="#9B959F" size={24} strokeWidth={1.5} />
        </div>
        <div className="flex flex-row items-center w-[70%] justify-between border border-[#9B959F] p-2 rounded-[8px]">
          <span className="font-semibold text-[18px]">Anger</span>
          <CircleCheck color="#9B959F" size={24} strokeWidth={1.5} />
        </div>
        <div className="flex flex-row items-center w-[70%] justify-between border border-[#9B959F] p-2 rounded-[8px]">
          <span className="font-semibold text-[18px]">Happiness</span>
          <CircleCheck color="#9B959F" size={24} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default MultipleChoices;
