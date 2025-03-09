"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add welcome message when component mounts
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: "# Welcome to the Vocake AI Assistant! 👋\n\nI'm here to help you with your language learning journey. You can ask me about:\n\n- Vocabulary definitions and examples\n- Grammar explanations\n- Learning strategies\n- Translation assistance\n- Pronunciation tips\n\nHow can I assist you today?"
      }
    ])
  }, [])

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
        
        // Check if the response contains the redirect marker
        if (assistantMessage.includes("[REDIRECT_TO_ENGLISH_QUIZ]")) {
          // Remove the redirect marker from the displayed message
          const cleanMessage = assistantMessage.replace("[REDIRECT_TO_ENGLISH_QUIZ]", "");
          
          // Update the UI with the clean message
          setMessages((prev) => {
            const newMessages = [...prev];
            // Check if we already have an assistant message
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === "assistant") {
              // Update the existing assistant message
              lastMessage.content = cleanMessage;
              return [...newMessages];
            } else {
              // Add a new assistant message
              return [...newMessages, { role: "assistant", content: cleanMessage }];
            }
          });
          
          // Set a timeout to allow the user to read the message before redirecting
          setTimeout(() => {
            router.push('/english-quiz');
          }, 2000);
          
          break;
        }
        
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
    <header className="m-auto flex max-w-96 flex-col gap-3 text-center px-4">
      <h1 className="text-xl font-semibold leading-none tracking-tight">Vocake AI Assistant</h1>
      <p className="text-muted-foreground text-xs">
        Ask me anything about language learning, vocabulary, or get help with your studies.
      </p>
      <p className="text-muted-foreground text-xs">
        <strong>Markdown is supported in both user and AI messages!</strong>
      </p>
    </header>
  )

  const messageList = (
    <div className="my-2 flex h-fit min-h-full flex-col gap-3 px-3">
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role || "user"}
          className={cn(
            "rounded-xl px-3 py-2 text-xs",
            message.role === "assistant" 
              ? "self-start max-w-[85%] bg-gray-100 text-black" 
              : "self-end max-w-[75%] bg-[#5E89ED] text-white"
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
        <div className="self-center rounded-xl bg-red-100 px-3 py-2 text-xs text-red-800">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="self-start rounded-xl bg-gray-100 px-3 py-2 text-xs">
          <span className="animate-pulse">...</span>
        </div>
      )}
    </div>
  )

  return (
    <TooltipProvider>
      <main
        className={cn(
          "ring-none mx-auto flex h-full max-h-full w-full flex-col items-stretch border-none",
          className,
        )}
        {...props}
      >
        <div className="flex-1 content-center overflow-y-auto">{messages.length ? messageList : header}</div>
        <form
          onSubmit={handleSubmit}
          className="border-input bg-background focus-within:ring-ring/10 relative mx-3 mb-3 flex items-center rounded-[12px] border px-2 py-1 pr-7 text-xs focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(value) => setInput(value)}
            value={input || ""}
            placeholder="Ask about language learning..."
            className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none text-xs"
            disabled={isLoading}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute bottom-1 right-1 size-5 rounded-full"
                disabled={isLoading || !input.trim()}
                type="submit"
              >
                <ArrowUpIcon size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={12}>Submit</TooltipContent>
          </Tooltip>
        </form>
      </main>
    </TooltipProvider>
  )
}

