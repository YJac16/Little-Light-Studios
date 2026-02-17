import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path + '/') || location.pathname === path
  const navLinkClass = (path: string, exact = true) =>
    `min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-5 py-3 rounded-xl text-lg font-medium transition-colors duration-200 ${
      isActive(path, exact)
        ? 'bg-sage-light/40 text-sage-dark'
        : 'text-ink-muted hover:bg-cream-dark hover:text-ink'
    }`

  return (
    <header className="bg-cream border-b border-sage-light/30 pt-[env(safe-area-inset-top)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-5 sm:py-6">
        <Link to="/" className="block text-center">
          <img
            src="/Little_Light__Studios_Logo.jpg"
            alt="Little Light Studios"
            className="mx-auto h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[400px] object-contain"
          />
          <p className="text-sm md:text-base text-ink-muted mt-1">
            Calm Stories. Kind Learning.
          </p>
        </Link>
        <nav className="flex justify-center gap-2 mt-6" aria-label="Main navigation">
          <Link to="/videos" className={navLinkClass('/videos')}>
            Videos
          </Link>
          <Link to="/stories" className={navLinkClass('/stories', false)}>
            Stories
          </Link>
        </nav>
      </div>
    </header>
  )
}
