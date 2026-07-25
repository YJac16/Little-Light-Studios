import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { VideosPage } from './pages/VideosPage'
import { StoriesPage } from './pages/StoriesPage'
import { StoryDetailPage } from './pages/StoryDetailPage'
import { TonightPage } from './pages/TonightPage'
import { AboutPage } from './pages/AboutPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
