"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatForm } from "./chat-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/hooks/use-chat-sidebar";

interface ChatSidebarProps {
  className?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ className }) => {
  const { isOpen, toggleSidebar } = useChatSidebar();

  return (
    <>
      {/* Chat toggle button - fixed to the right side of the screen */}
      <Button
        onClick={toggleSidebar}
        className="fixed right-4 bottom-4 z-50 rounded-full w-12 h-12 flex items-center justify-center bg-[#5E89ED] hover:bg-[#4A6FCA] shadow-lg"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 z-40 h-screen w-[350px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Close chat"
            >
              <X size={20} />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatForm className="h-full max-w-full" />
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default ChatSidebar; 