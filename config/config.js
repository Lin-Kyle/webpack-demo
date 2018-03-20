const path = require('path');

module.exports = {
        build: {
                mode: "production",
                index: path.resolve(__dirname, '../dist/index.html'),
                entry: ['./src/index.js'],
                assetsRoot: path.resolve(__dirname, '../dist'),
                assetsSubDirectory: './',
                assetsPublicPath: './',
                devtool: 'source-map',
                productionSourceMap: true,
                productionGzip: false,
                productionGzipExtensions: [
                        '.js', '.jsx', '.json'
                ],
                bundleAnalyzerReport: process.env.npm_config_report
        }
}
