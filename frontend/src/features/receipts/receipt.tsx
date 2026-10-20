import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyTable } from '@/components/ui/empty-table'
import { PageHeader } from '@/components/ui/page-header'

export function Receipt({
  go,
  representative = false,
}: {
  go: (path: string) => void
  representative?: boolean
}) {
  return (
    <>
      <PageHeader
        eyebrow="COMPROBANTES"
        title="Comprobante de pago"
        description="Vista imprimible del movimiento."
        action={<Button icon="download">Descargar PDF</Button>}
      />
      <article className="receipt">
        <div className="receipt__head">
          <div className="brand brand--light">
            <div className="brand__mark">ESO</div>
            <div>
              <strong>Colegio Eugenio Sánchez Osorio</strong>
              <span>Comprobante de pago</span>
            </div>
          </div>
          <div>
            <span>N.º de comprobante</span>
            <strong>TODO: número</strong>
            <Badge tone="success">Aprobado</Badge>
          </div>
        </div>
        <div className="receipt__meta">
          <div>
            <span>Fecha</span>
            <strong>TODO: fecha y hora</strong>
          </div>
          <div>
            <span>Estudiante</span>
            <strong>TODO: estudiante</strong>
          </div>
          <div>
            <span>Representante</span>
            <strong>TODO: representante</strong>
          </div>
        </div>
        <EmptyTable columns={['Concepto', 'Periodo', 'Valor aplicado']} />
        <div className="receipt__totals">
          <div>
            <span>Método de pago</span>
            <strong>TODO: método</strong>
            <span>Cuenta / referencia</span>
            <strong>TODO: cuenta / referencia</strong>
            <span>Registrado por</span>
            <strong>TODO: usuario</strong>
          </div>
          <div>
            <span>Total pagado</span>
            <strong>TODO: monto</strong>
          </div>
        </div>
        <p className="receipt__note">
          Este documento es un comprobante del registro interno. TODO: información legal o de validación.
        </p>
      </article>
      <button className="back-link" onClick={() => go(representative ? '/comprobantes' : '/reportes')}>
        ← Volver
      </button>
    </>
  )
}
