import { Link } from 'react-router-dom'
import { useState } from 'react'
import storiesData from '../data/stories.json'
import { StoryCover } from '../components/StoryCover'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { clearTonightQueue, getTonightQueue, removeFromQueue, setTonightQueue } from '../lib/storage'
import type { Story } from '../types/story'

const stories = storiesData as Story[]

export function TonightPage() {
  useDocumentTitle('Tonight’s queue')
  const [queueIds, setQueueIds] = useState(() => getTonightQueue())

  const queuedStories = queueIds
    .map((id) => stories.find((s) => s.id === id))
    .filter((s): s is Story => !!s)

  const move = (index: number, direction: -1 | 1) => {
    const next = [...queueIds]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setTonightQueue(next)
    setQueueIds(next)
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
      <header className="mb-8 max-w-xl">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Tonight’s queue</h1>
        <p className="mt-2 text-ink-muted">
          A local playlist on this device — no account needed. Add stories from any story page.
        </p>
      </header>

      {queuedStories.length === 0 ? (
        <div className="rounded-2xl border border-dawn/40 bg-white/70 p-6">
          <p className="text-ink-muted">Your queue is empty. Browse stories and tap “Add to tonight’s queue”.</p>
          <Link
            to="/stories"
            className="mt-4 inline-flex min-h-[48px] items-center font-semibold text-sage-dark hover:underline"
          >
            Browse stories →
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {queuedStories.map((story, index) => (
              <li
                key={story.id}
                className="flex gap-3 rounded-2xl border border-dawn/40 bg-white/80 p-3 sm:gap-4 sm:p-4"
              >
                <StoryCover theme={story.cover} title={story.title} className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/stories/${story.id}`}
                    className="font-display text-lg font-medium text-ink hover:text-sage-dark"
                  >
                    {index + 1}. {story.title}
                  </Link>
                  {story.blurb && <p className="mt-1 text-sm text-ink-muted">{story.blurb}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      className="min-h-[40px] rounded-lg bg-sage-muted/40 px-3 text-sm font-medium text-sage-dark disabled:opacity-40"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === queuedStories.length - 1}
                      className="min-h-[40px] rounded-lg bg-sage-muted/40 px-3 text-sm font-medium text-sage-dark disabled:opacity-40"
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() => setQueueIds(removeFromQueue(story.id))}
                      className="min-h-[40px] rounded-lg border border-dawn/50 px-3 text-sm font-medium text-ink-muted"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              clearTonightQueue()
              setQueueIds([])
            }}
            className="mt-6 min-h-[44px] text-sm font-semibold text-ink-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Clear queue
          </button>
        </>
      )}
    </main>
  )
}
