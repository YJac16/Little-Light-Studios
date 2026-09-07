import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="relative overflow-hidden flex-1 flex flex-col">
      <div className="absolute inset-0 bg-studio-mesh" aria-hidden />
      <div
        className="pointer-events-none absolute top-[18%] right-[-8%] w-[44vw] max-w-sm aspect-square rounded-full bg-sage/20 blur-3xl animate-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] left-[-10%] w-[40vw] max-w-xs aspect-square rounded-full bg-sky/20 blur-3xl animate-drift-slow"
        aria-hidden
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 text-center">
        <p className="text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase text-sage-dark mb-4 animate-rise">
          Page not found
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.1] max-w-md animate-rise">
          This page is resting
        </h1>
        <p
          className="mt-4 sm:mt-5 max-w-sm text-ink-muted text-base sm:text-lg leading-relaxed font-sans animate-rise"
          style={{ animationDelay: '80ms' }}
        >
          We couldn&apos;t find that path — but calm stories and kind learning are
          just a tap away.
        </p>
        <p
          className="mt-3 text-sm text-ink-muted/90 font-sans animate-rise"
          style={{ animationDelay: '120ms' }}
        >
          Calm Stories. Kind Learning.
        </p>

        <div
          className="mt-10 sm:mt-12 flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-4 w-full max-w-md animate-rise"
          style={{ animationDelay: '180ms' }}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center min-h-[54px] px-8 rounded-2xl bg-ink text-cream font-sans font-bold text-base shadow-lift hover:bg-ink/90 active:scale-[0.98] transition-all touch-manipulation"
          >
            Back to home
          </Link>
          <Link
            to="/stories"
            className="inline-flex items-center justify-center min-h-[54px] px-8 rounded-2xl bg-white/85 text-ink font-sans font-bold text-base border border-ink/10 hover:bg-white active:scale-[0.98] transition-all touch-manipulation"
          >
            Explore stories
          </Link>
        </div>
      </div>
    </main>
  )
}
