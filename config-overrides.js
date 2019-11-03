const webpack = require('webpack')
const { override, fixBabelImports, addLessLoader,  } = require('customize-cra')
const antTheme = require('./config/antTheme')

const setGlobalObject = value => config => {
  config.output.globalObject = value

  return config
}

const envKeys = Object.keys(process.env).reduce((prev, next) => {
  return {
    ...prev,
    [`process.env.${next}`]: JSON.stringify(process.env[next]),
  };
}, {});

const addEnvVars = (config) => {
  config.plugins.push(new webpack.DefinePlugin(envKeys))
  return config
}

module.exports = override()
module.exports = override(
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
  addEnvVars
)
