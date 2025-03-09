"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/hooks/use-chat-sidebar";
import { cn } from "@/lib/utils";

interface OpenChatButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  children?: React.ReactNode;
}

const OpenChatButton: React.FC<OpenChatButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  showIcon = true,
  children,
}) => {
  const { openSidebar } = useChatSidebar();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={openSidebar}
      className={cn(className)}
    >
      {showIcon && <MessageCircle className="mr-2 h-4 w-4" />}
      {children || "Chat with AI"}
    </Button>
  );
};

export default OpenChatButton; 