import React from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
// interface Props {
//   word: string;
// }
const Collocations = () => {
  return (
    <div>
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex flex-row justify-between">
          <span className="text-[24px] font-bold">bitterly ironic</span>
          <button className="px-4 py-1 rounded-3xl border border-[#39A756] flex flex-row items-center gap-2">
            <Plus size={20} color="#39A756" />
            <Image src={'/stickynote.svg'} alt="" width={24} height={24} />
          </button>
        </div>
        <span className="text-[18px] font-medium ">
          This was a bitterly ironic sendoff for someone who had sacrificed his
          life to the cause of achieving social justice by peaceful means.
        </span>
        <span className="font-medium italic text-[18px] text-[#A3A3A3]">
          Retrieved from Wikipedia CC BY-SA 3.0
        </span>
      </div>
      <div className="flex flex-col w-full gap-[8px]">
        <div className="flex flex-row justify-between">
          <span className="text-[24px] font-bold">deeply ironic</span>
          <button className="px-4 py-1 rounded-3xl  bg-green-600 flex flex-row items-center gap-2">
            <Plus size={20} color="white" />
            <Image src={'/stickynoteWhite.svg'} alt="" width={24} height={24} />
          </button>
        </div>
        <span className="text-[18px] font-medium ">
          I found this deeply ironic.
        </span>
        <span className="font-medium italic text-[18px] text-[#A3A3A3]">
          Times, Sunday Times (2012){' '}
        </span>
      </div>
      <button className="border border-[#FF7A1A] uppercase w-max text-[#FF7A1A] p-3 rounded-[4px] font-semibold text-[14px] relative left-1/2 translate-x-1/2 ">
        View more
      </button>
    </div>
  );
};

export default Collocations;
