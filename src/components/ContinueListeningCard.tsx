import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import storiesData from '../data/stories.json'
import { clearContinueListening, getContinueListening } from '../lib/storage'
import type { Story } from '../types/story'

const stories = storiesData as Story[]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function ContinueListeningCard() {
  const [continueItem, setContinueItem] = useState(() => getContinueListening())

  const story = useMemo(() => {
    if (!continueItem) return null
    return stories.find((s) => s.id === continueItem.storyId) ?? null
  }, [continueItem])

  if (!continueItem || !story || continueItem.currentTime < 2) return null

  return (
    <div className="mb-6 rounded-2xl border border-sage-light/50 bg-white/90 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-sage-dark">Continue listening</p>
      <p className="mt-1 font-display text-lg font-medium text-ink">{story.title}</p>
      <p className="text-sm text-ink-muted">Left off around {formatTime(continueItem.currentTime)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          to={`/stories/${story.id}`}
          state={{ resumeAt: continueItem.currentTime }}
          className="inline-flex min-h-[44px] items-center rounded-xl bg-sage-dark px-4 text-sm font-semibold text-white hover:bg-sage"
        >
          Resume
        </Link>
        <button
          type="button"
          onClick={() => {
            clearContinueListening(story.id)
            setContinueItem(null)
          }}
          className="inline-flex min-h-[44px] items-center rounded-xl border border-dawn/50 bg-mist-soft px-4 text-sm font-semibold text-ink-muted hover:text-ink"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
