import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

export function Cancellations() {
  return (
    <>
      <PageHeader
        eyebrow="CONTROL"
        title="Anulaciones"
        description="Revisa las solicitudes pendientes de aprobación."
      />
      <div className="status-filter">
        <button className="active">
          Pendientes <span>TODO</span>
        </button>
        <button>Aprobadas</button>
        <button>Rechazadas</button>
      </div>
      <Card>
        <div className="empty-state">
          <div className="empty-state__icon">
            <Icon name="shield" />
          </div>
          <strong>No hay solicitudes pendientes</strong>
          <span>Las solicitudes de anulación aparecerán aquí para su revisión.</span>
        </div>
      </Card>
    </>
  )
}
