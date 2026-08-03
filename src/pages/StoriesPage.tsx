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
      <div className="pointer-events-none absolute inset-0 bg-dawn-mesh opacity-60" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10 text-center sm:text-left animate-rise">
          <p className="text-sm font-sans font-semibold tracking-wide uppercase text-sage-dark mb-2">
            Rest & sleep
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-3">
            Stories for Rest & Sleep
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-xl mx-auto sm:mx-0 leading-relaxed">
            Soft narrations and read-aloud moments for nap and bedtime.
          </p>
        </header>
        <ul className="space-y-3">
          {stories.map((story, i) => (
            <li
              key={story.id}
              className="animate-rise"
              style={{ animationDelay: `${50 + i * 40}ms` }}
            >
              <Link
                to={`/stories/${story.id}`}
                className="block min-h-[64px] p-4 sm:p-5 rounded-2xl bg-white/80 border border-sage-light/30 hover:border-sage-light/60 hover:shadow-soft active:scale-[0.99] transition-all text-ink touch-manipulation backdrop-blur-sm"
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
