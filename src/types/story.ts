export type StoryCategory = 'prophets' | 'nap'

export interface Story {
  id: string
  title: string
  subtitle?: string
  blurb?: string
  category: StoryCategory
  text: string
  narrationUrl: string | null
}

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  prophets: 'Prophet stories',
  nap: 'Nap companions',
}
