import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const storiesPath = join(root, 'src/data/stories.json')
const videosPath = join(root, 'src/data/videos.json')
const audioDir = join(root, 'public/audio')

const STORY_CATEGORIES = new Set(['prophets', 'nap', 'kind-habits'])
const COVER_THEMES = new Set([
  'kindness',
  'stars',
  'ark',
  'river',
  'whale',
  'truck',
  'helpers',
  'lantern',
  'patience',
  'birds',
  'rain',
  'moon',
  'dates',
  'hands',
  'morning',
  'peace',
])
const VIDEO_GROUPS = new Set(['stories', 'learning', 'songs'])

const errors = []
const warnings = []

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (err) {
    errors.push(`Failed to parse ${path}: ${err.message}`)
    return null
  }
}

const stories = loadJson(storiesPath)
const videos = loadJson(videosPath)
const audioFiles = existsSync(audioDir)
  ? new Set(readdirSync(audioDir).filter((f) => f.endsWith('.mp3')))
  : new Set()

if (Array.isArray(stories)) {
  const ids = new Set()
  for (const story of stories) {
    if (!story?.id || typeof story.id !== 'string') {
      errors.push('Story missing string id')
      continue
    }
    if (ids.has(story.id)) errors.push(`Duplicate story id: ${story.id}`)
    ids.add(story.id)

    for (const field of ['title', 'text', 'category', 'cover']) {
      if (!story[field]) errors.push(`Story ${story.id} missing ${field}`)
    }
    if (story.category && !STORY_CATEGORIES.has(story.category)) {
      errors.push(`Story ${story.id} has invalid category: ${story.category}`)
    }
    if (story.cover && !COVER_THEMES.has(story.cover)) {
      errors.push(`Story ${story.id} has invalid cover: ${story.cover}`)
    }

    const expectedFile = `${story.id}-narration.mp3`
    const expectedUrl = `/audio/${expectedFile}`

    if (story.narrationUrl != null) {
      if (typeof story.narrationUrl !== 'string' || !story.narrationUrl.startsWith('/audio/')) {
        errors.push(`Story ${story.id} narrationUrl must be null or start with /audio/`)
      } else {
        const fileName = story.narrationUrl.replace('/audio/', '')
        if (!audioFiles.has(fileName)) {
          errors.push(`Story ${story.id} narrationUrl points to missing file: ${story.narrationUrl}`)
        }
      }
    } else if (audioFiles.has(expectedFile)) {
      warnings.push(
        `Story ${story.id} has ${expectedFile} on disk but narrationUrl is null — wire ${expectedUrl}`,
      )
    } else {
      warnings.push(`Missing narration (record later): public/audio/${expectedFile}`)
    }
  }
} else if (stories !== null) {
  errors.push('stories.json must be an array')
}

if (Array.isArray(videos)) {
  const ids = new Set()
  for (const video of videos) {
    if (!video?.id) {
      errors.push('Video missing id')
      continue
    }
    if (ids.has(video.id)) errors.push(`Duplicate video id: ${video.id}`)
    ids.add(video.id)
    for (const field of ['title', 'thumbnail', 'youtubeId', 'group']) {
      if (!video[field]) errors.push(`Video ${video.id} missing ${field}`)
    }
    if (video.group && !VIDEO_GROUPS.has(video.group)) {
      errors.push(`Video ${video.id} has invalid group: ${video.group}`)
    }
  }
} else if (videos !== null) {
  errors.push('videos.json must be an array')
}

if (warnings.length) {
  console.log('Content warnings:')
  for (const w of warnings) console.log(`  - ${w}`)
}

if (errors.length) {
  console.error('\nContent errors:')
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log(
  `\nContent OK — ${Array.isArray(stories) ? stories.length : 0} stories, ${
    Array.isArray(videos) ? videos.length : 0
  } videos (${warnings.length} narration warnings).`,
)
