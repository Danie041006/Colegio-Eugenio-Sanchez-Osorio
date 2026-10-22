import type { ReactNode } from 'react'
import { Icon } from './icon'

export function Button({
  children,
  variant = 'primary',
  icon,
  onClick,
  type = 'button',
  className = '',
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  icon?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}) {
  return (
    <button type={type} onClick={onClick} className={`button button--${variant} ${className}`.trim()}>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </button>
  )
}
