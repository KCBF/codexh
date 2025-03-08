import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

import './globals.css'
import '@/styles/markdown.css'
import '@/styles/highlight.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CodeX Blockchain AI Assistant",
  description: "An AI assistant for the CodeX blockchain project - a multichain development solution focused on ease of development, security, and scalability.",
  generator: 'v0.dev'
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("flex min-h-svh flex-col antialiased", inter.className)}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </body>
    </html>
  )
}



import './globals.css'