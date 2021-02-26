import { createContext } from 'react'
import { User } from 'types/user'

export const UserContext = createContext<{
  user: User | null
  setUser: (data: User) => void
}>({
  user: null,
  setUser: () => {},
})
