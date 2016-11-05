const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
  entry: {
    index: [ "./src/index.ts", "./src/index.scss" ],
  },
  output: {
    path: __dirname + "/public",
    filename: "index.[name]",
  },
  resolve: {
    extensions: [ '', '.ts', '.js', '.scss' ],
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, loaders: [ "tslint" ] },
    ],
    loaders: [
      { test: /\.ts$/, loaders: [ "ts" ] },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "head",
    }),
    new ExtractTextPlugin("[name].css", { allChunks: true }),
  ],
}
