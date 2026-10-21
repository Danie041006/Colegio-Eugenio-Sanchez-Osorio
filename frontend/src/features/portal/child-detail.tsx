import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyTable } from '@/components/ui/empty-table'
import { Icon } from '@/components/ui/icon'

type Tab = 'personal' | 'academico' | 'financiero'

export function ChildDetail({ go }: { go: (path: string) => void }) {
  const [tab, setTab] = useState<Tab>('personal')

  return (
    <>
      <button className="back-link" onClick={() => go('/mis-estudiantes')}>
        <Icon name="arrow-left" size={15} /> Mis estudiantes
      </button>

      <div className="child-profile">
        <Avatar />
        <div>
          <h1>TODO: nombre del estudiante</h1>
          <span>TODO: grado y sección</span>
          <Badge tone="success">Activo</Badge>
        </div>
      </div>

      <div className="tab-list" role="tablist" aria-label="Información del estudiante">
        <button
          className={tab === 'personal' ? 'active' : ''}
          role="tab"
          aria-selected={tab === 'personal'}
          onClick={() => setTab('personal')}
        >
          Información personal
        </button>
        <button
          className={tab === 'academico' ? 'active' : ''}
          role="tab"
          aria-selected={tab === 'academico'}
          onClick={() => setTab('academico')}
        >
          Información académica
        </button>
        <button
          className={tab === 'financiero' ? 'active' : ''}
          role="tab"
          aria-selected={tab === 'financiero'}
          onClick={() => setTab('financiero')}
        >
          Información financiera
        </button>
      </div>

      {tab === 'personal' && (
        <div role="tabpanel">
          <Card title="Datos personales">
            <dl className="details">
              <div>
                <dt>Nombre completo</dt>
                <dd>TODO: nombre</dd>
              </div>
              <div>
                <dt>Documento</dt>
                <dd>TODO: documento</dd>
              </div>
              <div>
                <dt>Fecha de nacimiento</dt>
                <dd>TODO: fecha</dd>
              </div>
              <div>
                <dt>Teléfono</dt>
                <dd>TODO: teléfono</dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd>TODO: correo</dd>
              </div>
              <div>
                <dt>Dirección</dt>
                <dd>TODO: dirección</dd>
              </div>
            </dl>
          </Card>
          <Card title="Representantes autorizados">
            <EmptyTable columns={['Representante', 'Parentesco', 'Teléfono', 'Autorización']} />
          </Card>
        </div>
      )}

      {tab === 'academico' && (
        <div role="tabpanel">
          <Card title="Información académica">
            <dl className="details">
              <div>
                <dt>Grado y sección</dt>
                <dd>TODO: grado y sección</dd>
              </div>
              <div>
                <dt>Período escolar</dt>
                <dd>TODO: período</dd>
              </div>
              <div>
                <dt>Estado de matrícula</dt>
                <dd>TODO: estado</dd>
              </div>
              <div>
                <dt>Promedio general</dt>
                <dd>TODO: promedio</dd>
              </div>
            </dl>
          </Card>
          <Card title="Notas por lapso">
            <EmptyTable columns={['Materia', '1.er lapso', '2.º lapso', '3.er lapso', 'Promedio']} />
          </Card>
          <Card title="Boletines">
            <div className="component-row">
              <Button variant="secondary" icon="download">
                Boletín 1.er lapso
              </Button>
              <Button variant="secondary" icon="download">
                Boletín 2.º lapso
              </Button>
              <Button variant="secondary" icon="download">
                Boletín 3.er lapso
              </Button>
            </div>
          </Card>
        </div>
      )}

      {tab === 'financiero' && (
        <div role="tabpanel">
          <Card className="balance-card">
            <span>Saldo pendiente</span>
            <strong>TODO: saldo</strong>
            <small>TODO: cargos pendientes</small>
          </Card>
          <Card title="Cargos pendientes">
            <div className="empty-state compact">
              <Icon name="file" />
              <strong>TODO: cargos</strong>
              <span>La información de cartera aparecerá aquí.</span>
            </div>
          </Card>
          <Card title="Historial de pagos">
            <div className="empty-state compact">
              <Icon name="payment" />
              <strong>TODO: pagos</strong>
              <span>Los pagos registrados aparecerán aquí.</span>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
