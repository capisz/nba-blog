"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ChevronRight, MessageSquareQuote } from "lucide-react"

export type HomeGameResult = {
  date: string
  game: string
  result: "W" | "L"
  resultLine: string
  series: string
  matchup: string
  score: string
  knicksScore: string
  opponentScore: string
  featuredName: string
  featuredStats: Array<{ label: string; value: string }>
  note: string
  href: string
  image: string
  imageAlt: string
  source: string
}

export type HomeStory = {
  label: string
  title: string
  excerpt: string
  href: string
  image: string
  imageAlt: string
  meta: string
}

export type HomePostgame = HomeStory & {
  quoteNote: string
}

function useAutoIndex(length: number, delay = 9000) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (length < 2) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % length)
    }, delay)

    return () => window.clearInterval(timer)
  }, [delay, length])

  return [activeIndex, setActiveIndex] as const
}

function PanelTabs({
  items,
  activeIndex,
  onChange,
}: {
  items: Array<{ label: string; title: string }>
  activeIndex: number
  onChange: (index: number) => void
}) {
  const gridClass =
    items.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : items.length === 2
        ? "grid-cols-2"
        : "grid-cols-3"

  return (
    <div className={`mt-4 grid gap-2 ${gridClass}`}>
      {items.map((item, index) => (
        <button
          key={`${item.label}-${item.title}`}
          type="button"
          onClick={() => onChange(index)}
          className={`min-h-[58px] overflow-hidden border-2 px-3 py-2 text-left text-[10px] font-black uppercase tracking-[0.14em] transition ${
            activeIndex === index
              ? "border-[#f58426] bg-[#f58426] text-white"
              : "border-white/25 bg-white/10 text-white hover:border-white"
          }`}
          aria-pressed={activeIndex === index}
        >
          <span className="block text-white/70">{item.label}</span>
          <span className="mt-1 block truncate">{item.title}</span>
        </button>
      ))}
    </div>
  )
}

function splitFeaturedName(name: string) {
  const parts = name.trim().split(/\s+/)

  if (parts.length < 2) {
    return { lead: name, last: "" }
  }

  return {
    lead: parts.slice(0, -1).join(" "),
    last: parts[parts.length - 1],
  }
}

function CardImageBackdrop({
  image,
  imageAlt,
  sizes,
}: {
  image: string
  imageAlt: string
  sizes: string
}) {
  return (
    <>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-95 group-hover:brightness-110"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96),rgba(0,0,0,0.7)_46%,rgba(0,0,0,0.18))] transition-opacity duration-500 group-hover:opacity-[0.78]" />
      <div className="absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,0.98)_38%,rgba(5,5,5,0.66)_68%,rgba(5,5,5,0)_100%)] transition-opacity duration-500 group-hover:opacity-[0.82]" />
    </>
  )
}

function GameResultGraphic({ result }: { result: HomeGameResult }) {
  const featuredName = splitFeaturedName(result.featuredName)

  return (
    <div className="max-w-[72%] px-4 pt-5 sm:max-w-[66%] sm:px-6 sm:pt-6">
      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#006bb6] sm:text-[10px]">
        {result.game}
      </p>
      <p className="mt-1 text-xl font-black uppercase leading-none text-white sm:text-2xl">
        Finals <span className="text-[#f58426]">Edition</span>
      </p>
      <div className="mt-2 flex items-center gap-2 text-[clamp(2.25rem,5vw,3.35rem)] font-black leading-none">
        <span className="text-[#f58426]">{result.knicksScore}</span>
        <span className="text-neutral-500">-</span>
        <span className="text-white">{result.opponentScore}</span>
      </div>
      <p className="mt-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#006bb6] sm:text-[10px]">
        {result.series}
      </p>
      <p className="mt-2 w-fit max-w-full truncate border border-[#006bb6] bg-[#06131f]/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#66b7f2] sm:text-[10px]">
        {result.resultLine}
      </p>
      <p className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 sm:text-[10px]">
        Tonight's feature
      </p>
      <h3 className="mt-1 max-w-full text-[clamp(1.45rem,3.5vw,2.85rem)] font-black uppercase leading-[0.92] text-white">
        <span className="block whitespace-nowrap">{featuredName.lead}</span>
        {featuredName.last ? (
          <span className="block whitespace-nowrap text-[#f58426]">{featuredName.last}</span>
        ) : null}
      </h3>
      <div className="mt-3 grid grid-cols-4 gap-2 border-t border-white/15 pt-2">
        {result.featuredStats.map((stat) => (
          <div key={`${result.game}-${stat.label}`}>
            <p className="text-[clamp(1.25rem,2.8vw,1.85rem)] font-black leading-none text-[#f58426]">
              {stat.value}
            </p>
            <p className="mt-1 text-[8px] font-black uppercase tracking-[0.16em] text-neutral-500 sm:text-[9px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OpinionGraphic({ story }: { story: HomeStory }) {
  return (
    <div className="max-w-[84%] px-4 pt-5 sm:max-w-[78%] sm:px-6 sm:pt-6">
      <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#006bb6] sm:text-[10px]">
        {story.label}
      </p>
      <p className="mt-1 w-fit border border-[#006bb6] bg-[#06131f]/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#66b7f2] sm:text-[10px]">
        {story.meta}
      </p>
      <h2 className="mt-3 line-clamp-3 text-[clamp(1.55rem,3.35vw,2.65rem)] font-black uppercase leading-[0.96] text-white group-hover:text-[#f58426]">
        {story.title}
      </h2>
      <p className="mt-3 line-clamp-2 max-w-xl text-sm font-bold leading-6 text-neutral-200">
        {story.excerpt}
      </p>
    </div>
  )
}

function GameResultsBox({ results }: { results: HomeGameResult[] }) {
  const [activeIndex, setActiveIndex] = useAutoIndex(results.length, 9500)
  const activeResult = results[activeIndex] ?? results[0]
  const tabItems = useMemo(
    () => results.map((result) => ({ label: result.date, title: result.game.replace("NBA Finals ", "") })),
    [results]
  )

  if (!activeResult) {
    return null
  }

  return (
    <section className="group relative flex h-[600px] flex-col overflow-hidden border-2 border-[#111111] bg-[#050505] text-white shadow-[6px_6px_0_#111111] sm:h-[640px]">
      <CardImageBackdrop
        image={activeResult.image}
        imageAlt={activeResult.imageAlt}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <Link href={activeResult.href} className="relative z-10 flex flex-1 flex-col justify-between">
        <GameResultGraphic result={activeResult} />
        <div className="grid gap-3 overflow-hidden p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6 sm:pt-4">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none text-white group-hover:text-[#f58426]">
              {activeResult.score}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-300">
              {activeResult.note}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 self-start bg-[#f58426] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white group-hover:bg-[#006bb6] sm:self-center">
            Read
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
      <div className="relative z-10 shrink-0 px-4 pb-4 sm:px-6">
        <PanelTabs items={tabItems} activeIndex={activeIndex} onChange={setActiveIndex} />
        <p className="mt-3 min-h-[14px] truncate text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
          Image source: {activeResult.source}
        </p>
      </div>
    </section>
  )
}

function OpinionBox({ stories }: { stories: HomeStory[] }) {
  const [activeIndex, setActiveIndex] = useAutoIndex(stories.length, 10000)
  const activeStory = stories[activeIndex] ?? stories[0]
  const tabItems = useMemo(
    () => stories.map((story) => ({ label: story.label, title: story.meta })),
    [stories]
  )

  if (!activeStory) {
    return null
  }

  return (
    <section className="group relative flex h-[600px] flex-col overflow-hidden border-2 border-[#111111] bg-[#050505] text-white shadow-[6px_6px_0_#111111] sm:h-[640px]">
      <CardImageBackdrop
        image={activeStory.image}
        imageAlt={activeStory.imageAlt}
        sizes="(min-width: 1024px) 42vw, 100vw"
      />
      <Link href={activeStory.href} className="relative z-10 flex flex-1 flex-col justify-between">
        <OpinionGraphic story={activeStory} />
        <div className="grid gap-3 overflow-hidden p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6 sm:pt-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#006bb6]">
              Column
            </p>
            <h2 className="mt-1 line-clamp-2 text-2xl font-black uppercase leading-tight text-white group-hover:text-[#f58426]">
              {activeStory.title}
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 self-start bg-[#f58426] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white group-hover:bg-[#006bb6] sm:self-center">
            Read
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
      <div className="relative z-10 shrink-0 px-4 pb-4 pt-1 text-white sm:px-6">
        <PanelTabs items={tabItems} activeIndex={activeIndex} onChange={setActiveIndex} />
      </div>
    </section>
  )
}

function PostgameRail({ posts }: { posts: HomePostgame[] }) {
  return (
    <section className="border-y-2 border-[#111111] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-7 md:px-6">
        <div className="mb-5 flex flex-col gap-3 border-b-2 border-[#111111] pb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f58426]">
              Postgame Box
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#111111]">
              Postgame Writeups
            </h2>
          </div>
          <Link
            href="/blog/postgame"
            className="inline-flex w-fit items-center gap-2 bg-[#006bb6] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#f58426]"
          >
            Open archive
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="custom-scrollbar flex snap-x gap-5 overflow-x-auto pb-3">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group w-[82vw] max-w-[420px] shrink-0 snap-start overflow-hidden border-2 border-[#111111] bg-[#f4f6fb] md:w-[360px]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#111111]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="420px"
                />
                <span className="absolute left-3 top-3 bg-[#111111] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                  {post.label}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#006bb6]">
                  {post.meta}
                </p>
                <h3 className="mt-2 text-xl font-black uppercase leading-tight tracking-tight group-hover:text-[#006bb6]">
                  {post.title}
                </h3>
                <p className="mt-3 flex gap-2 text-sm leading-6 text-neutral-600">
                  <MessageSquareQuote
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#f58426]"
                    aria-hidden="true"
                  />
                  <span>{post.quoteNote}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomepageContentRotators({
  gameResults,
  opinionPieces,
  postgames,
}: {
  gameResults: HomeGameResult[]
  opinionPieces: HomeStory[]
  postgames: HomePostgame[]
}) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-stretch gap-6 px-4 py-7 md:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <GameResultsBox results={gameResults} />
        <OpinionBox stories={opinionPieces} />
      </section>
      <PostgameRail posts={postgames} />
    </>
  )
}
