const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.DefinePlugin({
      'process.env.isChrome': JSON.stringify("true")
    })
  ]
});
