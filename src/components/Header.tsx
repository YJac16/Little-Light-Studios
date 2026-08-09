import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/videos', label: 'Videos', exact: true },
  { to: '/stories', label: 'Stories', exact: false },
  { to: '/games', label: 'Games', exact: false },
] as const

function isActivePath(pathname: string, path: string, exact: boolean) {
  return exact
    ? pathname === path
    : pathname.startsWith(path + '/') || pathname === path
}

export function Header() {
  const location = useLocation()

  const navClass = (path: string, exact: boolean) =>
    `min-h-[44px] inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-2xl text-sm sm:text-base font-sans font-semibold transition-all duration-200 touch-manipulation ${
      isActivePath(location.pathname, path, exact)
        ? 'bg-ink text-cream shadow-soft'
        : 'text-ink-muted hover:bg-white/80 hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 pt-[env(safe-area-inset-top)] bg-cream/85 backdrop-blur-xl border-b border-ink/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 min-w-0 touch-manipulation group"
            aria-label="Little Light Studios home"
          >
            <img
              src="/Little_Light__Studios_Logo.jpg"
              alt=""
              className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-[150px] object-contain rounded-xl group-hover:opacity-95 transition-opacity"
            />
            <span className="hidden md:block min-w-0">
              <span className="block font-display text-lg text-ink leading-tight truncate">
                Little Light Studios
              </span>
              <span className="block text-xs text-ink-muted font-sans truncate">
                Calm Stories. Kind Learning.
              </span>
            </span>
          </Link>

          <nav
            className="hidden sm:flex flex-wrap justify-end gap-1 p-1 rounded-2xl bg-white/55 border border-ink/5"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={navClass(link.to, link.exact)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export function MobileTabBar() {
  const location = useLocation()

  const tabs = [
    {
      to: '/',
      label: 'Home',
      exact: true,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden>
          <path
            d="M4 11.5L12 5l8 6.5V20a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-8.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      to: '/videos',
      label: 'Videos',
      exact: true,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
        </svg>
      ),
    },
    {
      to: '/stories',
      label: 'Stories',
      exact: false,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden>
          <path
            d="M5 5h9a3 3 0 013 3v11H8a3 3 0 00-3 3V5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M5 5v17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      to: '/games',
      label: 'Games',
      exact: false,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden>
          <path
            d="M12 4.5l1.4 3.6 3.9.3-3 2.6.9 3.8L12 12.8 8.8 14.8l.9-3.8-3-2.6 3.9-.3L12 4.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ] as const

  return (
    <nav
      className="sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-ink/8 bg-cream/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_rgba(31,42,46,0.1)]"
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-4 max-w-5xl mx-auto">
        {tabs.map((tab) => {
          const active = isActivePath(location.pathname, tab.to, tab.exact)
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className={`flex flex-col items-center justify-center gap-0.5 min-h-[58px] px-1 py-2 text-[11px] font-sans font-bold touch-manipulation transition-colors ${
                  active ? 'text-ink' : 'text-ink-muted'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={`inline-flex items-center justify-center w-11 h-8 rounded-xl ${
                    active ? 'bg-honey-soft text-honey-deep' : ''
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
