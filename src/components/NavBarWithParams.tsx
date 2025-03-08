import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  views: { view: string; name: string }[];
  handleClick: (view: string) => void;
  currentView: string;
}
const NavBarWithParams = ({ ...args }: Props) => {
  return (
    <ul className="flex flex-row items-center gap-4">
      {args.views.map((view, index) => {
        let isActive = false;
        if (args.currentView == view.view) {
          isActive = true;
        }
        return (
          <li key={index} className="w-max relative">
            <span
              onClick={() => {
                args.handleClick(view.view);
              }}
              className={cn(
                isActive &&
                  'text-[24px] font-bold text-[#9A62CB] cursor-pointer',
                'text-[24px] font-medium cursor-pointer'
              )}
            >
              {view.name}
            </span>
            {isActive && (
              <span className="absolute bg-[#9A62CB] h-[5px] w-full left-0 bottom-[-10px]" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavBarWithParams;
