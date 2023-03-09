const { merge } = require('webpack-merge');
const common = require('./webpack.common.config');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    static: paths.build,
  },
});
