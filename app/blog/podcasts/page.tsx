import type { Metadata } from "next"
import Link from "next/link"
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Headphones,
  Radio,
  Trophy,
} from "lucide-react"
import { getPodcastPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Concrete Cast Podcasts | Concrete Jungle Sports",
  description:
    "Postgame Knicks podcast episodes from Concrete Jungle Sports, including summaries, show notes, transcripts, and sources.",
  alternates: {
    canonical: "/blog/podcasts",
  },
  openGraph: {
    title: "Concrete Cast Podcasts",
    description:
      "Thirty-minute postgame podcast coverage for New York Knicks games from Concrete Jungle Sports.",
    url: "/blog/podcasts",
    type: "website",
  },
}

function formatPostDate(value?: string) {
  if (!value) {
    return "Date TBA"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export default function PodcastArchivePage() {
  const podcasts = getPodcastPosts()

  const collectionData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Concrete Cast Podcasts",
    description:
      "Postgame Knicks podcast episodes from Concrete Jungle Sports, including summaries, show notes, transcripts, and sources.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/blog/podcasts`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: podcasts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/posts/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return (
    <div className="bg-[#f4f6fb] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionData).replace(/</g, "\\u003c"),
        }}
      />

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
            Concrete Cast
          </p>
          <h1 className="mt-2 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Knicks Postgame Podcasts
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Thirty-minute reactions built like sports coverage: audio, written
            summaries, show notes, transcripts, and source links in one place.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {podcasts.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {podcasts.map((post) => (
              <article
                key={post.slug}
                className="grid overflow-hidden border-2 border-[#111111] bg-white md:grid-cols-[220px_1fr]"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="group relative block min-h-[220px] bg-[#111111]"
                >
                  {post.coverImage || post.heroImage ? (
                    <img
                      src={post.coverImage ?? post.heroImage}
                      alt={post.coverImageAlt ?? post.heroImageAlt}
                      className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-2 bg-[#006bb6] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                    <Headphones className="h-4 w-4" aria-hidden="true" />
                    Podcast
                  </span>
                </Link>

                <div className="flex flex-col p-5">
                  <div className="flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-neutral-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatPostDate(post.date ?? post.publishedAt)}
                    </span>
                    {post.duration ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.duration}
                      </span>
                    ) : null}
                    {post.game ? (
                      <span className="inline-flex items-center gap-1">
                        <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.game}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-[#111111]">
                    <Link href={`/posts/${post.slug}`} className="hover:text-[#006bb6]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{post.excerpt}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.teams.map((team) => (
                      <span
                        key={`${post.slug}-${team}`}
                        className="border border-[#111111] px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em]"
                      >
                        {team}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-5 inline-flex w-fit items-center gap-2 bg-[#f58426] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white hover:bg-[#006bb6]"
                  >
                    Listen and read
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="border-2 border-[#111111] bg-white p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006bb6]">
              No episodes yet
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
              Upload audio to your podcast host, then add a Markdown post.
            </h2>
          </section>
        )}
      </main>
    </div>
  )
}
