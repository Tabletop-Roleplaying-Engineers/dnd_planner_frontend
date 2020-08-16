import * as R from 'ramda'
import { ENVIRONMENTS } from '../constants'
import format from 'date-fns/format'

const stringToClassesPairs = R.split('&') // 'Bard=2&Bard=2' -> ['Bard=2', 'Bard=2']
const stringToClassLvlPair = R.split('=') // 'Bard=2' -> ['Bard', '2']
const filterEmpty = str => !!str.length
const toClassLvlPairs = R.pipe(
  stringToClassesPairs,
  R.filter(filterEmpty),
  R.map(stringToClassLvlPair),
)

export const convertClassesObjToString = R.pipe(
  R.toPairs(),
  R.map(([val, lvl]) => `${val}=${lvl}`),
  R.join('&'),
)

export const convertClassesStringToObj = R.pipe(
  toClassLvlPairs,
  R.fromPairs,
)

export const getAvatarLetters = user => {
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

export const omit = (props, obj) => {
  const objToOmit = { ...obj }
  props.forEach(prop => delete objToOmit[prop])
  return objToOmit
}

export const isTesting = () => {
  return process.env.environment === ENVIRONMENTS.TEST
}

export const parseGame = game => {
  const date = new Date(parseInt(game.startingDate, 10))
  return {
    ...game,
    dateKey: format(date, 'yyyy-MM-dd'),
    startingDate: date,
  }
}

export const getUserName = user => {
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
