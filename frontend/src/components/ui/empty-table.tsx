import { Icon } from './icon'

export function EmptyTable({ columns = ['Fecha', 'Detalle', 'Estado', 'Monto'] }: { columns?: string[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length}>
              <div className="table-empty">
                <Icon name="file" size={24} />
                <strong>Sin datos para mostrar</strong>
                <span>TODO: cargar información</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
