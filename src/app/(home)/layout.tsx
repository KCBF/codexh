'use client';
import Header from '@/components/Header';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';
import { Home, Inbox, Settings } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
const items = [
  {
    title: 'Homepage',
    url: '/',
    icon: Home,
  },
  {
    title: 'My Notebook',
    url: '/my-notebook/word-bank',
    icon: Inbox,
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Lightbulb,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];
const Layout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <div className="flex flex-row w-screen h-screen">
        <Sidebar>
          <SidebarHeader className="flex flex-row items-center">
            <SidebarTrigger />
            <Link href={'/'}>
              <p className="text-[#BF9BDE] font-bold text-[36px]">Vocake</p>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    let isActive = false;
                    if (item.url == pathName) {
                      isActive = true;
                    }
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            isActive &&
                              'bg-[#BF9BDE] text-black font-semibold px-5 py-6',
                            'px-5 py-6'
                          )}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <Header />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
