const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require('./webpack.common.js');
const util = require('./util.js');
const utils = require('./utils.js');
const config = require('./config.js');

const webpackConfig = merge(common, {
        mode: config.build.mode,
        devtool: config.build.productionSourceMap
                ? config.build.devtool
                : false,
        entry: {
                // index: config.build.entry
        },
        output: {
                path: config.build.assetsRoot,
                filename: utils.assetsPath('[name].[chunkhash:8].js'),
                chunkFilename: utils.assetsPath('js.[id].[chunkhash].js')
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
                new HtmlWebpackPlugin({
                        filename: process.env.NODE_ENV === 'testing'
                                ? 'index.html'
                                : config.build.index,
                        template: 'index.html',
                        inject: true,
                        chunksSortMode: 'dependency',
                        minify: {
                                removeComments: true,
                                collapseWhitespace: true,
                                removeAttributeQuotes: true
                        }
                }),
                new webpack.HashedModuleIdsPlugin(),
                new MiniCssExtractPlugin({filename: utils.assetsPath("css/[name].[contenthash].css"), chunkFilename: "[name].css"}),
                /*new CopyWebpackPlugin([
                        {
                                from: path.resolve(__dirname, '../static'),
                                to: config.build.assetsSubDirectory,
                                ignore: ['.*']
                        }
                ])*/
        ],
        optimization: {
                minimize: true,
                splitChunks: {
                        cacheGroups: {
                                vendor: {
                                        test: /[\\/]node_modules[\\/]/,
                                        name: 'vendor',
                                        priority: -20,
                                        chunks: 'all'
                                }
                        }
                },
                runtimeChunk: {
                        name: "manifest"
                }
        }
})

if (config.build.productionGzip) {
        const CompressionWebpackPlugin = require('compression-webpack-plugin');

        webpackConfig.plugins.push(new CompressionWebpackPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
        }))
}

if (config.build.bundleAnalyzerReport) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
