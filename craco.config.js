const CracoBabelLoaderPlugin = require("craco-babel-loader");

module.exports = {
  plugins: [
    {
      plugin: CracoBabelLoaderPlugin,
      options: {
        plugins: [
          ["@babel/plugin-transform-class-properties", { loose: true }],
          ["@babel/plugin-transform-private-methods", { loose: true }],
          [
            "@babel/plugin-transform-private-property-in-object",
            { loose: true },
          ],
        ],
      },
    },
  ],
};
