import fs from "node:fs"
import path from "node:path"

export type PostContentType = "article" | "podcast"

export type BlogPost = {
  title: string
  slug: string
  type: PostContentType
  subtitle?: string
  excerpt: string
  author?: string
  category?: string
  tags: string[]
  date?: string
  publishedAt?: string
  duration?: string
  audioUrl?: string
  coverImage?: string
  coverImageAlt?: string
  coverImageCaption?: string
  coverImageSource?: string
  coverImageCredit?: string
  coverImageLicense?: string
  teams: string[]
  game?: string
  series?: string
  heroImage: string
  heroImageSource: string
  heroImageLicense: string
  heroImageCredit: string
  heroImageAlt: string
  heroImageCaption?: string
  heroImageSuggestion?: string
  content: string
}

const postsDirectory = path.join(process.cwd(), "content/posts")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n\n?([\s\S]*)$/)

  if (!match) {
    throw new Error("Post is missing frontmatter")
  }

  const fields: Record<string, string | string[]> = {}
  let listKey: string | undefined

  for (const line of match[1].split("\n")) {
    const listMatch = line.match(/^\s+-\s+(.+)$/)

    if (listKey && listMatch && Array.isArray(fields[listKey])) {
      fields[listKey].push(cleanFrontmatterValue(listMatch[1]))
      continue
    }

    const separatorIndex = line.indexOf(":")

    if (separatorIndex === -1) {
      listKey = undefined
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (!value) {
      fields[key] = []
      listKey = key
      continue
    }

    fields[key] = cleanFrontmatterValue(value)
    listKey = undefined
  }

  return { fields, content: match[2].trim() }
}

function cleanFrontmatterValue(value: string) {
  const trimmed = value.trim()
  const quote = trimmed[0]

  if ((quote === `"` || quote === `'`) && trimmed.endsWith(quote)) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function readString(fields: Record<string, string | string[]>, key: string) {
  const value = fields[key]
  return Array.isArray(value) ? value.join(", ") : value ?? ""
}

function readTags(fields: Record<string, string | string[]>) {
  return readList(fields, "tags")
}

function readList(fields: Record<string, string | string[]>, key: string) {
  const value = fields[key]

  if (Array.isArray(value)) {
    return value
  }

  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function readPostType(fields: Record<string, string | string[]>): PostContentType {
  return readString(fields, "type") === "podcast" ? "podcast" : "article"
}

function readPostFile(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf8")
  const { fields, content } = parseFrontmatter(raw)
  const date = readString(fields, "date") || readString(fields, "publishedAt") || undefined
  const coverImage = readString(fields, "coverImage") || undefined
  const coverImageAlt = readString(fields, "coverImageAlt") || undefined
  const coverImageSource = readString(fields, "coverImageSource") || undefined
  const coverImageCredit = readString(fields, "coverImageCredit") || undefined
  const coverImageLicense = readString(fields, "coverImageLicense") || undefined

  return {
    title: readString(fields, "title"),
    slug: readString(fields, "slug"),
    type: readPostType(fields),
    subtitle: readString(fields, "subtitle") || undefined,
    excerpt: readString(fields, "excerpt"),
    author: readString(fields, "author") || undefined,
    category: readString(fields, "category") || undefined,
    tags: readTags(fields),
    date,
    publishedAt: readString(fields, "publishedAt") || date,
    duration: readString(fields, "duration") || undefined,
    audioUrl: readString(fields, "audioUrl") || undefined,
    coverImage,
    coverImageAlt,
    coverImageCaption: readString(fields, "coverImageCaption") || undefined,
    coverImageSource,
    coverImageCredit,
    coverImageLicense,
    teams: readList(fields, "teams"),
    game: readString(fields, "game") || undefined,
    series: readString(fields, "series") || undefined,
    heroImage: readString(fields, "heroImage") || coverImage || "/concrete-jungle/hero-arena.png",
    heroImageSource: readString(fields, "heroImageSource") || coverImageSource || "",
    heroImageLicense: readString(fields, "heroImageLicense") || coverImageLicense || "",
    heroImageCredit: readString(fields, "heroImageCredit") || coverImageCredit || "",
    heroImageAlt: readString(fields, "heroImageAlt") || coverImageAlt || readString(fields, "title"),
    heroImageCaption: readString(fields, "heroImageCaption") || undefined,
    heroImageSuggestion: readString(fields, "heroImageSuggestion") || undefined,
    content,
  }
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readPostFile)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getPodcastPosts() {
  return getAllPosts().filter((post) => post.type === "podcast")
}
