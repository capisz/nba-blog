import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, ChevronLeft } from "lucide-react"
import { MarkdownContent } from "@/components/markdown-content"
import { PodcastEpisode } from "@/components/podcast-episode"
import { getAllPosts, getPostBySlug } from "@/lib/posts"

type PostPageProps = {
  params: Promise<{ slug: string }>
}

function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const image = post.coverImage ?? post.heroImage
  const imageAlt = post.coverImageAlt ?? post.heroImageAlt
  const canonical = `/posts/${post.slug}`

  return {
    title: `${post.title} | Concrete Jungle Sports`,
    description: post.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
      type: "article",
      publishedTime: post.date ?? post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  if (post.type === "podcast") {
    return <PodcastEpisode post={post} />
  }

  return (
    <article className="bg-[#f4f6fb] text-[#111111]">
      <header className="border-b-4 border-[#111111] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#006bb6] hover:text-[#f58426]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Concrete Jungle Sports
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-[0.94] tracking-[-0.04em] sm:text-5xl md:text-7xl">
            {post.title}
          </h1>
          {post.subtitle ? (
            <p className="mt-5 max-w-3xl text-xl font-black leading-8 text-[#f58426] md:text-2xl">
              {post.subtitle}
            </p>
          ) : null}
          <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
            {post.author ? <span>By {post.author}</span> : null}
            {post.category ? <span>{post.category}</span> : null}
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Published {formatPostDate(post.publishedAt)}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        <figure className="border-2 border-[#111111] bg-white">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>
          <figcaption className="border-t border-neutral-200 px-4 py-3 text-xs leading-5 text-neutral-600">
            <p>{post.heroImageCaption ?? post.heroImageAlt}</p>
            <p className="mt-1">
              Source:{" "}
              <a
                href={post.heroImageSource}
                className="font-bold text-[#006bb6] hover:text-[#f58426]"
              >
                {post.heroImageCredit}
              </a>
              . License: {post.heroImageLicense}.
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-14 pt-4 md:px-6">
        <MarkdownContent markdown={post.content} skipTitle={post.title} />

        <footer className="mt-12 border-t-2 border-[#111111] pt-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006bb6]">
            Filed under
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={`footer-${tag}`}
                className="border-2 border-[#111111] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </article>
  )
}
