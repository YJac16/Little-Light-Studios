import { Link } from 'react-router-dom'

export function Footer() {
  const youtubeChannelUrl = 'https://www.youtube.com/@LivelyLittleLearners'

  return (
    <footer className="mt-auto bg-cream-dark/80 border-t border-sage-light/25 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-display text-lg text-ink">Little Light Studios</p>
            <p className="text-sm text-ink-muted mt-1">Calm Stories. Kind Learning.</p>
          </div>
          <nav
            className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 text-sm font-sans font-medium"
            aria-label="Footer"
          >
            <Link to="/videos" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-sage-dark py-2 touch-manipulation">
              Videos
            </Link>
            <Link to="/stories" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-sage-dark py-2 touch-manipulation">
              Stories
            </Link>
            <Link to="/games" className="min-h-[44px] inline-flex items-center text-ink-muted hover:text-sage-dark py-2 touch-manipulation">
              Games
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-center sm:text-left text-ink-muted text-sm leading-relaxed">
          Watch more calm learning on{' '}
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-sage-dark hover:text-sage font-medium touch-manipulation"
          >
            Lively Little Learners
          </a>
        </p>
      </div>
    </footer>
  )
}
