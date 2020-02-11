// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

const path = require('path')

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_base.scss')
      ]
    })
}

module.exports = {
  siteName: 'Michael Pumo',
  plugins: [],
  chainWebpack(config) {
    const types = [
      'vue-modules',
      'vue',
      'normal-modules',
      'normal'
    ]

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}
