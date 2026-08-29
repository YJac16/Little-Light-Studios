export function narrationPath(id: string): string {
  return `/audio/${id}-narration.mp3`
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60)
  return `${minutes}:${rest.toString().padStart(2, '0')}`
}

/** True when the URL is a real audio file, not a SPA HTML fallback. */
export async function probeNarration(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { headers: { Range: 'bytes=0-15' } })
    if (!res.ok && res.status !== 206) return false

    const type = (res.headers.get('content-type') || '').toLowerCase()
    if (type.includes('text/html') || type.includes('text/plain')) return false

    const bytes = new Uint8Array(await res.arrayBuffer())
    if (bytes.length === 0) return false
    if (bytes[0] === 0x3c) return false

    const isId3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33
    const isMpeg = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0
    if (type.startsWith('audio/') || isId3 || isMpeg) return true

    return !type.includes('text/')
  } catch {
    return false
  }
}
