import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SelectField } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

export function Students({ go }: { go: (path: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="GESTIÓN ACADÉMICA"
        title="Estudiantes"
        description="Consulta y administra los estudiantes registrados."
        action={
          <Button icon="plus" onClick={() => go('/estudiantes/nuevo')}>
            Nuevo estudiante
          </Button>
        }
      />
      <Card>
        <div className="toolbar">
          <label className="search">
            <Icon name="search" />
            <input aria-label="Buscar estudiantes" placeholder="Buscar por nombre o documento" />
          </label>
          <SelectField label="Grado">
            <option>TODO: grado</option>
          </SelectField>
          <SelectField label="Estado">
            <option>Activo</option>
            <option>Inactivo</option>
          </SelectField>
          <Button variant="secondary">Limpiar filtros</Button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Documento</th>
                <th>Grado y sección</th>
                <th>Estado</th>
                <th>Saldo pendiente</th>
                <th aria-label="Acciones" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Estudiante">
                  <div className="person-cell">
                    <Avatar small />
                    <div>
                      <strong>TODO: nombre</strong>
                      <span>TODO: código</span>
                    </div>
                  </div>
                </td>
                <td data-label="Documento">TODO: documento</td>
                <td data-label="Grado y sección">TODO: grado y sección</td>
                <td data-label="Estado">
                  <Badge tone="success">Activo</Badge>
                </td>
                <td data-label="Saldo pendiente">
                  <strong>TODO: saldo</strong>
                </td>
                <td data-label="Acción">
                  <button className="card-action" onClick={() => go('/estudiantes/1')}>
                    Ver ficha <Icon name="arrow" />
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={6} className="muted-row">
                  TODO: más registros de estudiantes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Mostrando TODO: registros</span>
          <div>
            <Button variant="secondary">Anterior</Button>
            <Button variant="secondary">Siguiente</Button>
          </div>
        </div>
      </Card>
    </>
  )
}
