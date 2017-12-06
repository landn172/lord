const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const vueConfig = require('./vue-loader.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ?
    false :
    '#cheap-module-source-map',
  output: {
    path: config.build.assetsRoot,
    publicPath: isProd ? config.build.assetsPublicPath :
      config.dev.assetsPublicPath,
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public'),
      '@': path.resolve('src')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueConfig
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.css$/,
      use: isProd ?
        ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'vue-style-loader'
        }) :
        ['vue-style-loader', 'css-loader']
    }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd ?
    [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ] :
    [
      new FriendlyErrorsPlugin()
    ]
}
