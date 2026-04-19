import type { User } from '@/types/user.types'
import './List.css'

interface ListProps {
  users: User[]
  selectedId: number | null
  onSelect: (user: User) => void
}

export default function List({ users, selectedId, onSelect }: ListProps) {
  return (
    <ul className="list">
      {users.map(user => (
        <li
          className={`list__item ${selectedId === user.id ? 'list__item--active' : ''}`}
          key={user.id}
          onClick={() => onSelect(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  )
}
