import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import storiesData from '../data/stories.json'
import { READING_TIPS } from '../data/readingTips'
import { DHIKR_OPTIONS, WHITE_NOISE_OPTIONS } from '../data/audioOptions'
import { EmptyState } from '../components/EmptyState'
import { formatTime, narrationPath, probeNarration } from '../lib/narration'

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
  const story = id ? findStory(id) : null

  if (!story) {
    return (
      <EmptyState
        kicker="Stories"
        title="This story is not here"
        body="That story is not in the library. Open Stories to pick a nap or bedtime read."
        actions={
          <>
            <Link
              to="/stories"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-ink text-cream font-sans font-bold touch-manipulation"
            >
              Back to Stories
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-white/85 text-ink font-sans font-bold border border-ink/10 touch-manipulation"
            >
              Home
            </Link>
          </>
        }
      />
    )
  }

  return <StoryPlayer key={story.id} story={story} />
}

function StoryPlayer({ story }: { story: Story }) {
  const navigate = useNavigate()
  const { prev, next } = getPrevNextIds(story.id)
  const narrationUrl = story.narrationUrl || narrationPath(story.id)

  const narrationRef = useRef<HTMLAudioElement>(null)
  const dhikrRef = useRef<HTMLAudioElement>(null)
  const whiteNoiseRef = useRef<HTMLAudioElement>(null)

  const [audioStatus, setAudioStatus] = useState<'pending' | 'ready' | 'failed'>('pending')
  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const [loopStory, setLoopStory] = useState(false)
  const [dhikrIndex, setDhikrIndex] = useState(-1)
  const [whiteNoiseIndex, setWhiteNoiseIndex] = useState(-1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const canPlay = audioStatus === 'ready'

  useEffect(() => {
    let cancelled = false

    probeNarration(narrationUrl).then((ok) => {
      if (!cancelled) setAudioStatus(ok ? 'ready' : 'failed')
    })

    return () => {
      cancelled = true
    }
  }, [narrationUrl])

  useEffect(() => {
    const a = narrationRef.current
    if (a) a.playbackRate = playbackRate
  }, [playbackRate, audioStatus])

  const markFailed = () => {
    const audio = narrationRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setNarrationPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setAudioStatus('failed')
  }

  const retryNarration = () => {
    setAudioStatus('pending')
    setNarrationPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    const audio = narrationRef.current
    if (audio) {
      audio.pause()
      audio.load()
    }
    probeNarration(narrationUrl).then((ok) => {
      setAudioStatus(ok ? 'ready' : 'failed')
    })
  }

  const toggleNarration = () => {
    const audio = narrationRef.current
    if (!audio || !canPlay) return
    if (narrationPlaying) {
      audio.pause()
      return
    }
    void audio.play().catch(() => {
      markFailed()
    })
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

  const onScrub = (value: number) => {
    const audio = narrationRef.current
    if (!audio || !canPlay) return
    audio.currentTime = value
    setCurrentTime(value)
  }

  return (
    <main className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-64 sm:pb-56">
      <Link
        to="/stories"
        className="inline-flex items-center min-h-[44px] py-2 -my-1 text-sage-dark hover:text-sage text-sm font-sans font-semibold mb-6 touch-manipulation"
      >
        ← Back to Stories
      </Link>

      <div className="rounded-3xl bg-lavender-light/35 border border-lavender-light/80 p-4 sm:p-5 mb-6">
        <h3 className="font-display font-semibold text-ink mb-2">{READING_TIPS.title}</h3>
        <ul className="text-sm text-ink-muted space-y-1 list-disc list-inside font-sans">
          {READING_TIPS.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1 leading-tight">
        {story.title}
      </h1>
      {story.subtitle && (
        <p className="text-ink-muted text-sm mb-6 font-sans">{story.subtitle}</p>
      )}

      {audioStatus === 'failed' && (
        <div
          className="mb-6 rounded-2xl border border-honey/40 bg-honey-soft/60 px-4 py-3"
          role="status"
        >
          <p className="font-sans font-semibold text-ink text-sm">Read aloud</p>
          <p className="mt-1 text-sm text-ink-muted font-sans leading-relaxed">
            Narration is not available yet. Read the story slowly, or retry if the
            audio file was just added.
          </p>
          <button
            type="button"
            onClick={retryNarration}
            className="mt-3 inline-flex min-h-[44px] items-center px-4 rounded-xl bg-white/80 text-sage-dark font-sans font-semibold text-sm touch-manipulation"
          >
            Retry audio
          </button>
        </div>
      )}

      <div className="bg-white/90 rounded-3xl border border-sage-light/30 p-5 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden overscroll-contain shadow-soft">
        <p className="text-ink leading-relaxed whitespace-pre-wrap font-sans text-base md:text-lg">
          {story.text}
        </p>
      </div>

      <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom))] sm:bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-sage-light/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] sm:pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {canPlay && (
            <div className="mb-3">
              <label className="sr-only" htmlFor="story-progress">
                Story progress
              </label>
              <input
                id="story-progress"
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Number.isFinite(currentTime) ? currentTime : 0}
                onChange={(e) => onScrub(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-sage-dark"
              />
              <div className="mt-1 flex justify-between text-xs font-sans text-ink-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

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
              disabled={!canPlay}
              className="min-h-[52px] min-w-[52px] flex items-center justify-center rounded-xl bg-sage/30 text-sage-dark disabled:opacity-40 touch-manipulation text-2xl"
              aria-label={
                !canPlay
                  ? audioStatus === 'pending'
                    ? 'Checking narration'
                    : 'Narration unavailable'
                  : narrationPlaying
                    ? 'Pause'
                    : 'Play'
              }
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

      {canPlay && (
        <audio
          ref={narrationRef}
          src={narrationUrl}
          preload="metadata"
          onPlay={() => setNarrationPlaying(true)}
          onPause={() => setNarrationPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            const nextDuration = e.currentTarget.duration
            if (!Number.isFinite(nextDuration) || nextDuration <= 0) {
              markFailed()
              return
            }
            setDuration(nextDuration)
          }}
          onError={markFailed}
          onEnded={(e) => {
            setNarrationPlaying(false)
            if (loopStory) {
              e.currentTarget.currentTime = 0
              e.currentTarget.play().catch(() => {
                markFailed()
              })
            }
          }}
        />
      )}
      <audio ref={dhikrRef} loop />
      <audio ref={whiteNoiseRef} loop />
    </main>
  )
}
