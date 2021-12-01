const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#252525",
              "@info-color": "#0091ff",
              "@success-color": "#6fcf68",
              "@warning-color": "#f7b500",
              "@error-color": "#ff6a6a",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
};
