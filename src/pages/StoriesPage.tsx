import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import storiesData from '../data/stories.json'
import { StoryCover } from '../components/StoryCover'
import { ContinueListeningCard } from '../components/ContinueListeningCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getTonightQueue } from '../lib/storage'
import {
  AGE_BAND_LABELS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type AgeBand,
  type Story,
  type StoryCategory,
} from '../types/story'

const stories = storiesData as Story[]

type CategoryFilter = 'all' | StoryCategory
type AgeFilter = 'all' | AgeBand

const CATEGORY_FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'prophets', label: 'Prophets' },
  { id: 'nap', label: 'Nap' },
  { id: 'kind-habits', label: 'Kind habits' },
]

const AGE_FILTERS: { id: AgeFilter; label: string }[] = [
  { id: 'all', label: 'Any time' },
  { id: 'nap', label: 'Nap time' },
  { id: 'bedtime', label: 'Bedtime' },
  { id: 'anytime', label: 'Anytime' },
]

export function StoriesPage() {
  useDocumentTitle('Stories')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all')
  const [query, setQuery] = useState('')
  const [queueCount] = useState(() => getTonightQueue().length)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return stories.filter((story) => {
      if (categoryFilter !== 'all' && story.category !== categoryFilter) return false
      if (ageFilter !== 'all' && story.ageBand !== ageFilter) return false
      if (!q) return true
      const haystack = [story.title, story.subtitle, story.blurb, story.text]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [ageFilter, categoryFilter, query])

  const visibleCategories =
    categoryFilter === 'all' ? CATEGORY_ORDER : CATEGORY_ORDER.filter((c) => c === categoryFilter)

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
      <header className="mb-6 max-w-xl sm:mb-8">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Stories for rest & kind hearts
        </h1>
        <p className="mt-2 text-ink-muted">
          Soft prophet stories, Little Light nap companions, and kind habits — search, filter, and queue for
          tonight.
        </p>
      </header>

      <ContinueListeningCard />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          to="/tonight"
          className="inline-flex min-h-[44px] items-center rounded-xl bg-sage-dark px-4 text-sm font-semibold text-white hover:bg-sage"
        >
          Tonight’s queue{queueCount > 0 ? ` (${queueCount})` : ''}
        </Link>
      </div>

      <label className="mb-4 block">
        <span className="sr-only">Search stories</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories…"
          className="min-h-[48px] w-full rounded-2xl border border-dawn/50 bg-white/90 px-4 text-base text-ink placeholder:text-ink-soft focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
        />
      </label>

      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {CATEGORY_FILTERS.map((item) => {
          const active = categoryFilter === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategoryFilter(item.id)}
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

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by age band">
        {AGE_FILTERS.map((item) => {
          const active = ageFilter === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setAgeFilter(item.id)}
              className={`min-h-[40px] rounded-xl px-4 text-sm font-semibold transition ${
                active
                  ? 'bg-dawn text-ink'
                  : 'bg-white/80 text-ink-muted border border-dawn/40 hover:border-sage-light hover:text-ink'
              }`}
              aria-pressed={active}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dawn/40 bg-white/70 p-6 text-ink-muted">
          No stories match that search. Try a softer word — or clear the filters.
        </p>
      ) : (
        <div className="space-y-10">
          {visibleCategories.map((category) => {
            const items = filtered.filter((s) => s.category === category)
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
                            <p className="mt-1 text-xs font-medium text-ink-soft">
                              {AGE_BAND_LABELS[story.ageBand]}
                            </p>
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
      )}
    </main>
  )
}
