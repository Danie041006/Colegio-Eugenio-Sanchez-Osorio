import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

export function ChildDetail({ go }: { go: (path: string) => void }) {
  return (
    <>
      <button className="back-link" onClick={() => go('/mis-hijos')}>
        ← Mis hijos
      </button>
      <div className="child-profile">
        <Avatar />
        <div>
          <h1>TODO: nombre del hijo</h1>
          <span>TODO: grado y sección</span>
          <Badge tone="success">Activo</Badge>
        </div>
      </div>
      <Card className="balance-card">
        <span>Saldo pendiente</span>
        <strong>TODO: saldo</strong>
        <small>TODO: cargos pendientes</small>
      </Card>
      <Card title="Cargos pendientes">
        <div className="empty-state compact">
          <Icon name="file" />
          <strong>TODO: cargos</strong>
          <span>La información de cartera aparecerá aquí.</span>
        </div>
      </Card>
      <Card title="Historial de pagos">
        <div className="empty-state compact">
          <Icon name="payment" />
          <strong>TODO: pagos</strong>
          <span>Los pagos registrados aparecerán aquí.</span>
        </div>
      </Card>
    </>
  )
}
