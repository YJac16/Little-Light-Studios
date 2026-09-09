import { useMemo, useState } from 'react'
import storiesData from '../data/stories.json'
import {
  InfiniteStoryCarousel,
  StoryCoverCard,
  StoryShelfRow,
} from '../components/StoryLibrary'
import type { Story, StoryAgeBand } from '../types/story'

const stories = storiesData as Story[]

type AgeFilter = StoryAgeBand | 'all'

const AGE_FILTERS: { id: AgeFilter; label: string }[] = [
  { id: 'all', label: 'All ages' },
  { id: '0–3', label: '0–3' },
  { id: '3–6', label: '3–6' },
]

export function StoriesPage() {
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all')

  const napStories = useMemo(() => stories.filter((s) => s.moment === 'nap'), [])
  const bedtimeStories = useMemo(() => stories.filter((s) => s.moment === 'bedtime'), [])
  const ageStories = useMemo(
    () => (ageFilter === 'all' ? stories : stories.filter((s) => s.ageBand === ageFilter)),
    [ageFilter],
  )

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-studio-mesh" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 animate-rise sm:mb-8">
          <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-sage-dark sm:text-sm">
            Rest & sleep
          </p>
          <h1 className="mb-3 font-display text-3xl leading-[1.1] text-ink sm:text-4xl md:text-5xl">
            Stories library
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Browse like a little bookshelf — tap a cover to listen with narration, dhikr, and
            white noise.
          </p>
        </header>

        <section className="mb-10 animate-rise sm:mb-12" aria-label="Featured stories">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink sm:text-xl">
            Pick a story
          </h2>
          <InfiniteStoryCarousel stories={stories} />
        </section>

        <div className="space-y-8 sm:space-y-10">
          <div className="animate-rise" style={{ animationDelay: '60ms' }}>
            <StoryShelfRow id="shelf-nap" title="Nap" stories={napStories} />
          </div>

          <div className="animate-rise" style={{ animationDelay: '120ms' }}>
            <StoryShelfRow id="shelf-bedtime" title="Bedtime" stories={bedtimeStories} />
          </div>

          <section className="animate-rise" aria-labelledby="shelf-age" style={{ animationDelay: '180ms' }}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <h2 id="shelf-age" className="font-display text-lg font-semibold text-ink sm:text-xl">
                Age
              </h2>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by age">
                {AGE_FILTERS.map((item) => {
                  const active = ageFilter === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAgeFilter(item.id)}
                      aria-pressed={active}
                      className={`min-h-[40px] rounded-xl px-3.5 text-sm font-semibold transition touch-manipulation sm:px-4 ${
                        active
                          ? 'bg-sage-dark text-white shadow-soft'
                          : 'border border-ink/8 bg-white/85 text-ink-muted hover:border-sage/40 hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="relative -mx-4 sm:-mx-6">
              <div
                className="flex gap-3 overflow-x-auto px-4 pb-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:px-6 [&::-webkit-scrollbar]:hidden"
                aria-label="Stories by age"
              >
                {ageStories.map((story) => (
                  <div key={story.id} className="snap-start">
                    <StoryCoverCard story={story} size="row" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
