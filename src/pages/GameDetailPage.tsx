import { Link, useParams } from 'react-router-dom'
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

const games = gamesData as Game[]

const accentPanel: Record<Game['accent'], string> = {
  honey: 'from-honey-soft via-cream to-sky-soft/40',
  sky: 'from-sky-soft via-cream to-lavender-light/40',
  sage: 'from-sage-light/50 via-cream to-honey-soft/40',
  lavender: 'from-lavender-light/50 via-cream to-sky-soft/40',
}

export function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const game = games.find((g) => g.id === id) ?? null
  const [playing, setPlaying] = useState(false)

  if (!game) {
    return (
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-ink-muted font-sans mb-4">Game not found.</p>
        <Link
          to="/games"
          className="inline-flex min-h-[44px] items-center font-sans font-semibold text-sage-dark touch-manipulation"
        >
          ← Back to Games
        </Link>
      </main>
    )
  }

  const isLive = game.status === 'live' && !!game.url

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-studio-mesh" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link
          to="/games"
          className="inline-flex items-center min-h-[44px] font-sans font-semibold text-sm text-sage-dark hover:text-ink touch-manipulation mb-6"
        >
          ← Back to Games
        </Link>

        <article
          className={`rounded-[1.75rem] border border-white/80 bg-gradient-to-br ${accentPanel[game.accent]} p-6 sm:p-8 md:p-10 shadow-soft animate-rise`}
        >
          <p className="text-xs font-sans font-bold tracking-[0.14em] uppercase text-honey-deep mb-3">
            {isLive ? 'Ready to play' : 'Coming soon'}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.1] mb-2">
            {game.title}
          </h1>
          {game.alsoKnownAs && (
            <p className="text-sm font-sans text-ink-muted mb-2">
              Also known as {game.alsoKnownAs}
            </p>
          )}
          <p className="font-sans font-semibold text-sage-dark text-base sm:text-lg mb-4">
            {game.tagline}
          </p>
          <p className="text-ink-muted font-sans text-base leading-relaxed max-w-2xl mb-8">
            {game.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {isLive ? (
              <>
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-2xl bg-ink text-cream font-sans font-bold text-base shadow-lift hover:bg-ink/90 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Play game
                </button>
                <a
                  href={game.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-2xl bg-white/80 border border-ink/10 text-ink font-sans font-semibold text-base hover:bg-white active:scale-[0.98] transition-all touch-manipulation"
                >
                  Open in new tab
                </a>
              </>
            ) : (
              <span className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-2xl bg-white/60 text-ink-muted font-sans font-semibold text-base">
                Coming soon
              </span>
            )}
          </div>
        </article>
      </div>

      {playing && game.url && (
        <GameModal
          title={game.title}
          tagline={game.tagline}
          description={game.description}
          alsoKnownAs={game.alsoKnownAs}
          url={game.url}
          onClose={() => setPlaying(false)}
        />
      )}
    </main>
  )
}
