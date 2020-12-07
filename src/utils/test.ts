export function assertElementExist(el: HTMLElement | null): asserts el {
  if (el === null) {
    throw new Error('Element is `null`')
  }
}
