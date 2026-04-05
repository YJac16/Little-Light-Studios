import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-ink-muted text-lg mb-6 max-w-xl mx-auto">
          Gentle learning, nap time, and bedtime content for young children.
          Designed for parents to navigate easily.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Link
          to="/videos"
          className="block min-h-[120px] p-6 sm:p-8 rounded-2xl bg-white border border-sage-light/30 hover:border-sage-light/50 hover:shadow-md active:scale-[0.99] transition-all text-center touch-manipulation"
        >
          <span className="text-4xl mb-4 block" aria-hidden>📺</span>
          <h3 className="text-xl font-serif font-medium text-ink mb-2">Videos</h3>
          <p className="text-ink-muted text-sm">Calm learning videos for little ones</p>
        </Link>
        <Link
          to="/stories"
          className="block min-h-[120px] p-6 sm:p-8 rounded-2xl bg-white border border-sage-light/30 hover:border-sage-light/50 hover:shadow-md active:scale-[0.99] transition-all text-center touch-manipulation"
        >
          <span className="text-4xl mb-4 block" aria-hidden>📖</span>
          <h3 className="text-xl font-serif font-medium text-ink mb-2">Stories</h3>
          <p className="text-ink-muted text-sm">Nap and bedtime stories</p>
        </Link>
        <a
          href="https://little-muslim-hero.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block min-h-[120px] p-6 sm:p-8 rounded-2xl bg-white border border-sage-light/30 hover:border-sage-light/50 hover:shadow-md active:scale-[0.99] transition-all text-center touch-manipulation"
        >
          <span className="text-4xl mb-4 block" aria-hidden>🎮</span>
          <h3 className="text-xl font-serif font-medium text-ink mb-2">Games</h3>
          <p className="text-ink-muted text-sm">Little Muslim Hero — opens in a new tab</p>
        </a>
      </div>
    </main>
  )
}
