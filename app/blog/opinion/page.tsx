import type { Metadata } from "next"
import Link from "next/link"
import { Radio } from "lucide-react"
import { OpinionArchive } from "@/components/opinion-archive"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Opinion | Concrete Jungle Sports",
  description:
    "Knicks opinion columns from Concrete Jungle Sports, including playoff reactions, roster debates, and franchise essays.",
  alternates: {
    canonical: "/blog/opinion",
  },
  openGraph: {
    title: "Concrete Jungle Sports Opinion",
    description: "Knicks opinion columns, essays, and playoff reactions.",
    url: "/blog/opinion",
    type: "website",
  },
}

function getOpinionPosts() {
  return getAllPosts().filter(
    (post) => post.type === "article" && post.category === "Opinion"
  )
}

export default function OpinionArchivePage() {
  const opinionPosts = getOpinionPosts()

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
            Opinion
          </p>
          <h1 className="mt-2 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Knicks Columns And Essays
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            The argument side of the site: playoff reactions, roster questions,
            and the longer franchise pieces that need more room than a recap.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {opinionPosts.length ? (
          <OpinionArchive posts={opinionPosts} />
        ) : (
          <section className="border-2 border-[#111111] bg-white p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006bb6]">
              No columns yet
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
              Add an article with category Opinion to fill this page.
            </h2>
          </section>
        )}
      </main>
    </div>
  )
}
