const webpack = require('webpack')
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
} = require('customize-cra')
const antTheme = require('./config/antTheme')
const path = require('path')

const isDev = process.env.environment === 'development'

// We want to use different `eslint` configs for the development and build stage
// e.g. for the dev mode we want `console.log()` to be `warning`, but for the build it should be `error`
const useDifferentEslintRc = () => {
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useEslintRc(path.resolve(__dirname, './dev.eslintrc'))
  }
}

const setGlobalObject = (value) => (config) => {
  config.output.globalObject = value

  return config
}

const envKeys = Object.keys(process.env).reduce((prev, next) => {
  return {
    ...prev,
    [`process.env.${next}`]: JSON.stringify(process.env[next]),
  }
}, {})

const addEnvVars = (config) => {
  config.plugins.push(new webpack.DefinePlugin(envKeys))

  return config
}

module.exports = override(
  useDifferentEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antTheme,
  }),
  setGlobalObject('this'),
  addEnvVars,
)
