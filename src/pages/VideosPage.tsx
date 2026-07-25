import { useMemo, useState } from 'react'
import { VideoCard } from '../components/VideoCard'
import { VideoModal } from '../components/VideoModal'
import videosData from '../data/videos.json'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  VIDEO_GROUP_LABELS,
  VIDEO_GROUP_ORDER,
  type Video,
  type VideoGroup,
} from '../types/video'

export function VideosPage() {
  useDocumentTitle('Videos')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const videos = videosData as Video[]

  const groups = useMemo(() => {
    const present = VIDEO_GROUP_ORDER.filter((group) => videos.some((v) => v.group === group))
    return present.map((group) => ({
      group,
      items: videos.filter((v) => v.group === group),
    }))
  }, [videos])

  const showGroupHeadings = groups.length > 1

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
      <header className="mb-8 max-w-xl">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Calm learning videos</h1>
        <p className="mt-2 text-ink-muted">
          Gentle picks from{' '}
          <a
            href="https://www.youtube.com/@LivelyLittleLearners"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-dark underline-offset-2 hover:underline"
          >
            Lively Little Learners
          </a>
          . More videos arrive as the channel grows.
        </p>
      </header>

      <div className="space-y-10">
        {groups.map(({ group, items }) => (
          <section key={group} aria-labelledby={showGroupHeadings ? `video-group-${group}` : undefined}>
            {showGroupHeadings && (
              <h2
                id={`video-group-${group}`}
                className="mb-4 font-display text-lg font-semibold text-sage-dark"
              >
                {VIDEO_GROUP_LABELS[group as VideoGroup]}
              </h2>
            )}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {items.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="mt-10 rounded-2xl border border-dawn/40 bg-white/70 p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Kind play nearby</h2>
        <p className="mt-2 text-sm text-ink-muted">
          For gentle games, visit our partner{' '}
          <a
            href="https://little-muslim-hero.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-dark underline-offset-2 hover:underline"
          >
            Little Muslim Hero
          </a>{' '}
          (opens in a new tab).
        </p>
      </aside>

      {selectedVideo && (
        <VideoModal
          title={selectedVideo.title}
          youtubeId={selectedVideo.youtubeId}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </main>
  )
}
