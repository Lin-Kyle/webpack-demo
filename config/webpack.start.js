const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const common = require('./webpack.common.js');
const util = require('./util.js');

const config = merge(common, {
        mode: "development",
        devtool: '#cheap-module-eval-source-map',
        /*entry: {
                index: ['webpack-dev-server/client?http://localhost:4000', 'react-hot-loader/patch', './src/index.js']
        },*/
        /*devServer: {
                contentBase: path.resolve(__dirname, '../dist'),
                hot: true,
                port: 4000
        },*/
        /*output: {
                // filename: '[name].[hash:8].js',
                filename: '[name].bundle.js'
        },*/
        plugins: [
                new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
                new FriendlyErrorsPlugin(),
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new HtmlWebpackPlugin({
                        chunks: [
                                'vendor', 'app'
                        ],
                        filename: 'index.html',
                        template: 'src/index.html',
                        inject: true
                })
        ],

        module: {
                rules: [
                        {
                                test: /\.scss$/,
                                include: [
                                        util.resolve('assets/css'), util.resolve('components')
                                ],
                                use: ['style-loader', 'css-loader', util.postcssLoader, 'sass-loader']
                        }, {
                                test: /\.css$/,
                                include: [
                                        util.resolve('assets/css'), util.resolve('components')
                                ],
                                use: ['style-loader', 'css-loader', util.postcssLoader]
                        }
                ]
        }
})

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true&noInfo=false'].concat(config.entry[name])
})

module.exports = config
