import { Link } from 'react-router-dom'

export function Footer() {
  const youtubeChannelUrl = 'https://www.youtube.com/@LivelyLittleLearners'

  return (
    <footer className="mt-auto border-t border-dawn/30 bg-sand/80 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-5 sm:py-10">
        <p className="text-center font-display text-lg font-semibold text-ink">Little Light Studios</p>
        <p className="mt-1 text-center text-sm text-ink-muted">Calm Stories. Kind Learning.</p>

        <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-ink-muted">
          Watch more calm learning on{' '}
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-dark underline-offset-2 hover:underline"
          >
            Lively Little Learners
          </a>
          . Kind play with{' '}
          <a
            href="https://little-muslim-hero.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-dark underline-offset-2 hover:underline"
          >
            Little Muslim Hero
          </a>
          .
        </p>

        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-ink-muted"
          aria-label="Footer"
        >
          <Link to="/about" className="min-h-[40px] inline-flex items-center hover:text-sage-dark">
            About
          </Link>
          <Link to="/privacy" className="min-h-[40px] inline-flex items-center hover:text-sage-dark">
            Privacy
          </Link>
          <Link to="/contact" className="min-h-[40px] inline-flex items-center hover:text-sage-dark">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
