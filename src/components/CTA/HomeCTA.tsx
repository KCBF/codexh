import React from 'react';
import Image from 'next/image';
const HomeCTA = () => {
  return (
    <div className="bg-green-100 w-full h-[428px] px-[64px] flex flex-col justify-center gap-[32px] mt-20">
      <p className="text-black text-[48px] font-bold">VoCake Learning</p>
      <p className="text-black text-[24px] font-medium">
        Find new words and master their meanings with ease
      </p>
      {/* Search box */}
      <div className="bg-white w-[748px] rounded-[100px] overflow-hidden h-[48px] flex flex-row border-white border-[1px]">
        <Image
          src={'/search-status.svg'}
          height={24}
          width={24}
          alt=""
          className="ml-4"
        />
        <input
          placeholder="Search English - Vietnamese"
          type="text"
          className="flex-1 px-[16px]"
        />
        <button className="bg-[#FF7A1A] text-[white] px-[16px]">
          English - Vietnamese
        </button>
      </div>
      <Image
        src={'/asset/Group 48095851.png'}
        alt=""
        width={353}
        height={259}
        className="top-24 right-0 absolute"
      />
    </div>
  );
};

export default HomeCTA;
