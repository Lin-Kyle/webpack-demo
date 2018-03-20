const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const util = require('./util.js');

function resolve(dir) {
        return path.join(__dirname, '..', dir)
}

module.exports = {
        entry: {
                // polyfills: './src/polyfills.js',
                vendor: ['react', 'react-dom', 'react-router']
        },
        output: {
                path: config.build.assetsRoot,
                filename: '[name].js',
                publicPath: process.env.NODE_ENV === 'production'
                        ? config.build.assetsPublicPath
                        : config.dev.assetsPublicPath
        },
        resolve: {
                extensions: [
                        '.js', '.jsx', '.json', '.coffee'
                ],
                alias: {
                        Css: util.focusPath('assets/css'),
                        Js: util.focusPath('assets/js'),
                        Component: util.focusPath('components')
                }
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
                                include: [resolve('src')],
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
                                                        limit: 10000,
                                                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
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
                                                        limit: 10000,
                                                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                                                }
                                        }
                                ]
                        }
                ]
        }
}

function util.focusPath(_path) {
        return path.resolve(__dirname, '../src/' + _path)
}
