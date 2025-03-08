import React from 'react';
import Image from 'next/image';
const WordBankCTA = () => {
  return (
    <div className="bg-[#FCF5D9] flex p-8 flex-col w-full gap-[24px] relative">
      <p className="font-bold text-[40px]">Build Your Word Power</p>
      <span className="font-medium text-[24px]">
        <span className="text-[32px] font-bold">Track and Strengthen</span> Your
        Word List
      </span>
      <p className="font-medium text-[24px]">Keep Your Vocabulary Organized</p>
      <button className="bg-[#FF7A1A] w-max mt-auto p-2 px-[20px] rounded-[100px]">
        <p className="text-white text-[16px] font-semibold uppercase">
          Begin Exploring
        </p>
      </button>
      <Image
        className="absolute right-5 top-[50%] -translate-y-1/2"
        src={'/asset/Group 48095924.png'}
        width={444}
        height={180}
        alt=""
      />
    </div>
  );
};

export default WordBankCTA;
