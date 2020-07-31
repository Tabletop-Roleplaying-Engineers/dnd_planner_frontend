const { override, fixBabelImports, addLessLoader, } = require('customize-cra')

module.exports = {
  webpackFinal: override(
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
  ),
}