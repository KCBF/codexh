import React from 'react';
import Image from 'next/image';
const ExploreCTA = () => {
  return (
    <div className="bg-[#C9D9FF] w-full h-[428px] px-[64px] flex flex-col justify-center gap-[32px] mt-20">
      <p className="text-black text-[48px] font-bold">Level Up Your English</p>
      <p className="text-black text-[24px] font-medium">
        Join our{' '}
        <span className="font-bold text-[32px]"> interactive challenge</span>
      </p>
      <p className="text-black text-[24px] font-medium">
        Improve your English every day.{' '}
      </p>
      <button className="bg-[#FF7A1A] font-semibold text-[white] rounded-[100px] h-[48px] px-[16px] w-max uppercase">
        Boost Your Skills{' '}
      </button>
      <Image
        src={'/asset/Group 48095814.png'}
        alt=""
        width={353}
        height={259}
        className="top-24 right-0 absolute"
      />
    </div>
  );
};

export default ExploreCTA;
