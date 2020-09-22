export const getItem = key => JSON.parse(localStorage.getItem(key))

export const setItem = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data))

export const getText = key => localStorage.getItem(key)

export const setText = (key, data) => localStorage.setItem(key, data)
