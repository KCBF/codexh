import React from 'react';
import Image from 'next/image';
import { CalendarDays, Eye } from 'lucide-react';
const NewsAndHighlightsCard = () => {
  return (
    <div className="relative w-[380px] h-[428px] flex flex-col  rounded-[16px] bg-black overflow-hidden flex-shrink-0">
      {/* IMAGE */}
      <div className=" w-[full] h-[50%] relative">
        <Image
          src="/asset/Rectangle 2.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col gap-[32px] p-4 px-6">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <Eye color="#BF9BDE" />
            <p className="text-[white]">200K</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CalendarDays color="#BF9BDE" />
            <p className="text-[white]">25 Mar, 2025</p>
          </div>
        </div>
        {/* TITIEL */}
        <p className="text-[24px] font-bold text-white">
          English Exercise for Art Teacher in High School
        </p>
        {/* READ MORE BUTTOn */}
        <button className="uppercase rounded-3xl bg-white text-black w-max px-5 py-2 text-[16px] font-semibold">
          read more
        </button>
      </div>
    </div>
  );
};

export default NewsAndHighlightsCard;
