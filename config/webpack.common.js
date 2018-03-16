const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
        entry: {
                index: './src/index.js',
                // polyfills: './src/polyfills.js',
                vendor: ['react', 'react-dom', 'react-router']
        },
        output: {
                path: path.resolve(__dirname, '../dist'),
                // publicPath: path.resolve(__dirname, 'dist')
        },
        plugins: [
                new webpack.ProvidePlugin({

                })
        ],
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
