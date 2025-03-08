import React from 'react';

// interface Props {
//   choices: { value: string; label: string }[];
// }

import WordComboxBox from './WordComboxBox';
const CompleteSentence = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-[50px] h-full">
      <p className="font-semibold text-[32px]">Please type the word you hear</p>
      <span className="text-[24px] font-medium flex flex-row gap-2 flex-wrap">
        <span className="flex-shrink-0">He</span>
        <WordComboxBox />
        <span className="flex-shrink-0">to the gym every morning and</span>
        <WordComboxBox /> <span className="flex-shrink-0">dinner at 7 PM.</span>
      </span>
    </div>
  );
};

export default CompleteSentence;
