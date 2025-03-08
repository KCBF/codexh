import React from 'react';

const wordFamily = ['Ironical', 'Ironically', 'Irony', 'Ironies'];

const synonyms = [
  'Acidic',
  'Cynical',
  'Acid',
  'Wry',
  'Satirical',
  'Poignant',
  'Dry',
  'Sour',
  'Snarky',
  'Spikey',
];

const WordFamilySynonym = () => {
  return (
    <div className="flex flex-col gap-[80px] items-start">
      <div className="flex flex-col gap-[24px]">
        <p className="font-bold text-[24px]">Word Family</p>
        <div className="flex flex-row gap-2 flex-wrap ">
          {wordFamily.map((word, index) => {
            return (
              <span
                className="text-[18px] font-semibold py-[10px] px-[20px] bg-blue-500 text-white rounded-[4px]"
                key={index}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <p className="font-bold text-[24px]">Synonyms</p>
        <div className="flex flex-row gap-2 flex-wrap">
          {synonyms.map((word, index) => {
            return (
              <span
                className="text-[18px] font-semibold py-[10px] px-[20px] bg-blue-500 text-white rounded-[4px]"
                key={index}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <button className="text-orange-500 border border-orange-500 rounded-full px-3 py-2 uppercase text-[12px] font-semibold">
        Show more
      </button>
    </div>
  );
};

export default WordFamilySynonym;
