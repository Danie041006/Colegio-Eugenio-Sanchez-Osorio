import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, SelectField } from '@/components/ui/form'
import { PageHeader } from '@/components/ui/page-header'

export function NewStudent({ go }: { go: (path: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="ESTUDIANTES"
        title="Nuevo estudiante"
        description="Registra los datos del estudiante y su representante."
      />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          go('/estudiantes')
        }}
      >
        <Card title="Foto del estudiante">
          <div className="upload">
            <Avatar />
            <div>
              <strong>Placeholder de foto</strong>
              <span>No se generan imágenes de estudiantes. Carga una fotografía autorizada.</span>
              <Button variant="secondary">Seleccionar archivo</Button>
            </div>
          </div>
        </Card>
        <Card title="Datos del estudiante">
          <div className="form-grid">
            <Field label="Nombres" />
            <Field label="Apellidos" />
            <SelectField label="Tipo de documento">
              <option>TODO: tipo</option>
            </SelectField>
            <Field label="Número de documento" />
            <Field label="Fecha de nacimiento" type="date" placeholder="" />
            <SelectField label="Grado">
              <option>TODO: grado</option>
            </SelectField>
            <SelectField label="Sección">
              <option>TODO: sección</option>
            </SelectField>
          </div>
        </Card>
        <Card title="Datos del representante">
          <div className="form-grid">
            <Field label="Nombres y apellidos" />
            <Field label="Documento" />
            <Field label="Parentesco" />
            <Field label="Teléfono" />
            <Field label="Correo electrónico" type="email" />
            <Field label="Dirección" />
          </div>
        </Card>
        <div className="form-actions">
          <Button variant="secondary" onClick={() => go('/estudiantes')}>
            Cancelar
          </Button>
          <Button type="submit">Guardar estudiante</Button>
        </div>
      </form>
    </>
  )
}
