'use client';

import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Search } from 'lucide-react';
import { words } from '@/constants/words';
import { useDispatch } from 'react-redux';
import { findWord } from '@/stores/slice/wordSlice';
import { useRouter } from 'next/navigation';

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchWord = (value: string) => {
    dispatch(findWord(value));
    setOpen(false);
    router.replace('/');
  };

  return (
    <>
      <Search
        size={18}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="cursor-pointer"
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup>
            {words.map((item, index) => {
              return (
                <CommandItem
                  onSelect={(value) => {
                    searchWord(value);
                  }}
                  key={index}
                >
                  {item.word}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
