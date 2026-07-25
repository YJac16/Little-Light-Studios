import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AboutPage() {
  useDocumentTitle('About')

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-5 sm:py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">About Little Light Studios</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
        <p>
          Little Light Studios makes calm stories and kind learning for young children — and a peaceful
          experience for the parents who guide them.
        </p>
        <p>
          Our tone is soft on purpose: short lines, slow breathing, gentle Islamic values, and nap-friendly
          pacing. No loud entertainment. No cluttered dashboards. Just quiet moments you can trust.
        </p>
        <p>
          Stories and videos live here as a simple parent hub. Kind play links out to our partner{' '}
          <a
            href="https://little-muslim-hero.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-dark underline-offset-2 hover:underline"
          >
            Little Muslim Hero
          </a>
          . Video learning continues on{' '}
          <a
            href="https://www.youtube.com/@LivelyLittleLearners"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-dark underline-offset-2 hover:underline"
          >
            Lively Little Learners
          </a>
          .
        </p>
      </div>
      <Link to="/stories" className="mt-8 inline-flex min-h-[48px] items-center font-semibold text-sage-dark hover:underline">
        Explore stories →
      </Link>
    </main>
  )
}
