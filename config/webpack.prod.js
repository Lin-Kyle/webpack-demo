const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
        mode: "production",
        devtool: 'source-map',
        entry: {
                app: ['./src/index.js'],
        },
        output: {
                filename: '[name].[chunkhash:8].js'
        },
        plugins: [
                new CleanWebpackPlugin(['dist/*.*'], {
                        root: __dirname,
                        verbose: true,
                        dry: false
                }),
                new HtmlWebpackPlugin({template: 'index.html'}),
                new webpack.HashedModuleIdsPlugin()
        ]
})
