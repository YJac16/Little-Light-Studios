import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import storiesData from '../data/stories.json'
import { READING_TIPS } from '../data/readingTips'
import { DHIKR_OPTIONS, WHITE_NOISE_OPTIONS } from '../data/audioOptions'
import type { Story } from '../types/story'

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

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function IconPrev() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M16 6h2v12h-2V6zM6 6l8.5 6L6 18V6z" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  )
}

function IconPlaySmall() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function IconPauseSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  )
}

function IconChevronUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden>
      <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PLAYER_EXPANDED_KEY = 'lls-story-player-expanded'

function readPlayerExpanded(): boolean {
  try {
    return sessionStorage.getItem(PLAYER_EXPANDED_KEY) === 'true'
  } catch {
    return false
  }
}

function writePlayerExpanded(expanded: boolean) {
  try {
    sessionStorage.setItem(PLAYER_EXPANDED_KEY, String(expanded))
  } catch {
    // ignore storage errors
  }
}

const PLAYER_SCRUBBER_STYLES = `
.story-player-scrubber::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 9999px;
  background: rgba(183, 208, 187, 0.45);
}
.story-player-scrubber::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -4px;
  border-radius: 9999px;
  background: #6f9b78;
  border: 2px solid #fff9f1;
  box-shadow: 0 1px 3px rgba(31, 42, 46, 0.15);
}
.story-player-scrubber::-moz-range-track {
  height: 6px;
  border-radius: 9999px;
  background: rgba(183, 208, 187, 0.45);
}
.story-player-scrubber::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: #6f9b78;
  border: 2px solid #fff9f1;
  box-shadow: 0 1px 3px rgba(31, 42, 46, 0.15);
}
.story-player-scrubber:disabled::-webkit-slider-thumb,
.story-player-scrubber:disabled::-moz-range-thumb {
  background: #b7d0bb;
}
`

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
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [playerExpanded, setPlayerExpanded] = useState(readPlayerExpanded)

  const hasNarration = !!story?.narrationUrl
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  const togglePlayerExpanded = () => {
    setPlayerExpanded((prev) => {
      const next = !prev
      writePlayerExpanded(next)
      return next
    })
  }

  useEffect(() => {
    const a = narrationRef.current
    if (a) a.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const a = narrationRef.current
    if (!a || !hasNarration) return

    const onTimeUpdate = () => {
      if (!isSeeking) setCurrentTime(a.currentTime)
    }
    const onLoadedMetadata = () => setDuration(a.duration || 0)
    const onDurationChange = () => setDuration(a.duration || 0)

    a.addEventListener('timeupdate', onTimeUpdate)
    a.addEventListener('loadedmetadata', onLoadedMetadata)
    a.addEventListener('durationchange', onDurationChange)

    if (a.duration) setDuration(a.duration)

    return () => {
      a.removeEventListener('timeupdate', onTimeUpdate)
      a.removeEventListener('loadedmetadata', onLoadedMetadata)
      a.removeEventListener('durationchange', onDurationChange)
    }
  }, [hasNarration, isSeeking, story?.narrationUrl])

  const handleSeek = (value: number) => {
    const a = narrationRef.current
    if (!a || !hasNarration) return
    a.currentTime = value
    setCurrentTime(value)
  }

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
    <main
      className={`relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 ${
        playerExpanded ? 'pb-44 sm:pb-40' : 'pb-28 sm:pb-24'
      }`}
    >
      <Link
        to="/stories"
        className="inline-flex items-center min-h-[44px] py-2 -my-1 text-sage-dark hover:text-sage text-sm font-sans font-semibold mb-6 touch-manipulation"
      >
        ← Back to Stories
      </Link>

      <div className="mb-6 overflow-hidden rounded-2xl border border-ink/8 bg-cream-dark shadow-soft sm:mb-8">
        <img
          src={story.cover}
          alt=""
          className="mx-auto aspect-[3/4] max-h-[min(52vh,420px)] w-full max-w-sm object-cover"
        />
      </div>

      {/* Reading tips */}
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

      {/* Story text */}
      <div className="bg-white/90 rounded-3xl border border-sage-light/30 p-5 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden overscroll-contain shadow-soft">
        <p className="text-ink leading-relaxed whitespace-pre-wrap font-sans text-base md:text-lg">
          {story.text}
        </p>
      </div>

      {/* Fixed bottom media player */}
      <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom))] sm:bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-sage-light/25 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] sm:pb-[env(safe-area-inset-bottom)]">
        <style>{PLAYER_SCRUBBER_STYLES}</style>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {playerExpanded ? (
            <div className="py-2.5 sm:py-3">
              <div className="flex justify-end mb-1.5">
                <button
                  type="button"
                  onClick={togglePlayerExpanded}
                  className="inline-flex items-center gap-1 min-h-[44px] px-2 -mr-2 text-xs font-sans font-medium text-ink-muted hover:text-sage-dark touch-manipulation"
                  aria-expanded={playerExpanded}
                  aria-label="Hide player"
                >
                  Hide player
                  <IconChevronDown />
                </button>
              </div>

              {/* Progress scrubber */}
              <div className="mb-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  disabled={!hasNarration || duration <= 0}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  onPointerDown={() => setIsSeeking(true)}
                  onPointerUp={() => setIsSeeking(false)}
                  className="story-player-scrubber w-full h-1.5 appearance-none rounded-full bg-sage-light/40 disabled:opacity-40 cursor-pointer touch-manipulation"
                  aria-label="Narration progress"
                />
                <div className="flex justify-between items-center mt-1 px-0.5">
                  <span className="text-[11px] font-sans tabular-nums text-ink-muted">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-[11px] font-sans tabular-nums text-ink-muted">
                    -{formatTime(Math.max(0, duration - currentTime))}
                  </span>
                </div>
              </div>

              {/* Main transport row */}
              <div className="flex items-center gap-1.5 mb-2">
                <p className="flex-1 min-w-0 truncate font-display font-semibold text-sm text-ink leading-tight">
                  {story.title}
                </p>
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!prev}
                  className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-sage-dark disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation hover:bg-sage-light/20"
                  aria-label="Previous story"
                >
                  <IconPrev />
                </button>
                <button
                  type="button"
                  onClick={toggleNarration}
                  disabled={!hasNarration}
                  className="shrink-0 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-sage text-cream disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
                  aria-label={narrationPlaying ? 'Pause' : 'Play'}
                >
                  {narrationPlaying ? <IconPause /> : <IconPlay />}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!next}
                  className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-sage-dark disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation hover:bg-sage-light/20"
                  aria-label="Next story"
                >
                  <IconNext />
                </button>
              </div>

              {/* Secondary controls */}
              <div className="flex flex-wrap justify-center items-center gap-1.5 pb-0.5">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="min-h-[44px] px-3 rounded-full border border-sage-light/60 text-sage-dark text-xs font-medium font-sans touch-manipulation hover:border-sage/40"
                  title="Change narration speed"
                >
                  {playbackRate}x
                </button>
                <button
                  type="button"
                  onClick={() => setLoopStory(!loopStory)}
                  className={`min-h-[44px] px-3 rounded-full border text-xs font-medium font-sans touch-manipulation ${
                    loopStory
                      ? 'border-sage/50 bg-sage/15 text-sage-dark'
                      : 'border-sage-light/60 text-ink-muted hover:border-sage/40'
                  }`}
                  aria-pressed={loopStory}
                >
                  Loop {loopStory ? 'On' : 'Off'}
                </button>
                <button
                  type="button"
                  onClick={cycleDhikr}
                  className={`min-h-[44px] px-3 rounded-full border text-xs font-medium font-sans touch-manipulation ${
                    dhikrIndex >= 0
                      ? 'border-sage/50 bg-sage/15 text-sage-dark'
                      : 'border-sage-light/60 text-ink-muted hover:border-sage/40'
                  }`}
                >
                  Dhikr {dhikrIndex < 0 ? 'Off' : dhikrIndex + 1}
                </button>
                <button
                  type="button"
                  onClick={cycleWhiteNoise}
                  className={`min-h-[44px] px-3 rounded-full border text-xs font-medium font-sans touch-manipulation ${
                    whiteNoiseIndex >= 0
                      ? 'border-sage/50 bg-sage/15 text-sage-dark'
                      : 'border-sage-light/60 text-ink-muted hover:border-sage/40'
                  }`}
                >
                  White noise {whiteNoiseIndex < 0 ? 'Off' : whiteNoiseIndex + 1}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {/* Hairline progress */}
              <div
                className="h-0.5 w-full rounded-full bg-sage-light/35 overflow-hidden mb-2"
                role="progressbar"
                aria-valuenow={currentTime}
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-label="Narration progress"
              >
                <div
                  className="h-full bg-sage rounded-full transition-[width] duration-300 ease-linear"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Collapsed transport row */}
              <div className="flex items-center gap-2">
                <p className="flex-1 min-w-0 truncate font-display font-semibold text-sm text-ink leading-tight">
                  {story.title}
                </p>
                <button
                  type="button"
                  onClick={toggleNarration}
                  disabled={!hasNarration}
                  className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-sage text-cream disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
                  aria-label={narrationPlaying ? 'Pause' : 'Play'}
                >
                  {narrationPlaying ? <IconPauseSmall /> : <IconPlaySmall />}
                </button>
                <button
                  type="button"
                  onClick={togglePlayerExpanded}
                  className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-ink-muted hover:text-sage-dark hover:bg-sage-light/20 touch-manipulation"
                  aria-expanded={playerExpanded}
                  aria-label="Show player"
                >
                  <IconChevronUp />
                </button>
              </div>
            </div>
          )}
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
