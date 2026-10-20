import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { SelectField } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

export function Charges() {
  return (
    <>
      <PageHeader
        eyebrow="CONFIGURACIÓN DE CARTERA"
        title="Cobros"
        description="Administra conceptos, tarifas y generación de cargos."
        action={<Button icon="plus">Nuevo concepto</Button>}
      />
      <div className="tab-list">
        <button className="active">Conceptos y tarifas</button>
        <button>Generación de cargos</button>
        <button>Historial</button>
      </div>
      <Card>
        <div className="toolbar">
          <label className="search">
            <Icon name="search" />
            <input aria-label="Buscar conceptos" placeholder="Buscar concepto" />
          </label>
          <SelectField label="Estado">
            <option>Activo</option>
          </SelectField>
        </div>
        <EmptyTable columns={['Concepto', 'Periodicidad', 'Tarifa', 'Grados', 'Estado', 'Acciones']} />
      </Card>
    </>
  )
}
