import * as R from 'ramda'
import { ENVIRONMENTS } from '../constants'
import format from 'date-fns/format'
import { User, UserJwt } from 'types/user'
import { Game } from 'types/game'

export const convertClassesStringToArray = (classesString: string) => {
  const classesStrings = classesString.split('&')

  return classesStrings.map((str) => str.split('=')) as [string, string][]
}

const stringToClassesPairs = R.split('&') // 'Bard=2&Bard=2' -> ['Bard=2', 'Bard=2']
const stringToClassLvlPair: (str: string) => any = (str: string) => {
  // 'Bard=2' -> ['Bard', '2']
  const pair = str.split('=')

  if (pair.length >= 2) {
    return [pair[0], pair[1]] as [string, string]
  }

  return null
}
const filterEmpty = (str: string) => !!str.length
const toClassLvlPairs: (str: string) => [string, string][] = R.pipe(
  stringToClassesPairs,
  R.filter(filterEmpty),
  R.map(stringToClassLvlPair),
  R.reject(R.isNil),
)

export const convertClassesObjToString: (
  classes: Record<string, string>,
) => string = R.pipe(
  R.toPairs,
  R.map(([val, lvl]) => `${val}=${lvl}`),
  R.join('&'),
)

export const convertClassesStringToObj = R.pipe<
  string,
  [string, string][],
  {
    [index: string]: string
  }
>(toClassLvlPairs, R.fromPairs)

export const getAvatarLetters = (user: User) => {
  let name = ''
  if (user.firstName) {
    name += user.firstName.slice(0, 1)
  }
  if (user.lastName) {
    name += user.lastName.slice(0, 1)
  }
  if (name.length === 0) {
    name = user.username.slice(0, 1)
  }

  return name
}

export const omit = <T, K extends Array<keyof T>>(
  props: K,
  obj: T,
): Omit<T, K[number]> => {
  const objToOmit = { ...obj }
  props.forEach((prop) => delete objToOmit[prop])

  return objToOmit
}

export const isTesting = () => {
  return process.env.environment === ENVIRONMENTS.TEST
}

export const parseGame = (game: Game) => {
  const date = new Date(game.startingDate)

  return {
    ...game,
    dateKey: format(date, 'yyyy-MM-dd'),
    startingDate: date,
  }
}

export const getUserName = (user: User) => {
  const nameParts = []
  if (user.firstName) {
    nameParts.push(user.firstName)
  }
  if (user.lastName) {
    nameParts.push(user.lastName)
  }
  if (nameParts.length > 0) {
    return nameParts.join(' ')
  }

  return user.username
}

export const hasAction = (user: UserJwt, action: string) =>
  user && user.actions.indexOf(action) >= 0

export function noop() {}
