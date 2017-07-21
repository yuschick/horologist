var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dist/js/')
  },
  plugins: [new BrowserSyncPlugin({
    files: [
      "./dist/**/*.js", "./**/*.html", "./dist/styles/*.css"
    ],
    host: 'localhost',
    port: 3000,
    server: {
      baseDir: ['./']
    }
  })],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
