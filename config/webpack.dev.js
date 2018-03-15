const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
        mode: "development",
        devtool: 'inline-source-map',
        devServer: {
                contentBase: path.resolve(__dirname, 'dist'),
                hot: true,
                port: 9000
        },
        output: {
                filename: '[name].[hash].js',
        },
        plugins: [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin()
        ],
})
