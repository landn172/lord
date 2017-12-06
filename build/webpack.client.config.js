const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base.config')
const WorkboxPlugin = require('workbox-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const utils = require('./utils')
const config = require('../config')

const dist = base.output.path

const webpackConfig = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: process.env.NODE_ENV === 'production'
    })
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    // auto generate service worker
    new WorkboxPlugin({
      globDirectory: dist,
      globPatterns: ['**/*.{html,js}'],
      swSrc: './src/sw.js',
      swDest: path.join(dist, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CopyWebpackPlugin([
      { from: require.resolve('workbox-sw'), to: 'workbox-sw.prod.js' }
    ])
  )
}

if (config.build.productionGzip) {
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('' +
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
