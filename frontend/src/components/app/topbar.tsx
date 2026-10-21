import { Icon } from '@/components/ui/icon'
import { roleInitials, roleLabels, roleNames, type Role } from '@/app/types'

export function Topbar({
  role,
  go,
  onOpenMenu,
}: {
  role: Role
  go: (path: string) => void
  onOpenMenu: () => void
}) {
  return (
    <>
      <div className="topbar">
        <div>
          <span className="topbar__label">AÑO ESCOLAR</span>
          <strong>TODO: periodo</strong>
        </div>
        <div className="topbar__actions">
          <button aria-label="Notificaciones">
            <Icon name="alert" />
          </button>
          <button onClick={() => go('/perfil')}>
            <div className="user-initial">{roleInitials[role]}</div>
            <span>{roleNames[role]}</span>
          </button>
          <button onClick={() => go('/login')}>
            <Icon name="logout" />
            <span>Salir</span>
          </button>
        </div>
      </div>
      <div className="mobile-topbar">
        <button className="menu-icon-button" onClick={onOpenMenu} aria-label="Abrir menú">
          <Icon name="menu" size={23} />
        </button>
        <div>
          <strong>{role === 'representative' ? 'Portal de representantes' : 'Gestión escolar'}</strong>
          <span>{roleLabels[role]}</span>
        </div>
        <button className="menu-icon-button" onClick={() => go('/perfil')} aria-label="Abrir perfil">
          <div className="user-initial">{roleInitials[role]}</div>
        </button>
      </div>
    </>
  )
}
