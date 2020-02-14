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
  siteUrl: 'https://michaelpumo.com',
  icon: './src/favicon-red.png',
  plugins: [
    {
      use: 'gridsome-source-graphql-prismic',
      options: {
        url: `https://${process.env.PRISMIC_REPOSITORY}.prismic.io`,
        fieldName: 'prismic',
        typeName: 'prismic',
        // headers: {
        //   'Prismic-Ref': '',
        //   Authorization: 'Token '
        // },
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
  }
}
