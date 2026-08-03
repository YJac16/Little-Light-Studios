interface VideoCardProps {
  title: string
  thumbnail: string
  onClick: () => void
}

export function VideoCard({ title, thumbnail, onClick }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-3xl overflow-hidden bg-white/90 shadow-soft border border-sage-light/30 hover:shadow-lift hover:border-sage-light/55 active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 touch-manipulation"
      aria-label={`Play video: ${title}`}
    >
      <div className="aspect-video bg-cream-dark overflow-hidden">
        <img
          src={thumbnail}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-display font-semibold text-ink line-clamp-2 leading-snug">{title}</h3>
      </div>
    </button>
  )
}
