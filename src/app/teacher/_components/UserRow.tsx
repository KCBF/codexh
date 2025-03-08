import Image from 'next/image';
import React from 'react';

export interface Props {
  url: string;
  userName: string;
  level: string;
}

const UserRow = ({ ...args }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <Image
        src={args.url}
        width={48}
        height={48}
        className="rounded-[100px]"
        alt=""
      />
      <div className="flex flex-col items-start">
        <p className="font-semibold text-[18px]">{args.userName}</p>
        <p className="font-medium text-[16px] text-[#656565]">
          Level {args.level}
        </p>
      </div>
    </div>
  );
};

export default UserRow;
