"use client"

import type React from "react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { TooltipProvider } from "@/components/ui/tooltip"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input || input.trim() === "") return
    
    // Add user message to the chat
    const userMessage: Message = { content: input, role: "user" }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)
    
    try {
      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error("Response body is null")
      
      let assistantMessage = ""
      
      // Read the stream
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        // Decode the chunk and append to the assistant message
        const chunk = new TextDecoder().decode(value)
        assistantMessage += chunk
        
        // Update the UI with the current assistant message
        setMessages((prev) => {
          const newMessages = [...prev]
          // Check if we already have an assistant message
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.role === "assistant") {
            // Update the existing assistant message
            lastMessage.content = assistantMessage
            return [...newMessages]
          } else {
            // Add a new assistant message
            return [...newMessages, { role: "assistant", content: assistantMessage }]
          }
        })
      }
    } catch (err) {
      console.error("Error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const header = (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">Azure OpenAI Chatbot</h1>
      <p className="text-muted-foreground text-sm">
        This is an AI chatbot app built with <span className="text-foreground">Next.js</span> and{" "}
        <span className="text-foreground">Azure OpenAI</span>.
      </p>
      <p className="text-muted-foreground text-sm">
        Send a message to start chatting with the AI assistant. <strong>Markdown is supported in both user and AI messages!</strong>
      </p>
    </header>
  )

  const messageList = (
    <div className="my-4 flex h-fit min-h-full flex-col gap-4">
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role || "user"}
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            message.role === "assistant" 
              ? "self-start max-w-[85%] bg-gray-100 text-black" 
              : "self-end max-w-[75%] bg-blue-500 text-white"
          )}
        >
          <div className={cn(
            "prose prose-sm max-w-none",
            message.role === "assistant" ? "prose" : "prose-invert"
          )}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            >
              {message.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      {error && (
        <div className="self-center rounded-xl bg-red-100 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="self-start rounded-xl bg-gray-100 px-3 py-2 text-sm">
          <span className="animate-pulse">...</span>
        </div>
      )}
    </div>
  )

  return (
    <TooltipProvider>
      <main
        className={cn(
          "ring-none mx-auto flex h-svh max-h-svh w-full max-w-[35rem] flex-col items-stretch border-none",
          className,
        )}
        {...props}
      >
        <div className="flex-1 content-center overflow-y-auto px-6">{messages.length ? messageList : header}</div>
        <form
          onSubmit={handleSubmit}
          className="border-input bg-background focus-within:ring-ring/10 relative mx-6 mb-6 flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(value) => setInput(value)}
            value={input || ""}
            placeholder="Enter a message (Markdown supported)"
            className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
            disabled={isLoading}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute bottom-1 right-1 size-6 rounded-full"
                disabled={isLoading || !input.trim()}
                type="submit"
              >
                <ArrowUpIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </form>
      </main>
    </TooltipProvider>
  )
}

