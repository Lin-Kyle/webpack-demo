const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.assetsPath = function(_path) {
        console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
        const assetsSubDirectory = process.env.NODE_ENV === 'production'
                ? config.build.assetsSubDirectory
                : config.dev.assetsSubDirectory;
        return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = function(options) {
        options = options || {};

        const cssLoader = {
                loader: 'css-laoder',
                options: {
                        minimize: process.env.NODE_ENV === 'production',
                        sourceMap: options.sourceMap
                }
        }

        function generateLoaders(loader, loaderOptions) {
                const loaders = [cssLoader];
                if (loader) {
                        loaders.push({
                                loader: loader + '-loader',
                                options: Object.assign({}, loaderOptions, {sourceMap: options.sourceMap})
                        })
                }

                if (options.extract) {
                        return [MiniCssExtractPlugin.loader].concat(loaders)
                } else {
                        return ['style-loader'].concat(loaders)
                }
        }

        return {css: generateLoaders(), postcss: generateLoaders(), scss: generateLoaders()}
}

exports.styleLoaders = function(options) {
        const output = [],
                loaders = exports.cssLoaders(options);
        for (const extension in loaders) {
                const loader = loaders[extension];
                output.push({
                        test: new RegExp('\\.' + extension + '$'),
                        use: loader
                })
        }
        return output
}
