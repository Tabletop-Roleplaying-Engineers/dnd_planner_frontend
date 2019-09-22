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
