import { createRoot } from 'react-dom/client'
import validate from 'validate.js'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ENVIRONMENTS } from './constants'

// Custom validator for the images in the internet,
// it tries to download it
validate.validators.linkToImage = function (
  value: string,
  options: { message: string },
  key: string,
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
      rej({ [key]: [options.message || 'Wrong URL'] })
    })
    document.body.appendChild(img)
  })
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

if (process.env.environment === ENVIRONMENTS.TEST) {
  console.warn('You are in the test mode!!!')
}
