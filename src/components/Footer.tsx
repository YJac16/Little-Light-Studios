import { Link } from 'react-router-dom'

export function Footer() {
  const youtubeChannelUrl = 'https://www.youtube.com/@LivelyLittleLearners'

  return (
    <footer className="mt-auto bg-cream-dark/90 border-t border-ink/5 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-display text-xl text-ink">Little Light Studios</p>
            <p className="text-sm text-ink-muted mt-1 font-sans">Calm Stories. Kind Learning.</p>
          </div>
          <nav
            className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 text-sm font-sans font-semibold"
            aria-label="Footer"
          >
            <Link to="/videos" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-ink py-2 touch-manipulation">
              Videos
            </Link>
            <Link to="/stories" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-ink py-2 touch-manipulation">
              Stories
            </Link>
            <Link to="/games" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-ink py-2 touch-manipulation">
              Games
            </Link>
            <Link to="/about" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-ink py-2 touch-manipulation">
              About
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-center sm:text-left text-ink-muted text-sm leading-relaxed font-sans">
          Watch more calm learning on{' '}
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-sage-dark hover:text-ink font-semibold touch-manipulation"
          >
            Lively Little Learners
          </a>
        </p>
      </div>
    </footer>
  )
}
