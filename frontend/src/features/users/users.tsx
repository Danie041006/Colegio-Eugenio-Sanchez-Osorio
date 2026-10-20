import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { PageHeader } from '@/components/ui/page-header'

export function Users() {
  return (
    <>
      <PageHeader
        eyebrow="SEGURIDAD"
        title="Usuarios y roles"
        description="Administra accesos y permisos del sistema."
        action={<Button icon="plus">Nuevo usuario</Button>}
      />
      <div className="role-cards">
        <Card>
          <Badge tone="info">Administrador</Badge>
          <strong>Acceso total</strong>
          <span>Gestiona pagos, cartera, usuarios, anulaciones y configuración.</span>
        </Card>
        <Card>
          <Badge tone="neutral">Gestor</Badge>
          <strong>Gestión operativa</strong>
          <span>Registra estudiantes y pagos, consulta estados y solicita anulaciones.</span>
        </Card>
        <Card>
          <Badge tone="warning">Representante</Badge>
          <strong>Consulta familiar</strong>
          <span>Visualiza sus hijos, saldos y comprobantes asociados.</span>
        </Card>
      </div>
      <Card title="Usuarios">
        <EmptyTable columns={['Usuario', 'Correo', 'Rol', 'Estado', 'Último acceso', 'Acciones']} />
      </Card>
    </>
  )
}
