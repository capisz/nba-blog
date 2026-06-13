import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  ClipboardList,
  Newspaper,
  Radio,
  ShieldAlert,
  UsersRound,
} from "lucide-react"

export const metadata: Metadata = {
  title: "G League | Concrete Jungle Sports",
  description:
    "A Westchester Knicks news hub for injuries, assignments, coaching changes, roster movement, and G League draft notes.",
  alternates: {
    canonical: "/g-league",
  },
  openGraph: {
    title: "Westchester Knicks G League Hub",
    description:
      "Track Knicks G League news, roster movement, staff changes, injuries, and draft updates.",
    url: "/g-league",
    type: "website",
  },
}

const quickLinks = [
  {
    title: "Injuries + Assignments",
    dek: "Start with the official G League transaction log for assignments, call-ups, waivers, and roster movement tied to Westchester.",
    href: "https://gleague.nba.com/transactions",
    source: "NBA G League transactions",
    icon: ShieldAlert,
  },
  {
    title: "Coach + Staff Tracker",
    dek: "Keep coaching notes in one place, beginning with Westchester's official DeSagana Diop head-coach announcement.",
    href: "https://westchester.gleague.nba.com/news/desagana-diop-named-westchester-knicks-head-coach",
    source: "Westchester Knicks",
    icon: UsersRound,
  },
  {
    title: "Draft + Rights Board",
    dek: "Track the newest Westchester additions from the G League Draft and the rights moves that shape the development roster.",
    href: "https://westchester.gleague.nba.com/news/westchester-knicks-welcome-four-new-additions-following-2025-nba-g-league-draft",
    source: "Westchester Knicks",
    icon: ClipboardList,
  },
  {
    title: "Official Westchester News",
    dek: "Use the team site for schedule, roster, ticket, and release updates from the Knicks' G League affiliate.",
    href: "https://westchester.gleague.nba.com/",
    source: "Westchester Knicks official site",
    icon: Newspaper,
  },
]

const boardItems = [
  {
    label: "Affiliate",
    text: "Westchester is the exclusive NBA G League affiliate of the New York Knickerbockers.",
    href: "https://westchester.gleague.nba.com/about-us",
  },
  {
    label: "Roster File",
    text: "The 2025-26 opening-night release listed Kevin McCullar Jr., Trey Jemison, and Tosan Evbuomwan among the Knicks' two-way players assigned to Westchester.",
    href: "https://westchester.gleague.nba.com/news/westchester-knicks-announce-2025-26-opening-day-roster",
  },
  {
    label: "Draft Board",
    text: "Westchester's 2025 draft additions included Adama-Alpha Bal, Jaden Seymour, and Fousseyni Drame.",
    href: "https://westchester.gleague.nba.com/news/westchester-knicks-welcome-four-new-additions-following-2025-nba-g-league-draft",
  },
]

export default function GLeaguePage() {
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
            G League
          </p>
          <h1 className="mt-2 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Westchester Knicks Wire
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            A Knicks development hub for injuries, assignments, coach changes,
            roster movement, and draft notes from Westchester.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <section className="grid gap-5 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[260px] flex-col justify-between border-2 border-[#111111] bg-white p-5 shadow-[5px_5px_0_#111111] transition hover:-translate-y-1 hover:bg-[#111111] hover:text-white"
              >
                <div>
                  <Icon className="h-8 w-8 text-[#f58426]" aria-hidden="true" />
                  <p className="mt-5 text-[11px] font-black uppercase tracking-[0.16em] text-[#006bb6] group-hover:text-[#66b7f2]">
                    {item.source}
                  </p>
                  <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-600 group-hover:text-neutral-200">
                    {item.dek}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#f58426]">
                  Open source
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            )
          })}
        </section>

        <section className="mt-8 border-2 border-[#111111] bg-white p-6">
          <div className="border-b-2 border-[#111111] pb-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f58426]">
              News Board
            </p>
            <h2 className="mt-1 text-3xl font-black uppercase tracking-tight">
              Knicks G League Notes To Track
            </h2>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {boardItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="border border-[#111111] p-4 transition hover:border-[#006bb6] hover:bg-[#f4f6fb]"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#006bb6]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-neutral-700">
                  {item.text}
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
