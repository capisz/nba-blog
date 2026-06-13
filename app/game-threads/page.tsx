import type { Metadata } from "next"
import Link from "next/link"
import { Radio } from "lucide-react"
import { GameThreadArchive } from "@/components/game-thread-archive"
import { gameThreads } from "@/lib/game-threads"

export const metadata: Metadata = {
  title: "Game Threads | Concrete Jungle Sports",
  description:
    "Knicks game thread archive with report links and companion podcast episodes for each played game.",
  alternates: {
    canonical: "/game-threads",
  },
  openGraph: {
    title: "Knicks Game Threads",
    description:
      "Game-by-game Knicks coverage from Concrete Jungle Sports, including reports and postgame podcasts.",
    url: "/game-threads",
    type: "website",
  },
}

export default function GameThreadsPage() {
  return (
    <div className="bg-[#f4f6fb] text-[#111111]">
      <header className="border-b-4 border-[#111111] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#006bb6] hover:text-[#f58426]"
          >
            <Radio className="h-4 w-4" aria-hidden="true" />
            Concrete Jungle Sports
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-[#f58426]">
            Game Threads
          </p>
          <h1 className="mt-2 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Knicks Game Archive
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Every played game gets a date box for the written report and a separate
            podcast icon for the postgame episode.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <GameThreadArchive threads={gameThreads} />
      </main>
    </div>
  )
}
