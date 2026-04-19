export interface User {
  id: number
  name: string
}

export interface UserInfo {
  id: number
  name: string
  avatar: string
  details: UserDetails
}

export interface UserDetails {
  city: string
  company: string
  position: string
}
