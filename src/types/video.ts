export type VideoGroup = 'stories' | 'learning' | 'songs'

export interface Video {
  id: string
  title: string
  thumbnail: string
  youtubeId: string
  description?: string
  group: VideoGroup
}

export const VIDEO_GROUP_LABELS: Record<VideoGroup, string> = {
  stories: 'Story videos',
  learning: 'Gentle learning',
  songs: 'Calm songs',
}

export const VIDEO_GROUP_ORDER: VideoGroup[] = ['stories', 'learning', 'songs']
