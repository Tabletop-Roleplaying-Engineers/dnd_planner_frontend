import { GameForm } from '../../src/types/game'

export function defaultGame(game?: Partial<GameForm>) {
  const date = new Date()
  date.setHours(new Date().getHours() + 1)

  return {
    title: 'Game1',
    image: 'https://via.placeholder.com/150',
    description: 'description',
    lvlFrom: 1,
    lvlTo: 4,
    players: 4,
    facebookPost: false,
    gameForNewbies: false,
    isAl: false,
    startingDate: date.toISOString(),
    share: false,
    tags: [],
    ...game,
  }
}
