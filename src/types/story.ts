export type StoryCategory = 'prophets' | 'nap' | 'kind-habits'

export type AgeBand = 'nap' | 'bedtime' | 'anytime'

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
  ageBand: AgeBand
  cover: CoverTheme
  text: string
  narrationUrl: string | null
}

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  prophets: 'Prophet stories',
  nap: 'Nap companions',
  'kind-habits': 'Kind habits',
}

export const AGE_BAND_LABELS: Record<AgeBand, string> = {
  nap: 'Nap time',
  bedtime: 'Bedtime',
  anytime: 'Anytime',
}

export const CATEGORY_ORDER: StoryCategory[] = ['prophets', 'nap', 'kind-habits']
export const AGE_BAND_ORDER: AgeBand[] = ['nap', 'bedtime', 'anytime']
