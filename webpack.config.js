const path = require("path");
const dist = path.resolve(__dirname, "dist");
var webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: "jsc-vm",
  entry: { vm: "./babel-runtime.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].generated.js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals(
  ),
  ],
  mode: "development",
  module: {
    rules: []
  },
  experiments: {
    asyncWebAssembly: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      'ASM_JS': path.resolve(__dirname, './jsc/jsc.js')
    })
  ]
}
