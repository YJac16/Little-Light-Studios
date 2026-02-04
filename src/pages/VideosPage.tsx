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
    <main className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
      <h2 className="text-xl font-serif font-medium text-ink mb-5 sm:mb-6">
        Calm Learning Videos
      </h2>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
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
