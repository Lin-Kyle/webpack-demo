const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
        mode: "development",
        devtool: 'inline-source-map',
        entry: {
                app: [/*'webpack-dev-server/client?http://0.0.0.0:9000', 'react-hot-loader/patch', */'./src/index.js']
        },
        devServer: {
                contentBase: path.resolve(__dirname, 'dist'),
                hot: true,
                port: 9000
        },
        output: {
                // filename: '[name].[hash:8].js',
                filename: '[name].bundle.js',
        },
        plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
})
