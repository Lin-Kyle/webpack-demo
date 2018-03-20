'use strict'
const path = require('path');
const utils = require('./utils.js');
const config = require('./config.js');

function resolve(dir) {
        return path.join(__dirname, '..', dir)
}

module.exports = {
        entry: {
                index: './src/main.js'
                // polyfills: './src/polyfills.js',
                vendor: ['react', 'react-dom', 'react-router']
        },
        output: {
                path: config.build.assetsRoot,
                filename: '[name].js',
                publicPath: process.env.NODE_ENV === 'production'
                        ? config.build.assetsPublicPath
                        : config.build.assetsPublicPath
        },
        resolve: {
                extensions: [
                        '.js', '.jsx', '.json'
                ],
                alias: {
                        '@': resolve('src'),
                        Css: util.focusPath('assets/css'),
                        Js: util.focusPath('assets/js'),
                        Component: util.focusPath('components')
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
