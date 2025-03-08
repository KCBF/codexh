import {
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import { Book, ChevronDown, Home, Inbox, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Header from '@/components/Header';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import NavBar from './_components/NavBar';
import Image from 'next/image';
const group1 = [
  {
    title: 'Class A1',
    url: '',
    icon: Book,
  },
  {
    title: 'Class A2',
    url: '',
    icon: Book,
  },
  {
    title: 'Class A3',
    url: '',
    icon: Book,
  },
];

const items = [
  {
    title: 'Homepage',
    url: '/',
    icon: Home,
  },
  {
    title: 'My List',
    url: 'mylist',
    icon: Inbox,
  },
  {
    title: 'Explore',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <div className="flex flex-row w-full h-screen">
        <Sidebar>
          <SidebarHeader>Logo</SidebarHeader>
          <SidebarContent>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    My Class
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent
                  className={cn(
                    'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
                  )}
                >
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group1.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              {<item.icon />}
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          {<item.icon />}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <Header />
          <div className="w-full">
            {/* CTA */}
            <div className="bg-[#DDF3E3] w-full h-[298px] py-[32px] px-[50px]  flex flex-col gap-[24px]">
              <p className="text-black text-[40px] font-bold">
                Welcome to class A1!
              </p>
              <div>
                <p className="text-black text-[24px]">
                  Your students completed 80% of the tasks
                </p>
                <p className="text-black text-[24px]">Progress is very good</p>
              </div>
              <button className="bg-[#FF7A1A] text-white w-max rounded-[100px] px-[16px] py-[10px] uppercase font-semibold">
                View details
              </button>
              <Image
                src={'/asset/Group 48095788.png'}
                className="absolute right-0 "
                alt=""
                height={298}
                width={329}
              />
            </div>
            <div className="mt-10 flex flex-col gap-10 px-[80px]">
              <NavBar />
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default layout;
