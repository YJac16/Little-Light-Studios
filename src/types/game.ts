export interface Game {
  id: string
  title: string
  arabicTitle?: string
  alsoKnownAs?: string
  tagline: string
  description: string
  url: string | null
  practiceUrl?: string
  playLabel?: string
  kicker?: string
  art?: 'manar-magnet'
  accent: 'honey' | 'sky' | 'sage' | 'lavender'
  status: 'live' | 'coming-soon'
}
