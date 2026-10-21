import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, SelectField } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { PageHeader } from '@/components/ui/page-header'

export function Payment({ go }: { go: (path: string) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="PAGOS"
        title="Registrar pago"
        description="Registra y aplica un ingreso a los cargos pendientes."
      />
      <div className="stepper">
        <span className="done">1</span>
        <strong>Estudiante</strong>
        <i />
        <span className="current">2</span>
        <strong>Pago</strong>
        <i />
        <span>3</span>
        <strong>Confirmación</strong>
      </div>
      <div className="two-cols two-cols--payment">
        <Card title="1. Buscar estudiante">
          <label className="search search--wide">
            <Icon name="search" />
            <input aria-label="Buscar estudiante" placeholder="Nombre, documento o código del estudiante" />
          </label>
        </Card>
        <Card title="2. Cargos pendientes">
          <div className="empty-state compact">
            <Icon name="file" />
            <strong>Selecciona un estudiante</strong>
            <span>Sus cargos pendientes aparecerán aquí.</span>
          </div>
        </Card>
        <Card title="3. Aplicación del pago">
          <div className="form-grid">
            <Field label="Monto recibido" placeholder="TODO: monto" />
            <SelectField label="Método de pago">
              <option>Efectivo</option>
              <option>Nequi</option>
              <option>Bancolombia</option>
            </SelectField>
            <SelectField label="Cuenta de destino">
              <option>TODO: cuenta</option>
            </SelectField>
            <Field label="Referencia" placeholder="TODO: referencia" />
          </div>
        </Card>
        <Card title="Resumen" className="payment-summary">
          <div className="summary-lines">
            <span>
              Monto recibido <strong>TODO: monto</strong>
            </span>
            <span>
              Aplicado a cargos <strong>TODO: monto</strong>
            </span>
            <span>
              Saldo a favor <strong>TODO: monto</strong>
            </span>
            <hr />
            <span className="summary-total">
              Total <strong>TODO: monto</strong>
            </span>
          </div>
          <Button onClick={() => go('/comprobantes/1')}>Confirmar pago</Button>
          <div className="summary-print">
            <Button variant="secondary">Imprimir recibo</Button>
          </div>
          <p className="button-helper">Verifica la información antes de confirmar.</p>
        </Card>
      </div>
    </>
  )
}
