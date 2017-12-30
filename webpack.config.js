/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from './app/package.json';


export default {
  externals: Object.keys(externals || {}),
  
  devtool: 'source-map',
  
  target: 'electron-main',
  
  entry: ['babel-polyfill', "./src-electron/index.js"],

  output: {
    path: __dirname,
    filename: './app/dist/app.js',
    libraryTarget: 'commonjs2'
  },
  
  module: {
    rules: [{
      test: /\.(js)$/,
      loader: 'babel-loader',
      query: {
        presets:['env'],
        plugins:['transform-object-rest-spread']
      }
    }]
  },
  

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
    /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
};