const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  entry: path.join(__dirname, "src/index.tsx"),
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: 'http://localhost:8080/',
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new webpack.DefinePlugin({
      'process.env.isChrome': JSON.stringify("false")
    })
  ]
});
