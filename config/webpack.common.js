const path = require('path');
const webpack = require('webpack');
const util = require('./util.js');

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
                                include: [util.focusPath('')],
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
                                include: [
                                        util.focusPath('assets'), util.focusPath('components')
                                ],
                                use: [
                                        {
                                                loader: 'url-loader',
                                                options: {
                                                        limit: 10000
                                                }
                                        }
                                ]
                        }, {
                                test: /\.(woff|woff2|eot|ttf|otf)$/,
                                include: [util.focusPath('assets/font')],
                                use: [
                                        {
                                                loader: 'url-loader',
                                                options: {
                                                        limit: 10000
                                                }
                                        }
                                ]
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
        plugins: [new webpack.ProvidePlugin({})],
        resolve: {
                extensions: [
                        '.js', '.jsx', '.json', '.coffee'
                ],
                alias: {
                        Css: util.focusPath('assets/css'),
                        Js: util.focusPath('assets/js'),
                        Component: util.focusPath('components')
                }
        }
}

function util.focusPath(_path) {
        return path.resolve(__dirname, '../src/' + _path)
}
