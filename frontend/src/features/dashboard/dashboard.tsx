import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { Icon } from '@/components/ui/icon'
import { Metric } from '@/components/ui/metric'
import { PageHeader } from '@/components/ui/page-header'

export function Dashboard({ go }: { go: (path: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="PANEL PRINCIPAL"
        title="Buenos días, Diego"
        description="Resumen de la gestión de pagos del colegio."
        action={<div className="date-chip">Hoy · TODO: fecha</div>}
      />
      <div className="metrics">
        <Metric label="Recaudado hoy" icon="payment" helper="TODO: variación" />
        <Metric label="Total pendiente" icon="file" helper="Cartera por recaudar" />
        <Metric label="Estudiantes activos" icon="students" helper="TODO: periodo escolar" />
      </div>
      <div className="dashboard-grid">
        <Card
          title="Últimos pagos"
          action={
            <button className="text-link" onClick={() => go('/reportes')}>
              Ver todos <Icon name="arrow" size={15} />
            </button>
          }
        >
          <EmptyTable columns={['Comprobante', 'Estudiante', 'Método', 'Estado', 'Monto']} />
        </Card>
        <Card title="Accesos rápidos">
          <div className="quick-actions">
            <button onClick={() => go('/pagos/nuevo')}>
              <span>
                <Icon name="payment" />
              </span>
              <div>
                <strong>Registrar pago</strong>
                <small>Aplicar un nuevo ingreso</small>
              </div>
              <Icon name="arrow" />
            </button>
            <button onClick={() => go('/estudiantes/nuevo')}>
              <span>
                <Icon name="plus" />
              </span>
              <div>
                <strong>Nuevo estudiante</strong>
                <small>Crear estudiante y representante</small>
              </div>
              <Icon name="arrow" />
            </button>
            <button onClick={() => go('/reportes')}>
              <span>
                <Icon name="file" />
              </span>
              <div>
                <strong>Libro de entradas</strong>
                <small>Consultar y exportar movimientos</small>
              </div>
              <Icon name="arrow" />
            </button>
          </div>
        </Card>
      </div>
      <div className="sync-note">
        <Icon name="shield" />
        <div>
          <strong>Información sincronizada</strong>
          <span>Última actualización: TODO: fecha y hora</span>
        </div>
      </div>
    </>
  )
}
