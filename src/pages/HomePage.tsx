import { Link } from 'react-router-dom'

const destinations = [
  {
    to: '/videos',
    title: 'Videos',
    blurb: 'Calm learning moments for little eyes.',
    accent: 'sky' as const,
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" aria-hidden>
        <rect x="6" y="10" width="28" height="20" rx="4" fill="currentColor" opacity="0.2" />
        <path d="M17 15.5v9l8-4.5-8-4.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/stories',
    title: 'Stories',
    blurb: 'Soft narrations for nap and bedtime.',
    accent: 'sage' as const,
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" aria-hidden>
        <path
          d="M10 8h12a6 6 0 016 6v16H16a6 6 0 00-6 6V8z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M10 8v28a6 6 0 016-6h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: '/games',
    title: 'Games',
    blurb: 'Browse gentle play — open when ready.',
    accent: 'honey' as const,
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="12" fill="currentColor" opacity="0.18" />
        <path
          d="M20 12l1.8 4.5 4.9.4-3.7 3.2 1.2 4.8L20 22.5 15.8 25l1.2-4.8-3.7-3.2 4.9-.4L20 12z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

const accentText: Record<(typeof destinations)[number]['accent'], string> = {
  sky: 'text-sky-deep',
  sage: 'text-sage-dark',
  honey: 'text-honey-deep',
}

const accentBg: Record<(typeof destinations)[number]['accent'], string> = {
  sky: 'bg-sky-soft/80 group-hover:bg-sky-soft',
  sage: 'bg-sage-light/40 group-hover:bg-sage-light/55',
  honey: 'bg-honey-soft/90 group-hover:bg-honey-soft',
}

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Full-bleed atmosphere */}
      <section className="relative min-h-[min(88dvh,820px)] flex flex-col justify-center">
        <div className="absolute inset-0 bg-dawn-mesh" aria-hidden />
        <div
          className="pointer-events-none absolute -top-16 right-[-10%] w-[55vw] max-w-xl aspect-square rounded-full bg-sky-soft/60 blur-3xl animate-drift"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[50vw] max-w-lg aspect-square rounded-full bg-honey-soft/70 blur-3xl animate-drift-slow"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-sage-light/30 blur-2xl animate-glow"
          aria-hidden
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 sm:pb-20 text-center">
          <div className="animate-rise">
            <img
              src="/Little_Light__Studios_Logo.jpg"
              alt="Little Light Studios — Calm Stories. Kind Learning."
              className="mx-auto h-28 sm:h-36 md:h-44 w-auto max-w-[min(92vw,420px)] object-contain drop-shadow-sm"
            />
          </div>
          <h1 className="sr-only">Little Light Studios</h1>
          <p
            className="mt-5 sm:mt-6 max-w-md mx-auto text-ink text-lg sm:text-xl font-display leading-snug animate-rise"
            style={{ animationDelay: '100ms' }}
          >
            Gentle learning for little hearts.
          </p>
          <p
            className="mt-3 max-w-lg mx-auto text-ink-muted text-sm sm:text-base leading-relaxed animate-rise"
            style={{ animationDelay: '160ms' }}
          >
            Nap-time stories, calm videos, and soft play — designed so parents
            can find the right moment fast.
          </p>

          <div
            className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 animate-rise"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              to="/stories"
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-2xl bg-sage text-white font-sans font-semibold text-base shadow-soft hover:bg-sage-dark hover:shadow-lift active:scale-[0.98] transition-all touch-manipulation"
            >
              Explore stories
            </Link>
            <Link
              to="/games"
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-2xl bg-white/80 text-ink font-sans font-semibold text-base border border-sage-light/40 hover:bg-white hover:border-sage-light/70 active:scale-[0.98] transition-all touch-manipulation backdrop-blur-sm"
            >
              Browse games
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ink-muted/50 animate-bounce-soft hidden sm:block"
          aria-hidden
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 10l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Destinations — one job: choose a path */}
      <section
        className="relative bg-cream/80 border-t border-sage-light/20"
        aria-labelledby="paths-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            id="paths-heading"
            className="font-display text-2xl sm:text-3xl text-ink text-center mb-3"
          >
            Choose a calm path
          </h2>
          <p className="text-center text-ink-muted text-sm sm:text-base mb-8 sm:mb-10 max-w-md mx-auto">
            Videos, stories, or games — pick what fits this moment.
          </p>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
            {destinations.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group block rounded-3xl p-5 sm:p-6 min-h-[140px] border border-white/80 shadow-soft hover:shadow-lift active:scale-[0.985] transition-all duration-300 touch-manipulation animate-rise ${accentBg[item.accent]}`}
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                <div className={`${accentText[item.accent]} mb-3`}>{item.icon}</div>
                <h3 className="font-display text-xl text-ink mb-1.5">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
