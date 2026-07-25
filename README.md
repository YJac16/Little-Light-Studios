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

### Build & validate

```bash
npm run validate:content
npm run build
npm run preview
```

`validate:content` checks story/video schema and narration file wiring. Missing narrations are warnings (stories stay read-aloud until you add MP3s).

## Content workflow

### Stories

Edit [`src/data/stories.json`](src/data/stories.json). Each story supports:

| Field | Notes |
|--------|--------|
| `id` | URL slug (`/stories/:id`) |
| `title`, `subtitle`, `blurb` | Parent-facing labels |
| `category` | `prophets`, `nap`, or `kind-habits` |
| `cover` | Theme key for SVG cover art (see `StoryCover`) |
| `text` | Full story body |
| `narrationUrl` | `/audio/[id]-narration.mp3`, or `null` for read-aloud only |

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

### Narration checklist (record & drop into `public/audio/`)

Already wired:

- [x] `ibrahim-stars-narration.mp3`
- [x] `nuh-ark-narration.mp3`
- [x] `baby-musa-narration.mp3`

Still needed (set `narrationUrl` after adding the file):

- [ ] `kindest-man-narration.mp3`
- [ ] `prophet-yunus-narration.mp3`
- [ ] `esa-builder-truck-narration.mp3`
- [ ] `esa-rescue-pups-narration.mp3`
- [ ] `nuri-quiet-kitchen-narration.mp3`
- [ ] `prophet-yusuf-narration.mp3`
- [ ] `prophet-sulayman-narration.mp3`
- [ ] `esa-rainy-window-narration.mp3`
- [ ] `nuri-moon-walk-narration.mp3`
- [ ] `sharing-dates-narration.mp3`
- [ ] `gentle-hands-narration.mp3`
- [ ] `bismillah-morning-narration.mp3`
- [ ] `sorry-and-hug-narration.mp3`

### Videos

Edit [`src/data/videos.json`](src/data/videos.json). Use real YouTube IDs from [Lively Little Learners](https://www.youtube.com/@LivelyLittleLearners):

```json
{
  "id": "tidal-trio",
  "title": "Tidal Trio",
  "youtubeId": "IBsQIqzzl7s",
  "thumbnail": "https://img.youtube.com/vi/IBsQIqzzl7s/hqdefault.jpg",
  "description": "Short parent-facing blurb",
  "group": "stories"
}
```

`group` may be `stories`, `learning`, or `songs`. The videos page shows section headings when more than one group is present.

### Games

Games link out to [Little Muslim Hero](https://little-muslim-hero.vercel.app/) (partner play in a new tab).

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy (Vercel auto-detects Vite)

## Product roadmap

### Phase 0 — Production polish (done)

Brand-first home, trust pages, SEO basics, story categories, sleep timer + scrubber, original Little Light characters (no third-party IP), normalized audio paths, curated video entry.

### Phase 1 — Library completeness (in progress)

- [x] Grow to 16 original stories (Prophets, Nap, Kind Habits)
- [x] Cover illustrations (SVG themes via `StoryCover`)
- [x] Content validation script (`npm run validate:content`)
- [x] Video grouping ready for catalog growth
- [ ] Narrations for every story (parent-recorded MP3s — see checklist above)
- [ ] Expand video catalog (10+) as the YouTube channel grows

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
