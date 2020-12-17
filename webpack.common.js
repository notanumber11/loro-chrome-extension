const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/gui/index.tsx"),
    background: path.join(__dirname, "src/chrome/background.ts"),
    contentScript: path.join(__dirname, "src/chrome/contentScript.ts")
  },
  target: "node", // https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /tests/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
