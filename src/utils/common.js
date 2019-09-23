import * as R from 'ramda'

const stringToClassesPairs = R.split('&') // 'Bard=2&Bard=2' -> ['Bard=2', 'Bard=2']
const stringToClassLvlPair = R.split('=') // 'Bard=2' -> ['Bard', '2']
const toClassLvlPairs = R.pipe(
  stringToClassesPairs,
  R.map(stringToClassLvlPair),
)

export const convertClassesObjToString = R.pipe(
  R.toPairs(),
  R.map(([val, lvl]) => `${val}=${lvl}`),
  R.join('&')
)

export const convertClassesStringToObj = R.pipe(
  toClassLvlPairs,
  R.fromPairs,
)

export const getAvatarLetters = (user) => {
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
