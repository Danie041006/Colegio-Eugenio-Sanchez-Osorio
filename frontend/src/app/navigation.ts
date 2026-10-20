import type { NavItem } from './types'

export const adminNav: NavItem[] = [
  { label: 'Panel principal', path: '/dashboard', icon: 'grid' },
  { label: 'Estudiantes', path: '/estudiantes', icon: 'students' },
  { label: 'Registrar pago', path: '/pagos/nuevo', icon: 'payment' },
  { label: 'Cobros', path: '/cobros', icon: 'file' },
  { label: 'Reportes', path: '/reportes', icon: 'file' },
  { label: 'Usuarios y roles', path: '/usuarios', icon: 'users' },
  { label: 'Anulaciones', path: '/anulaciones', icon: 'shield' },
]

export const managerNav = adminNav.filter(
  (item) => !['/usuarios', '/cobros'].includes(item.path),
)

export const representativeNav: NavItem[] = [
  { label: 'Mis hijos', path: '/mis-hijos', icon: 'students' },
  { label: 'Comprobantes', path: '/comprobantes', icon: 'file' },
]

export function navForRole(role: 'admin' | 'manager' | 'representative') {
  if (role === 'admin') return adminNav
  if (role === 'manager') return managerNav
  return representativeNav
}

export function isPathActive(pathname: string, path: string) {
  if (path === '/dashboard') return pathname === path
  return pathname === path || pathname.startsWith(`${path}/`)
}
