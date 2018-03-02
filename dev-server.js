const webpackDevServer = require('webpack-dev-server'),
        webpack = require('webpack'),
        config = require('./webpack.config.js'),
        options = {
                contentBase: './dist',
                hot: true,
                host: 'localhost'
        };

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config),
        server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
        console.log('500');
})
