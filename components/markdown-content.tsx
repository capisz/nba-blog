import Image from "next/image"

function normalizeHeading(value: string) {
  return value.replace(/^#+\s*/, "").trim().toLowerCase()
}

function renderInline(text: string) {
  const nodes: React.ReactNode[] = []
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\[\^([^\]]+)\]|(https?:\/\/[^\s)]+)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    if (match[1] && match[2]) {
      const label = match[1]
      const url = match[2]
      nodes.push(
        <a
          key={`${label}-${url}-${match.index}`}
          href={url}
          className="break-words font-bold text-[#006bb6] hover:text-[#f58426]"
        >
          {label}
        </a>
      )
    } else if (match[3]) {
      const footnoteId = match[3]
      nodes.push(
        <sup key={`${footnoteId}-${match.index}`} id={`fnref-${footnoteId}`}>
          <a
            href={`#fn-${footnoteId}`}
            className="font-black text-[#006bb6] hover:text-[#f58426]"
          >
            [{footnoteId}]
          </a>
        </sup>
      )
    } else if (match[4]) {
      const url = match[4]
      nodes.push(
        <a
          key={`${url}-${match.index}`}
          href={url}
          className="break-words font-bold text-[#006bb6] hover:text-[#f58426]"
        >
          {url}
        </a>
      )
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function renderBlock(block: string, index: number, skipTitle?: string) {
  const trimmed = block.trim()

  if (!trimmed) {
    return null
  }

  const imageMatch = trimmed.match(
    /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)(?:\n([\s\S]+))?$/
  )

  if (imageMatch) {
    const [, alt, src, titleCaption, rawCaption] = imageMatch
    const caption =
      titleCaption ||
      rawCaption
        ?.trim()
        .replace(/^\*/, "")
        .replace(/\*$/, "")
        .trim()

    return (
      <figure key={index} className="my-10 overflow-hidden border-2 border-[#111111] bg-white">
        <div className="relative aspect-video">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
        {caption ? (
          <figcaption className="border-t border-neutral-200 px-4 py-3 text-sm font-bold leading-6 text-neutral-600">
            {renderInline(caption)}
          </figcaption>
        ) : null}
      </figure>
    )
  }

  if (trimmed.startsWith("# ")) {
    if (skipTitle && normalizeHeading(trimmed) === skipTitle.toLowerCase()) {
      return null
    }

    return (
      <h2
        key={index}
        className="mt-12 text-3xl font-black uppercase leading-tight tracking-tight text-[#111111] md:text-4xl"
      >
        {renderInline(trimmed.replace(/^#\s+/, ""))}
      </h2>
    )
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h2
        key={index}
        className="mt-12 border-t-2 border-[#111111] pt-5 text-2xl font-black uppercase leading-tight tracking-tight text-[#111111] md:text-3xl"
      >
        {renderInline(trimmed.replace(/^##\s+/, ""))}
      </h2>
    )
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h3
        key={index}
        className="mt-8 text-xl font-black uppercase leading-tight tracking-tight text-[#111111] md:text-2xl"
      >
        {renderInline(trimmed.replace(/^###\s+/, ""))}
      </h3>
    )
  }

  if (trimmed.startsWith("> ")) {
    return (
      <blockquote
        key={index}
        className="my-8 border-l-4 border-[#f58426] pl-5 text-2xl font-black leading-snug text-[#111111]"
      >
        {renderInline(trimmed.replace(/^>\s+/, ""))}
      </blockquote>
    )
  }

  if (trimmed.startsWith("- ")) {
    const items: string[] = []
    let currentItem: string[] = []

    for (const line of trimmed.split("\n")) {
      const bullet = line.match(/^-\s+(.+)$/)

      if (bullet) {
        if (currentItem.length) {
          items.push(currentItem.join(" "))
        }

        currentItem = [bullet[1].trim()]
        continue
      }

      if (currentItem.length) {
        currentItem.push(line.trim())
      }
    }

    if (currentItem.length) {
      items.push(currentItem.join(" "))
    }

    return (
      <ul key={index} className="list-disc space-y-2 pl-6 text-base leading-7 text-neutral-700">
        {items.map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{renderInline(item)}</li>
        ))}
      </ul>
    )
  }

  const footnote = trimmed.match(/^\[\^([^\]]+)\]:\s+([\s\S]+)$/)

  if (footnote) {
    return (
      <p
        key={index}
        id={`fn-${footnote[1]}`}
        className="scroll-mt-24 text-sm leading-6 text-neutral-700"
      >
        <a
          href={`#fnref-${footnote[1]}`}
          className="mr-2 font-black text-[#006bb6] hover:text-[#f58426]"
        >
          [{footnote[1]}]
        </a>
        {renderInline(footnote[2])}
      </p>
    )
  }

  return (
    <p key={index} className="text-lg leading-8 text-neutral-800">
      {renderInline(trimmed)}
    </p>
  )
}

export function MarkdownContent({
  markdown,
  skipTitle,
}: {
  markdown: string
  skipTitle?: string
}) {
  return (
    <div className="space-y-6">
      {markdown.split(/\n{2,}/).map((block, index) => renderBlock(block, index, skipTitle))}
    </div>
  )
}
