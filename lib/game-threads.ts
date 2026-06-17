export type GameThread = {
  dateISO: string
  dateLabel: string
  fullDate: string
  weekday: string
  game: string
  series: string
  result: "Win" | "Loss"
  score: string
  dek: string
  articleHref: string
  podcastHref?: string
  image: string
  imageAlt: string
  imagePosition: string
}

export const gameThreads: GameThread[] = [
  {
    dateISO: "2026-06-13",
    dateLabel: "Jun 13",
    fullDate: "June 13, 2026",
    weekday: "Sat",
    game: "Game 5",
    series: "NBA Finals",
    result: "Win",
    score: "Knicks 94, Spurs 90",
    dek: "New York closed the Finals in San Antonio, rode Jalen Brunson's 45 points, and won its first NBA title since 1973.",
    articleHref: "/posts/knicks-spurs-game-5-report-championship-closeout",
    image: "/concrete-jungle/articles/knicks-game-5-championship-brunson-nba.jpg",
    imageAlt: "Jalen Brunson laughs while holding the NBA championship trophy after the Knicks' Game 5 win.",
    imagePosition: "center 42%",
  },
  {
    dateISO: "2026-06-10",
    dateLabel: "Jun 10",
    fullDate: "June 10, 2026",
    weekday: "Wed",
    game: "Game 4",
    series: "NBA Finals",
    result: "Win",
    score: "Knicks 107, Spurs 106",
    dek: "New York erased a 29-point deficit, took a 3-1 Finals lead, and moved one win from the title.",
    articleHref: "/posts/knicks-spurs-game-4-report-largest-finals-comeback",
    image: "/concrete-jungle/articles/knicks-game-4-result-nba.jpg",
    imageAlt: "OG Anunoby and Knicks players celebrate during NBA Finals Game 4 against the Spurs.",
    imagePosition: "center 35%",
  },
  {
    dateISO: "2026-06-08",
    dateLabel: "Jun 8",
    fullDate: "June 8, 2026",
    weekday: "Mon",
    game: "Game 3",
    series: "NBA Finals",
    result: "Loss",
    score: "Spurs 115, Knicks 111",
    dek: "San Antonio cut the series to 2-1 and handed New York its first real adjustment problem.",
    articleHref: "/posts/knicks-spurs-game-3-reaction-finals-loss",
    podcastHref: "/posts/knicks-spurs-game-3-postgame-first-real-adjustment-problem",
    image: "/concrete-jungle/articles/knicks-game-3-result-nba.jpg",
    imageAlt: "Victor Wembanyama, De'Aaron Fox, and Spurs teammates celebrate during NBA Finals Game 3.",
    imagePosition: "center 34%",
  },
  {
    dateISO: "2026-06-05",
    dateLabel: "Jun 5",
    fullDate: "June 5, 2026",
    weekday: "Fri",
    game: "Game 2",
    series: "NBA Finals",
    result: "Win",
    score: "Knicks 105, Spurs 104",
    dek: "New York survived the one-possession finish in San Antonio and brought a 2-0 lead back to MSG.",
    articleHref: "/posts/knicks-spurs-game-2-report-one-point-finals-escape",
    podcastHref: "/posts/knicks-spurs-game-2-postgame-one-point-finals-escape",
    image: "/concrete-jungle/articles/knicks-game-2-result-nba.jpg",
    imageAlt: "NBA Finals Game 2 app graphic for Knicks-Spurs coverage.",
    imagePosition: "center 34%",
  },
  {
    dateISO: "2026-06-03",
    dateLabel: "Jun 3",
    fullDate: "June 3, 2026",
    weekday: "Wed",
    game: "Game 1",
    series: "NBA Finals",
    result: "Win",
    score: "Knicks 105, Spurs 95",
    dek: "The Knicks erased a 14-point second-half deficit and stole the Finals opener in San Antonio.",
    articleHref: "/posts/knicks-spurs-game-1-report-finals-comeback",
    podcastHref: "/posts/knicks-spurs-game-1-postgame-finals-comeback",
    image: "/concrete-jungle/articles/knicks-game-1-result-nba.jpg",
    imageAlt: "NBA Finals Game 1 graphic for Knicks-Spurs coverage.",
    imagePosition: "center 34%",
  },
]
