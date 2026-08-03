import { useState } from 'react'
import { VideoCard } from '../components/VideoCard'
import { VideoModal } from '../components/VideoModal'
import videosData from '../data/videos.json'

interface Video {
  id: string
  title: string
  thumbnail: string
  youtubeId: string
  description?: string
}

export function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const videos = videosData as Video[]

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dawn-mesh opacity-60" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10 text-center sm:text-left animate-rise">
          <p className="text-sm font-sans font-semibold tracking-wide uppercase text-sky-deep mb-2">
            Watch gently
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-3">
            Calm Learning Videos
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-xl mx-auto sm:mx-0 leading-relaxed">
            Soft, parent-friendly videos for little learners.
          </p>
        </header>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <div
              key={video.id}
              className="animate-rise"
              style={{ animationDelay: `${60 + i * 60}ms` }}
            >
              <VideoCard
                title={video.title}
                thumbnail={video.thumbnail}
                onClick={() => setSelectedVideo(video)}
              />
            </div>
          ))}
        </div>
      </div>

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
