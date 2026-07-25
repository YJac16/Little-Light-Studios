import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function PrivacyPage() {
  useDocumentTitle('Privacy')

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-5 sm:py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Privacy</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
        <p>
          Little Light Studios is built as a calm content hub for parents. We do not ask children to create
          accounts, and we do not sell personal information.
        </p>
        <p>
          This site is a static experience: stories and pages load in your browser. We do not run child-facing
          chat, profiles, or behavioral advertising. Optional features like “Tonight’s queue” and continue
          listening stay on your device in local storage — they are not uploaded to a server.
        </p>
        <p>
          You can install the site as an app for offline story text and cached audio. We do not use analytics
          that track children.
        </p>
        <p>
          Videos open via YouTube embeds. When you play a video, YouTube may collect data under its own
          privacy policy. Games link to Little Muslim Hero in a new tab and are governed by that site’s
          practices.
        </p>
        <p>
          Parents are in control. We recommend supervising young children online and using device-level
          parental controls when helpful.
        </p>
        <p className="text-sm">
          Questions? Visit our{' '}
          <Link to="/contact" className="font-semibold text-sage-dark underline-offset-2 hover:underline">
            Contact
          </Link>{' '}
          page.
        </p>
      </div>
    </main>
  )
}
