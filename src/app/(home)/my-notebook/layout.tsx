'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import WordBankCTA from '@/components/CTA/WordBankCTA';
import PracticeCTA from '@/components/CTA/PracticeCTA';
import CreateNewWordBankDialog from '@/components/CreateNewWordBankDialog';

const Layout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname().split('/')[2];
  return (
    <div>
      {/* CTA */}
      {pathName == 'word-bank' ? <WordBankCTA /> : <PracticeCTA />}
      <div className="w-full px-[18px] ">
        <div className="flex flex-row  mt-[64px] justify-between items-center">
          {/* NAV BAR */}
          <ul className="flex flex-row items-center gap-4">
            <li className="w-max relative">
              <Link
                href="/my-notebook/word-bank"
                className={`text-[24px] ${pathName === 'word-bank' ? 'text-[#9A62CB] font-bold ' : 'font-medium'}`}
              >
                My Word Bank
              </Link>
              {pathName === 'word-bank' && (
                <span className="absolute bg-[#9A62CB] h-[5px] w-full left-0 bottom-[-10px]" />
              )}
            </li>
            <li className="relative">
              <Link
                href="/my-notebook/practice"
                className={`text-[24px]  ${pathName === 'practice' ? 'text-[#9A62CB] font-bold ' : 'font-medium'}`}
              >
                Practice
              </Link>
              {pathName === 'practice' && (
                <span className="absolute bg-[#9A62CB] h-[5px] w-full left-0 bottom-[-10px]" />
              )}
            </li>
          </ul>
          {pathName == 'word-bank' && (
            <div className="flex flex-row gap-8">
              <CreateNewWordBankDialog
                trigger={
                  <button className="flex flex-row p-2 rounded-sm bg-[#39A756] gap-2 text-white h-max">
                    <CirclePlus />
                    <span className="font-semibold">Create new list</span>
                  </button>
                }
              />

              <span className="flex flex-row items-center gap-2">
                <Image
                  src={'/filter-search.svg'}
                  width={24}
                  height={24}
                  alt=""
                />
                <span className="uppercase font-semibold text-[14px]">
                  Sort by date
                </span>
              </span>
            </div>
          )}
        </div>
        {children}
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default Layout;
