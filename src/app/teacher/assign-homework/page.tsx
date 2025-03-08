import { ArrowRight, ListChecks } from 'lucide-react';
import React from 'react';
import StudentLevelComboBox from '../_components/StudentLevelComboBox';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
const page = () => {
  return (
    <div className="flex flex-col">
      {/* CREATE HOMEWORK */}
      <div className="flex flex-col gap-4">
        <p className="text-[40px] font-bold">Create Homework</p>
        <div className="flex flex-row w-full border px-[24px] py-[20px]">
          <input
            type="text"
            placeholder="Insert Keywords (Ex: Politics, SAT etc.)"
            className="flex-1"
          />
          <div className="h-[40px] w-[40px] bg-[#8E12D5] flex flex-row items-center justify-center">
            <ArrowRight color="white" size={24} />
          </div>
        </div>{' '}
      </div>
      <div className="w-full flex flex-row items-start justify-between mt-[120px] gap-[20%]">
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-[18px] font-bold">Student Level</p>
          <StudentLevelComboBox />
          <div className="flex flex-row gap-[24px] mt-[80px]">
            <button className="uppercase text-[16px] font-semibold border border-black rounded-3xl px-4 py-1">
              preview
            </button>
            <button className="uppercase text-[16px] font-semibold text-white bg-black rounded-3xl px-4 py-1">
              assign
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-[18px] font-bold">Homework Type</p>
          <Button
            variant={'outline'}
            className="text-[16px] font-normal text-[#9B959F]"
          >
            Choose from our bank of assignments
          </Button>
          <div className="flex flex-row flex-wrap gap-3">
            <span className="border border-[#4918B2] text-[#4918B2] font-semibold rounded-[100px] flex flex-row items-center w-max gap-[16px] px-4 py-2">
              <ListChecks />
              <span>Mulitiple Choice</span>
            </span>
            <span className="border border-[#4918B2] text-[#4918B2] font-semibold rounded-[100px] flex flex-row items-center w-max gap-[16px] px-4 py-2">
              <Image src={'/note-2.svg'} width={24} height={24} alt="" />
              <span>Flashcard</span>
            </span>
            <span className="border border-[#4918B2] text-[#4918B2] font-semibold rounded-[100px] flex flex-row items-center w-max gap-[16px] px-4 py-2">
              <Image src={'/edit-2.svg'} width={24} height={24} alt="" />
              <span>Fill in the blank</span>
            </span>
            <span className="border border-[#4918B2] text-[#4918B2] font-semibold rounded-[100px] flex flex-row items-center w-max gap-[16px] px-4 py-2">
              <Image src={'/puzzle-2-line.svg'} width={24} height={24} alt="" />
              <span>Matching</span>
            </span>
            <span className="border border-[#4918B2] text-[#4918B2] font-semibold rounded-[100px] flex flex-row items-center w-max gap-[16px] px-4 py-2">
              <Image src={'/message-text.svg'} width={24} height={24} alt="" />
              <span>Setence Making</span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-[50px]" />
    </div>
  );
};

export default page;
