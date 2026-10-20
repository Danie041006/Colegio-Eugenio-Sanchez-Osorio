import type { ReactNode } from 'react'

export function Card({
  title,
  children,
  action,
  className = '',
}: {
  title?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <section className={`card ${className}`}>
      {title && (
        <div className="card__header">
          <h2>{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
