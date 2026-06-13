import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, ChevronRight, Radio } from "lucide-react"
import type { BlogPost } from "@/lib/posts"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Postgame Reports | Concrete Jungle Sports",
  description: "Knicks postgame reports organized around scores, turning points, and interview notes.",
  alternates: {
    canonical: "/blog/postgame",
  },
  openGraph: {
    title: "Knicks Postgame Reports",
    description: "Game summaries from Concrete Jungle Sports after every Knicks Finals night.",
    url: "/blog/postgame",
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

function getPostgamePosts(category: string) {
  return getAllPosts().filter(
    (post) => post.type === "article" && post.category === category
  )
}

function RecapCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden border-2 border-[#111111] bg-white">
      <Link href={`/posts/${post.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#111111]">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            fill
            className="object-cover opacity-95 transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
          <span className="absolute left-3 top-3 bg-[#006bb6] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            {post.category}
          </span>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatPostDate(post.publishedAt ?? post.date)}
            </span>
            {post.game ? <span>{post.game}</span> : null}
          </div>
          <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-[#111111] group-hover:text-[#006bb6]">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 bg-[#f58426] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white group-hover:bg-[#006bb6]">
            Read recap
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  )
}

function RecapSection({
  eyebrow,
  title,
  dek,
  posts,
}: {
  eyebrow: string
  title: string
  dek: string
  posts: BlogPost[]
}) {
  return (
    <section className="mt-8">
      <div className="mb-4 border-b-2 border-[#111111] pb-3">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f58426]">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-[#111111]">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">{dek}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <RecapCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}

export default function PostgamePage() {
  const gameSummaries = getPostgamePosts("Game Summary")

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
            Postgame Reports
          </p>
          <h1 className="mt-2 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Game Summaries
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            The fast record of what happened, why it moved the series, and which
            postgame answers best explain the night.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-2 md:px-6">
        <RecapSection
          eyebrow="Straight Recaps"
          title="Game Summaries"
          dek="Score, flow, turning points, and the postgame answer that best explains the result."
          posts={gameSummaries}
        />
      </main>
    </div>
  )
}
