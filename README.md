# Little Light Studios

**Calm Stories. Kind Learning.**

A parent-friendly kids website focused on gentle Islamic learning, nap time, and bedtime content for young children. Designed for parents to navigate easily with a warm, peaceful, and trustworthy tone.

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **PWA:** vite-plugin-pwa
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

`prebuild` regenerates [`public/sitemap.xml`](public/sitemap.xml) from stories. Override the site origin with `SITE_URL=https://your.domain npm run build`.

## Content workflow

### Stories

Edit [`src/data/stories.json`](src/data/stories.json). Each story supports:

| Field | Notes |
|--------|--------|
| `id` | URL slug (`/stories/:id`) |
| `title`, `subtitle`, `blurb` | Parent-facing labels |
| `category` | `prophets`, `nap`, or `kind-habits` |
| `ageBand` | `nap`, `bedtime`, or `anytime` |
| `cover` | Theme key for SVG cover art (see `StoryCover`) |
| `text` | Full story body |
| `narrationUrl` | `/audio/[id]-narration.mp3`, or `null` for read-aloud only |

Place narration files as:

```text
public/audio/[story-id]-narration.mp3
```

Ambience files (compressed loops, ~12 min max) live at:

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

Edit [`src/data/videos.json`](src/data/videos.json). Use real YouTube IDs from [Lively Little Learners](https://www.youtube.com/@LivelyLittleLearners). `group` may be `stories`, `learning`, or `songs`.

### Games

Games link out to [Little Muslim Hero](https://little-muslim-hero.vercel.app/) (partner play in a new tab).

### Weekly content drop (calendar)

Aim for a calm, predictable cadence — quality over volume:

| Day | Drop |
|-----|------|
| **Friday** | 1 story (text + optional narration) **or** 1 YouTube video ID |
| **Monthly** | 1 Kind Habits story + refresh OG/social post |
| **Quarterly** | Re-check ambience audio size, sitemap, and broken links |

Process:

1. Draft story in the same short-line bedtime tone (no third-party IP).
2. Add entry to `stories.json` (`category`, `ageBand`, `cover`, `narrationUrl: null` until audio exists).
3. Run `npm run validate:content` and `npm run build`.
4. Deploy; share one calm parent-facing line on your channel/community.

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy (Vercel auto-detects Vite)

### Custom domain

1. In the Vercel project → **Settings → Domains**, add your domain (e.g. `littlelightstudios.com`).
2. Follow DNS instructions (A/CNAME) at your registrar.
3. Rebuild with the real origin so sitemap/OG stay accurate:

```bash
SITE_URL=https://your.domain npm run build
```

Or set `SITE_URL` as a Vercel environment variable for Production builds.

Share image: [`public/og-image.jpg`](public/og-image.jpg) (1200×630).

## Parent features (no account)

- **Tonight’s queue** — add stories from any story page; reorder on `/tonight`
- **Continue listening** — resume banner on Stories
- **Sleep timer** — 5/10/15/20 minutes with gentle fade-out
- **Installable PWA** — offline app shell; audio caches after first play

## Product roadmap

### Phase 0 — Production polish (done)

Brand-first home, trust pages, SEO basics, story categories, sleep timer + scrubber, original Little Light characters, normalized audio paths.

### Phase 1 — Library completeness (mostly done)

- [x] 16 original stories + covers + validation + video groups
- [ ] Narrations for every story (desktop MP3 drop)
- [ ] Expand video catalog as the channel grows

### Phase 2 — Competitive hub features (done)

Tonight’s queue, continue listening, search/age filters, sleep-timer fade, PWA. Analytics deferred.

### Phase 3 — Reach & durability (done)

- [x] `sitemap.xml` (generated on build) + `robots.txt`
- [x] Polished OG/Twitter image + absolute meta URLs
- [x] Custom-domain instructions (`SITE_URL`)
- [x] Compressed ambience audio loops; optimized logo (`logo-480.jpg`)
- [x] Lazy-loaded routes; cache headers for audio/assets
- [x] Skip link, modal focus trap, player aria-labels, focus-visible + reduced motion
- [x] Weekly content drop process documented
