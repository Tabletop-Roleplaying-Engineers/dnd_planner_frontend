import * as R from 'ramda'

export const playersInGame = [3, 4, 5, 6]

export const modalWidth = () => R.min(document.body.clientWidth * 0.8, 640)