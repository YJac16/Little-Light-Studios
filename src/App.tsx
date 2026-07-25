import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

const VideosPage = lazy(() =>
  import('./pages/VideosPage').then((m) => ({ default: m.VideosPage })),
)
const StoriesPage = lazy(() =>
  import('./pages/StoriesPage').then((m) => ({ default: m.StoriesPage })),
)
const StoryDetailPage = lazy(() =>
  import('./pages/StoryDetailPage').then((m) => ({ default: m.StoryDetailPage })),
)
const TonightPage = lazy(() =>
  import('./pages/TonightPage').then((m) => ({ default: m.TonightPage })),
)
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function PageFallback() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center text-ink-muted" role="status">
      <p>Loading…</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="videos" element={<VideosPage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="stories/:id" element={<StoryDetailPage />} />
            <Route path="tonight" element={<TonightPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
