import { Role } from './role'

export interface User {
  id: string
  firstName: string
  lastName: string
  avatar: string
  username: string
  roles: Role[]
}

export interface UserJwt extends User {
  actions: string[]
}
