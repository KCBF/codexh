import React from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Bell } from 'lucide-react';
import { SearchCommand } from './Search';
const Header = () => {
  return (
    <div className="flex flex-row items-center justify-end p-4 gap-[16px] h-[72px]">
      <SearchCommand />
      <Bell size={18} />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
