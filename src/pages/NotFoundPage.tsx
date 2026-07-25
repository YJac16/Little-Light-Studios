import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-sage-dark">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">This page is resting</h1>
      <p className="mt-3 text-ink-muted">We couldn’t find that page. Let’s head back somewhere calm.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-sage-dark px-6 font-semibold text-white hover:bg-sage"
        >
          Home
        </Link>
        <Link
          to="/stories"
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-dawn/50 bg-white px-6 font-semibold text-ink hover:bg-mist-soft"
        >
          Stories
        </Link>
      </div>
    </main>
  )
}
