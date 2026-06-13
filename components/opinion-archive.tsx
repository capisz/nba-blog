"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ChevronRight, Search } from "lucide-react"
import type { BlogPost } from "@/lib/posts"

function formatDateParts(value?: string) {
  if (!value) {
    return {
      dateISO: "",
      dateLabel: "Date TBA",
      fullDate: "Date TBA",
      weekday: "TBA",
    }
  }

  const date = new Date(`${value}T12:00:00`)

  return {
    dateISO: value,
    dateLabel: new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(date),
    fullDate: new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date),
    weekday: new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(date),
  }
}

function matchesOpinionPost(post: BlogPost, query: string) {
  const searchableText = [
    post.title,
    post.subtitle,
    post.excerpt,
    post.author,
    post.category,
    post.publishedAt,
    post.date,
    post.tags.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return searchableText.includes(query)
}

export function OpinionArchive({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const filteredPosts = useMemo(
    () =>
      normalizedQuery
        ? posts.filter((post) => matchesOpinionPost(post, normalizedQuery))
        : posts,
    [normalizedQuery, posts]
  )

  return (
    <section aria-label="Opinion archive" className="mx-auto max-w-5xl">
      <div className="sticky top-0 z-20 border-b-2 border-[#111111] bg-[#f4f6fb] py-4">
        <label
          htmlFor="opinion-archive-search"
          className="text-xs font-black uppercase tracking-[0.2em] text-[#006bb6]"
        >
          Search opinion archive
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
              aria-hidden="true"
            />
            <input
              id="opinion-archive-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, date, author, topic..."
              className="w-full border-2 border-[#111111] bg-white py-3 pl-12 pr-4 text-base font-bold text-[#111111] outline-none transition placeholder:text-neutral-400 focus:border-[#006bb6]"
            />
          </div>
          <p className="shrink-0 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
            {filteredPosts.length} of {posts.length} columns
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {filteredPosts.map((post) => {
          const date = formatDateParts(post.publishedAt ?? post.date)

          return (
            <article
              key={post.slug}
              className="overflow-hidden border-2 border-[#111111] bg-white shadow-[5px_5px_0_#111111]"
            >
              <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
                <Link
                  href={`/posts/${post.slug}`}
                  className="group/date relative flex min-h-44 flex-col justify-end overflow-hidden border-b-2 border-[#111111] bg-[#006bb6] px-5 py-5 text-white transition md:min-h-full md:border-b-0 md:border-r-2"
                  aria-label={`Open ${post.title}`}
                >
                  <span className="absolute inset-0">
                    <Image
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      fill
                      className="object-cover object-center opacity-70 transition duration-500 group-hover/date:scale-[1.04] group-hover/date:opacity-90"
                      sizes="(min-width: 768px) 260px, 100vw"
                    />
                  </span>
                  <span className="absolute inset-0 bg-[#006bb6]/65 transition duration-500 group-hover/date:bg-[#f58426]/55" />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.78),rgba(0,0,0,0.38)_58%,rgba(0,0,0,0.12))]" />
                  <span className="relative inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {date.weekday}
                  </span>
                  <time
                    dateTime={date.dateISO}
                    className="relative mt-2 text-4xl font-black uppercase leading-none tracking-tight"
                  >
                    {date.dateLabel}
                  </time>
                  <span className="relative mt-2 text-sm font-black uppercase tracking-[0.16em] text-blue-50">
                    {date.fullDate}
                  </span>
                </Link>

                <div className="min-w-0 p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-neutral-500">
                    <span>{post.category ?? "Opinion"}</span>
                    {post.author ? <span>{post.author}</span> : null}
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={`${post.slug}-${tag}`}>{tag}</span>
                    ))}
                  </div>

                  <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl">
                    <Link href={`/posts/${post.slug}`} className="hover:text-[#006bb6]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 bg-[#f58426] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#006bb6]"
                    >
                      Read column
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mt-5 border-2 border-dashed border-neutral-300 bg-white p-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">
            No opinion pieces match that search.
          </p>
        </div>
      ) : null}
    </section>
  )
}
