import { Link } from 'react-router-dom'

const destinations = [
  {
    to: '/videos',
    title: 'Videos',
    blurb: 'Calm clips for curious little eyes.',
    accent: 'sky' as const,
    chip: 'Watch',
  },
  {
    to: '/stories',
    title: 'Stories',
    blurb: 'Browse illustrated covers — tap one to listen.',
    accent: 'sage' as const,
    chip: 'Listen',
  },
  {
    to: '/games',
    title: 'Games',
    blurb: 'A library of gentle play — pick one to open.',
    accent: 'honey' as const,
    chip: 'Browse',
  },
]

const accentStyles: Record<
  (typeof destinations)[number]['accent'],
  { panel: string; chip: string }
> = {
  sky: {
    panel: 'bg-sky-soft/80 hover:bg-sky-soft',
    chip: 'bg-sky text-ink',
  },
  sage: {
    panel: 'bg-sage-light/45 hover:bg-sage-light/65',
    chip: 'bg-sage text-white',
  },
  honey: {
    panel: 'bg-honey-soft/90 hover:bg-honey-soft',
    chip: 'bg-honey text-ink',
  },
}

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[min(86dvh,760px)] flex flex-col justify-center">
        <div className="absolute inset-0 bg-studio-mesh" aria-hidden />
        <div
          className="pointer-events-none absolute -top-20 right-[-12%] w-[58vw] max-w-xl aspect-square rounded-full bg-sky/25 blur-3xl animate-drift"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[-12%] left-[-10%] w-[52vw] max-w-lg aspect-square rounded-full bg-honey/30 blur-3xl animate-drift-slow"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-[38%] left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-sage/20 blur-2xl animate-glow"
          aria-hidden
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-14 sm:pb-18 text-center">
          <div className="animate-rise">
            <img
              src="/Little_Light__Studios_Logo.jpg"
              alt="Little Light Studios — Calm Stories. Kind Learning."
              className="mx-auto h-32 sm:h-40 md:h-48 w-auto max-w-[min(94vw,460px)] object-contain drop-shadow-sm"
            />
          </div>
          <h1 className="sr-only">Little Light Studios</h1>
          <p
            className="mt-5 sm:mt-6 max-w-xl mx-auto text-ink text-2xl sm:text-3xl md:text-4xl font-display font-semibold leading-tight animate-rise"
            style={{ animationDelay: '90ms' }}
          >
            Calm learning that feels current.
          </p>
          <p
            className="mt-3 max-w-lg mx-auto text-ink-muted text-sm sm:text-base leading-relaxed animate-rise"
            style={{ animationDelay: '150ms' }}
          >
            Stories, videos, and games for little hearts — built so parents can
            find the right moment in seconds.
          </p>

          <div
            className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 animate-rise"
            style={{ animationDelay: '220ms' }}
          >
            <Link
              to="/stories"
              className="inline-flex items-center justify-center min-h-[54px] px-8 rounded-2xl bg-ink text-cream font-sans font-bold text-base shadow-lift hover:bg-ink/90 active:scale-[0.98] transition-all touch-manipulation"
            >
              Explore stories
            </Link>
            <Link
              to="/games"
              className="inline-flex items-center justify-center min-h-[54px] px-8 rounded-2xl bg-white/85 text-ink font-sans font-bold text-base border border-ink/10 hover:bg-white active:scale-[0.98] transition-all touch-manipulation"
            >
              Browse games
            </Link>
          </div>
        </div>
      </section>

      <section
        className="relative border-t border-ink/5 bg-cream/70"
        aria-labelledby="paths-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            id="paths-heading"
            className="font-display text-2xl sm:text-3xl text-ink text-center mb-2"
          >
            Pick a path
          </h2>
          <p className="text-center text-ink-muted text-sm sm:text-base mb-8 sm:mb-10 max-w-md mx-auto">
            Three calm libraries. One tap to start.
          </p>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
            {destinations.map((item, i) => {
              const styles = accentStyles[item.accent]
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative block rounded-[1.6rem] p-5 sm:p-6 min-h-[150px] border border-white/70 shadow-soft hover:shadow-lift active:scale-[0.985] transition-all duration-300 touch-manipulation animate-rise ${styles.panel}`}
                  style={{ animationDelay: `${80 + i * 70}ms` }}
                >
                  <span
                    className={`inline-flex mb-4 text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-xl ${styles.chip}`}
                  >
                    {item.chip}
                  </span>
                  <h3 className="font-display text-2xl text-ink mb-1.5">{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed font-sans">
                    {item.blurb}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
