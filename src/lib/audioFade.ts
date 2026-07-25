const FADE_SECONDS = 30
const TICK_MS = 250

export function fadeOutAudios(
  audios: Array<HTMLAudioElement | null>,
  onDone: () => void,
): () => void {
  const active = audios.filter((a): a is HTMLAudioElement => !!a)
  const startVolumes = active.map((a) => (Number.isFinite(a.volume) ? a.volume : 1))
  const started = performance.now()
  let cancelled = false
  let timer: number | null = null

  const tick = () => {
    if (cancelled) return
    const elapsed = (performance.now() - started) / 1000
    const progress = Math.min(1, elapsed / FADE_SECONDS)
    const factor = 1 - progress
    active.forEach((audio, i) => {
      audio.volume = Math.max(0, startVolumes[i] * factor)
    })
    if (progress >= 1) {
      active.forEach((audio) => {
        audio.pause()
        audio.volume = startVolumes[active.indexOf(audio)] ?? 1
      })
      onDone()
      return
    }
    timer = window.setTimeout(tick, TICK_MS)
  }

  tick()

  return () => {
    cancelled = true
    if (timer) window.clearTimeout(timer)
    active.forEach((audio, i) => {
      audio.volume = startVolumes[i] ?? 1
    })
  }
}

export function resetAudioVolumes(audios: Array<HTMLAudioElement | null>, volume = 1) {
  audios.forEach((audio) => {
    if (audio) audio.volume = volume
  })
}

export const SLEEP_FADE_SECONDS = FADE_SECONDS
