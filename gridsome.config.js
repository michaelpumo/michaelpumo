const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
  siteUrl: 'https://michaelpumo.com',
  icon: './src/favicon-red.png',
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-98372372-1'
      }
    },
    {
      use: 'gridsome-source-graphql-prismic',
      options: {
        url: `https://${process.env.PRISMIC_REPOSITORY}.prismic.io`,
        fieldName: 'prismic',
        typeName: 'prismic',
        useMasterRef: true
      }
    }
  ],
  chainWebpack(config) {
    const types = [
      'vue-modules',
      'vue',
      'normal-modules',
      'normal'
    ]

    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))

    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }])
  }
}
