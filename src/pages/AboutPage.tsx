import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-studio-mesh" aria-hidden />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase text-honey-deep mb-2">
          Our studio
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-6">
          About Little Light Studios
        </h1>
        <div className="space-y-4 text-base leading-relaxed text-ink-muted font-sans">
          <p>
            Little Light Studios is a calm parent hub for young children — soft stories,
            gentle videos, and kind games. No accounts. No clutter. One quiet place to
            find the right moment.
          </p>
          <p>
            Stories stay here for nap and bedtime. Videos open from the library.
            Games are a list first: pick one, then Play opens the game itself.
          </p>
          <p>
            Live play includes{' '}
            <a
              href="https://little-muslim-hero.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sage-dark hover:text-ink"
            >
              Little Muslim Hero
            </a>{' '}
            and{' '}
            <a
              href="https://manar-learning.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sage-dark hover:text-ink"
            >
              MANĀR
            </a>
            , a beacon for English, Arabic, reading, and maths. More games will land
            when they are ready — we will not pretend they are here yet.
          </p>
          <p>
            Video learning continues on{' '}
            <a
              href="https://www.youtube.com/@LivelyLittleLearners"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sage-dark hover:text-ink"
            >
              Lively Little Learners
            </a>
            .
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/stories"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-ink text-cream font-sans font-bold touch-manipulation"
          >
            Explore stories
          </Link>
          <Link
            to="/games"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-white/85 text-ink font-sans font-bold border border-ink/10 touch-manipulation"
          >
            Browse games
          </Link>
        </div>
      </div>
    </main>
  )
}
