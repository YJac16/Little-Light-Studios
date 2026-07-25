import type { CoverTheme } from '../types/story'

interface StoryCoverProps {
  theme: CoverTheme
  title: string
  size?: 'sm' | 'lg'
  className?: string
}

const GRADIENTS: Record<CoverTheme, string> = {
  kindness: 'from-sage-muted to-dawn-soft',
  stars: 'from-[#1e3a4c] to-dawn',
  ark: 'from-dawn to-mist-deep',
  river: 'from-dawn-light to-sage-muted',
  whale: 'from-[#2a4556] to-dawn-light',
  truck: 'from-sand-warm to-sage-muted',
  helpers: 'from-sage-muted to-sand',
  lantern: 'from-[#2f3a36] to-dawn-soft',
  patience: 'from-mist-deep to-sand-warm',
  birds: 'from-dawn-soft to-sage-light',
  rain: 'from-mist to-dawn',
  moon: 'from-[#243844] to-dawn-soft',
  dates: 'from-sand-warm to-sage-muted',
  hands: 'from-sage-muted/80 to-dawn-soft',
  morning: 'from-dawn-soft to-sand',
  peace: 'from-sage-muted to-mist-soft',
}

function CoverArt({ theme }: { theme: CoverTheme }) {
  switch (theme) {
    case 'stars':
      return (
        <>
          <circle cx="40" cy="36" r="2.2" fill="#f7f4ef" opacity="0.9" />
          <circle cx="72" cy="28" r="1.6" fill="#f7f4ef" opacity="0.75" />
          <circle cx="98" cy="44" r="1.8" fill="#f7f4ef" opacity="0.8" />
          <circle cx="58" cy="58" r="1.2" fill="#f7f4ef" opacity="0.7" />
          <circle cx="110" cy="70" r="14" fill="#f2f7f9" opacity="0.35" />
        </>
      )
    case 'ark':
      return (
        <>
          <ellipse cx="80" cy="78" rx="48" ry="10" fill="#7fa8bc" opacity="0.45" />
          <path d="M40 68h80l-8 16H48z" fill="#4f6b58" opacity="0.85" />
          <rect x="72" y="48" width="6" height="20" fill="#6f8f7a" />
        </>
      )
    case 'river':
      return (
        <>
          <path d="M10 70c20-12 40 8 60-4s40 10 60-2" stroke="#7fa8bc" strokeWidth="8" fill="none" opacity="0.55" />
          <ellipse cx="70" cy="58" rx="16" ry="10" fill="#efe8dc" opacity="0.9" />
        </>
      )
    case 'whale':
      return (
        <>
          <ellipse cx="78" cy="62" rx="36" ry="18" fill="#4f6b58" opacity="0.55" />
          <path d="M108 58c10 2 18 10 22 16-12-2-20-6-26-12z" fill="#4f6b58" opacity="0.45" />
          <circle cx="58" cy="58" r="2" fill="#f7f4ef" />
        </>
      )
    case 'truck':
      return (
        <>
          <rect x="36" y="52" width="70" height="28" rx="6" fill="#6f8f7a" opacity="0.85" />
          <rect x="88" y="40" width="28" height="24" rx="4" fill="#9db5a4" />
          <circle cx="52" cy="82" r="8" fill="#2f3a36" opacity="0.55" />
          <circle cx="98" cy="82" r="8" fill="#2f3a36" opacity="0.55" />
        </>
      )
    case 'helpers':
      return (
        <>
          <circle cx="52" cy="62" r="14" fill="#9db5a4" opacity="0.85" />
          <circle cx="84" cy="58" r="11" fill="#7fa8bc" opacity="0.75" />
          <circle cx="110" cy="66" r="9" fill="#c5d4ca" opacity="0.9" />
        </>
      )
    case 'lantern':
      return (
        <>
          <rect x="70" y="38" width="20" height="36" rx="6" fill="#efe8dc" opacity="0.9" />
          <path d="M80 28v10" stroke="#f7f4ef" strokeWidth="3" />
          <ellipse cx="80" cy="56" rx="14" ry="18" fill="#b7d0dc" opacity="0.35" />
        </>
      )
    case 'patience':
      return (
        <>
          <circle cx="80" cy="48" r="18" fill="#efe8dc" opacity="0.55" />
          <path d="M50 78c18-16 42-16 60 0" stroke="#6f8f7a" strokeWidth="4" fill="none" opacity="0.7" />
        </>
      )
    case 'birds':
      return (
        <>
          <path d="M40 55q10-12 20 0" stroke="#4f6b58" strokeWidth="3" fill="none" />
          <path d="M70 45q12-14 24 0" stroke="#6f8f7a" strokeWidth="3" fill="none" />
          <path d="M100 58q8-10 16 0" stroke="#4f6b58" strokeWidth="2.5" fill="none" />
        </>
      )
    case 'rain':
      return (
        <>
          <path d="M48 30v28" stroke="#7fa8bc" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M72 24v34" stroke="#7fa8bc" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <path d="M96 32v26" stroke="#7fa8bc" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <rect x="28" y="68" width="104" height="8" rx="4" fill="#9db5a4" opacity="0.35" />
        </>
      )
    case 'moon':
      return (
        <>
          <circle cx="96" cy="40" r="18" fill="#f7f4ef" opacity="0.85" />
          <circle cx="104" cy="36" r="14" fill="#2a4556" />
          <rect x="42" y="58" width="16" height="28" rx="5" fill="#efe8dc" opacity="0.85" />
        </>
      )
    case 'dates':
      return (
        <>
          <ellipse cx="64" cy="58" rx="10" ry="16" fill="#6f8f7a" opacity="0.8" />
          <ellipse cx="84" cy="54" rx="10" ry="16" fill="#4f6b58" opacity="0.75" />
          <ellipse cx="104" cy="60" rx="9" ry="14" fill="#6f8f7a" opacity="0.7" />
        </>
      )
    case 'hands':
      return (
        <>
          <path d="M48 70c8-18 20-24 32-10 12-14 24-8 32 10" fill="#9db5a4" opacity="0.75" />
          <circle cx="80" cy="48" r="8" fill="#efe8dc" opacity="0.8" />
        </>
      )
    case 'morning':
      return (
        <>
          <circle cx="110" cy="38" r="16" fill="#efe8dc" opacity="0.9" />
          <path d="M20 78c24-20 50-20 76 0 18-12 36-10 44 2H20z" fill="#9db5a4" opacity="0.45" />
        </>
      )
    case 'peace':
      return (
        <>
          <circle cx="68" cy="56" r="16" fill="#9db5a4" opacity="0.8" />
          <circle cx="96" cy="56" r="16" fill="#7fa8bc" opacity="0.65" />
          <circle cx="82" cy="52" r="10" fill="#efe8dc" opacity="0.7" />
        </>
      )
    case 'kindness':
    default:
      return (
        <>
          <circle cx="80" cy="52" r="22" fill="#efe8dc" opacity="0.55" />
          <path
            d="M80 70c-14-10-22-18-22-28a14 14 0 0 1 28-2 14 14 0 0 1 28 2c0 10-8 18-22 28z"
            fill="#6f8f7a"
            opacity="0.75"
          />
        </>
      )
  }
}

export function StoryCover({ theme, title, size = 'sm', className = '' }: StoryCoverProps) {
  const dims = size === 'lg' ? 'h-36 sm:h-44 w-full' : 'h-16 w-16 sm:h-20 sm:w-20'
  const view = '0 0 160 100'

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${GRADIENTS[theme]} ${dims} ${className}`}
      role="img"
      aria-label={`Cover art for ${title}`}
    >
      <svg viewBox={view} className="h-full w-full" aria-hidden>
        <CoverArt theme={theme} />
      </svg>
    </div>
  )
}
