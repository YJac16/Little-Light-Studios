interface VideoCardProps {
  title: string
  thumbnail: string
  description?: string
  onClick: () => void
}

export function VideoCard({ title, thumbnail, description, onClick }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full overflow-hidden rounded-2xl border border-dawn/40 bg-white/80 text-left shadow-sm transition duration-200 hover:border-sage-light hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sage/40 focus:ring-offset-2 active:scale-[0.98]"
      aria-label={`Play video: ${title}`}
    >
      <div className="aspect-video overflow-hidden bg-mist">
        <img src={thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-base font-medium leading-snug text-ink line-clamp-2 sm:text-lg">
          {title}
        </h3>
        {description && <p className="mt-1.5 text-sm text-ink-muted line-clamp-2">{description}</p>}
      </div>
    </button>
  )
}
