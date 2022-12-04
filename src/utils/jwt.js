import * as jose from 'jose'

export const decode = (token) => {
  if (!token) {
    return null
  }

  return JSON.parse(
    new TextDecoder().decode(jose.base64url.decode(token.split('.')[1])),
  )
}
