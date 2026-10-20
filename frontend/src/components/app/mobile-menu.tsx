import { Icon } from '@/components/ui/icon'
import { isPathActive, navForRole } from '@/app/navigation'
import { roleLabels, type Role } from '@/app/types'

export function MobileMenu({
  role,
  pathname,
  open,
  close,
  go,
  setRole,
}: {
  role: Role
  pathname: string
  open: boolean
  close: () => void
  go: (path: string) => void
  setRole: (role: Role) => void
}) {
  const nav = navForRole(role)
  const navigate = (path: string) => {
    go(path)
    close()
  }

  return (
    <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} aria-hidden={!open}>
      <button className="mobile-menu__backdrop" aria-label="Cerrar menú" onClick={close} />
      <aside className="mobile-menu__drawer" aria-label="Menú principal">
        <div className="mobile-menu__head">
          <div className="brand brand--light">
            <div className="brand__mark">ESO</div>
            <div>
              <strong>Colegio Eugenio</strong>
              <span>Sánchez Osorio</span>
            </div>
          </div>
          <button className="menu-icon-button" aria-label="Cerrar menú" onClick={close}>
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="mobile-menu__role">
          <span>ROL ACTUAL</span>
          <strong>{roleLabels[role]}</strong>
        </div>
        <nav>
          {nav.map((item) => (
            <button
              key={item.path}
              className={isPathActive(pathname, item.path) ? 'active' : ''}
              onClick={() => navigate(item.path)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </nav>
        <div className="mobile-menu__secondary">
          {role !== 'representative' && (
            <button className={isPathActive(pathname, '/diseno') ? 'active' : ''} onClick={() => navigate('/diseno')}>
              <Icon name="settings" />
              <span>Sistema de diseño</span>
              <Icon name="arrow" size={15} />
            </button>
          )}
          <button className={isPathActive(pathname, '/perfil') ? 'active' : ''} onClick={() => navigate('/perfil')}>
            <Icon name="child" />
            <span>Mi perfil</span>
            <Icon name="arrow" size={15} />
          </button>
          <button onClick={() => navigate('/login')}>
            <Icon name="logout" />
            <span>Cerrar sesión</span>
            <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="mobile-menu__switcher">
          <span>Vista del prototipo</span>
          <div>
            <button
              className={role === 'admin' ? 'active' : ''}
              onClick={() => {
                setRole('admin')
                close()
              }}
            >
              Administrador
            </button>
            <button
              className={role === 'manager' ? 'active' : ''}
              onClick={() => {
                setRole('manager')
                close()
              }}
            >
              Gestor
            </button>
            <button
              className={role === 'representative' ? 'active' : ''}
              onClick={() => {
                setRole('representative')
                close()
              }}
            >
              Representante
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
