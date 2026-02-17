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
  const dhikrRef = useRef<HTMLAudioElement>(null)
  const whiteNoiseRef = useRef<HTMLAudioElement>(null)

  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const [dhikrOn, setDhikrOn] = useState(false)
  const [whiteNoiseOn, setWhiteNoiseOn] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const hasNarration = !!story?.narrationUrl
  const hasDhikr = !!story?.dhikrUrl
  const hasWhiteNoise = !!story?.whiteNoiseUrl

  useEffect(() => {
    const a = narrationRef.current
    if (a) a.playbackRate = playbackRate
  }, [playbackRate])

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

  const toggleDhikr = () => {
    const audio = dhikrRef.current
    if (!audio || !hasDhikr) return
    if (dhikrOn) {
      audio.pause()
      setDhikrOn(false)
    } else {
      audio.play().catch(() => {})
      setDhikrOn(true)
    }
  }

  const toggleWhiteNoise = () => {
    const audio = whiteNoiseRef.current
    if (!audio || !hasWhiteNoise) return
    if (whiteNoiseOn) {
      audio.pause()
      setWhiteNoiseOn(false)
    } else {
      audio.play().catch(() => {})
      setWhiteNoiseOn(true)
    }
  }

  const goPrev = () => prev && navigate(`/stories/${prev}`)
  const goNext = () => next && navigate(`/stories/${next}`)

  const cycleSpeed = () => {
    const i = SPEED_OPTIONS.indexOf(playbackRate)
    setPlaybackRate(SPEED_OPTIONS[(i + 1) % SPEED_OPTIONS.length])
  }

  useEffect(() => {
    setNarrationPlaying(false)
    setDhikrOn(false)
    setWhiteNoiseOn(false)
    narrationRef.current?.pause()
    dhikrRef.current?.pause()
    whiteNoiseRef.current?.pause()
  }, [story?.id])

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
    <main className="max-w-4xl mx-auto px-4 sm:px-5 pt-6 sm:pt-8 pb-40 sm:pb-44">
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

      {/* Story text */}
      <div className="bg-white rounded-2xl border border-sage-light/30 p-5 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden overscroll-contain">
        <p className="text-ink leading-relaxed whitespace-pre-wrap font-serif text-base md:text-lg">
          {story.text}
        </p>
      </div>

      {/* Fixed bottom media player */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream border-t border-sage-light/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 py-3 sm:py-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Prev / Play-Pause / Next */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                disabled={!prev}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-sage-light/30 text-sage-dark disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation text-lg"
                aria-label="Previous story"
              >
                ⏮
              </button>
              <button
                type="button"
                onClick={toggleNarration}
                disabled={!hasNarration}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-sage/30 text-sage-dark disabled:opacity-40 touch-manipulation text-lg"
                aria-label={narrationPlaying ? 'Pause' : 'Play'}
              >
                {narrationPlaying ? '⏸' : '▶'}
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!next}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-sage-light/30 text-sage-dark disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation text-lg"
                aria-label="Next story"
              >
                ⏭
              </button>
            </div>
            {/* Speed */}
            <button
              type="button"
              onClick={cycleSpeed}
              className="min-h-[44px] px-3 sm:px-4 rounded-xl bg-sage-light/30 text-sage-dark text-sm font-medium touch-manipulation"
              title="Change narration speed"
            >
              {playbackRate}x
            </button>
            {/* Dhikr toggle */}
            <button
              type="button"
              onClick={toggleDhikr}
              disabled={!hasDhikr}
              className={`min-h-[44px] px-3 sm:px-4 rounded-xl text-sm font-medium touch-manipulation ${
                dhikrOn
                  ? 'bg-sage/40 text-sage-dark'
                  : 'bg-sage-light/30 text-sage-dark disabled:opacity-40'
              }`}
              aria-pressed={dhikrOn}
              aria-label="Toggle dhikr"
            >
              Dhikr {dhikrOn ? 'On' : 'Off'}
            </button>
            {/* White noise toggle */}
            <button
              type="button"
              onClick={toggleWhiteNoise}
              disabled={!hasWhiteNoise}
              className={`min-h-[44px] px-3 sm:px-4 rounded-xl text-sm font-medium touch-manipulation ${
                whiteNoiseOn
                  ? 'bg-sage/40 text-sage-dark'
                  : 'bg-sage-light/30 text-sage-dark disabled:opacity-40'
              }`}
              aria-pressed={whiteNoiseOn}
              aria-label="Toggle white noise"
            >
              White noise {whiteNoiseOn ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden audio elements */}
      {hasNarration && (
        <audio
          ref={narrationRef}
          src={story.narrationUrl!}
          onPlay={() => setNarrationPlaying(true)}
          onPause={() => setNarrationPlaying(false)}
        />
      )}
      {hasDhikr && (
        <audio
          ref={dhikrRef}
          src={story.dhikrUrl!}
          loop
          onPlay={() => setDhikrOn(true)}
          onPause={() => setDhikrOn(false)}
        />
      )}
      {hasWhiteNoise && (
        <audio
          ref={whiteNoiseRef}
          src={story.whiteNoiseUrl!}
          loop
          onPlay={() => setWhiteNoiseOn(true)}
          onPause={() => setWhiteNoiseOn(false)}
        />
      )}
    </main>
  )
}
