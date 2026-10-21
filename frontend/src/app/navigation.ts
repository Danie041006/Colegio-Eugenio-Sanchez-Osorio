import type { NavItem } from './types'

export const adminNav: NavItem[] = [
  { label: 'Panel principal', path: '/dashboard', icon: 'dashboard' },
  { label: 'Estudiantes', path: '/estudiantes', icon: 'students' },
  { label: 'Registrar pago', path: '/pagos/nuevo', icon: 'payments' },
  { label: 'Cobros', path: '/cobros', icon: 'billing' },
  { label: 'Reportes', path: '/reportes', icon: 'reports' },
  { label: 'Usuarios y roles', path: '/usuarios', icon: 'roles' },
  { label: 'Anulaciones', path: '/anulaciones', icon: 'annulments' },
]

export const managerNav = adminNav.filter(
  (item) => !['/usuarios', '/cobros'].includes(item.path),
)

export const representativeNav: NavItem[] = [
  { label: 'Mis estudiantes', path: '/mis-estudiantes', icon: 'students' },
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
