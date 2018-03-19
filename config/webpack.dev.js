const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

const postcssLoader = {
        loader: 'postcss-loader',
        options: {
                config: {
                        path: focusPath('../config/postcss.config.js') // 这个得在项目根目录创建此文件
                }
        }
};
module.exports = merge(common, {
        mode: "development",
        devtool: 'inline-source-map',
        entry: {
                index: ['./src/index.js']
        },
        output: {
                // filename: '[name].[hash:8].js',
                filename: '[name].bundle.js'
        },
        plugins: [
                new CleanWebpackPlugin(['dist/*'], {
                        root: path.resolve(__dirname, '../'),
                        verbose: true,
                        dry: false
                }),
                new HtmlWebpackPlugin({template: 'index.html'})
        ],

        module: {
                rules: [
                        {
                                test: /\.scss$/,
                                include: [
                                        focusPath('assets/css'), focusPath('components')
                                ],
                                use: ['style-loader', 'css-loader', postcssLoader, 'sass-loader']
                        }, {
                                test: /\.css$/,
                                include: [
                                        focusPath('assets/css'), focusPath('components')
                                ],
                                use: ['style-loader', 'css-loader', postcssLoader]
                        }
                ]
        }
})

function focusPath(_path) {
        return path.resolve(__dirname, '../src/' + _path)
}
