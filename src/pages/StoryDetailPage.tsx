import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import storiesData from '../data/stories.json'
import { READING_TIPS } from '../data/readingTips'
import { DHIKR_OPTIONS, WHITE_NOISE_OPTIONS } from '../data/audioOptions'
import { StoryCover } from '../components/StoryCover'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fadeOutAudios, resetAudioVolumes, SLEEP_FADE_SECONDS } from '../lib/audioFade'
import {
  getTonightQueue,
  setContinueListening,
  clearContinueListening,
  toggleQueueStory,
} from '../lib/storage'
import { AGE_BAND_LABELS, type Story } from '../types/story'

const stories = storiesData as Story[]
const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25]
const TIMER_OPTIONS = [0, 5, 10, 15, 20] as const

function findStory(id: string): Story | null {
  return stories.find((s) => s.id === id) ?? null
}

function getPrevNextIds(currentId: string): { prev: string | null; next: string | null } {
  const idx = stories.findIndex((s) => s.id === currentId)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? stories[idx - 1].id : null,
    next: idx < stories.length - 1 ? stories[idx + 1].id : null,
  }
}

function cycleIndex(current: number, length: number): number {
  if (current < 0) return 0
  if (current < length - 1) return current + 1
  return -1
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function StoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const story = id ? findStory(id) : null
  useDocumentTitle(story?.title ?? 'Story')

  if (!story) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-ink-muted">Story not found.</p>
        <Link to="/stories" className="mt-4 inline-block text-sage-dark hover:underline">
          ← Back to Stories
        </Link>
      </main>
    )
  }

  return <StoryPlayer key={story.id} story={story} />
}

function StoryPlayer({ story }: { story: Story }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { prev, next } = getPrevNextIds(story.id)
  const resumeAt = (location.state as { resumeAt?: number } | null)?.resumeAt

  const narrationRef = useRef<HTMLAudioElement>(null)
  const dhikrRef = useRef<HTMLAudioElement>(null)
  const whiteNoiseRef = useRef<HTMLAudioElement>(null)
  const cancelFadeRef = useRef<(() => void) | null>(null)
  const fadingRef = useRef(false)
  const lastSaveRef = useRef(0)

  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const [narrationAvailable, setNarrationAvailable] = useState(!!story.narrationUrl)
  const [loopStory, setLoopStory] = useState(false)
  const [dhikrIndex, setDhikrIndex] = useState(-1)
  const [whiteNoiseIndex, setWhiteNoiseIndex] = useState(-1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [sleepMinutes, setSleepMinutes] = useState(0)
  const [sleepRemaining, setSleepRemaining] = useState<number | null>(null)
  const [fadingOut, setFadingOut] = useState(false)
  const [inQueue, setInQueue] = useState(() => getTonightQueue().includes(story.id))

  const allAudios = () => [narrationRef.current, dhikrRef.current, whiteNoiseRef.current]

  useEffect(() => {
    const a = narrationRef.current
    if (a) a.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const a = narrationRef.current
    if (!a || !narrationAvailable) return
    if (typeof resumeAt === 'number' && resumeAt > 0) {
      const apply = () => {
        a.currentTime = resumeAt
        setCurrentTime(resumeAt)
      }
      if (a.readyState >= 1) apply()
      else a.addEventListener('loadedmetadata', apply, { once: true })
    }
  }, [narrationAvailable, resumeAt])

  useEffect(() => {
    const a = narrationRef.current
    if (!a || !narrationAvailable) return
    const onEnded = () => {
      setNarrationPlaying(false)
      clearContinueListening(story.id)
      if (loopStory) {
        a.currentTime = 0
        a.play().catch(() => {})
      }
    }
    const onTime = () => {
      setCurrentTime(a.currentTime)
      const now = Date.now()
      if (now - lastSaveRef.current > 4000) {
        lastSaveRef.current = now
        setContinueListening(story.id, a.currentTime)
      }
    }
    const onMeta = () => setDuration(a.duration || 0)
    a.addEventListener('ended', onEnded)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    return () => {
      a.removeEventListener('ended', onEnded)
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      if (a.currentTime > 2) setContinueListening(story.id, a.currentTime)
    }
  }, [loopStory, narrationAvailable, story.id])

  useEffect(() => {
    if (sleepMinutes <= 0) {
      cancelFadeRef.current?.()
      cancelFadeRef.current = null
      fadingRef.current = false
      resetAudioVolumes(allAudios())
      return
    }

    const id = window.setInterval(() => {
      setSleepRemaining((prev) => {
        if (prev === null) return null

        if (prev <= SLEEP_FADE_SECONDS && !fadingRef.current) {
          fadingRef.current = true
          setFadingOut(true)
          cancelFadeRef.current?.()
          cancelFadeRef.current = fadeOutAudios(allAudios(), () => {
            setNarrationPlaying(false)
            setSleepMinutes(0)
            setSleepRemaining(null)
            fadingRef.current = false
            setFadingOut(false)
            resetAudioVolumes(allAudios())
          })
        }

        if (prev <= 1) {
          cancelFadeRef.current?.()
          cancelFadeRef.current = null
          narrationRef.current?.pause()
          dhikrRef.current?.pause()
          whiteNoiseRef.current?.pause()
          resetAudioVolumes(allAudios())
          setNarrationPlaying(false)
          setSleepMinutes(0)
          fadingRef.current = false
          setFadingOut(false)
          return null
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(id)
    }
  }, [sleepMinutes])

  const toggleNarration = () => {
    const audio = narrationRef.current
    if (!audio || !narrationAvailable) return
    if (narrationPlaying) {
      audio.pause()
      setNarrationPlaying(false)
      setContinueListening(story.id, audio.currentTime)
    } else {
      resetAudioVolumes([audio])
      audio.play().catch(() => setNarrationAvailable(false))
      setNarrationPlaying(true)
    }
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
    const nextIndex = cycleIndex(dhikrIndex, DHIKR_OPTIONS.length)
    setDhikrIndex(nextIndex)
    if (nextIndex >= 0 && dhikrRef.current) {
      dhikrRef.current.src = DHIKR_OPTIONS[nextIndex]
      dhikrRef.current.volume = 1
      dhikrRef.current.play().catch(() => {})
    }
  }

  const cycleWhiteNoise = () => {
    const audio = whiteNoiseRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    const nextIndex = cycleIndex(whiteNoiseIndex, WHITE_NOISE_OPTIONS.length)
    setWhiteNoiseIndex(nextIndex)
    if (nextIndex >= 0 && whiteNoiseRef.current) {
      whiteNoiseRef.current.src = WHITE_NOISE_OPTIONS[nextIndex]
      whiteNoiseRef.current.volume = 1
      whiteNoiseRef.current.play().catch(() => {})
    }
  }

  const cycleTimer = () => {
    cancelFadeRef.current?.()
    cancelFadeRef.current = null
    fadingRef.current = false
    setFadingOut(false)
    resetAudioVolumes(allAudios())
    const i = TIMER_OPTIONS.indexOf(sleepMinutes as (typeof TIMER_OPTIONS)[number])
    const next = TIMER_OPTIONS[(i + 1) % TIMER_OPTIONS.length]
    setSleepMinutes(next)
    setSleepRemaining(next > 0 ? next * 60 : null)
  }

  const onScrub = (value: number) => {
    const audio = narrationRef.current
    if (!audio || !narrationAvailable) return
    audio.currentTime = value
    setCurrentTime(value)
    setContinueListening(story.id, value)
  }

  const onToggleQueue = () => {
    const next = toggleQueueStory(story.id)
    setInQueue(next.includes(story.id))
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-52 pt-6 sm:px-5 sm:pb-56 sm:pt-8">
      <Link
        to="/stories"
        className="-my-1 mb-6 inline-block py-2 text-sm font-medium text-sage-dark hover:text-sage"
      >
        ← Back to Stories
      </Link>

      <StoryCover theme={story.cover} title={story.title} size="lg" className="mb-6" />

      <div className="mb-6 rounded-2xl border border-dawn/40 bg-dawn-soft/50 p-4 sm:p-5">
        <h2 className="font-display font-semibold text-ink">{READING_TIPS.title}</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-muted">
          {READING_TIPS.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-sage-muted/50 px-2.5 py-1 text-xs font-semibold text-sage-dark">
          {AGE_BAND_LABELS[story.ageBand]}
        </span>
        <button
          type="button"
          onClick={onToggleQueue}
          className={`min-h-[36px] rounded-lg px-3 text-xs font-semibold transition ${
            inQueue ? 'bg-sage-dark text-white' : 'bg-white border border-dawn/50 text-ink-muted'
          }`}
        >
          {inQueue ? 'In tonight’s queue' : 'Add to tonight’s queue'}
        </button>
      </div>

      <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">{story.title}</h1>
      {story.subtitle && <p className="mt-1 text-sm text-ink-muted">{story.subtitle}</p>}

      {!narrationAvailable && (
        <p className="mt-4 rounded-xl bg-sand px-3 py-2 text-sm text-ink-muted">
          Narration is not available yet — this is a read-aloud story. Dim the lights and take it slow.
        </p>
      )}

      {fadingOut && (
        <p className="mt-4 rounded-xl bg-dawn-soft px-3 py-2 text-sm text-sage-dark">
          Sleep timer fading out gently…
        </p>
      )}

      <div className="mt-6 overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-dawn/40 bg-white/85 p-5 sm:p-6 md:p-8">
        <p className="whitespace-pre-wrap font-display text-base leading-relaxed text-ink md:text-lg">
          {story.text}
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-dawn/40 bg-mist-soft/95 shadow-[0_-4px_24px_rgba(47,58,54,0.08)] backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-5 sm:py-4">
          {narrationAvailable && (
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
                value={currentTime}
                onChange={(e) => onScrub(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-sage-dark"
              />
              <div className="mt-1 flex justify-between text-xs text-ink-soft">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={!prev}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-sage-muted/50 text-sage-dark disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous story"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={toggleNarration}
              disabled={!narrationAvailable}
              className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-xl bg-sage/35 text-2xl text-sage-dark disabled:opacity-40"
              aria-label={narrationPlaying ? 'Pause' : 'Play'}
            >
              {narrationPlaying ? '⏸' : '▶'}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!next}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-sage-muted/50 text-sage-dark disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next story"
            >
              ⏭
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={cycleSpeed}
              className="min-h-[44px] rounded-xl bg-sage-muted/50 px-4 text-sm font-medium text-sage-dark"
              title="Change narration speed"
            >
              {playbackRate}x
            </button>
            <button
              type="button"
              onClick={() => setLoopStory(!loopStory)}
              className={`min-h-[44px] rounded-xl px-4 text-sm font-medium ${
                loopStory ? 'bg-sage/40 text-sage-dark' : 'bg-sage-muted/50 text-sage-dark'
              }`}
              aria-pressed={loopStory}
            >
              Loop {loopStory ? 'On' : 'Off'}
            </button>
            <button
              type="button"
              onClick={cycleDhikr}
              className={`min-h-[44px] rounded-xl px-4 text-sm font-medium ${
                dhikrIndex >= 0 ? 'bg-sage/40 text-sage-dark' : 'bg-sage-muted/50 text-sage-dark'
              }`}
            >
              Dhikr {dhikrIndex < 0 ? 'Off' : dhikrIndex + 1}
            </button>
            <button
              type="button"
              onClick={cycleWhiteNoise}
              className={`min-h-[44px] rounded-xl px-4 text-sm font-medium ${
                whiteNoiseIndex >= 0 ? 'bg-sage/40 text-sage-dark' : 'bg-sage-muted/50 text-sage-dark'
              }`}
            >
              White noise {whiteNoiseIndex < 0 ? 'Off' : whiteNoiseIndex + 1}
            </button>
            <button
              type="button"
              onClick={cycleTimer}
              className={`min-h-[44px] rounded-xl px-4 text-sm font-medium ${
                sleepMinutes > 0 ? 'bg-sage/40 text-sage-dark' : 'bg-sage-muted/50 text-sage-dark'
              }`}
              title="Sleep timer with gentle fade-out"
            >
              {sleepMinutes === 0
                ? 'Timer Off'
                : sleepRemaining !== null
                  ? `Timer ${formatTime(sleepRemaining)}`
                  : `Timer ${sleepMinutes}m`}
            </button>
          </div>
        </div>
      </div>

      {story.narrationUrl && narrationAvailable && (
        <audio
          ref={narrationRef}
          src={story.narrationUrl}
          preload="metadata"
          onPlay={() => setNarrationPlaying(true)}
          onPause={() => setNarrationPlaying(false)}
          onError={() => {
            setNarrationAvailable(false)
            setNarrationPlaying(false)
          }}
        />
      )}
      <audio ref={dhikrRef} loop />
      <audio ref={whiteNoiseRef} loop />
    </main>
  )
}
