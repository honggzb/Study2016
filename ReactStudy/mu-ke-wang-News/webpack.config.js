var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const AntdBabelPlugin = require('babel-plugin-import');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const VENDOR_LIBS = [
  'react','react-dom', 'react-router', 'react-router-dom', 'antd'
];

process.traceDeprecation = true;

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
       //"style-loader" - creates style nodes from JS strings
       //"css-loader" - translates CSS into CommonJS
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader" ,"less-loader"]
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            },
          },
          {
            loader: 'react-svg-loader',
            query: { jsx: true }
          }
        ]
      },
      {
          test: /\.(png|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
    ]
  },
  plugins: [
    //use CommonsChunkPlugin to add duplication only to vendor.js
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor'
      }),
    //create HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: 'src/index.html'
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      // }
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/dist/'
    })
    // new OpenBrowserPlugin({
    //   url: 'http://localhost:8080'
    // }),
  ],
  devtool: 'inline-source-map'
};