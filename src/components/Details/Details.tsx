import type { User, UserInfo } from '@/types/user.types'
import { useEffect, useState } from 'react'
import './Details.css'

interface DetailsProps {
  info: User | null
}

export default function Details({ info }: DetailsProps) {
  const infoId = info?.id ?? null

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!infoId) {
      setUserInfo(null)
      setLoading(false)
      setError('')
      return
    }

    let cancelled = false

    async function loadUserInfo() {
      try {
        setLoading(true)
        setError('')
        setUserInfo(null)

        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${infoId}.json`,
        )

        if (!response.ok) {
          throw new Error('Не удалось загрузить данные пользователя')
        }

        const data: UserInfo = await response.json()

        if (!cancelled) {
          setUserInfo(data)
        }
      }
      catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Произошла ошибка при загрузке данных пользователя',
          )
        }
      }
      finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadUserInfo()

    return () => {
      cancelled = true
    }
  }, [infoId])

  if (!info) {
    return (
      <div className="details details--empty">
        Выберите пользователя из списка
      </div>
    )
  }

  if (loading) {
    return (
      <div className="details details--loading">
        Загрузка данных...
      </div>
    )
  }

  if (error) {
    return (
      <div className="details details--error">
        {error}
      </div>
    )
  }

  if (!userInfo) {
    return null
  }

  const avatarSrc = `${userInfo.avatar}${userInfo.avatar.includes('?') ? '&' : '?'}user=${userInfo.id}`

  return (
    <div className="details">
      <img
        alt={userInfo.name}
        className="details__avatar"
        src={avatarSrc}
      />

      <h3 className="details__name">
        {userInfo.name}
      </h3>

      <div className="details__row">
        <span className="details__label">
          City:
        </span>
        <span>
          {userInfo.details.city}
        </span>
      </div>

      <div className="details__row">
        <span className="details__label">
          Company:
        </span>
        <span>
          {userInfo.details.company}
        </span>
      </div>

      <div className="details__row">
        <span className="details__label">
          Position:
        </span>
        <span>
          {userInfo.details.position}
        </span>
      </div>
    </div>
  )
}
