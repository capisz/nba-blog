import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Concrete Jungle Sports | New York Knicks Blog",
  description:
    "Concrete Jungle Sports is a New York Knicks community blog for news, analysis, game threads, podcasts, and fan conversation.",
  icons: { icon: "/concrete-jungle/icon.svg" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} min-h-dvh bg-[#f4f6fb] text-[#111111] antialiased`}>
        <div className="flex min-h-dvh flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
