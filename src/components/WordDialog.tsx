'use client';
import Image from 'next/image';
import WordType from './WordType';
import { SquareArrowUpRight, Trash, Volume2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import React, { ReactNode, useState } from 'react';
import { Word, WordBank } from '@/lib/types';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { deleteWordFromWordBank } from '@/stores/slice/wordBankSlice';
interface Props {
  word: Word;
  trigger: ReactNode;
  wordBank: WordBank;
}

const WordDialog = ({ trigger, word, wordBank }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleDelete = (wordId: string, wordBankdId: string) => {
    try {
      dispatch(
        deleteWordFromWordBank({ wordBankId: wordBankdId, wordId: wordId })
      );
      toast.success(`Word ${word.word} deleted`);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 overflow-hidden h-[600px]">
        <DialogHeader className="bg-[#DFE7FB] uppercase h-[80] flex flex-row items-center font-semibold text-[32px] px-5 py-4">
          {wordBank.title}
        </DialogHeader>
        <div className="flex-[2] p-4 px-8 max-h-[480px] overflow-y-scroll">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-[48px]">{word.word}</p>
            <div className="flex flex-row items-center gap-2">
              <span className="uppercase text-[14px] text-[#776108] bg-[#F2D147] rounded-[4px] p-3">
                Intermeidate
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            {/* UK pronunciation */}
            <div className="flex gap-2 items-center">
              <p className="text-[18px] font-semibold text-[#5E89ED]">UK</p>
              <Volume2
                className="text-[#5E89ED] cursor-pointer"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const audio = new Audio(word.audio);
                    audio.play();
                  }
                }}
              />
              <p className="text-[18px] font-medium text-[#757575]">
                {word.ipa.uk}
              </p>
            </div>
            {/* US pronunicaiton */}
            <div className="flex gap-2 items-center">
              <p className="text-[18px] font-semibold text-[#E83080]">US</p>
              <Volume2
                className="text-[#E83080] cursor-pointer"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const audio = new Audio(word.audio);
                    audio.play();
                  }
                }}
              />
              <p className="text-[18px] font-medium text-[#757575]">
                {word.ipa.us}
              </p>
            </div>
          </div>
          {/* Word type */}
          <WordType type={word.type || ''} />
          <div className="flex flex-row items-center gap-[10px] mb-[24px]">
            <button className="flex items-center justify-center text-[#757575] h-[24px] w-[24px] border border-[#757575] rounded-[100px]">
              1
            </button>
            <p className="text-[24px] font-bold">{word.meaning}</p>
            <Image src={'/translate.svg'} alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-[10px] left-5 relative">
            <p className="italic">{word.examples.english}</p>
            <p className="italic">{word.examples.vietnamese}</p>
          </div>
          <button className="uppercase bg-[#FFE4D1] text-[#FF7A1A] px-4 py-2 rounded-[100px] w-max font-semibold text-[12px] mt-[24px]">
            Show more Definitions and examples
          </button>
        </div>
        <DialogFooter>
          <div className="flex flex-row items-start p-4 justify-center w-full gap-2">
            <Button
              className="rounded-full text-red-500 bg-red-100 font-semibold"
              variant={null}
              onClick={() => {
                handleDelete(wordBank.id, word.id);
              }}
            >
              <Trash />
              <span>Delete</span>
            </Button>
            <Button
              className="rounded-full text-white text-[16px] bg-orange-500 font-semibold"
              variant={null}
            >
              <SquareArrowUpRight />
              <span>See more</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WordDialog;
