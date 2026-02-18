import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import storiesData from '../data/stories.json'
import { READING_TIPS } from '../data/readingTips'
import { DHIKR_OPTIONS, WHITE_NOISE_OPTIONS } from '../data/audioOptions'

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

// Dhikr index: -1 = off, 0 = option 1, 1 = option 2
// White noise: same
function cycleDhikrIndex(current: number): number {
  if (current < 0) return 0
  if (current < DHIKR_OPTIONS.length - 1) return current + 1
  return -1
}

function cycleWhiteNoiseIndex(current: number): number {
  if (current < 0) return 0
  if (current < WHITE_NOISE_OPTIONS.length - 1) return current + 1
  return -1
}

export function StoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const story = id ? findStory(id) : null
  const { prev, next } = id ? getPrevNextIds(id) : { prev: null, next: null }

  const narrationRef = useRef<HTMLAudioElement>(null)
  const dhikrRef = useRef<HTMLAudioElement>(null)
  const whiteNoiseRef = useRef<HTMLAudioElement>(null)

  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const [loopStory, setLoopStory] = useState(false)
  const [dhikrIndex, setDhikrIndex] = useState(-1)
  const [whiteNoiseIndex, setWhiteNoiseIndex] = useState(-1)
  const [playbackRate, setPlaybackRate] = useState(1)

  const hasNarration = !!story?.narrationUrl

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

  const goPrev = () => prev && navigate(`/stories/${prev}`)
  const goNext = () => next && navigate(`/stories/${next}`)

  const cycleSpeed = () => {
    const i = SPEED_OPTIONS.indexOf(playbackRate)
    setPlaybackRate(SPEED_OPTIONS[(i + 1) % SPEED_OPTIONS.length])
  }

  const cycleDhikr = () => {
    const audio = dhikrRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    const nextIndex = cycleDhikrIndex(dhikrIndex)
    setDhikrIndex(nextIndex)
    if (nextIndex >= 0 && dhikrRef.current) {
      dhikrRef.current.src = DHIKR_OPTIONS[nextIndex]
      dhikrRef.current.play().catch(() => {})
    }
  }

  const cycleWhiteNoise = () => {
    const audio = whiteNoiseRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    const nextIndex = cycleWhiteNoiseIndex(whiteNoiseIndex)
    setWhiteNoiseIndex(nextIndex)
    if (nextIndex >= 0 && whiteNoiseRef.current) {
      whiteNoiseRef.current.src = WHITE_NOISE_OPTIONS[nextIndex]
      whiteNoiseRef.current.play().catch(() => {})
    }
  }

  useEffect(() => {
    const a = narrationRef.current
    if (!a || !hasNarration) return
    const onEnded = () => {
      setNarrationPlaying(false)
      if (loopStory) {
        a.currentTime = 0
        a.play().catch(() => {})
      }
    }
    a.addEventListener('ended', onEnded)
    return () => a.removeEventListener('ended', onEnded)
  }, [loopStory, hasNarration])

  useEffect(() => {
    setNarrationPlaying(false)
    setDhikrIndex(-1)
    setWhiteNoiseIndex(-1)
    narrationRef.current?.pause()
    dhikrRef.current?.pause()
    dhikrRef.current && (dhikrRef.current.src = '')
    whiteNoiseRef.current?.pause()
    whiteNoiseRef.current && (whiteNoiseRef.current.src = '')
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
    <main className="max-w-4xl mx-auto px-4 sm:px-5 pt-6 sm:pt-8 pb-44 sm:pb-48">
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

      {/* Fixed bottom media player - centered */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream border-t border-sage-light/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 py-3 sm:py-4">
          {/* Row 1: Prev | Play-Pause | Next - centered */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={!prev}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl bg-sage-light/30 text-sage-dark disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation text-xl"
              aria-label="Previous story"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={toggleNarration}
              disabled={!hasNarration}
              className="min-h-[52px] min-w-[52px] flex items-center justify-center rounded-xl bg-sage/30 text-sage-dark disabled:opacity-40 touch-manipulation text-2xl"
              aria-label={narrationPlaying ? 'Pause' : 'Play'}
            >
              {narrationPlaying ? '⏸' : '▶'}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!next}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl bg-sage-light/30 text-sage-dark disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation text-xl"
              aria-label="Next story"
            >
              ⏭
            </button>
          </div>

          {/* Row 2: Speed | Loop | Dhikr | White noise */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={cycleSpeed}
              className="min-h-[44px] px-4 rounded-xl bg-sage-light/30 text-sage-dark text-sm font-medium touch-manipulation"
              title="Change narration speed"
            >
              {playbackRate}x
            </button>
            <button
              type="button"
              onClick={() => setLoopStory(!loopStory)}
              className={`min-h-[44px] px-4 rounded-xl text-sm font-medium touch-manipulation ${
                loopStory ? 'bg-sage/40 text-sage-dark' : 'bg-sage-light/30 text-sage-dark'
              }`}
              aria-pressed={loopStory}
            >
              Loop {loopStory ? 'On' : 'Off'}
            </button>
            <button
              type="button"
              onClick={cycleDhikr}
              className={`min-h-[44px] px-4 rounded-xl text-sm font-medium touch-manipulation ${
                dhikrIndex >= 0 ? 'bg-sage/40 text-sage-dark' : 'bg-sage-light/30 text-sage-dark'
              }`}
            >
              Dhikr {dhikrIndex < 0 ? 'Off' : dhikrIndex + 1}
            </button>
            <button
              type="button"
              onClick={cycleWhiteNoise}
              className={`min-h-[44px] px-4 rounded-xl text-sm font-medium touch-manipulation ${
                whiteNoiseIndex >= 0 ? 'bg-sage/40 text-sage-dark' : 'bg-sage-light/30 text-sage-dark'
              }`}
            >
              White noise {whiteNoiseIndex < 0 ? 'Off' : whiteNoiseIndex + 1}
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
      <audio ref={dhikrRef} loop />
      <audio ref={whiteNoiseRef} loop />
    </main>
  )
}
