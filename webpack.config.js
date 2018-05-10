var webpack = require("webpack")
var path = require("path")

module.exports = {
  devtool: "source-map",
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/src",
    filename: "plugin_bundle.js",
    sourceMapFilename: "plugin_bundle.js.map",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loader: "babel-loader"
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'cocoa': path.resolve(__dirname, './src/cocoa') 
    }
  },
  externals: /(sketch(\/([a-zA-Z])+)?)$/,
  plugins: [
    // new webpack.IgnorePlugin(/(sketch(\/([a-zA-Z])+)?)$/)
    new webpack.ProvidePlugin({
      cocoa: "cocoa"
    })
  ]
};
