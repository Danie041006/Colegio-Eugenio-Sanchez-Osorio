import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field } from '@/components/ui/form'
import { PageHeader } from '@/components/ui/page-header'

export function Profile() {
  return (
    <>
      <PageHeader
        eyebrow="CUENTA"
        title="Mi perfil"
        description="Consulta tus datos y actualiza tu contraseña."
      />
      <div className="two-cols">
        <Card title="Información personal">
          <div className="profile-person">
            <div className="user-initial user-initial--large">D</div>
            <div>
              <strong>Diego</strong>
              <span>Administrador</span>
            </div>
          </div>
          <dl className="details">
            <div>
              <dt>Nombre</dt>
              <dd>Diego</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>TODO: correo</dd>
            </div>
            <div>
              <dt>Último acceso</dt>
              <dd>TODO: fecha y hora</dd>
            </div>
          </dl>
        </Card>
        <Card title="Cambiar contraseña">
          <div className="stack">
            <Field label="Contraseña actual" type="password" />
            <Field label="Nueva contraseña" type="password" />
            <Field label="Confirmar nueva contraseña" type="password" />
            <Button>Actualizar contraseña</Button>
          </div>
        </Card>
      </div>
    </>
  )
}
