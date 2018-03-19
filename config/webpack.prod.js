const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractCSS = new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[name].css"});
const extractSCSS = new MiniCssExtractPlugin({filename: "[name].scss", chunkFilename: "[name].scss"});

const postcssLoader = {
        loader: 'postcss-loader',
        options: {
                config: {
                        path: focusPath('../config/postcss.config.js') // 这个得在项目根目录创建此文件
                }
        }
};

const common = require('./webpack.common.js');

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
                                        focusPath('assets/css'), focusPath('components')
                                ],
                                use: [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader, 'sass-loader']
                        }, {
                                test: /\.css$/,
                                include: [
                                        focusPath('assets/css'), focusPath('components')
                                ],
                                use: [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader]
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

function focusPath(_path) {
        return path.resolve(__dirname, '../src/' + _path)
}
