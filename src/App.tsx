import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { VideosPage } from './pages/VideosPage'
import { StoriesPage } from './pages/StoriesPage'
import { StoryDetailPage } from './pages/StoryDetailPage'
import { GamesPage } from './pages/GamesPage'
import { GameDetailPage } from './pages/GameDetailPage'

function StoryDetailRoute() {
  const { id } = useParams<{ id: string }>()
  return <StoryDetailPage key={id} />
}

function GameDetailRoute() {
  const { id } = useParams<{ id: string }>()
  return <GameDetailPage key={id} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:id" element={<StoryDetailRoute />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:id" element={<GameDetailRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
