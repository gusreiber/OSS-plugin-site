const webpack = require('webpack');
const path = require('path');
const cssnext = require('postcss-cssnext');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'app');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'index.html'),
    filename: 'index.html',
    inject: true
  }),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    { from: 'css', to: 'css' }
  ])
];

function getJenkinsBuildInformation() {
  return {
    timeStamp: new Date().toISOString(),
    revision: process.env.GIT_COMMIT || 'HEAD',
    branch: process.env.GIT_BRANCH || 'develop',
    jenkinsTag: process.env.BUILD_TAG || 'local',
    jenkinsUrl: process.env.BUILD_URL || undefined,
    version: require('./package.json').version
  };
}

const release = process.env.NODE_ENV === 'production';

if (release) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': JSON.stringify({
      debug: false,
      NODE_ENV: 'production',
      REST_API_URL: process.env.REST_API_URL,
    })
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: false,
    compress: {
      warnings: false
    }
  }));
} else {
  plugins.push(new webpack.DefinePlugin({
    'process.env': JSON.stringify({
      debug: true,
      NODE_ENV: 'development',
      REST_API_URL: process.env.REST_API_URL,
      buildRevisionInfo: getJenkinsBuildInformation()
    })
  }));
}

const config = {
  debug: !release,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.join(APP_DIR, 'index')
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: NODE_MODULES
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
        exclude: NODE_MODULES
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: plugins,
  postcss: function () {
    return [cssnext];
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;
