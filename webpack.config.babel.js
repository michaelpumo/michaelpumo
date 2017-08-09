import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SvgStorePlugin from 'external-svg-sprite-loader/lib/SvgStorePlugin';
import bourbon from 'bourbon';
import neat from 'bourbon-neat';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const FILE_LOADER_IMAGES_DEV = {
  name: 'images/[name].[ext]'
};

const FILE_LOADER_IMAGES_PROD = {
  name: 'images/[name].[ext]',
  publicPath: './dist/'
  // outputPath: 'images/',
  // useRelativePath: false
};

const FILE_LOADER_FILES_DEV = {
  name: 'files/[name].[ext]'
};

const FILE_LOADER_FILES_PROD = {
  name: 'files/[name].[ext]',
  publicPath: './dist/'
};

const FILE_LOADER_FONTS_DEV = {
  name: '../fonts/[name].[ext]'
};

const FILE_LOADER_FONTS_PROD = {
  name: 'fonts/[name].[ext]',
  publicPath: './dist/'
};

/*
const FILE_LOADER_SVG_DEV = {
  name: 'svg/[name].[ext]'
};

const FILE_LOADER_SVG_PROD = {
  name: 'svg/[name].[ext]',
  publicPath: '/dist/'
};
*/

process.traceDeprecation = false;

const extractScss = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true
});

const config = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true
  },
  entry: {
    'app.patterns': [
      path.resolve(__dirname, 'src/js/app.patterns.js')
    ],
    'app.main': [
      path.resolve(__dirname, 'src/js/app.main.js'),
      path.resolve(__dirname, 'src/scss/app.main.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    sourceMapFilename: 'js/[name].map'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    open: false
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              attrs: [
                'img:src',
                'img:data-src',
                'link:href',
                'use:href'
              ]
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015']
              ]
            }
          }
        ]
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: (IS_PRODUCTION) ? FILE_LOADER_FILES_PROD : FILE_LOADER_FILES_DEV
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: (IS_PRODUCTION) ? FILE_LOADER_FONTS_PROD : FILE_LOADER_FONTS_DEV
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: (IS_PRODUCTION) ? FILE_LOADER_IMAGES_PROD : FILE_LOADER_IMAGES_DEV
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: false,
              optipng: {
                optimizationLevel: 7,
                quality: '90',
                speed: 5
              },
              mozjpeg: {
                quality: 90
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      /*
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: (IS_PRODUCTION) ? FILE_LOADER_SVG_PROD : FILE_LOADER_SVG_DEV
          },
          {
            loader: 'external-svg-sprite-loader',
            options: {
              name: 'svg/sprite.svg',
              iconName: '[name]'
            }
          }
        ]
      },
      */
      {
        test: /\.scss$/,
        use: extractScss.extract([
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'Explorer >= 9',
                      'Android >= 4'
                    ]
                  })
                ];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                bourbon.includePaths,
                neat.includePaths
              ]
            }
          }
        ])
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new SvgStorePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app.common',
      filename: 'js/app.common.js',
      minChunks: 2,
    }),
    new HtmlWebpackPlugin({
      title: 'Portfolio',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: 'src/pug/app.pug',
      filetype: 'pug',
      filename: (IS_PRODUCTION) ? path.resolve(__dirname, './index.html') : 'index.html'
    }),
    extractScss
  ]
};

export default config;
