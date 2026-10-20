import type { ReactNode } from 'react'

export function Field({
  label,
  placeholder = 'TODO: dato',
  type = 'text',
}: {
  label: string
  placeholder?: string
  type?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} />
    </label>
  )
}

export function SelectField({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select defaultValue="">
        <option value="" disabled>
          Seleccionar
        </option>
        {children}
      </select>
    </label>
  )
}
