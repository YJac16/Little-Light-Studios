export type StoryMoment = 'bedtime' | 'nap'
export type StoryAgeBand = '0–3' | '3–6'

export interface Story {
  id: string
  title: string
  subtitle?: string
  text: string
  narrationUrl: string | null
  dhikrUrl: string | null
  whiteNoiseUrl: string | null
  cover: string
  moment: StoryMoment
  ageBand: StoryAgeBand
}
