import React from 'react';
import Image from 'next/image';

interface Props {
  urlImage: string;
  date: string;
  title: string;
}

const WordBankCard = ({ ...args }: Props) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Image src={args.urlImage} width={217} height={198} alt="" />
      <div>
        <p className="uppercase font-bold text-[24px]">{args.title} </p>
        <p className="text-[#A3A3A3] font-medium text-[18px]">
          Created on {formatDate(args.date)}
        </p>
      </div>
    </div>
  );
};

export default WordBankCard;
