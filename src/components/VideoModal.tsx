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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 sm:bg-black/40 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[100dvh] sm:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-sage-light/30 shrink-0">
          <h2 id="video-modal-title" className="text-base sm:text-lg font-medium text-ink pr-2 line-clamp-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-ink-muted hover:bg-cream-dark hover:text-ink active:bg-cream-dark transition-colors shrink-0"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
        <div className="aspect-video p-3 sm:p-4 flex-1 min-h-0">
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
