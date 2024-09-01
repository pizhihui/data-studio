const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');

const path = require('path');
// import path from 'path';
const baseDir = process.cwd();


module.exports = {
  mode: "development",
  // context: path.resolve(__dirname, 'app/src'),
  entry: './src/index.tsx',
  devServer: {
    port: 9077,
    static: './dist',
    open: false,
    hot: true,
    liveReload: false,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  // optimization: {
  //   runtimeChunk: 'single'
  // },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      process: "process/browser",
      '@': path.resolve('./src')
    },
    // fallback: { fs: false }, // For antlr4!
    fallback: {
      fs: false,
      util: require.resolve('util'),
      assert: require.resolve('assert'),
      process: require.resolve('process/browser'),
      sys: require.resolve('util'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  output: {
    filename: path.join('js', `[name].js?[fullhash:5]`),
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
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
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'reflexy')
        ],
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
          'postcss-loader',
        ],
      },
      // Css ---- node_modules ------
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        // exclude: [
        //   path.join(__dirname, 'node_modules', 'antd'),
          // path.join(baseDir, 'node_modules', '@ant-design'),
        // ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // Less --- antd ---
      {
        test: /\.less$/,
        // include: [
        //   path.resolve(__dirname, 'node_modules', 'antd'),
        //   path.resolve(baseDir, 'node_modules', '@ant-design'),
        // ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              // javascriptEnabled: true,
              // modifyVars: merge(getThemeVariables({ dark: true, compact: true }), antdLessVars),
            },
          },
        ],
      },
      // font use asset
      {
        test: /\.(woff2|eot|ttf|woff|woff2|otf)$/i,
        type: 'asset/resource',
        dependency: { not: ['url'] },
      },
      // IMG
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [path.resolve(__dirname, 'src/assets'), path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: 'file-loader',
            name: `assets/[name].[ext]?[hash:base64:5]`,
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Develop Management",
      template: "./public/index.html"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new MonacoWebpackPlugin({ output: 'workers', languages: ['sql'] }),
  ]
};
