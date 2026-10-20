export type Role = 'admin' | 'manager' | 'representative'

export type NavItem = {
  label: string
  path: string
  icon: string
}

export const roleLabels: Record<Role, string> = {
  admin: 'Administrador',
  manager: 'Gestor',
  representative: 'Representante',
}

export const roleInitials: Record<Role, string> = {
  admin: 'D',
  manager: 'G',
  representative: 'R',
}

export const roleNames: Record<Role, string> = {
  admin: 'Diego',
  manager: 'TODO: Gestor',
  representative: 'TODO: Representante',
}
