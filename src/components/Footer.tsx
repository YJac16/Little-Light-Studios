export function Footer() {
  const youtubeChannelUrl = 'https://www.youtube.com/@LivelyLittleLearners'

  return (
    <footer className="bg-cream-dark border-t border-sage-light/30 mt-auto pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
        <p className="text-center text-ink-muted text-sm md:text-base leading-relaxed">
          Watch more calm learning videos on our YouTube channel:{' '}
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 py-2 px-2 -my-1 rounded-lg text-sage-dark hover:text-sage active:bg-sage-light/20 font-medium transition-colors"
          >
            Lively Little Learners
          </a>
        </p>
      </div>
    </footer>
  )
}
