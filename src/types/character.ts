import { Faction } from './faction'
import { Game } from './game'
import { User } from './user'

export interface Character {
  id: string
  name: string
  experience: string
  renown: string
  faction: Faction
  avatar: string
  class: string
  user: User
  games: Game[]
}
