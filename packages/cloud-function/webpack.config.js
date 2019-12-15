const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: 'src/gcp',
  devtool: 'source-map',
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['@rjpearson94/core']
    })
  ],

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'modules', 'function', 'inversify', 'dist')
  },

  plugins: [
    new ZipPlugin({
      filename: 'inversify-demo-cloud-function.zip'
    })
  ],

  module: {
    rules: [
      {
        test: /.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules\/(?!(@rjpearson94)\/).*/
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },

  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: 'tsconfig.build.json'
      })
    ],
    extensions: ['.tsx', '.ts', '.js']
  }
};
