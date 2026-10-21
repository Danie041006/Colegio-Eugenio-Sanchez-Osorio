import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

export function Receipts({ go }: { go: (path: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="PAGOS"
        title="Comprobantes"
        description="Consulta y descarga tus comprobantes."
      />
      <label className="search search--wide">
        <Icon name="search" />
        <input aria-label="Buscar comprobantes" placeholder="Buscar por número o concepto" />
      </label>
      <Card>
        <div className="empty-state">
          <div className="empty-state__icon">
            <Icon name="file" />
          </div>
          <strong>TODO: comprobantes disponibles</strong>
          <span>Los comprobantes asociados a tus estudiantes aparecerán aquí.</span>
          <Button variant="secondary" onClick={() => go('/comprobantes/1')}>
            Ver comprobante de muestra
          </Button>
        </div>
      </Card>
    </>
  )
}
