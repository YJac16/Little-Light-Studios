import { Link } from 'react-router-dom'
import gamesData from '../data/games.json'

interface Game {
  id: string
  title: string
  alsoKnownAs?: string
  tagline: string
  description: string
  url: string | null
  accent: 'honey' | 'sky' | 'sage' | 'lavender'
  status: 'live' | 'coming-soon'
}

const accentDot: Record<Game['accent'], string> = {
  honey: 'bg-honey',
  sky: 'bg-sky',
  sage: 'bg-sage',
  lavender: 'bg-lavender',
}

const games = gamesData as Game[]

export function GamesPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-studio-mesh" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10 animate-rise">
          <p className="text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase text-honey-deep mb-2">
            Games library
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.1] mb-3">
            Choose a game
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-xl leading-relaxed">
            Browse the list first. Pick a game to see details — nothing launches
            until you press Play.
          </p>
        </header>

        <ul className="space-y-3">
          {games.map((game, i) => {
            const isLive = game.status === 'live' && !!game.url
            const content = (
              <>
                <span
                  className={`mt-1.5 h-3 w-3 rounded-full shrink-0 ${accentDot[game.accent]}`}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="font-display text-lg sm:text-xl font-semibold block leading-snug text-ink">
                    {game.title}
                  </span>
                  {game.alsoKnownAs && (
                    <span className="mt-0.5 block text-xs font-sans text-ink-muted">
                      Also known as {game.alsoKnownAs}
                    </span>
                  )}
                  <span className="mt-1 block text-sm text-ink-muted font-sans leading-relaxed">
                    {game.tagline}
                    {!isLive ? ' · Coming soon' : ''}
                  </span>
                </span>
                <span
                  className={`shrink-0 self-center text-xs font-sans font-bold px-3 py-1.5 rounded-xl ${
                    isLive
                      ? 'bg-honey-soft text-honey-deep'
                      : 'bg-cream-dark text-ink-muted'
                  }`}
                >
                  {isLive ? 'View' : 'Soon'}
                </span>
              </>
            )

            return (
              <li
                key={game.id}
                className="animate-rise"
                style={{ animationDelay: `${50 + i * 45}ms` }}
              >
                {isLive ? (
                  <Link
                    to={`/games/${game.id}`}
                    className="flex items-start gap-3 sm:gap-4 min-h-[72px] p-4 sm:p-5 rounded-2xl bg-white/90 border border-ink/5 hover:border-honey/50 hover:shadow-lift active:scale-[0.99] transition-all text-ink touch-manipulation"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex items-start gap-3 sm:gap-4 min-h-[72px] p-4 sm:p-5 rounded-2xl bg-white/60 border border-ink/5 opacity-90">
                    {content}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
