const path = require('path');
module.exports = {
        postcssLoader: {
                loader: 'postcss-loader',
                options: {
                        config: {
                                path: path.resolve(__dirname, 'postcss.config.js') // 这个得在项目根目录创建此文件
                        }
                }
        },

        focusPath: function(_path) {
                return path.resolve(__dirname, '../src/' + _path)
        }
}
