import { MoveDown, MoveUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';
export interface Props {
  percent: number;
  direction: string;
  name: string;
  iconUrl: string;
  bigNumber: string;
  bg: string;
}

const ClassSummayCard = ({ ...args }: Props) => {
  return (
    <div
      className="rounded-[16px] h-[180px] flex-shrink-0 p-5 flex flex-row justify-between"
      style={{ background: args.bg }}
    >
      <div>
        <div
          className={cn(
            'rounded-[100px] bg-white w-max px-[12px] py-[4px] flex flex-row items-center ',
            args.direction == 'up' && 'text-[#2DA771]',
            args.direction == 'down' && 'text-[#FF3A44]'
          )}
        >
          {args.direction == 'up' ? (
            <MoveUp size={14} />
          ) : (
            <MoveDown size={14} />
          )}
          <p className="text-[16px] font-semibold">{`${args.percent}%`}</p>
        </div>
        <p className="text-[56px] font-semibold">{args.bigNumber}</p>
        <p className="text-[20px] font-medium">{args.name}</p>
      </div>
      <div>
        <Image src={args.iconUrl} width={38} height={63} alt="" />
      </div>
    </div>
  );
};

export default ClassSummayCard;
