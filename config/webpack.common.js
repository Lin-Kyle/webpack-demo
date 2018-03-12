const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
        entry: {
                app: './src/index.js',
                // print: './src/print.js'
        },
        plugins: [
                new CleanWebpackPlugin(['dist']),
                new HtmlWebpackPlugin({template: 'index.html'}),
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin()
        ],
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
                runtimeChunk: {
                        name: "manifest"
                },
                splitChunks: {
                        cacheGroups: {
                                vendor: {
                                        test: /[\\/]node_modules[\\/]/,
                                        name: 'vendors',
                                        priority: -20,
                                        chunks: 'all'
                                }
                        }
                }
        },
        output: {
                filename: '[name].bundle.js',
                path: path.resolve(__dirname, '../dist'),
                // publicPath: path.resolve(__dirname, 'dist')
        },
        resolve: {
                extensions: [
                        '.js', '.jsx', '.json', '.coffee'
                ],
                alias: {
                        // @: focusPath(''),
                        // Components: focusPath('components'),
                        Css: focusPath('assets/css'),
                        Js: focusPath('assets/js'),
                        Component: focusPath('components')
                }
        }
}
function focusPath(_path) {
        return path.resolve(__dirname, '../src/' + _path)
}
