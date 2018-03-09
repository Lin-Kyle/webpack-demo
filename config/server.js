const express = require('express'),
        webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware');

const app = express(),
        config = require('../webpack.common.js'),
        compiler = webpack('config');

app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}))

app.listen(3000, function() {
        console.log('Listen!!');
})
