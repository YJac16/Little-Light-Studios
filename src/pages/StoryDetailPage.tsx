import { useParams, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import storiesData from '../data/stories.json'

interface Story {
  id: string
  title: string
  text: string
  narrationUrl: string | null
  backgroundSoundUrl: string | null
}

function findStory(_category: string, id: string): Story | null {
  const nap = (storiesData.napStories as Story[]).find((s) => s.id === id)
  if (nap) return nap
  const bed = (storiesData.bedtimeStories as Story[]).find((s) => s.id === id)
  return bed ?? null
}

function AudioControl({
  label,
  isPlaying,
  onPlayPause,
  hasAudio,
}: {
  label: string
  isPlaying: boolean
  onPlayPause: () => void
  hasAudio: boolean
}) {
  const icon = label.toLowerCase().includes('narration') ? '🔊' : '🌙'
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg" aria-hidden>{icon}</span>
      <span className="text-sm text-ink-muted">{label}</span>
      {hasAudio ? (
        <button
          type="button"
          onClick={onPlayPause}
          className="min-h-[44px] px-5 py-3 rounded-xl bg-sage/20 text-sage-dark hover:bg-sage/30 active:bg-sage/40 transition-colors font-medium touch-manipulation"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      ) : (
        <span className="text-sm text-ink-muted italic">No audio available</span>
      )}
    </div>
  )
}

export function StoryDetailPage() {
  const params = useParams<{ category: string; id: string }>()
  const story = params.id ? findStory(params.category ?? '', params.id) : null

  const narrationRef = useRef<HTMLAudioElement>(null)
  const backgroundRef = useRef<HTMLAudioElement>(null)
  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const [backgroundPlaying, setBackgroundPlaying] = useState(false)

  const hasNarration = !!story?.narrationUrl
  const hasBackground = !!story?.backgroundSoundUrl

  const toggleNarration = () => {
    const audio = narrationRef.current
    if (!audio) return
    if (narrationPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setNarrationPlaying(!narrationPlaying)
  }

  const toggleBackground = () => {
    const audio = backgroundRef.current
    if (!audio) return
    if (backgroundPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setBackgroundPlaying(!backgroundPlaying)
  }

  if (!story) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-ink-muted">Story not found.</p>
        <Link to="/stories" className="text-sage-dark hover:underline mt-4 inline-block">
          ← Back to Stories
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
      <Link
        to="/stories"
        className="inline-block py-2 -my-1 text-sage-dark hover:text-sage text-sm mb-6 touch-manipulation"
      >
        ← Back to Stories
      </Link>

      <h1 className="text-2xl md:text-3xl font-serif font-semibold text-ink mb-6">
        {story.title}
      </h1>

      {/* Audio controls */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white border border-sage-light/30 mb-8">
        {hasNarration && (
          <audio
            ref={narrationRef}
            src={story.narrationUrl!}
            onPlay={() => setNarrationPlaying(true)}
            onPause={() => setNarrationPlaying(false)}
            onEnded={() => setNarrationPlaying(false)}
          />
        )}
        {hasBackground && (
          <audio
            ref={backgroundRef}
            src={story.backgroundSoundUrl!}
            loop
            onPlay={() => setBackgroundPlaying(true)}
            onPause={() => setBackgroundPlaying(false)}
          />
        )}
        <AudioControl
          label="Narration"
          isPlaying={narrationPlaying}
          onPlayPause={toggleNarration}
          hasAudio={hasNarration}
        />
        <AudioControl
          label="Background sound"
          isPlaying={backgroundPlaying}
          onPlayPause={toggleBackground}
          hasAudio={hasBackground}
        />
      </div>

      {/* Story text */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-2xl border border-sage-light/30 p-5 sm:p-6 md:p-8 max-h-[50vh] sm:max-h-[55vh] overflow-y-auto overflow-x-hidden overscroll-contain -webkit-overflow-scrolling-touch">
          <p className="text-ink leading-relaxed whitespace-pre-wrap font-serif text-base md:text-lg">
            {story.text}
          </p>
        </div>
      </div>
    </main>
  )
}
