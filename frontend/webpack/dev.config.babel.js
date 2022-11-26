import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import { manifestJSON } from '../src/configs/config-main'

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    stats: 'errors-only', // Display only errors to reduce the amount of output.
    host: process.env.HOST, // Defaults to `localhost`
    port: '3000', // Defaults to 8080
    open: true, // Open the page in browser
    historyApiFallback: {
      verbose: true,
      index: '/index.html',
      rewrites: [
        { from: /assets\/favicons\/favicon.ico/, to: '/src/assets/favicons/favicon.ico' },
        { from: /\/([a-zA-Z]+)\/([a-zA-Z0-9-_]+)/, to: '/' }
      ]
    }
  },

  module: {
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')],
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: 'cache-loader' },
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[hash:base64:5][path]-[local]'
          }
        },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: '@import "config-styles.scss";',
            includePaths: [
              path.join(__dirname, '..', '/src/configs/theme')
            ]
          }
        }
      ]
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        FAKE_TIME: `"${process.env.FAKE_TIME ? process.env.FAKE_TIME : ''}"`
      },
      __DEVELOPMENT__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new WebpackPwaManifest(manifestJSON),
    new FaviconsWebpackPlugin('src/assets/favicons/favicon.ico')
  ]
}
