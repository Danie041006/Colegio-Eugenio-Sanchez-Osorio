import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { PageHeader } from '@/components/ui/page-header'

export function StudentDetail({ go }: { go: (path: string) => void }) {
  return (
    <>
      <button className="back-link" onClick={() => go('/estudiantes')}>
        ← Volver a estudiantes
      </button>
      <PageHeader
        title="TODO: nombre del estudiante"
        description="TODO: documento"
        action={<Button variant="secondary">Editar información</Button>}
      />
      <div className="profile-summary">
        <Avatar />
        <div>
          <span>Estado</span>
          <Badge tone="success">Activo</Badge>
        </div>
        <div>
          <span>Grado</span>
          <strong>TODO: grado y sección</strong>
        </div>
        <div>
          <span>Saldo pendiente</span>
          <strong>TODO: saldo</strong>
        </div>
      </div>
      <div className="two-cols">
        <Card title="Datos del estudiante">
          <dl className="details">
            <div>
              <dt>Nombre completo</dt>
              <dd>TODO: nombre</dd>
            </div>
            <div>
              <dt>Documento</dt>
              <dd>TODO: documento</dd>
            </div>
            <div>
              <dt>Fecha de nacimiento</dt>
              <dd>TODO: fecha</dd>
            </div>
            <div>
              <dt>Grado y sección</dt>
              <dd>TODO: grado y sección</dd>
            </div>
          </dl>
        </Card>
        <Card title="Representante">
          <dl className="details">
            <div>
              <dt>Nombre completo</dt>
              <dd>TODO: representante</dd>
            </div>
            <div>
              <dt>Documento</dt>
              <dd>TODO: documento</dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>TODO: teléfono</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>TODO: correo</dd>
            </div>
          </dl>
        </Card>
      </div>
      <Card title="Cargos pendientes">
        <EmptyTable columns={['Concepto', 'Vencimiento', 'Estado', 'Saldo']} />
      </Card>
      <Card title="Historial de pagos">
        <EmptyTable columns={['Comprobante', 'Fecha', 'Conceptos', 'Método', 'Monto', 'Estado']} />
      </Card>
    </>
  )
}
