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
