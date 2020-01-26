import * as R from 'ramda'

export const playersInGame = [3, 4, 5, 6]

export const modalWidth = () => {
  if (document.body.clientWidth > 375) {
    return R.min(document.body.clientWidth * 0.8, 640)
  }
  return '100%'
}
