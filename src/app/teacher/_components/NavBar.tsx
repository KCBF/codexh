'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
const items = [
  { label: 'Overview', link: '/teacher/overview' },
  { label: 'Assign Homework', link: '/teacher/assign-homework' },
];
const NavBar = () => {
  return (
    <div className="hidden bg-background md:block">
      <nav className="container flex items-center justify-between">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <div className="flex h-full ">
            {items.map((item, index) => (
              <NavbarItem key={index} link={item.link} label={item.label} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

const NavbarItem = ({ link, label }: { link: string; label: string }) => {
  const pathName = usePathname();
  const isActive = pathName == link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-lg text-muted-foreground hover:text-[#9A62CB]',
          isActive && 'text-[#9A62CB]'
        )}
      >
        {label}{' '}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] bg-[#9A62CB] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl md:block"></div>
      )}
    </div>
  );
};
