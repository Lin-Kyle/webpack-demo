const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
        entry: {
                app: [// 'webpack-dev-server/client?http://0.0.0.0:9000',
                        //  'react-hot-loader/patch',
                        './src/index.js'],
                vendor: ['react-router']
        },
        output: {
                path: path.resolve(__dirname, '../dist'),
                // publicPath: path.resolve(__dirname, 'dist')
        },
        plugins: [],
        module: {
                rules: [
                        {
                                test: /\.(js|jsx)$/,
                                exclude: /node_modules/,
                                use: [
                                        {
                                                loader: 'babel-loader',
                                                options: {
                                                        presets: ['es2015', 'react']
                                                }
                                        }
                                ]
                        }, {
                                test: /\.css$/,
                                use: ['style-loader', 'css-loader']
                        }, {
                                test: /\.(png|jpg|jpeg|gif)$/,
                                use: ['file-loader']
                        }, {
                                test: /\.(woff|woff2|eot|ttf|otf)$/,
                                use: ['file-loader']
                        }, {
                                test: /\.(csv|tsv)$/,
                                use: ['csv-loader']
                        }, {
                                test: /\.xml$/,
                                use: ['xml-loader']
                        }
                ]
        },
        optimization: {
                minimize: true,
                runtimeChunk: {
                        name: "manifest"
                },
                splitChunks: {
                        cacheGroups: {
                                vendor: {
                                        test: /[\\/]node_modules[\\/]/,
                                        name: 'vendor',
                                        priority: -20,
                                        chunks: 'all'
                                }
                        }
                }
        },
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
