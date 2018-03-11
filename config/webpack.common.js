const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// console.log(path.resolve(__dirname, '../src/'));
module.exports = {
        entry: {
                app: './src/index.js',
                // print: './src/print.js'
        },
        plugins: [
                new CleanWebpackPlugin(['dist']),
                new HtmlWebpackPlugin({title: 'Output Management'}),
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin()
        ],
        module: {
                rules: [
                        {
                                test: /\.(js|jsx)$/,
                                exclude: /node_modules/,
                                use: [
                                        {
                                                loader: 'babel-loader',
                                                options: {
                                                        presets: ['es2015', 'react']
                                                }
                                        }
                                ]
                        }, {
                                test: /\.css$/,
                                use: ['style-loader', 'css-loader']
                        }, {
                                test: /\.(png|jpg|jpeg|gif)$/,
                                use: ['file-loader']
                        }, {
                                test: /\.(woff|woff2|eot|ttf|otf)$/,
                                use: ['file-loader']
                        }, {
                                test: /\.(csv|tsv)$/,
                                use: ['csv-loader']
                        }, {
                                test: /\.xml$/,
                                use: ['xml-loader']
                        }
                ]
        },
        output: {
                filename: '[name].bundle.js',
                path: path.resolve(__dirname, 'dist'),
                // publicPath: path.resolve(__dirname, 'dist')
        },
        resolve: {
                extensions: [
                        '.js', '.jsx', '.json', '.coffee'
                ],
                alias: {
                        // @: focusPath(''),
                        // Components: focusPath('components'),
                        Css: path.resolve(__dirname, '../src/assets/css') 
                }
        }
}
/*function focusPath(path) {
        return path.join(__dirname, '../src/' + path)
}*/
