import { Icon } from './icon'

export function Avatar({ small = false }: { small?: boolean }) {
  return (
    <div className={`avatar ${small ? 'avatar--small' : ''}`}>
      <Icon name="child" size={small ? 18 : 28} />
      <span>{small ? 'Foto' : 'FOTO'}</span>
    </div>
  )
}
