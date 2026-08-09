import { useState } from 'react'
import { GameModal } from '../components/GameModal'
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

const accentStyles: Record<Game['accent'], { soft: string; solid: string; glow: string }> = {
  honey: {
    soft: 'from-honey-soft via-cream to-honey-soft/40',
    solid: 'bg-honey text-ink',
    glow: 'shadow-honey/25',
  },
  sky: {
    soft: 'from-sky-soft via-cream to-sky-soft/50',
    solid: 'bg-sky text-ink',
    glow: 'shadow-sky/25',
  },
  sage: {
    soft: 'from-sage-light/50 via-cream to-sage-light/30',
    solid: 'bg-sage text-white',
    glow: 'shadow-sage/25',
  },
  lavender: {
    soft: 'from-lavender-light/60 via-cream to-lavender-light/30',
    solid: 'bg-lavender text-ink',
    glow: 'shadow-lavender/25',
  },
}

export function GamesPage() {
  const games = gamesData as Game[]
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-dawn-mesh opacity-80"
        aria-hidden
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10 text-center sm:text-left animate-rise">
          <p className="text-sm font-sans font-semibold tracking-wide uppercase text-sage-dark mb-2">
            Play gently
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-3">
            Games
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-xl mx-auto sm:mx-0 leading-relaxed">
            Browse our little adventures. Tap a game to open it here — just like
            videos.
          </p>
        </header>

        <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => {
            const styles = accentStyles[game.accent]
            const isLive = game.status === 'live' && !!game.url

            return (
              <li
                key={game.id}
                className="animate-rise"
                style={{ animationDelay: `${80 + index * 70}ms` }}
              >
                {isLive ? (
                  <button
                    type="button"
                    onClick={() => setSelectedGame(game)}
                    className={`group relative w-full h-full text-left rounded-3xl overflow-hidden border border-white/70 bg-gradient-to-br ${styles.soft} shadow-soft hover:shadow-lift active:scale-[0.985] transition-all duration-300 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream min-h-[220px]`}
                    aria-label={`View ${game.title}`}
                  >
                    <GameCardBody game={game} styles={styles} isLive />
                  </button>
                ) : (
                  <div
                    className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/60 bg-gradient-to-br ${styles.soft} opacity-90 min-h-[220px]`}
                    aria-label={`${game.title} — coming soon`}
                  >
                    <GameCardBody game={game} styles={styles} isLive={false} />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {selectedGame?.url && (
        <GameModal
          title={selectedGame.title}
          tagline={selectedGame.tagline}
          description={selectedGame.description}
          alsoKnownAs={selectedGame.alsoKnownAs}
          url={selectedGame.url}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </main>
  )
}

function GameCardBody({
  game,
  styles,
  isLive,
}: {
  game: Game
  styles: { soft: string; solid: string; glow: string }
  isLive: boolean
}) {
  return (
    <div className="flex flex-col h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className={`w-14 h-14 rounded-2xl ${styles.solid} flex items-center justify-center shadow-md ${styles.glow} group-hover:scale-105 transition-transform duration-300`}
          aria-hidden
        >
          <GameGlyph accent={game.accent} />
        </div>
        <span
          className={`shrink-0 text-xs font-sans font-semibold px-3 py-1.5 rounded-full ${
            isLive
              ? 'bg-white/80 text-sage-dark'
              : 'bg-ink/5 text-ink-muted'
          }`}
        >
          {isLive ? 'Play now' : 'Coming soon'}
        </span>
      </div>

      <h2 className="font-display text-xl sm:text-2xl text-ink leading-snug mb-1">
        {game.title}
      </h2>
      {game.alsoKnownAs && (
        <p className="text-xs font-sans text-ink-muted mb-2">
          Also known as {game.alsoKnownAs}
        </p>
      )}
      <p className="text-sm font-sans font-medium text-sage-dark mb-2">
        {game.tagline}
      </p>
      <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">
        {game.description}
      </p>

      {isLive ? (
        <span
          className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-2xl font-sans font-semibold text-sm ${styles.solid} group-hover:brightness-105 transition-all`}
        >
          View game
          <span aria-hidden className="text-lg leading-none group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-2xl font-sans font-semibold text-sm bg-white/50 text-ink-muted">
          Stay tuned
        </span>
      )}
    </div>
  )
}

function GameGlyph({ accent }: { accent: Game['accent'] }) {
  if (accent === 'honey') {
    return (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" aria-hidden>
        <path
          d="M16 4l2.2 5.4L24 10l-4.4 3.6L21 20l-5-3.2L11 20l1.4-6.4L8 10l5.8-.6L16 4z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="16" cy="24" r="3" fill="currentColor" opacity="0.55" />
      </svg>
    )
  }
  if (accent === 'sky') {
    return (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden>
        <path d="M8 20c0-4.4 3.6-8 8-8s8 3.6 8 8v2H8v-2z" opacity="0.85" />
        <circle cx="11" cy="11" r="2" opacity="0.5" />
        <circle cx="21" cy="9" r="1.5" opacity="0.45" />
        <circle cx="16" cy="7" r="1.2" opacity="0.4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden>
      <path
        d="M16 6c-1.5 3-4 5-7 6 3 1 5.5 3 7 6 1.5-3 4-5 7-6-3-1-5.5-3-7-6z"
        opacity="0.9"
      />
      <path d="M10 22h12v2H10z" opacity="0.45" />
      <path d="M12 25h8v1.5H12z" opacity="0.3" />
    </svg>
  )
}
