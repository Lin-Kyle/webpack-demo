const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin('style.css'),
  extractScss = new ExtractTextPlugin('scss.css');

module.exports = {
  entry: {
    // polyfills: './src/polyfills.js',
    vendor: ['react', 'react-dom', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -20,
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000,
              publicPath: '/'
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
        // use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
        // use: ['style-loader', 'css-loader']
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }, {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      }, {
        test: /\.xml$/,
        use: ['xml-loader']
      }, {
        test: /\.(html)$/i,
        // use: ['html-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({}), extractCss/* , extractScss */
  ],
  resolve: {
    extensions: [
      '.js', '.jsx', '.json', '.coffee'
    ],
    alias: {
      Css: focusPath('assets/css'),
      Js: focusPath('assets/js'),
      Component: focusPath('components')
    }
  }
}
function focusPath(_path) {
  return path.resolve(__dirname, '../src/' + _path)
}
