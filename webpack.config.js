const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
  devtool: "source-map",
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
    devServer: {
    static: path.resolve(process.cwd(), "./dist"),
    compress: true,
    port: 8080,
    open: false,
  },
  devtool: "source-map",
   plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};