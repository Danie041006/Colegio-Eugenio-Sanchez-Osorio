import { Card } from './card'
import { Icon } from './icon'

export function Metric({ label, icon, helper }: { label: string; icon: string; helper: string }) {
  return (
    <Card className="metric">
      <div className="metric__icon">
        <Icon name={icon} />
      </div>
      <span>{label}</span>
      <strong>TODO: dato</strong>
      <small>{helper}</small>
    </Card>
  )
}
