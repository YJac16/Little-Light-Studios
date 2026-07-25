const QUEUE_KEY = 'lls.tonightQueue'
const CONTINUE_KEY = 'lls.continueListening'
const MAX_QUEUE = 12

export interface ContinueListening {
  storyId: string
  currentTime: number
  updatedAt: number
}

function canUseStorage(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage
  } catch {
    return false
  }
}

export function getTonightQueue(): string[] {
  if (!canUseStorage()) return []
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string')
  } catch {
    return []
  }
}

export function setTonightQueue(ids: string[]): void {
  if (!canUseStorage()) return
  localStorage.setItem(QUEUE_KEY, JSON.stringify(ids.slice(0, MAX_QUEUE)))
}

export function toggleQueueStory(storyId: string): string[] {
  const current = getTonightQueue()
  const next = current.includes(storyId)
    ? current.filter((id) => id !== storyId)
    : [...current, storyId].slice(0, MAX_QUEUE)
  setTonightQueue(next)
  return next
}

export function removeFromQueue(storyId: string): string[] {
  const next = getTonightQueue().filter((id) => id !== storyId)
  setTonightQueue(next)
  return next
}

export function clearTonightQueue(): void {
  if (!canUseStorage()) return
  localStorage.removeItem(QUEUE_KEY)
}

export function getContinueListening(): ContinueListening | null {
  if (!canUseStorage()) return null
  try {
    const raw = localStorage.getItem(CONTINUE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ContinueListening
    if (!parsed?.storyId || typeof parsed.currentTime !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

export function setContinueListening(storyId: string, currentTime: number): void {
  if (!canUseStorage()) return
  const payload: ContinueListening = {
    storyId,
    currentTime: Math.max(0, currentTime),
    updatedAt: Date.now(),
  }
  localStorage.setItem(CONTINUE_KEY, JSON.stringify(payload))
}

export function clearContinueListening(storyId?: string): void {
  if (!canUseStorage()) return
  if (!storyId) {
    localStorage.removeItem(CONTINUE_KEY)
    return
  }
  const current = getContinueListening()
  if (current?.storyId === storyId) localStorage.removeItem(CONTINUE_KEY)
}
