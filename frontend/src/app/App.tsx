import { useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { MobileMenu } from '@/components/app/mobile-menu'
import { Sidebar } from '@/components/app/sidebar'
import { Topbar } from '@/components/app/topbar'
import { Login } from '@/features/auth/login'
import { Cancellations } from '@/features/annulments/cancellations'
import { Charges } from '@/features/billing/charges'
import { Dashboard } from '@/features/dashboard/dashboard'
import { DesignSystem } from '@/features/design/design-system'
import { Payment } from '@/features/payments/payment'
import { Profile } from '@/features/profile/profile'
import { Receipt } from '@/features/receipts/receipt'
import { Reports } from '@/features/reports/reports'
import { NewStudent } from '@/features/students/new-student'
import { StudentDetail } from '@/features/students/student-detail'
import { Students } from '@/features/students/students'
import { Users } from '@/features/users/users'
import { ChildDetail } from '@/features/portal/child-detail'
import { Children } from '@/features/portal/children'
import { Receipts } from '@/features/portal/receipts'
import type { Role } from './types'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRoleState] = useState<Role>('admin')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const go = (path: string) => navigate(path)

  const setRole = (nextRole: Role) => {
    setRoleState(nextRole)
    go(nextRole === 'representative' ? '/mis-estudiantes' : '/dashboard')
  }

  const handleLogin = (nextRole: Role) => {
    setRoleState(nextRole)
    go(nextRole === 'representative' ? '/mis-estudiantes' : '/dashboard')
  }

  if (location.pathname === '/login') {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className={`app-shell app-shell--${role}`}>
      <Sidebar role={role} pathname={location.pathname} go={go} setRole={setRole} />
      <main className="main">
        <Topbar role={role} go={go} onOpenMenu={() => setMobileMenuOpen(true)} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard go={go} />} />
            <Route path="/estudiantes" element={<Students go={go} />} />
            <Route path="/estudiantes/nuevo" element={<NewStudent go={go} />} />
            <Route path="/estudiantes/:id" element={<StudentDetail go={go} />} />
            <Route path="/pagos/nuevo" element={<Payment go={go} />} />
            <Route
              path="/comprobantes/:id"
              element={<Receipt go={go} representative={role === 'representative'} />}
            />
            <Route path="/cobros" element={<Charges />} />
            <Route path="/reportes" element={<Reports />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/anulaciones" element={<Cancellations />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/diseno" element={<DesignSystem />} />
            <Route path="/mis-estudiantes" element={<Children go={go} />} />
            <Route path="/mis-estudiantes/:id" element={<ChildDetail go={go} />} />
            <Route path="/comprobantes" element={<Receipts go={go} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
      <MobileMenu
        role={role}
        pathname={location.pathname}
        open={mobileMenuOpen}
        close={() => setMobileMenuOpen(false)}
        go={go}
        setRole={setRole}
      />
    </div>
  )
}
