import Link from "next/link"
import {
  CalendarDays,
  ChevronLeft,
  Clock3,
  ExternalLink,
  Headphones,
  ListChecks,
  Radio,
  Trophy,
  Users,
} from "lucide-react"
import { MarkdownContent } from "@/components/markdown-content"
import type { BlogPost } from "@/lib/posts"

type MarkdownSection = {
  title: string
  body: string
}

function formatEpisodeDate(value?: string) {
  if (!value) {
    return "Date TBA"
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
}

function toAbsoluteUrl(value?: string) {
  if (!value) {
    return undefined
  }

  try {
    return new URL(value).toString()
  } catch {
    return new URL(value.startsWith("/") ? value : `/${value}`, getSiteUrl()).toString()
  }
}

function durationToIso(value?: string) {
  if (!value) {
    return undefined
  }

  const parts = value
    .split(":")
    .map((part) => Number.parseInt(part, 10))
    .filter((part) => Number.isFinite(part))

  if (parts.length === 2) {
    const [minutes, seconds] = parts
    return `PT${minutes}M${seconds ? `${seconds}S` : ""}`
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts
    return `PT${hours}H${minutes ? `${minutes}M` : ""}${seconds ? `${seconds}S` : ""}`
  }

  const minuteMatch = value.match(/(\d+)\s*(min|minute)/i)

  if (minuteMatch) {
    return `PT${minuteMatch[1]}M`
  }

  return undefined
}

function splitEpisodeSections(markdown: string) {
  const sections: MarkdownSection[] = []
  let currentTitle = "Episode Summary"
  let currentBody: string[] = []

  function flushSection() {
    const body = currentBody.join("\n").trim()

    if (body) {
      sections.push({ title: currentTitle, body })
    }
  }

  for (const line of markdown.split(/\r?\n/)) {
    const h1Match = line.match(/^#\s+(.+)$/)
    const h2Match = line.match(/^##\s+(.+)$/)

    if (h1Match) {
      continue
    }

    if (h2Match) {
      flushSection()
      currentTitle = h2Match[1].trim()
      currentBody = []
      continue
    }

    currentBody.push(line)
  }

  flushSection()

  return sections
}

function findSection(sections: MarkdownSection[], names: string[]) {
  const normalizedNames = names.map((name) => name.toLowerCase())

  return sections.find((section) => normalizedNames.includes(section.title.toLowerCase()))
}

function extractTopics(body?: string) {
  if (!body) {
    return []
  }

  return body
    .split(/\r?\n/)
    .map((line) => line.match(/^-\s+(.+)$/)?.[1]?.trim())
    .filter((line): line is string => Boolean(line))
    .map((line) => line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"))
}

function EpisodeBlock({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string
  eyebrow?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t-2 border-[#111111] pt-6">
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f58426]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-black uppercase leading-tight tracking-tight text-[#111111] md:text-3xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function MetadataTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value?: string
}) {
  if (!value) {
    return null
  }

  return (
    <div className="border-2 border-[#111111] bg-white p-3">
      <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#006bb6]">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-sm font-black leading-5 text-[#111111]">{value}</p>
    </div>
  )
}

export function PodcastEpisode({ post }: { post: BlogPost }) {
  const sections = splitEpisodeSections(post.content)
  const summarySection = findSection(sections, ["Episode Summary", "Summary"])
  const keyTopicsSection = findSection(sections, ["Key Topics", "Topics"])
  const showNotesSection = findSection(sections, ["Show Notes", "Notes"])
  const transcriptSection = findSection(sections, ["Transcript"])
  const sourcesSection = findSection(sections, ["Sources", "Source Links"])
  const keyTopics = extractTopics(keyTopicsSection?.body)
  const canonicalUrl = `${getSiteUrl()}/posts/${post.slug}`
  const coverImage = post.coverImage ?? post.heroImage
  const coverImageAlt = post.coverImageAlt ?? post.heroImageAlt
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: post.title,
    description: post.excerpt,
    datePublished: post.date ?? post.publishedAt,
    duration: durationToIso(post.duration),
    url: canonicalUrl,
    image: toAbsoluteUrl(coverImage),
    keywords: post.tags.join(", "),
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Concrete Cast",
      url: `${getSiteUrl()}/blog/podcasts`,
    },
    associatedMedia: post.audioUrl
      ? {
          "@type": "MediaObject",
          contentUrl: post.audioUrl,
          encodingFormat: "audio/mpeg",
        }
      : undefined,
  }

  return (
    <article className="bg-[#f4f6fb] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b-4 border-[#111111] bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-5 md:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#006bb6] hover:text-[#f58426]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Concrete Jungle Sports
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 bg-[#006bb6] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                <Radio className="h-4 w-4" aria-hidden="true" />
                Podcast
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-[0.94] tracking-[-0.04em] sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetadataTile
                icon={CalendarDays}
                label="Published"
                value={formatEpisodeDate(post.date ?? post.publishedAt)}
              />
              <MetadataTile icon={Clock3} label="Duration" value={post.duration} />
              <MetadataTile icon={Trophy} label="Game" value={post.game} />
              <MetadataTile icon={Users} label="Series" value={post.series} />
            </div>
          </div>

          <aside className="self-start border-2 border-[#111111] bg-white">
            {coverImage ? (
              <img
                src={coverImage}
                alt={coverImageAlt}
                className="aspect-square w-full object-cover"
              />
            ) : null}
            <div className="border-t border-neutral-200 p-3 text-xs leading-5 text-neutral-600">
              <p>{post.coverImageCaption ?? post.heroImageCaption ?? coverImageAlt}</p>
              {post.coverImageSource || post.heroImageSource ? (
                <p className="mt-1">
                  Source:{" "}
                  <a
                    href={post.coverImageSource ?? post.heroImageSource}
                    className="font-bold text-[#006bb6] hover:text-[#f58426]"
                  >
                    {post.coverImageCredit ?? post.heroImageCredit}
                  </a>
                  {post.coverImageLicense || post.heroImageLicense
                    ? `. License: ${post.coverImageLicense ?? post.heroImageLicense}.`
                    : null}
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:py-8">
        <section className="border-2 border-[#111111] bg-[#111111] p-4 text-white md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#f58426]">
                <Headphones className="h-4 w-4" aria-hidden="true" />
                Concrete Cast Postgame
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl">
                Listen to the episode
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-neutral-300">
                Audio is loaded from the external episode host, so the repo stays light.
              </p>
            </div>
            {post.audioUrl ? (
              <a
                href={post.audioUrl}
                className="inline-flex w-fit items-center gap-2 bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#111111] hover:bg-[#f58426] hover:text-white"
              >
                Open audio
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          {post.audioUrl ? (
            <audio
              className="mt-5 w-full"
              controls
              preload="metadata"
              src={post.audioUrl}
            >
              <a href={post.audioUrl}>Listen to {post.title}</a>
            </audio>
          ) : (
            <p className="mt-5 border border-white/30 p-4 text-sm font-bold text-neutral-200">
              Add an external audioUrl in frontmatter after the episode is uploaded.
            </p>
          )}
        </section>

        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <EpisodeBlock eyebrow="Postgame" title="Episode Summary">
              <MarkdownContent markdown={summarySection?.body ?? post.excerpt} />
            </EpisodeBlock>

            {showNotesSection ? (
              <EpisodeBlock eyebrow="Show" title="Show Notes">
                <MarkdownContent markdown={showNotesSection.body} />
              </EpisodeBlock>
            ) : null}

            {transcriptSection ? (
              <EpisodeBlock id="transcript" eyebrow="Full" title="Transcript">
                <MarkdownContent markdown={transcriptSection.body} />
              </EpisodeBlock>
            ) : null}

            {sourcesSection ? (
              <EpisodeBlock id="sources" eyebrow="Research" title="Sources">
                <MarkdownContent markdown={sourcesSection.body} />
              </EpisodeBlock>
            ) : null}
          </div>

          <aside className="space-y-5">
            <section className="border-2 border-[#111111] bg-white p-5">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#006bb6]">
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                Key Topics
              </p>
              <ul className="mt-4 space-y-3">
                {(keyTopics.length ? keyTopics : post.tags).map((topic) => (
                  <li
                    key={topic}
                    className="border-b border-neutral-200 pb-3 text-sm font-black leading-5 text-[#111111] last:border-b-0 last:pb-0"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-2 border-[#111111] bg-[#006bb6] p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f58426]">
                Matchup
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight">
                {post.teams.length ? post.teams.join(" vs. ") : "Knicks postgame"}
              </h2>
              {post.game ? <p className="mt-3 text-sm font-bold">{post.game}</p> : null}
              {post.series ? (
                <p className="mt-1 text-sm font-semibold text-blue-50">{post.series}</p>
              ) : null}
            </section>
          </aside>
        </div>
      </main>
    </article>
  )
}
