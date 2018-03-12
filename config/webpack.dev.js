const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
        mode: "development",
        devtool: 'inline-source-map',
        devServer: {
                contentBase: path.resolve(__dirname, 'dist'),
                hot: true,
                port: 9000
        },
        plugins: []
})
