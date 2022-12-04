import { CharacterForm } from '../../src/types/character'

export function defaultCharacter(data: { faction: string }): CharacterForm {
  return {
    name: 'characterName',
    class: 'bard=2&monk=2',
    avatar: 'imgUrl',
    notes: 'description',
    ...data,
  }
}
