const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
    index: ['./src/index.js']
  },
  output: {
    // filename: '[name].[hash:8].js',
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({template: 'index.html'})
  ]
})
