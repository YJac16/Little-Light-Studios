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
      className="w-full text-left rounded-2xl overflow-hidden bg-white shadow-sm border border-sage-light/30 hover:shadow-md hover:border-sage-light/50 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2 touch-manipulation"
      aria-label={`Play video: ${title}`}
    >
      <div className="aspect-video bg-cream-dark overflow-hidden">
        <img
          src={thumbnail}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-medium text-ink line-clamp-2 leading-snug">{title}</h3>
      </div>
    </button>
  )
}
