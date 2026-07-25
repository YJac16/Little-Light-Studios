import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ContactPage() {
  useDocumentTitle('Contact')

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-5 sm:py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Contact</h1>
      <p className="mt-6 text-base leading-relaxed text-ink-muted">
        The best place to follow new calm videos and updates is our YouTube channel.
      </p>
      <a
        href="https://www.youtube.com/@LivelyLittleLearners"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-sage-dark px-6 font-semibold text-white transition hover:bg-sage"
      >
        Visit Lively Little Learners
      </a>
      <p className="mt-8 text-sm text-ink-soft">
        For partner play, open{' '}
        <a
          href="https://little-muslim-hero.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sage-dark underline-offset-2 hover:underline"
        >
          Little Muslim Hero
        </a>
        .
      </p>
    </main>
  )
}
