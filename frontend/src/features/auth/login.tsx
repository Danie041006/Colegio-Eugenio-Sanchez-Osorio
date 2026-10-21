import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import type { Role } from '@/app/types'

export function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>('admin')

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand brand--light">
          <div className="brand__mark">ESO</div>
          <div>
            <strong>Colegio Eugenio</strong>
            <span>Sánchez Osorio</span>
          </div>
        </div>
        <div>
          <p>SISTEMA INTERNO</p>
          <h1>Gestión escolar clara y segura.</h1>
          <span>Acceso exclusivo para personal autorizado y representantes.</span>
        </div>
        <small>TODO: información institucional</small>
      </section>
      <section className="login-form">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onLogin(selectedRole)
          }}
        >
          <div className="mobile-login-brand">
            <div className="brand__mark">ESO</div>
            <strong>Colegio Eugenio Sánchez Osorio</strong>
          </div>
          <p className="eyebrow">BIENVENIDO</p>
          <h2>Inicia sesión</h2>
          <p>Ingresa tus credenciales para continuar.</p>
          <Field label="Correo o documento" placeholder="TODO: usuario" />
          <Field label="Contraseña" placeholder="••••••••" type="password" />
          <label className="field">
            <span>Rol para visualizar prototipo</span>
            <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as Role)}>
              <option value="admin">Administrador</option>
              <option value="manager">Gestor</option>
              <option value="representative">Representante</option>
            </select>
          </label>
          <button className="forgot" type="button">
            ¿Olvidaste tu contraseña?
          </button>
          <Button type="submit">Ingresar al sistema</Button>
          <div className="login-security">
            <Icon name="shield" />
            <span>Conexión segura · Acceso privado</span>
          </div>
        </form>
      </section>
    </main>
  )
}
