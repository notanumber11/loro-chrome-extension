const path = require("path");

module.exports = {
   entry: {
    popup: path.join(__dirname, "src/index.tsx"),
    background: path.join(__dirname, "src/chrome/background.ts"),
    contentScript: path.join(__dirname, "src/chrome/contentScript.ts")
  },
  target: "node",
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/gui'),
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
