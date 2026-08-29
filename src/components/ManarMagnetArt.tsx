import { useId } from 'react'

interface ManarMagnetArtProps {
  size?: 'list' | 'detail'
}

export function ManarMagnetArt({ size = 'list' }: ManarMagnetArtProps) {
  const isDetail = size === 'detail'
  const goldId = useId().replace(/:/g, '')

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#F8F4E8] border border-[#DCCBA7]/70 shadow-soft ${
        isDetail ? 'w-[7.5rem] h-[7.5rem] sm:w-36 sm:h-36' : 'h-14 w-14 shrink-0'
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 144 144" className="absolute inset-0 h-full w-full" focusable="false">
        <defs>
          <radialGradient id={goldId} cx="36%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#FFE08A" />
            <stop offset="48%" stopColor="#C89B3C" />
            <stop offset="100%" stopColor="#8A6414" />
          </radialGradient>
        </defs>
        <circle
          cx="72"
          cy={isDetail ? 54 : 72}
          r={isDetail ? 32 : 38}
          fill={`url(#${goldId})`}
        />
        <ellipse
          cx={isDetail ? 60 : 58}
          cy={isDetail ? 42 : 58}
          rx={isDetail ? 11 : 13}
          ry={isDetail ? 6 : 7}
          fill="#FFF6D4"
          opacity="0.55"
        />
      </svg>
      {isDetail && (
        <div className="absolute inset-x-0 bottom-2.5 text-center leading-tight">
          <p className="font-display text-sm font-bold tracking-wide text-[#073B3A]">MANĀR</p>
          <p className="text-[13px] text-[#0E625B]" dir="rtl" lang="ar">
            مَنَار
          </p>
        </div>
      )}
    </div>
  )
}
