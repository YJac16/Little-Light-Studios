import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Story } from '../types/story'

interface StoryCoverCardProps {
  story: Story
  size?: 'hero' | 'row'
  className?: string
}

const sizeStyles = {
  hero: {
    card: 'w-[148px] xs:w-[168px] sm:w-[188px]',
    cover: 'aspect-[3/4]',
    title: 'text-sm sm:text-base',
  },
  row: {
    card: 'w-[120px] xs:w-[132px] sm:w-[148px]',
    cover: 'aspect-[3/4]',
    title: 'text-xs sm:text-sm',
  },
} as const

export function StoryCoverCard({ story, size = 'row', className = '' }: StoryCoverCardProps) {
  const styles = sizeStyles[size]

  return (
    <Link
      to={`/stories/${story.id}`}
      className={`group flex shrink-0 flex-col gap-2.5 touch-manipulation ${styles.card} ${className}`}
      aria-label={`Open story: ${story.title}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl border border-ink/8 bg-cream-dark shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift group-active:scale-[0.98] ${styles.cover}`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-ink/10"
          aria-hidden
        />
        <img
          src={story.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-ink/10 to-transparent"
          aria-hidden
        />
      </div>
      <span
        className={`line-clamp-2 px-0.5 text-center font-display font-semibold leading-snug text-ink transition-colors group-hover:text-sage-dark ${styles.title}`}
      >
        {story.title}
      </span>
    </Link>
  )
}

interface InfiniteStoryCarouselProps {
  stories: Story[]
}

export function InfiniteStoryCarousel({ stories }: InfiniteStoryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const loopStories = stories.length > 1 ? [...stories, ...stories, ...stories] : stories

  const jumpToMiddle = useCallback(() => {
    const track = trackRef.current
    if (!track || stories.length <= 1) return

    const segment = track.scrollWidth / 3
    if (segment <= 0) return

    if (track.scrollLeft < segment * 0.35) {
      track.scrollLeft += segment
    } else if (track.scrollLeft > segment * 1.65) {
      track.scrollLeft -= segment
    }
  }, [stories.length])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || stories.length <= 1 || reducedMotion) return

    const tick = () => {
      if (!pausedRef.current) {
        track.scrollLeft += 0.45
        jumpToMiddle()
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const init = window.setTimeout(() => {
      const segment = track.scrollWidth / 3
      if (segment > 0) track.scrollLeft = segment
      rafRef.current = requestAnimationFrame(tick)
    }, 80)

    return () => {
      window.clearTimeout(init)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [jumpToMiddle, reducedMotion, stories.length])

  const pause = () => {
    pausedRef.current = true
  }

  const resume = () => {
    pausedRef.current = false
  }

  return (
    <div
      className="relative -mx-4 sm:-mx-6"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onTouchCancel={resume}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream/95 to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream/95 to-transparent sm:w-14"
        aria-hidden
      />

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto px-4 pb-2 pt-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:px-6 [&::-webkit-scrollbar]:hidden"
        onScroll={jumpToMiddle}
        aria-label="Featured story covers"
      >
        {loopStories.map((story, index) => (
          <div key={`${story.id}-${index}`} className="snap-center">
            <StoryCoverCard story={story} size="hero" />
          </div>
        ))}
      </div>
    </div>
  )
}

interface StoryShelfRowProps {
  title: string
  stories: Story[]
  id?: string
}

export function StoryShelfRow({ title, stories, id }: StoryShelfRowProps) {
  if (stories.length === 0) return null

  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-3 font-display text-lg font-semibold text-ink sm:text-xl">
        {title}
      </h2>
      <div className="relative -mx-4 sm:-mx-6">
        <div
          className="flex gap-3 overflow-x-auto px-4 pb-1 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:px-6 [&::-webkit-scrollbar]:hidden"
          aria-label={`${title} stories`}
        >
          {stories.map((story) => (
            <div key={story.id} className="snap-start">
              <StoryCoverCard story={story} size="row" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
