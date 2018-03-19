const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractSASS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const postcssLoader = {
        loader: 'postcss-loader',
        options: {
                config: {
                        path: focusPath('../config/postcss.config.js') // 这个得在项目根目录创建此文件
                }
        }
};

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
                                include: [focusPath('')],
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
                                        focusPath('assets'), focusPath('components')
                                ],
                                use: [
                                        {
                                                loader: 'url-loader',
                                                options: {
                                                        limit: 10000,
                                                        publicPath: '/'
                                                }
                                        }
                                ]
                        }, {
                                test: /\.css$/,
                                include: [
                                        focusPath('assets/css'), focusPath('components')
                                ],
                                // use: extractCSS.extract(['css-loader', 'postcss-loader'])
                                use: ['style-loader', 'css-loader']
                        }, {
                                test: /\.scss$/,
                                include: [
                                        focusPath('assets/css'), focusPath('components')
                                ],
                                /*use: ExtractTextPlugin.extract({
                                        fallback: 'style-loader',
                                        use: ['css-loader', 'sass-loader']
                                })*/
                                // use: extractSASS.extract(['css-loader', 'sass-loader'])
                                use: ['style-loader', 'css-loader', 'sass-loader', postcssLoader]
                        }, {
                                test: /\.(woff|woff2|eot|ttf|otf)$/,
                                include: [focusPath('assets/font')],
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
                        }/*, {
                                loader: 'postcss-loader',
                                options: {
                                        config: {
                                                path: './config/postcss.config.js'
                                        }
                                }
                        }*/
                ]
        },
        plugins: [
                new webpack.ProvidePlugin({}),
                /* extractCSS, extractSASS */
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
