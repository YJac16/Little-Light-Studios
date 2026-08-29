export interface Game {
  id: string
  title: string
  alsoKnownAs?: string
  tagline: string
  description: string
  url: string | null
  accent: 'honey' | 'sky' | 'sage' | 'lavender'
  status: 'live' | 'coming-soon'
}
