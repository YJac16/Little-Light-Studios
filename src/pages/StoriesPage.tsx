import { Link } from 'react-router-dom'
import storiesData from '../data/stories.json'

interface Story {
  id: string
  title: string
  subtitle?: string
}

const stories = storiesData as Story[]

export function StoriesPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-studio-mesh" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10 animate-rise">
          <p className="text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase text-sage-dark mb-2">
            Rest & sleep
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.1] mb-3">
            Stories library
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-xl leading-relaxed">
            Soft narrations and read-aloud moments for nap and bedtime.
          </p>
        </header>
        <ul className="space-y-3">
          {stories.map((story, i) => (
            <li
              key={story.id}
              className="animate-rise"
              style={{ animationDelay: `${45 + i * 35}ms` }}
            >
              <Link
                to={`/stories/${story.id}`}
                className="block min-h-[72px] p-4 sm:p-5 rounded-2xl bg-white/90 border border-ink/5 hover:border-sage/40 hover:shadow-lift active:scale-[0.99] transition-all text-ink touch-manipulation"
              >
                <span className="font-display text-lg sm:text-xl font-semibold block leading-snug">
                  {story.title}
                </span>
                {story.subtitle && (
                  <span className="mt-1 block text-sm text-ink-muted font-sans">
                    {story.subtitle}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
