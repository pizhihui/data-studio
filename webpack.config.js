const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const baseDir = process.cwd();


module.exports = {
  mode: "development",
  entry: './app/index.tsx',
  devServer: {
    port: 9066,
    static: './dist',
    open: false
  },
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', 'ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Develop Management",
      template: "./public/index.html"
    })
  ]
};
