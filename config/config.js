const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');
const util = require('./util.js');

module.exports = {
        build: {
                mode: "production",
                devtool: 'source-map',
                index: ['./src/index.js'],
                assetsRoot: path.resolve(__dirname, '../dist'),
                assetsSubDirectory: 'static',
                assetsPublicPath: './',
                productionSourceMap: true,
                productionGzip: false,
                productionGzipExtensions: ['.js', '.jsx', '.json', '.coffee']
        }
}
