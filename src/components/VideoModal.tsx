import { useEffect } from 'react'

interface VideoModalProps {
  title: string
  youtubeId: string
  onClose: () => void
}

export function VideoModal({ title, youtubeId, onClose }: VideoModalProps) {
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:items-center sm:bg-ink/40 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-mist-soft shadow-xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-dawn/40 p-4 sm:p-5">
          <h2 id="video-modal-title" className="pr-2 font-display text-base font-medium text-ink line-clamp-2 sm:text-lg">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-mist hover:text-ink"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
        <div className="aspect-video min-h-0 flex-1 p-3 sm:p-4">
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
