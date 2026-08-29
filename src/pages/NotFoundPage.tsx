import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'

export function NotFoundPage() {
  return (
    <EmptyState
      kicker="Page not found"
      title="This page is resting"
      body="We could not find that path. Head home, or pick a calm library."
      actions={
        <>
          <Link
            to="/"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-ink text-cream font-sans font-bold touch-manipulation"
          >
            Home
          </Link>
          <Link
            to="/stories"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-white/85 text-ink font-sans font-bold border border-ink/10 touch-manipulation"
          >
            Stories
          </Link>
          <Link
            to="/games"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-2xl bg-white/85 text-ink font-sans font-bold border border-ink/10 touch-manipulation"
          >
            Games
          </Link>
        </>
      }
    />
  )
}
