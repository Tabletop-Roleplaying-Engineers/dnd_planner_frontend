// Custom validator for the images in the internet,
// it tries to download it
export function validateUrlToPointToAnImage(
  value: string,
  options: { message: string },
) {
  return debouncedValidator(value, options)
}

function validateImage(url: string, options: { message: string }) {
  return new Promise<void>((res, rej) => {
    const img = new Image()
    img.src = url
    img.style.height = '0'
    img.style.width = '0'
    img.addEventListener('load', () => {
      document.body.removeChild(img)
      res()
    })
    img.addEventListener('error', () => {
      document.body.removeChild(img)
      rej(options.message || 'Wrong URL')
    })
    document.body.appendChild(img)
  })
}
const debouncedValidator = debounce(validateImage)
function debounce(this: any, func: Function, timeout = 300) {
  let timer: NodeJS.Timeout
  let prevPromiseRej: any

  return (...args: any[]) => {
    if (prevPromiseRej) {
      prevPromiseRej()
    }

    return new Promise<void>((res, rej) => {
      prevPromiseRej = rej
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args).then(res).catch(rej)
      }, timeout)
    })
  }
}
