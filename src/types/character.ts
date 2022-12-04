import { Faction } from './faction'
import { Game } from './game'
import { User } from './user'

export type Character = {
  id: string
  name: string
  experience: string
  renown: string
  faction: Faction
  avatar: string
  class: string
  user: User
  games: Game[]
  notes: string
}

export type CharacterForm = {
  name: string
  faction: string
  class: string
  avatar: string
  notes: string
}
