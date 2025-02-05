import { cn } from "@this/common/utils/cn"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

import "~/assets/styles/tailwind.css"

import Providers from "~/components/providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body className={cn("font-sans", inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
