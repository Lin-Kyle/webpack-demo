const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
        entry: {
                app: './src/index.js',
                // print: './src/print.js'
        },
        devtool: 'inline-source-map',
        devServer: {
                contentBase: path.resolve(__dirname, 'dist'),
                hot: true,
                port: 9000
        },
        plugins: [
                new CleanWebpackPlugin(['dist']),
                new HtmlWebpackPlugin({title: 'Output Management'}),
                // new UglifyJSPlugin(),
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin()
        ],
        module: {
                rules: [
                        /*{
                                test: /\.js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                        loader: 'babel-loader',
                                        query: {
                                                presets: ["es2015"]
                                        }
                                }
                        }, */
                        {
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
        }
}
