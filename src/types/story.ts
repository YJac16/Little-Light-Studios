export type StoryCategory = 'prophets' | 'nap' | 'kind-habits'

export type CoverTheme =
  | 'kindness'
  | 'stars'
  | 'ark'
  | 'river'
  | 'whale'
  | 'truck'
  | 'helpers'
  | 'lantern'
  | 'patience'
  | 'birds'
  | 'rain'
  | 'moon'
  | 'dates'
  | 'hands'
  | 'morning'
  | 'peace'

export interface Story {
  id: string
  title: string
  subtitle?: string
  blurb?: string
  category: StoryCategory
  cover: CoverTheme
  text: string
  narrationUrl: string | null
}

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  prophets: 'Prophet stories',
  nap: 'Nap companions',
  'kind-habits': 'Kind habits',
}

export const CATEGORY_ORDER: StoryCategory[] = ['prophets', 'nap', 'kind-habits']
