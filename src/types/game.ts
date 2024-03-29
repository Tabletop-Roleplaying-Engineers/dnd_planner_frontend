import { Character } from './character'
import { User } from './user'

export interface Game {
  id: string
  title: string
  image: string
  description: string
  startingDate: string
  lvlFrom: number
  lvlTo: number
  players: number
  characters: Character[]
  user: User
  tags: string[]
}
export type GameForm = Omit<Game, 'id' | 'characters' | 'user'> & {
  share: boolean
}
