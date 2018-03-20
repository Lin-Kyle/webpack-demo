const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractCSS = new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[name].css"});
const extractSCSS = new MiniCssExtractPlugin({filename: "[name].scss", chunkFilename: "[name].scss"});

const common = require('./webpack.common.js');
const util = require('./util.js');

module.exports = merge(common, {
        mode: "production",
        devtool: 'source-map',
        entry: {
                index: ['./src/index.js']
        },
        output: {
                filename: '[name].[chunkhash:8].js'
        },
        module: {
                rules: [
                        {
                                test: /\.scss$/,
                                include: [
                                        util.focusPath('assets/css'), util.focusPath('components')
                                ],
                                use: [MiniCssExtractPlugin.loader, 'css-loader', util.postcssLoader, 'sass-loader']
                        }, {
                                test: /\.css$/,
                                include: [
                                        util.focusPath('assets/css'), util.focusPath('components')
                                ],
                                use: [MiniCssExtractPlugin.loader, 'css-loader', util.postcssLoader]
                        }
                ]
        },
        plugins: [
                new CleanWebpackPlugin(['dist/*'], {
                        root: path.resolve(__dirname, '../'),
                        verbose: true,
                        dry: false
                }),
                new HtmlWebpackPlugin({template: 'index.html'}),
                new webpack.HashedModuleIdsPlugin(),
                extractCSS
        ]
})
