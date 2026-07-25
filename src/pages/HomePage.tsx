import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()

  return (
    <main className="relative isolate min-h-[calc(100dvh-1px)] overflow-hidden hero-atmosphere">
      <div className="pointer-events-none absolute inset-0 hero-grain opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-dawn-light/40 blur-3xl animate-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-[380px] w-[380px] rounded-full bg-sage-muted/50 blur-3xl animate-drift"
        style={{ animationDelay: '-6s' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] max-w-4xl flex-col items-center justify-center px-5 py-10 text-center sm:min-h-[calc(100dvh-9rem)] sm:py-16">
        <img
          src="/Little_Light__Studios_Logo.jpg"
          alt="Little Light Studios"
          className="mb-6 h-28 w-auto max-w-[min(88vw,360px)] object-contain drop-shadow-sm animate-fade-in sm:mb-8 sm:h-36 md:h-44"
        />

        <p className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-sage-dark animate-fade-up sm:text-base">
          Little Light Studios
        </p>

        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink animate-fade-up-delayed sm:text-4xl md:text-5xl">
          Calm Stories. Kind Learning.
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted animate-fade-up-delayed sm:text-lg">
          Stories for rest and kind habits — gentle Islamic learning made easy for parents.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 animate-fade-up-late sm:mt-10 sm:flex-row sm:justify-center">
          <Link
            to="/stories"
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-sage-dark px-7 text-base font-semibold text-white shadow-sm transition hover:bg-sage active:scale-[0.99]"
          >
            Listen to stories
          </Link>
          <Link
            to="/videos"
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-dawn/60 bg-white/70 px-7 text-base font-semibold text-ink backdrop-blur-sm transition hover:bg-white active:scale-[0.99]"
          >
            Watch videos
          </Link>
        </div>

        <a
          href="https://little-muslim-hero.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-sm font-medium text-ink-soft underline-offset-4 transition hover:text-sage-dark hover:underline animate-fade-up-late"
        >
          Play Little Muslim Hero (opens in a new tab)
        </a>
      </div>
    </main>
  )
}
