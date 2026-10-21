import { Icon } from '@/components/ui/icon'
import { isPathActive, navForRole } from '@/app/navigation'
import { roleInitials, roleLabels, roleNames, type Role } from '@/app/types'

export function Sidebar({
  role,
  pathname,
  go,
  setRole,
}: {
  role: Role
  pathname: string
  go: (path: string) => void
  setRole: (role: Role) => void
}) {
  const nav = navForRole(role)

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand__mark">ESO</div>
        <div>
          <strong>Colegio Eugenio</strong>
          <span>Sánchez Osorio</span>
        </div>
      </div>
      <div className="sidebar__context">
        <span>GESTIÓN ESCOLAR</span>
        <strong>{role === 'admin' ? 'Administración' : role === 'manager' ? 'Gestión' : 'Representantes'}</strong>
      </div>
      <nav aria-label="Navegación principal">
        {nav.map((item) => {
          const active = isPathActive(pathname, item.path)
          return (
            <button
              key={item.path}
              className={active ? 'active' : ''}
              onClick={() => go(item.path)}
              aria-current={active ? 'page' : undefined}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              <i aria-hidden="true" />
            </button>
          )
        })}
      </nav>
      <div className="sidebar__bottom">
        {role !== 'representative' && (
          <button className={isPathActive(pathname, '/diseno') ? 'active' : ''} onClick={() => go('/diseno')}>
            <Icon name="palette" />
            <span>Sistema de diseño</span>
          </button>
        )}
        <button className={isPathActive(pathname, '/perfil') ? 'active' : ''} onClick={() => go('/perfil')}>
          <Icon name="profile" />
          <span>Mi perfil</span>
        </button>
        <div className="user-panel">
          <div className="user-initial">{roleInitials[role]}</div>
          <div>
            <strong>{roleNames[role]}</strong>
            <span>{roleLabels[role]}</span>
          </div>
          <button
            aria-label="Cambiar rol"
            title="Cambiar rol"
            onClick={() => setRole(role === 'admin' ? 'manager' : role === 'manager' ? 'representative' : 'admin')}
          >
            <Icon name="swap" />
          </button>
        </div>
      </div>
    </aside>
  )
}
