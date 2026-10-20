import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { Field, SelectField } from '@/components/ui/form'
import { PageHeader } from '@/components/ui/page-header'

export function Reports() {
  return (
    <>
      <PageHeader
        eyebrow="REPORTES"
        title="Libro de entradas"
        description="Consulta los pagos registrados y exporta los resultados."
        action={<Button icon="download">Exportar reporte</Button>}
      />
      <Card>
        <div className="filters-grid">
          <Field label="Desde" type="date" placeholder="" />
          <Field label="Hasta" type="date" placeholder="" />
          <SelectField label="Método">
            <option>Todos</option>
            <option>Efectivo</option>
            <option>Nequi</option>
            <option>Bancolombia</option>
          </SelectField>
          <SelectField label="Cuenta">
            <option>TODO: cuenta</option>
          </SelectField>
          <Button variant="secondary">Aplicar filtros</Button>
        </div>
      </Card>
      <Card className="report-total">
        <div>
          <span>Total del periodo</span>
          <strong>TODO: total</strong>
        </div>
        <div>
          <span>Movimientos</span>
          <strong>TODO: cantidad</strong>
        </div>
        <div>
          <span>Periodo</span>
          <strong>TODO: fecha inicial — fecha final</strong>
        </div>
      </Card>
      <Card>
        <EmptyTable
          columns={['Fecha', 'Comprobante', 'Estudiante', 'Método', 'Cuenta', 'Usuario', 'Estado', 'Monto']}
        />
      </Card>
    </>
  )
}
