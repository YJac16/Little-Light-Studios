# Little Light Studios

**Calm Stories. Kind Learning.**

A parent-friendly kids website focused on gentle learning, nap time, and bedtime content for young children. Designed for parents to navigate easily with a warm, peaceful, and trustworthy tone.

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

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

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── data/           # JSON data (videos, stories)
└── assets/         # Static assets
```

## Data

- **Videos:** Edit `src/data/videos.json` to add/update video metadata. Replace `youtubeId` values with real video IDs from the [Lively Little Learners](https://www.youtube.com/@LivelyLittleLearners) YouTube channel.
- **Stories:** Edit `src/data/stories.json`. Place audio files in `public/audio/`:
  - `[story-id]-narration.mp3` – story narration
  - `dhikr.mp3` – dhikr for loop mode
  - `white-noise.mp3` – white noise for loop mode

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy (Vercel auto-detects Vite)

## Future Enhancements

- Sleep timers
- Playlists
- Additional story categories
