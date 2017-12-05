const autoprefixer = require('autoprefixer')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  extractCSS: isProduction,
  preserveWhitespace: false,
  postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ]
}
