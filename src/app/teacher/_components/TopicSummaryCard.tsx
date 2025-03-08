import React from 'react';
import Image from 'next/image';

interface Props {
  url: string;
  title: string;
  number: string;
}

const TopicSummaryCard = ({ ...args }: Props) => {
  return (
    <div className="flex flex-col items-center w-max gap-[24px]">
      <div className="p-4 rounded-[16px] bg-[#F3ECF9] w-full h-[228px] flex flex-col items-center justify-center">
        <Image src={args.url} width={163} height={140} alt="" />
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="font-bold text-[18px] ">{args.title}</p>
        <p>{args.number} </p>
      </div>
    </div>
  );
};

export default TopicSummaryCard;
