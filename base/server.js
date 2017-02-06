var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = '3031';
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  // hot: true,
  historyApiFallback: true,
  quiet: false,
  proxy: {
      '/_webservices/**': {
        target: 'http://www.planning.vic.gov.au',
        secure: true,
        changeOrigin: true
      },
      '/js/**': {
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true
      },
      '/styles/**': {
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true
      },
  }
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:' + port + '/');
});