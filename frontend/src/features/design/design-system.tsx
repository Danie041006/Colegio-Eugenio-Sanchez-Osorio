import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { Field, SelectField } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

const systemStates = [
  { icon: 'file', label: 'Vacío' },
  { icon: 'grid', label: 'Cargando' },
  { icon: 'alert', label: 'Error' },
  { icon: 'shield', label: 'Éxito' },
  { icon: 'alert', label: 'Sin conexión' },
  { icon: 'payment', label: 'Pendiente de sincronizar' },
]

export function DesignSystem() {
  return (
    <>
      <PageHeader
        eyebrow="DOCUMENTACIÓN"
        title="Sistema de diseño"
        description="Fundamentos y componentes de la aplicación."
      />
      <Card title="Colores">
        <div className="swatches">
          <div>
            <i className="swatch swatch--royal" />
            <strong>Azul rey</strong>
            <span>#1B3A8F</span>
          </div>
          <div>
            <i className="swatch swatch--navy" />
            <strong>Azul marino</strong>
            <span>#122A6B</span>
          </div>
          <div>
            <i className="swatch swatch--sky" />
            <strong>Celeste</strong>
            <span>#DCE6F7</span>
          </div>
          <div>
            <i className="swatch swatch--ink" />
            <strong>Texto</strong>
            <span>#0F172A</span>
          </div>
          <div>
            <i className="swatch swatch--white" />
            <strong>Blanco</strong>
            <span>#FFFFFF</span>
          </div>
        </div>
      </Card>
      <div className="two-cols">
        <Card title="Tipografía">
          <div className="type-spec">
            <span>Inter · Tipografía principal</span>
            <strong className="type-xl">Encabezado de página</strong>
            <strong className="type-lg">Título de sección</strong>
            <p>Texto de cuerpo para información operativa.</p>
            <small>Texto auxiliar y metadatos</small>
          </div>
        </Card>
        <Card title="Botones">
          <div className="component-row">
            <Button>Botón principal</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="danger">Rechazar</Button>
            <Button variant="ghost">Enlace</Button>
          </div>
        </Card>
      </div>
      <div className="two-cols">
        <Card title="Campos">
          <div className="stack">
            <Field label="Etiqueta visible" placeholder="Texto de ejemplo" />
            <SelectField label="Selector">
              <option>Opción</option>
            </SelectField>
          </div>
        </Card>
        <Card title="Badges de estado">
          <div className="component-row">
            <Badge tone="success">Aprobado</Badge>
            <Badge tone="warning">Pendiente</Badge>
            <Badge tone="danger">Anulado</Badge>
            <Badge tone="info">Sincronizado</Badge>
            <Badge>Inactivo</Badge>
          </div>
        </Card>
      </div>
      <Card title="Tabla">
        <EmptyTable columns={['Columna A', 'Columna B', 'Estado', 'Monto', 'Acción']} />
      </Card>
      <Card title="Estados del sistema">
        <div className="system-states">
          {systemStates.map((state) => (
            <div key={state.label}>
              <Icon name={state.icon} />
              <strong>{state.label}</strong>
              <span>TODO: mensaje contextual</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Modal">
        <div className="modal-demo">
          <div className="modal-box">
            <div>
              <span className="modal-icon">
                <Icon name="alert" />
              </span>
              <div>
                <strong>Confirmar acción</strong>
                <p>Explica claramente el impacto antes de continuar.</p>
              </div>
            </div>
            <div className="form-actions">
              <Button variant="secondary">Cancelar</Button>
              <Button variant="danger">Confirmar</Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
