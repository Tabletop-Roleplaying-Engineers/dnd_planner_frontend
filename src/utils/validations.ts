// Custom validator for the images in the internet,
// it tries to download it
export function validateUrlToPointToAnImage(
  value: string,
  options: { message: string },
) {
  return new Promise<void>((res, rej) => {
    const img = new Image()
    img.src = value
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
