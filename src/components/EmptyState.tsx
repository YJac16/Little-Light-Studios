import type { ReactNode } from 'react'

interface EmptyStateProps {
  kicker?: string
  title: string
  body: string
  actions?: ReactNode
}

export function EmptyState({ kicker = '404', title, body, actions }: EmptyStateProps) {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-studio-mesh" aria-hidden />
      <div className="relative mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
        <p className="text-xs font-sans font-bold tracking-[0.14em] uppercase text-honey-deep">
          {kicker}
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl text-ink leading-tight">{title}</h1>
        <p className="mt-3 text-ink-muted font-sans text-base leading-relaxed">{body}</p>
        {actions && (
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            {actions}
          </div>
        )}
      </div>
    </main>
  )
}
