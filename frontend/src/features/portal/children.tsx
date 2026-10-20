import { Avatar } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

export function Children({ go }: { go: (path: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="FAMILIA"
        title="Mis hijos"
        description="Consulta el estado de pagos de tus hijos."
      />
      <div className="child-list">
        <button className="child-card" onClick={() => go('/mis-hijos/1')}>
          <Avatar />
          <div>
            <strong>TODO: nombre del hijo</strong>
            <span>TODO: grado y sección</span>
            <div>
              <small>Saldo pendiente</small>
              <b>TODO: saldo</b>
            </div>
          </div>
          <Icon name="arrow" />
        </button>
        <div className="empty-child">
          <Icon name="plus" />
          <span>TODO: otros hijos asociados</span>
        </div>
      </div>
      <div className="mobile-help">
        <Icon name="shield" />
        <div>
          <strong>¿Necesitas ayuda?</strong>
          <span>TODO: canal de contacto del colegio</span>
        </div>
      </div>
    </>
  )
}
