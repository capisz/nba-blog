import { Radio, TrendingUp } from "lucide-react"
import {
  HomepageContentRotators,
  type HomeGameResult,
  type HomePostgame,
  type HomeStory,
} from "@/components/homepage-content-rotators"

const navItems = [
  { label: "Game Threads", href: "/game-threads" },
  { label: "Opinion", href: "/blog/opinion" },
  { label: "Podcasts", href: "/blog/podcasts" },
  { label: "G League", href: "/g-league" },
]

const recentKnicksResults: HomeGameResult[] = [
  {
    date: "Jun 10",
    game: "NBA Finals Game 4",
    result: "W",
    resultLine: "W - Knicks win - Down 29",
    series: "Knicks lead 3-1",
    matchup: "Spurs at Knicks",
    score: "NYK 107, SAS 106",
    knicksScore: "107",
    opponentScore: "106",
    featuredName: "OG Anunoby",
    featuredStats: [
      { label: "Points", value: "33" },
      { label: "FG", value: "10/15" },
      { label: "3PT", value: "7/9" },
      { label: "Reb", value: "4" },
    ],
    note: "Largest comeback in NBA Finals history, rebuilt in our own Finals Edition scoreboard style.",
    href: "/posts/knicks-spurs-game-4-report-largest-finals-comeback",
    image: "/concrete-jungle/articles/knicks-game-4-result-nba.jpg",
    imageAlt:
      "OG Anunoby and Knicks players celebrate during NBA Finals Game 4 against the Spurs.",
    source: "NBA.com",
  },
  {
    date: "Jun 8",
    game: "NBA Finals Game 3",
    result: "L",
    resultLine: "L - Spurs answer - Series 2-1",
    series: "Knicks lead 2-1",
    matchup: "Spurs at Knicks",
    score: "SAS 115, NYK 111",
    knicksScore: "111",
    opponentScore: "115",
    featuredName: "Victor Wembanyama",
    featuredStats: [
      { label: "Points", value: "32" },
      { label: "Reb", value: "8" },
      { label: "Ast", value: "6" },
      { label: "Blk", value: "3" },
    ],
    note: "San Antonio's length and second-half execution handed New York its first Finals adjustment problem.",
    href: "/posts/knicks-spurs-game-3-reaction-finals-loss",
    image: "/concrete-jungle/articles/knicks-game-3-result-nba.jpg",
    imageAlt:
      "Victor Wembanyama, De'Aaron Fox, and Spurs teammates celebrate during NBA Finals Game 3.",
    source: "NBA.com",
  },
  {
    date: "Jun 5",
    game: "NBA Finals Game 2",
    result: "W",
    resultLine: "W - Knicks survive - Road steal",
    series: "Knicks lead 2-0",
    matchup: "Knicks at Spurs",
    score: "NYK 105, SAS 104",
    knicksScore: "105",
    opponentScore: "104",
    featuredName: "Karl-Anthony Towns",
    featuredStats: [
      { label: "Points", value: "21" },
      { label: "Reb", value: "13" },
      { label: "Ast", value: "4" },
      { label: "FG", value: "8/12" },
    ],
    note: "The Knicks survived the one-possession finish and brought a 2-0 Finals lead back to New York.",
    href: "/posts/knicks-spurs-game-2-report-one-point-finals-escape",
    image: "/concrete-jungle/articles/knicks-game-2-result-nba.jpg",
    imageAlt: "NBA Finals Game 2 app graphic for Knicks-Spurs coverage.",
    source: "NBA.com",
  },
]

const opinionPieces: HomeStory[] = [
  {
    label: "Opinion",
    title: "The Future of Basketball Is International in a Way No American Sport Can Match",
    excerpt:
      "Basketball has the accessibility, star power, and global pathway that football and baseball cannot match.",
    href: "/posts/future-of-basketball-is-international",
    image: "/concrete-jungle/articles/future-basketball-international-commissioners.jpeg",
    imageAlt:
      "Adam Silver, Gary Bettman, Rob Manfred, and Roger Goodell appear in a four-panel commissioner collage.",
    meta: "Global game column",
  },
  {
    label: "Opinion",
    title: "The Commissioner: How the Face of the League Controls More Than Many Realize",
    excerpt:
      "The commissioner is sold as the face of the NBA, but the job is really about protecting ownership interests and asking fans to trust a business they rarely see clearly.",
    href: "/posts/the-commissioner-how-the-face-of-the-league-controls-more-than-many-realize",
    image: "/concrete-jungle/articles/adam-silver-david-stern-commissioner.jpeg",
    imageAlt:
      "David Stern and Adam Silver sit at microphones during an NBA press conference.",
    meta: "League power column",
  },
  {
    label: "Opinion",
    title: "The Miracle on the Hardwood",
    excerpt:
      "The Knicks erased a 29-point deficit, stole Game 4 on OG Anunoby's tip-in, and moved one win from turning the fairytale into something real.",
    href: "/posts/the-never-ending-fairytale-continues",
    image: "/concrete-jungle/articles/og-anunoby-game-4-tip-in-nba.jpg",
    imageAlt:
      "OG Anunoby reaches toward the ball for the Game 4 tip-in against the Spurs.",
    meta: "Game 4 column",
  },
  {
    label: "Opinion",
    title: "Why Did It Take the Knicks 27 Years to Get Back?",
    excerpt:
      "The Knicks were not cursed. They spent decades trying to compete with incomplete teams and finally learned the difference.",
    href: "/posts/why-knicks-took-27-years-to-get-back",
    image: "/concrete-jungle/articles/knicks-playing-at-madison-square-garden.jpg",
    imageAlt: "Wide view of a New York Knicks game at Madison Square Garden.",
    meta: "Franchise column",
  },
  {
    label: "Opinion",
    title: "The Brunson Dilemma",
    excerpt:
      "Jalen Brunson solved the Knicks' biggest problem. Now the Knicks have to pay the star without hollowing out the team around him.",
    href: "/posts/the-brunson-dilemma",
    image: "/concrete-jungle/articles/jalen-brunson-cropped.jpg",
    imageAlt: "Jalen Brunson dribbling in a New York Knicks jersey during a playoff game.",
    meta: "Cap watch",
  },
]

const postgameWriteups: HomePostgame[] = [
  {
    label: "Game 4",
    title: "Knicks-Spurs Game 4 Report: The Largest Finals Comeback Ever",
    excerpt:
      "The Knicks erased a 29-point deficit, beat the Spurs 107-106, and moved within one win of the championship.",
    href: "/posts/knicks-spurs-game-4-report-largest-finals-comeback",
    image: "/concrete-jungle/articles/knicks-game-4-postgame-reaction-espn.jpg",
    imageAlt:
      "OG Anunoby, Jose Alvarado, and Jalen Brunson speak during Knicks Game 4 postgame media availability.",
    meta: "Game 4 report",
    quoteNote:
      "OG stayed calm explaining the final putback, while Alvarado's answers matched the pressure-release role he played in the comeback.",
  },
  {
    label: "Game 3",
    title: "Knicks-Spurs Game 3 Reaction: The Loss Was Close, But the Regression Was Real",
    excerpt:
      "The postgame answers showed why San Antonio's pressure felt different after halftime.",
    href: "/posts/knicks-spurs-game-3-reaction-finals-loss",
    image: "/concrete-jungle/articles/spurs-game-3-postgame-pressers.jpg",
    imageAlt:
      "Victor Wembanyama, Dylan Harper, De'Aaron Fox, and Mitch Johnson speak during Game 3 postgame media availability.",
    meta: "Spurs postgame",
    quoteNote:
      "Wembanyama pointed to better communication and coverages, while Mike Brown called New York's offense stagnant.",
  },
  {
    label: "Game 2",
    title: "Knicks-Spurs Game 2 Report: The One-Point Escape",
    excerpt:
      "The Knicks survived the final possession and left San Antonio with a 2-0 Finals lead.",
    href: "/posts/knicks-spurs-game-2-report-one-point-finals-escape",
    image: "/concrete-jungle/articles/karl-anthony-towns-game-2-postgame-espn.jpg",
    imageAlt: "Karl-Anthony Towns speaks with ESPN after the Knicks' Game 2 win.",
    meta: "ESPN postgame",
    quoteNote:
      "Towns dedicated the win to his late mother, giving the escape a personal weight beyond the box score.",
  },
  {
    label: "Game 1",
    title: "Knicks-Spurs Game 1 Report: The Comeback That Changed the Finals",
    excerpt:
      "The Knicks trailed by 14, then closed like a team ready for the Finals stage.",
    href: "/posts/knicks-spurs-game-1-report-finals-comeback",
    image: "/concrete-jungle/articles/jalen-brunson-game-1-media-day-nba.jpg",
    imageAlt: "Jalen Brunson speaks into an NBA App microphone during media availability.",
    meta: "NBA media recap",
    quoteNote:
      "Brunson kept returning to control, response, and winning the next possession after the Game 1 comeback.",
  },
]

function ResultsTicker() {
  const tickerItems = [...recentKnicksResults, ...recentKnicksResults]

  return (
    <section
      aria-label="Recent Knicks game results"
      className="border-y border-white/10 bg-[#006bb6] text-white"
    >
      <div className="flex items-center overflow-hidden">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="knicks-results-marquee flex w-max items-center gap-8 py-2">
            {tickerItems.map((item, index) => (
              <a
                key={`${item.game}-${index}`}
                href={item.href}
                aria-hidden={index >= recentKnicksResults.length}
                tabIndex={index >= recentKnicksResults.length ? -1 : undefined}
                className="flex shrink-0 items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:text-[#f58426]"
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center border border-white text-[11px] ${
                    item.result === "W" ? "bg-[#111111]" : "bg-white text-[#111111]"
                  }`}
                >
                  {item.result}
                </span>
                <span className="text-blue-100">{item.date}</span>
                <span>{item.game}</span>
                <span>{item.score}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[#111111]">
      <header className="border-b-4 border-[#111111] bg-white">
        <div className="bg-[#111111] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] md:px-6">
            <a href="#" className="flex items-center gap-2 text-[#f58426]">
              <Radio className="h-4 w-4" aria-hidden="true" />
              Concrete Live
            </a>
            <p className="hidden text-neutral-300 md:block">
              A New York Knicks community blog
            </p>
            <a href="#" className="hover:text-[#f58426]">
              Sign in
            </a>
          </div>
        </div>

        <ResultsTicker />

        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <a href="#" className="group inline-flex max-w-3xl flex-col">
              <span className="text-xs font-black uppercase tracking-[0.34em] text-[#006bb6]">
                New York Knicks
              </span>
              <span className="mt-1 text-5xl font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#111111] sm:text-6xl md:text-7xl">
                Concrete
                <span className="block text-[#f58426]">Jungle Sports</span>
              </span>
            </a>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:pb-1">
              <a
                href="#"
                className="inline-flex items-center justify-center border-2 border-[#111111] bg-[#006bb6] px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[4px_4px_0_#111111] transition hover:-translate-y-0.5 hover:bg-[#f58426]"
              >
                Join the community
              </a>
            </div>
          </div>
        </div>

        <nav className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 md:px-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="shrink-0 px-3 py-3 text-sm font-black uppercase tracking-[0.08em] text-neutral-700 hover:bg-[#006bb6] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="knicks-news" className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm font-bold md:flex-row md:items-center md:px-6">
            <span className="inline-flex w-fit items-center gap-2 bg-[#f58426] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Garden Wire
            </span>
            <a href="#" className="text-neutral-800 hover:text-[#006bb6]">
              Morning thread: Game 4 disbelief, OG's tip-in, and one win from forever
            </a>
            <span className="text-xs uppercase tracking-[0.12em] text-neutral-500 md:ml-auto">
              Updated June 11, 2026
            </span>
          </div>
        </section>

        <HomepageContentRotators
          gameResults={recentKnicksResults}
          opinionPieces={opinionPieces}
          postgames={postgameWriteups}
        />

        <section className="mx-auto max-w-7xl px-4 py-7 md:px-6">
          <div className="grid gap-5 border-2 border-[#111111] bg-white p-5 shadow-[6px_6px_0_#111111] lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006bb6]">
                Newsletter
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
                Wake up with the box score
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                A daily Knicks digest built around the result graphics, postgame
                answers, and fan debates worth carrying into your commute.
              </p>
            </div>
            <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="w-full border-2 border-[#111111] px-3 py-3 text-sm font-bold outline-none focus:border-[#006bb6]"
              />
              <button
                type="submit"
                className="bg-[#f58426] px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white hover:bg-[#006bb6]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
