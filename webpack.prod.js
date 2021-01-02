const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: true,
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.DefinePlugin({
      'process.env.isChrome': JSON.stringify("true")
    }),
  ]
});
