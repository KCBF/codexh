import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Plus_Jakarta_Sans } from "next/font/google"
import type { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { ReduxProvider } from "@/providers/ReduxProviders"
import { Toaster } from "sonner"

import './globals.css'
import '@/styles/markdown.css'
import '@/styles/highlight.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: "Vocake - Language Learning",
  description: "Vocake language learning platform - learn vocabulary effectively with AI assistance.",
  generator: 'v0.dev'
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ClerkProvider afterSignOutUrl="/sign-in">
        <html lang="en">
          <body className={cn("flex min-h-svh flex-col antialiased", plusJakartaSans.variable)}>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </ReduxProvider>
  )
}



import './globals.css'