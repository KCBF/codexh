import React from 'react';
import { Button } from '../ui/button';

const WriteSentence = () => {
  return (
    <div className="flex flex-col  ">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[24px] text-white">
          Make a sentence based on the following suggestions:
        </span>
        <span className="italic font-bold text-[32px] text-white">
          the story/ironic/funny{' '}
        </span>
      </div>
      <textarea className="rounded-xl h-[100px] relative bg-green-700 mt-20" />
      <div className="flex flex-row w-full mt-10 ">
        <Button className="ml-auto bg-green-500 rounded-full font-bold text-[18px] uppercase">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default WriteSentence;
