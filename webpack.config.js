/* global module require __dirname */
const webpack         = require('webpack');
const path            = require('path');
const NofifierPlugin  = require('webpack-build-notifier');
const nodeExternals   = require('webpack-node-externals');

// ==============================
//  Paths
// ==============================
const rootPath        = __dirname;
const nodeModulesPath = path.resolve( __dirname, 'node_modules');
const buildPath       = path.resolve( __dirname, 'build');
const srcPath         = path.resolve( __dirname, 'src' );
const testPath        = path.resolve( srcPath, 'test' );

const extNodeModules  = nodeExternals();

// ==============================
//  Plugins
// ==============================
const plugins = [

  new NofifierPlugin({
    title: 'Price Basket',
    sound: true,                  // I want some sounds
    suppressSuccess: true,        // only first success is shown, after a fail
    // suppressWarnings: true,    // show warnings too
    successSound: 'Morse',        // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
    warningSound: 'Tink',         // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
    failureSound: 'Basso',        // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
    logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
    activateTerminalWindow: true  // Take me to terminal on errors
  }),

  // new webpack.optimize.UglifyJsPlugin({
  //   sourceMap: true,
  //   comments:true,
  //   compress: {
  //     warnings: false,
  //     conditionals: true,
  //     unused: true,
  //     comparisons: true,
  //     sequences: true,
  //     evaluate: true,
  //     screw_ie8: true,      // eslint-disable-line camelcase
  //     if_return: true,      // eslint-disable-line camelcase
  //     join_vars: true,      // eslint-disable-line camelcase
  //     drop_debugger: true,  // eslint-disable-line camelcase
  //     dead_code: true       // eslint-disable-line camelcase
  //   },
  //   // minimize: true,
  //   // mangle: false,
  //   output: {
  //     comments: false,
  //   }
  // }),

  new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {

  target: 'node',

  // 'eval', 'source-map', hidden-source-map, inline-source-map, eval-source-map, cheap-source-map
  devtool: 'source-map',

  context: srcPath,

  entry: {
    app: [
      'babel-polyfill',
      path.resolve(srcPath, 'index.js')
    ]
  },

  output: {
    path: buildPath,
    filename: 'PriceBasket.js',
    publicPath: '/build',
    devtoolModuleFilenameTemplate : '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },

  resolve: {
    alias:{
      src: srcPath,
      test: testPath
    },
    modules: [
      rootPath,
      nodeModulesPath
    ],
    extensions: ['.js']
  },

  externals: [extNodeModules],

  plugins: plugins,

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/i,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.js$/i,
        include: [srcPath],
        // exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/,
        exclude: /(\/node_modules\/)/,
        use: [{
          loader: 'babel-loader',
          options: { sourceMap: true, presets: ['es2015'] },
        }]
      }
    ]
  }
};