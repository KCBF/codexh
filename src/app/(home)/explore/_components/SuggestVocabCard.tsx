import React from 'react';
import Image from 'next/image';
interface Props {
  bg: string;
  title: string;
  desc: string;
  words: number;
  points: number;
}

const SuggestVocabCard = ({ ...args }: Props) => {
  return (
    <div
      className={
        'rounded-[16px] p-5 flex flex-col gap-[8px] overflow-hidden relative'
      }
      style={{ background: args.bg }}
    >
      <div className="h-[118px] w-[118px] rounded-[100px] bg-[#FCE3EE] absolute right-[5px] -top-[30%]" />
      <div className="flex flex-col w-[80%] gap-[24px]">
        <p className="text-white uppercase text-[48px] font-bold">
          {args.title}
        </p>
        <p className="text-white text-[18px] font-medium">{args.desc} </p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/asset/Group 48095836.png"
              alt=""
              height={38}
              width={38}
            />
            <p className="text-[16px] font-semibold text-[#FAFAFA]">
              {args.words} words
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/asset/Group 48095837.png"
              alt=""
              height={38}
              width={38}
            />{' '}
            <p className="text-[16px] font-semibold text-[#FAFAFA]">
              {args.points} points
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row ">
        <button className="bg-white ml-auto p-2 rounded-[100px] px-10 font-semibold text-ellipsis-[16px]">
          View
        </button>
      </div>
      <div className="h-[118px] w-[118px] rounded-[100px] bg-[#FCE3EE] absolute  -bottom-[30%]" />
    </div>
  );
};

export default SuggestVocabCard;
