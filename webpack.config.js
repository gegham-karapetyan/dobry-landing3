const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index-new.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
};
