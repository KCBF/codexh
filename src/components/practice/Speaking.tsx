import Image from 'next/image';
import React from 'react';

const Speaking = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="font-bold text-[32px] text-white">
        Speak this sentence
      </span>
      <span className="font-medium italic text-[24px] text-white">
        “She has a lovely ironic humour”
      </span>
      <Image src={'./teacher.svg'} alt="" width={10} height={10} />
    </div>
  );
};

export default Speaking;
