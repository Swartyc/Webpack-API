const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
config = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.html/,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        // Images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        // Fonts
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
      files: "js/**/*.js",
    }),
  ],
  mode: "development",
};
module.exports = config;
