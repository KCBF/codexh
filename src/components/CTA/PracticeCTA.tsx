import React from 'react';
import Image from 'next/image';
const PracticeCTA = () => {
  return (
    <div className="bg-[#FCF5D9] flex p-8 flex-col w-full gap-[24px] relative">
      <p className="font-bold text-[40px] uppercase">stay on track</p>
      <span className="font-medium text-[24px] max-w-[500px] relative">
        Track your progress and{' '}
        <span className="font-bold text-[32px]">boost your word knowledge</span>
      </span>
      <p className="font-medium text-[24px]">
        Review and reinforce words from Your Word Bank
      </p>
      <div className="flex flex-row gap-3">
        <button className="rounded-[100px] border border-[#FF7A1A] text-[#FF7A1A] p-2 text-[16px] font-semibold">
          LEVEL UP
        </button>
        <button className="bg-[#FF7A1A] w-max mt-auto p-2 px-[20px] rounded-[100px]">
          <p className="text-white text-[16px] font-semibold uppercase">
            monitor progress
          </p>
        </button>
      </div>

      <Image
        className="absolute right-5 top-[50%] -translate-y-1/2"
        src={'/asset/Group 48095943.png'}
        width={444}
        height={180}
        alt=""
      />
    </div>
  );
};

export default PracticeCTA;
