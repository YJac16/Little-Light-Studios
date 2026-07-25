# Little Light Studios

**Calm Stories. Kind Learning.**

A parent-friendly kids website focused on gentle Islamic learning, nap time, and bedtime content for young children. Designed for parents to navigate easily with a warm, peaceful, and trustworthy tone.

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel-ready static SPA

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

### Build

```bash
npm run build
npm run preview
```

## Content workflow

### Stories

Edit [`src/data/stories.json`](src/data/stories.json). Each story supports:

| Field | Notes |
|--------|--------|
| `id` | URL slug (`/stories/:id`) |
| `title`, `subtitle`, `blurb` | Parent-facing labels |
| `category` | `prophets` or `nap` |
| `text` | Full story body |
| `narrationUrl` | Path under `/audio/…`, or `null` for read-aloud only |

Place narration files as:

```text
public/audio/[story-id]-narration.mp3
```

Ambience files live at:

```text
public/audio/Dhikr-1.mp3
public/audio/Dhikr-2.mp3
public/audio/White-Noise-1.mp3
public/audio/White-Noise-2.mp3
```

### Videos

Edit [`src/data/videos.json`](src/data/videos.json). Use real YouTube IDs from [Lively Little Learners](https://www.youtube.com/@LivelyLittleLearners):

```json
{
  "id": "tidal-trio",
  "title": "Tidal Trio",
  "youtubeId": "IBsQIqzzl7s",
  "thumbnail": "https://img.youtube.com/vi/IBsQIqzzl7s/hqdefault.jpg",
  "description": "Short parent-facing blurb"
}
```

### Games

Games link out to [Little Muslim Hero](https://little-muslim-hero.vercel.app/) (partner play in a new tab).

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy (Vercel auto-detects Vite)

## Product roadmap

### Phase 0 — Production polish (current)

Brand-first home, trust pages, SEO basics, story categories, sleep timer + scrubber, original Little Light characters (no third-party IP), normalized audio paths, curated video entry.

### Phase 1 — Library completeness

- Narrations for every story (`public/audio/[id]-narration.mp3`)
- Grow to ~15–20 original stories (Prophets, Nap, Kind Habits)
- Cover illustrations per story
- Expand video catalog (10+) as the YouTube channel grows
- Optional JSON validation script for safer content updates

### Phase 2 — Competitive hub features (still no accounts)

- Sleep-timer fade-out for narration + ambience
- Local playlists / “Tonight’s queue” (`localStorage`)
- Continue listening (last-played story)
- Search/filter by category and age band
- Installable PWA with offline story text + key audio
- Optional privacy-respecting analytics (no child tracking)

### Phase 3 — Reach & durability

- Custom domain, OG images, `sitemap.xml`, `robots.txt`
- Performance: compress ambience audio, lazy routes, image optimization
- Accessibility audit (modals, reduced motion, player labels)
- Weekly content drop process
