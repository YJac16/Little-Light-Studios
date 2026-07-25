import { Link } from 'react-router-dom'
import storiesData from '../data/stories.json'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { CATEGORY_LABELS, type Story, type StoryCategory } from '../types/story'

const stories = storiesData as Story[]
const CATEGORY_ORDER: StoryCategory[] = ['prophets', 'nap']

export function StoriesPage() {
  useDocumentTitle('Stories')

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
      <header className="mb-8 max-w-xl">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Stories for rest & sleep</h1>
        <p className="mt-2 text-ink-muted">
          Soft prophet stories and original Little Light nap companions — for calm evenings and quiet afternoons.
        </p>
      </header>

      <div className="space-y-10">
        {CATEGORY_ORDER.map((category) => {
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
                      className="block min-h-[72px] rounded-2xl border border-dawn/40 bg-white/80 p-4 transition hover:border-sage-light hover:shadow-sm active:scale-[0.99] sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
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
