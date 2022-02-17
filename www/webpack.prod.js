const path = require("path");
config = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
};
module.exports = config;
