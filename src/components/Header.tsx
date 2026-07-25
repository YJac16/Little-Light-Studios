import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path + '/') || location.pathname === path

  const navLinkClass = (path: string, exact = true) =>
    `min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-base font-medium transition-colors duration-200 ${
      isActive(path, exact)
        ? 'bg-sage-muted/70 text-sage-dark'
        : 'text-ink-muted hover:bg-mist-deep/50 hover:text-ink'
    }`

  return (
    <header
      className={`pt-[env(safe-area-inset-top)] ${
        isHome ? 'absolute inset-x-0 top-0 z-20 bg-transparent' : 'bg-mist-soft/90 border-b border-dawn/30 backdrop-blur-sm'
      }`}
    >
      <div className={`mx-auto max-w-4xl px-4 sm:px-5 ${isHome ? 'py-4' : 'py-4 sm:py-5'}`}>
        {!isHome && (
          <Link to="/" className="mb-4 block text-center">
            <img
              src="/Little_Light__Studios_Logo.jpg"
              alt="Little Light Studios"
              className="mx-auto h-16 w-auto max-w-[220px] object-contain sm:h-20 sm:max-w-[280px]"
            />
            <p className="mt-1 font-display text-sm text-ink-muted">Calm Stories. Kind Learning.</p>
          </Link>
        )}

        <nav
          className={`flex flex-wrap justify-center gap-1.5 sm:gap-2 ${isHome ? '' : 'mt-1'}`}
          aria-label="Main navigation"
        >
          <Link to="/" className={navLinkClass('/', true)}>
            Home
          </Link>
          <Link to="/stories" className={navLinkClass('/stories', false)}>
            Stories
          </Link>
          <Link to="/tonight" className={navLinkClass('/tonight')}>
            Tonight
          </Link>
          <Link to="/videos" className={navLinkClass('/videos')}>
            Videos
          </Link>
          <a
            href="https://little-muslim-hero.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-base font-medium text-ink-muted transition-colors duration-200 hover:bg-mist-deep/50 hover:text-ink"
          >
            Games
          </a>
        </nav>
      </div>
    </header>
  )
}
