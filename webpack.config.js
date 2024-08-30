const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
// import path from 'path';
const baseDir = process.cwd();


module.exports = {
  mode: "development",
  // context: path.resolve(__dirname, 'app/src'),
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
    fallback: { fs: false }, // For antlr4!
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    // modules: [path.resolve(__dirname, 'app/src')]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      // ts-loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // CSS app/src ----------
      {
        test: /\.css$/,
        // include: path.resolve(__dirname, 'app/src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:5]',
              }
            },
          },
        ],
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Develop Management",
      template: "./public/index.html"
    })
  ]
};
