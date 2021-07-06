const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': 'rgba(0, 0, 0, 0.85)',
      '@info-color': '#0091ff',
      '@success-color': '#4cd964',
      '@warning-color': '#f7b500',
      '@error-color': '#ff6a6a',
    },
  }),
);
