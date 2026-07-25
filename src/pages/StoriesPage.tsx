import { useState } from 'react'
import { Link } from 'react-router-dom'
import storiesData from '../data/stories.json'
import { StoryCover } from '../components/StoryCover'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type Story,
  type StoryCategory,
} from '../types/story'

const stories = storiesData as Story[]

type Filter = 'all' | StoryCategory

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'prophets', label: 'Prophets' },
  { id: 'nap', label: 'Nap' },
  { id: 'kind-habits', label: 'Kind habits' },
]

export function StoriesPage() {
  useDocumentTitle('Stories')
  const [filter, setFilter] = useState<Filter>('all')

  const visibleCategories =
    filter === 'all' ? CATEGORY_ORDER : CATEGORY_ORDER.filter((c) => c === filter)

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
      <header className="mb-6 max-w-xl sm:mb-8">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Stories for rest & kind hearts
        </h1>
        <p className="mt-2 text-ink-muted">
          Soft prophet stories, Little Light nap companions, and kind habits — for calm evenings and quiet
          afternoons.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter stories">
        {FILTERS.map((item) => {
          const active = filter === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`min-h-[40px] rounded-xl px-4 text-sm font-semibold transition ${
                active
                  ? 'bg-sage-dark text-white'
                  : 'bg-white/80 text-ink-muted border border-dawn/40 hover:border-sage-light hover:text-ink'
              }`}
              aria-pressed={active}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="space-y-10">
        {visibleCategories.map((category) => {
          const items = stories.filter((s) => s.category === category)
          if (items.length === 0) return null
          return (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h2 id={`cat-${category}`} className="mb-4 font-display text-lg font-semibold text-sage-dark">
                {CATEGORY_LABELS[category]}
              </h2>
              <ul className="space-y-3">
                {items.map((story) => (
                  <li key={story.id}>
                    <Link
                      to={`/stories/${story.id}`}
                      className="flex min-h-[88px] gap-4 rounded-2xl border border-dawn/40 bg-white/80 p-3 transition hover:border-sage-light hover:shadow-sm active:scale-[0.99] sm:p-4"
                    >
                      <StoryCover theme={story.cover} title={story.title} className="shrink-0" />
                      <div className="flex min-w-0 flex-1 items-start justify-between gap-3 py-0.5">
                        <div className="min-w-0">
                          <span className="font-display text-lg font-medium text-ink">{story.title}</span>
                          {story.blurb && (
                            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{story.blurb}</p>
                          )}
                        </div>
                        <span
                          className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                            story.narrationUrl
                              ? 'bg-sage-muted/60 text-sage-dark'
                              : 'bg-sand text-ink-soft'
                          }`}
                        >
                          {story.narrationUrl ? 'Narration' : 'Read aloud'}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </main>
  )
}
