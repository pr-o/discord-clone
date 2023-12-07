import "@/app/globals.css"

import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { ModalProvider } from "@/providers/modal-provider"
import { QueryProvider } from "@/providers/query-provider"
import { SocketProvider } from "@/providers/socket-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const font = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Discord",
  description: "cloned by Sung",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <QueryProvider>
            <SocketProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                storageKey="discord-clone-by-sung-theme"
              >
                {children}
                <ModalProvider />
                <Toaster />
              </ThemeProvider>
            </SocketProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
