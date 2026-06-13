"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ChevronRight, Headphones, Search } from "lucide-react"
import type { GameThread } from "@/lib/game-threads"

function matchesThread(thread: GameThread, query: string) {
  const searchableText = [
    thread.dateISO,
    thread.dateLabel,
    thread.fullDate,
    thread.weekday,
    thread.game,
    thread.series,
    thread.result,
    thread.score,
    thread.dek,
  ]
    .join(" ")
    .toLowerCase()

  return searchableText.includes(query)
}

export function GameThreadArchive({ threads }: { threads: GameThread[] }) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const filteredThreads = useMemo(
    () =>
      normalizedQuery
        ? threads.filter((thread) => matchesThread(thread, normalizedQuery))
        : threads,
    [normalizedQuery, threads]
  )

  return (
    <section aria-label="Game thread archive" className="mx-auto max-w-5xl">
      <div className="sticky top-0 z-20 border-b-2 border-[#111111] bg-[#f4f6fb] py-4">
        <label
          htmlFor="game-archive-search"
          className="text-xs font-black uppercase tracking-[0.2em] text-[#006bb6]"
        >
          Search game archive
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
              aria-hidden="true"
            />
            <input
              id="game-archive-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by date, game, score, result..."
              className="w-full border-2 border-[#111111] bg-white py-3 pl-12 pr-4 text-base font-bold text-[#111111] outline-none transition placeholder:text-neutral-400 focus:border-[#006bb6]"
            />
          </div>
          <p className="shrink-0 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
            {filteredThreads.length} of {threads.length} games
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {filteredThreads.map((thread) => (
          <article
            key={`${thread.series}-${thread.game}-${thread.dateISO}`}
            className="overflow-hidden border-2 border-[#111111] bg-white shadow-[5px_5px_0_#111111]"
          >
            <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
              <Link
                href={thread.articleHref}
                className="group/date relative flex min-h-44 flex-col justify-end overflow-hidden border-b-2 border-[#111111] bg-[#006bb6] px-5 py-5 text-white transition md:min-h-full md:border-b-0 md:border-r-2"
                aria-label={`Open ${thread.fullDate} ${thread.series} ${thread.game} report`}
              >
                <span className="absolute inset-0">
                  <Image
                    src={thread.image}
                    alt={thread.imageAlt}
                    fill
                    className="object-cover opacity-70 transition duration-500 group-hover/date:scale-[1.04] group-hover/date:opacity-90"
                    style={{ objectPosition: thread.imagePosition }}
                    sizes="(min-width: 768px) 260px, 100vw"
                  />
                </span>
                <span className="absolute inset-0 bg-[#006bb6]/65 transition duration-500 group-hover/date:bg-[#f58426]/55" />
                <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.78),rgba(0,0,0,0.38)_58%,rgba(0,0,0,0.12))]" />
                <span className="relative inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {thread.weekday}
                </span>
                <time
                  dateTime={thread.dateISO}
                  className="relative mt-2 text-4xl font-black uppercase leading-none tracking-tight"
                >
                  {thread.dateLabel}
                </time>
                <span className="relative mt-2 text-sm font-black uppercase tracking-[0.16em] text-blue-50">
                  {thread.fullDate}
                </span>
              </Link>

              <div className="min-w-0 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-neutral-500">
                  <span>{thread.series}</span>
                  <span>{thread.game}</span>
                  <span
                    className={`px-2 py-1 ${
                      thread.result === "Win"
                        ? "bg-[#006bb6] text-white"
                        : "bg-[#111111] text-white"
                    }`}
                  >
                    {thread.result}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl">
                  <Link href={thread.articleHref} className="hover:text-[#006bb6]">
                    {thread.score}
                  </Link>
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">
                  {thread.dek}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={thread.articleHref}
                    className="inline-flex items-center gap-2 bg-[#f58426] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#006bb6]"
                  >
                    Read report
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {thread.podcastHref ? (
                    <Link
                      href={thread.podcastHref}
                      className="inline-flex items-center gap-2 border-2 border-[#111111] bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#111111] hover:bg-[#111111] hover:text-white"
                      aria-label={`Open ${thread.series} ${thread.game} podcast`}
                      title={`${thread.game} podcast`}
                    >
                      <Headphones className="h-5 w-5" aria-hidden="true" />
                      Podcast
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredThreads.length === 0 ? (
        <div className="mt-5 border-2 border-dashed border-neutral-300 bg-white p-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">
            No games match that search.
          </p>
        </div>
      ) : null}
    </section>
  )
}
