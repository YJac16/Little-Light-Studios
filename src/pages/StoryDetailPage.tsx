import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import storiesData from '../data/stories.json'
import { READING_TIPS } from '../data/readingTips'

interface Story {
  id: string
  title: string
  subtitle?: string
  text: string
  narrationUrl: string | null
  dhikrUrl: string | null
  whiteNoiseUrl: string | null
}

const stories = storiesData as Story[]

type LoopMode = 'off' | 'story' | 'dhikr' | 'white-noise'

function findStory(id: string): Story | null {
  return stories.find((s) => s.id === id) ?? null
}

function getPrevNextIds(currentId: string): { prev: string | null; next: string | null } {
  const idx = stories.findIndex((s) => s.id === currentId)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? stories[idx - 1].id : null,
    next: idx < stories.length - 1 && idx >= 0 ? stories[idx + 1].id : null,
  }
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25]

export function StoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const story = id ? findStory(id) : null
  const { prev, next } = id ? getPrevNextIds(id) : { prev: null, next: null }

  const narrationRef = useRef<HTMLAudioElement>(null)
  const backgroundRef = useRef<HTMLAudioElement>(null)
  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const [backgroundPlaying, setBackgroundPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [loopMode, setLoopMode] = useState<LoopMode>('off')

  const hasNarration = !!story?.narrationUrl

  const getBackgroundSrc = () => {
    if (loopMode === 'dhikr' && story?.dhikrUrl) return story.dhikrUrl
    if (loopMode === 'white-noise' && story?.whiteNoiseUrl) return story.whiteNoiseUrl
    return null
  }
  const backgroundSrc = getBackgroundSrc()
  const showBackgroundPlayer = loopMode === 'dhikr' || loopMode === 'white-noise'

  useEffect(() => {
    const a = narrationRef.current
    if (a) a.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const a = narrationRef.current
    if (!a || !hasNarration) return
    const onEnded = () => {
      setNarrationPlaying(false)
      if (loopMode === 'story') {
        a.currentTime = 0
        a.play().catch(() => {})
      }
    }
    a.addEventListener('ended', onEnded)
    return () => a.removeEventListener('ended', onEnded)
  }, [loopMode, hasNarration])

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

  const goPrev = () => prev && navigate(`/stories/${prev}`)
  const goNext = () => next && navigate(`/stories/${next}`)

  const cycleSpeed = () => {
    const i = SPEED_OPTIONS.indexOf(playbackRate)
    setPlaybackRate(SPEED_OPTIONS[(i + 1) % SPEED_OPTIONS.length])
  }

  const cycleLoop = () => {
    const modes: LoopMode[] = ['off', 'story', 'dhikr', 'white-noise']
    const i = modes.indexOf(loopMode)
    const nextMode = modes[(i + 1) % modes.length]
    setLoopMode(nextMode)
    if (backgroundPlaying && (loopMode === 'dhikr' || loopMode === 'white-noise')) {
      backgroundRef.current?.pause()
      setBackgroundPlaying(false)
    }
    if (nextMode === 'dhikr' || nextMode === 'white-noise') {
      setBackgroundPlaying(false)
    }
  }

  useEffect(() => {
    setNarrationPlaying(false)
    setBackgroundPlaying(false)
    narrationRef.current?.pause()
    backgroundRef.current?.pause()
  }, [story?.id])

  useEffect(() => {
    if (story && backgroundSrc && backgroundRef.current) {
      backgroundRef.current.src = backgroundSrc
      backgroundRef.current.load()
    }
  }, [story?.id, backgroundSrc])

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

      {/* Reading tips */}
      <div className="rounded-2xl bg-lavender-light/40 border border-lavender-light p-4 sm:p-5 mb-6">
        <h3 className="font-medium text-ink mb-2">{READING_TIPS.title}</h3>
        <ul className="text-sm text-ink-muted space-y-1 list-disc list-inside">
          {READING_TIPS.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl md:text-3xl font-serif font-semibold text-ink mb-1">
        {story.title}
      </h1>
      {story.subtitle && (
        <p className="text-ink-muted text-sm mb-6">{story.subtitle}</p>
      )}

      {/* Media player */}
      <div className="rounded-2xl bg-white border border-sage-light/30 p-4 sm:p-5 mb-8">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Prev / Play-Pause / Next */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goPrev}
              disabled={!prev}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-sage-light/30 text-sage-dark disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Previous story"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={toggleNarration}
              disabled={!hasNarration}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-sage/30 text-sage-dark disabled:opacity-40 touch-manipulation"
              aria-label={narrationPlaying ? 'Pause' : 'Play'}
            >
              {narrationPlaying ? '⏸' : '▶'}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!next}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-sage-light/30 text-sage-dark disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Next story"
            >
              ⏭
            </button>
          </div>
          {/* Speed */}
          <button
            type="button"
            onClick={cycleSpeed}
            className="min-h-[44px] px-4 rounded-xl bg-sage-light/30 text-sage-dark text-sm font-medium touch-manipulation"
            title="Change narration speed"
          >
            {playbackRate}x
          </button>
          {/* Loop mode */}
          <button
            type="button"
            onClick={cycleLoop}
            className="min-h-[44px] px-4 rounded-xl bg-sage-light/30 text-sage-dark text-sm font-medium touch-manipulation"
            title="Loop: off / story / dhikr / white noise"
          >
            Loop: {loopMode === 'off' ? 'Off' : loopMode === 'story' ? 'Story' : loopMode === 'dhikr' ? 'Dhikr' : 'White noise'}
          </button>
        </div>

        {/* Background sound (dhikr / white noise) when selected */}
        {showBackgroundPlayer && backgroundSrc && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-sage-light/30">
            <span className="text-sm text-ink-muted">
              {loopMode === 'dhikr' ? 'Dhikr' : 'White noise'}:
            </span>
            <audio
              ref={backgroundRef}
              src={backgroundSrc}
              loop
              onPlay={() => setBackgroundPlaying(true)}
              onPause={() => setBackgroundPlaying(false)}
            />
            <button
              type="button"
              onClick={toggleBackground}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-sage/20 text-sage-dark hover:bg-sage/30 font-medium touch-manipulation"
            >
              {backgroundPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        )}

        {hasNarration && (
          <audio
            ref={narrationRef}
            src={story.narrationUrl!}
            onPlay={() => setNarrationPlaying(true)}
            onPause={() => setNarrationPlaying(false)}
          />
        )}
      </div>

      {/* Story text */}
      <div className="bg-white rounded-2xl border border-sage-light/30 p-5 sm:p-6 md:p-8 max-h-[50vh] sm:max-h-[55vh] overflow-y-auto overflow-x-hidden overscroll-contain">
        <p className="text-ink leading-relaxed whitespace-pre-wrap font-serif text-base md:text-lg">
          {story.text}
        </p>
      </div>
    </main>
  )
}
