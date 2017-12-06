const autoprefixer = require('autoprefixer')

const utils = require('./utils')
const config = require('../config')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  extractCSS: isProduction,
  preserveWhitespace: false,
  loaders: utils.cssLoaders({
    sourceMap: isProduction ?
      config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ]
}
