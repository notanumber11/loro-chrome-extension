const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.DefinePlugin({
      'process.env.isChrome': JSON.stringify("true")
    })
  ]
});
