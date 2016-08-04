// Only a couple of es6 feature are supported!!!
/* eslint-disable no-console */ //This is because we are using console log for communications

//require('./rest');

const ip = 'localhost';
const portClient = 5000;
const portBackend = 8080;
const backend = `http://${ip}:${portBackend}`;

const runningMode = process.env.NODE_ENV || 'development';

var
  webpack = require('webpack'),
  config = require(`../webpack.config.${runningMode}`),
  WebpackServer = require('webpack-dev-server');

new WebpackServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/developers': backend,
    '/plugin/*': backend,
    '/plugins': backend,
    '/plugins/downloaded': backend,
    '/plugins/updated': backend,
    '/labels': backend,
    '/categories*': backend
  }
}).listen(portClient, ip, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Listening at port:', portClient);
  console.log('using backEnd:', backend);
});
