import type { User } from '@/types/user.types'
import { useEffect, useState } from 'react'
import Details from './components/Details/Details'
import List from './components/List/List'
import './App.css'

const USERS_URL
  = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadUsers() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(USERS_URL)
        if (!response.ok) {
          throw new Error('Не удалось загрузить список пользователей')
        }

        const data: User[] = await response.json()

        if (!cancelled) {
          setUsers(data)
        }
      }
      catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Произошла ошибка при загрузке пользователей',
          )
        }
      }
      finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      cancelled = true
    }
  }, [])

  const handleSelectUser = (user: User) => {
    if (selectedUser?.id === user.id) {
      return
    }

    setSelectedUser(user)
  }

  return (
    <div className="app">
      <div className="app__column">
        <h2 className="app__title">
          Users
        </h2>

        {loading && (
          <div className="app__message">
            Загрузка списка...
          </div>
        )}

        {error && (
          <div className="app__error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <List
            onSelect={handleSelectUser}
            selectedId={selectedUser?.id ?? null}
            users={users}
          />
        )}
      </div>

      <div className="app__column">
        <h2 className="app__title">
          Details
        </h2>
        <Details info={selectedUser} />
      </div>
    </div>
  )
}
