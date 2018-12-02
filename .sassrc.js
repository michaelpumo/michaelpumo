const packageImporter = require('node-sass-package-importer')
const path = require('path')
const CWD = process.cwd()

module.exports = {
  importer: [
    packageImporter()
  ],
  includePaths: [
    // bourbon.includePaths,
    // neat.includePaths,
    path.resolve(CWD, 'node_modules/bourbon'),
    path.resolve(CWD, 'node_modules/bourbon-neat'),
    path.resolve(CWD, 'node_modules'),
    path.resolve(CWD, 'src')
  ]
  // includePaths: [
  // ]
}
