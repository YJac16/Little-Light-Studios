import { useEffect } from 'react'

const SITE = 'Little Light Studios'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Calm Stories. Kind Learning.`
  }, [title])
}
