"use client"

import Image from "next/image"
import { Clock3, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export type LeadStory = {
  label: string
  section: string
  title: string
  excerpt: string
  href: string
  image: string
  imageAlt: string
  author: string
  meta: string
}

export function LeadStoryRotator({ stories }: { stories: LeadStory[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStory = stories[activeIndex] ?? stories[0]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % stories.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [stories.length])

  if (!activeStory) {
    return null
  }

  return (
    <article className="group relative min-h-[480px] overflow-hidden bg-[#111111] text-white">
      <a href={activeStory.href} className="block min-h-[480px]">
        <Image
          src={activeStory.image}
          alt={activeStory.imageAlt}
          fill
          priority
          className="object-cover opacity-80 transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.42)_54%,rgba(0,0,0,0.08))]" />
        <div className="relative flex min-h-[480px] flex-col justify-end p-5 sm:p-7 md:p-9">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="bg-[#006bb6] px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
              Lead Story
            </span>
            <span className="bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#111111]">
              {activeStory.label}
            </span>
          </div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#f58426]">
            {activeStory.section}
          </p>
          <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.035em] sm:text-5xl md:text-6xl">
            {activeStory.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-neutral-100 md:text-lg">
            {activeStory.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-200">
            <span>By {activeStory.author}</span>
            <span className="flex items-center gap-1">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              {activeStory.meta}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Discuss
            </span>
          </div>
        </div>
      </a>

      <div
        className="absolute bottom-4 right-4 z-10 flex gap-2"
        aria-label="Lead story controls"
      >
        {stories.map((story, index) => (
          <button
            key={story.href}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-8 border border-white ${
              index === activeIndex ? "bg-[#f58426]" : "bg-white/40"
            }`}
            aria-label={`Show ${story.title}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </article>
  )
}
