import { useEffect } from 'react'

interface GameModalProps {
  title: string
  tagline?: string
  description?: string
  alsoKnownAs?: string
  url: string
  onClose: () => void
}

export function GameModal({
  title,
  tagline,
  description,
  alsoKnownAs,
  url,
  onClose,
}: GameModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 sm:bg-black/40 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-t-3xl sm:rounded-3xl shadow-lift w-full sm:max-w-4xl max-h-[100dvh] sm:max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-sage-light/30 shrink-0">
          <div className="min-w-0 pr-2">
            <h2
              id="game-modal-title"
              className="text-base sm:text-lg font-display font-semibold text-ink line-clamp-2"
            >
              {title}
            </h2>
            {(tagline || alsoKnownAs) && (
              <p className="mt-1 text-sm text-ink-muted font-sans line-clamp-2">
                {tagline}
                {alsoKnownAs ? ` · Also known as ${alsoKnownAs}` : ''}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-ink-muted hover:bg-cream-dark hover:text-ink active:bg-cream-dark transition-colors shrink-0 touch-manipulation"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {description && (
          <p className="px-4 sm:px-5 pt-3 text-sm text-ink-muted font-sans leading-relaxed shrink-0">
            {description}
          </p>
        )}

        <div className="aspect-[4/3] sm:aspect-video p-3 sm:p-4 flex-1 min-h-0">
          <iframe
            title={title}
            src={url}
            className="w-full h-full rounded-xl bg-white border border-sage-light/30"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="px-4 sm:px-5 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-5 pt-1 flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-2xl bg-sage text-white font-sans font-semibold text-sm hover:bg-sage-dark active:scale-[0.99] transition-all touch-manipulation"
          >
            Open in new tab
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-2xl bg-white border border-sage-light/40 text-ink font-sans font-semibold text-sm hover:bg-cream-dark active:scale-[0.99] transition-all touch-manipulation"
          >
            Back to games
          </button>
        </div>
      </div>
    </div>
  )
}
