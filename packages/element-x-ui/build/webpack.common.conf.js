const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.common.js',
    library: 'ElementUIX',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  externals: {
    vue: 'vue',
    'element-ui': 'element-ui',
  },
};
