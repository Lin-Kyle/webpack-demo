const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
        mode: "production",
        devtool: 'source-map',
        output: {
                filename: '[name].[chunkhash].js',
        },
        plugins: [
                new CleanWebpackPlugin(['dist']),
                new HtmlWebpackPlugin({template: 'index.html'}),
                new webpack.HashedModuleIdsPlugin(),
        ]
})
