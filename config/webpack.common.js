'use strict'
const path = require('path');
const utils = require('./utils.js');
const config = require('./config.js');

module.exports = {
        entry: {
                // polyfills: './src/polyfills.js',
                vendor: ['react', 'react-dom', 'react-router']
        },
        output: {
                path: config.build.assetsRoot,
                pathinfo: true,
                filename: utils.assetsPath('js/[name].[chunkhash].js'),
                chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
                publicPath: process.env.NODE_ENV === 'production'
                        ? config.build.assetsPublicPath
                        : config.build.assetsPublicPath
        },
        resolve: {
                extensions: [
                        '.js', '.jsx', '.json'
                ],
                alias: {
                        '@': utils.resolve(''),
                        Css: utils.resolve('assets/css'),
                        Img: utils.resolve('assets/img'),
                        Js: utils.resolve('assets/js'),
                        Component: utils.resolve('components')
                }
        },
        module: {
                rules: [
                        {
                                test: /\.(js|jsx)$/,
                                exclude: /node_modules/,
                                include: [utils.resolve('')],
                                use: [
                                        {
                                                loader: 'babel-loader',
                                                options: {
                                                        presets: ['es2015', 'react']
                                                }
                                        }
                                ]
                        }, {
                                test: /\.(gif|png|jpe?g|svg)$/i,
                                use: [
                                        {
                                                loader: 'url-loader',
                                                options: {
                                                        limit: 200 * 1024,
                                                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
                                                }
                                        }, {
                                                loader: 'image-webpack-loader',
                                                options: {
                                                        mozjpeg: {
                                                                progressive: true,
                                                                quality: 65
                                                        },
                                                        // optipng.enabled: false will disable optipng
                                                        optipng: {
                                                                enabled: false
                                                        },
                                                        pngquant: {
                                                                quality: '65-90',
                                                                speed: 4
                                                        },
                                                        gifsicle: {
                                                                interlaced: false
                                                        },
                                                        // the webp option will enable WEBP
                                                        webp: {
                                                                quality: 75
                                                        }
                                                }
                                        }
                                ]
                        }, {
                                test: /\.(woff|woff2|eot|ttf|otf)$/,
                                include: [utils.resolve('assets/font')],
                                use: [
                                        {
                                                loader: 'url-loader',
                                                options: {
                                                        limit: 10 * 1024,
                                                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                                                        publicPath: utils.assetsPath('../../../')
                                                }
                                        }
                                ]
                        }, {
                                test: /\.(html)$/,
                                use: {
                                        loader: 'html-loader',
                                        options: {}
                                }
                        }
                ]
        }
}
