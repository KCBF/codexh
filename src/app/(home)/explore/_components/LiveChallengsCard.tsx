import React from 'react';
import Image from 'next/image';
import AvatarGroup from '@/components/AvatarGroup';
interface Props {
  imageUrl: string;
  title: string;
}

const LiveChallengsCard = ({ ...args }: Props) => {
  return (
    <div className="flex flex-col gap-[24px] items-center">
      <div className="rounded-[16px] p-2 shadow-md w-full flex items-center justify-center">
        <Image src={args.imageUrl} alt="" width={156} height={168} />
      </div>
      <div className="flex flex-col gap-[16px] w-full items-start">
        <p className="text-[24px] font-bold uppercase">{args.title} </p>
        <div className="flex flex-row items-center justify-between w-full">
          <AvatarGroup />
          <p className="text-[16px] text-[#757575] font-medium">Joining</p>
        </div>
      </div>
    </div>
  );
};

export default LiveChallengsCard;
