const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

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
        options: { compilerOptions: { preserveWhitespace: false } },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sassOptions: { outputStyle: 'compressed' } },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/(locale)$/,
      contextRegExp: /moment$/,
    }),
  ],
  externals: {
    vue: 'vue',
    'element-ui': 'element-ui',
    // 'markdown-it': 'markdown-it',
    // dompurify: 'DOMPurify',
    // prismjs: 'Prism',
    // lodash: '_',
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
            unused: true,
            dead_code: true,
          },
          mangle: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    sideEffects: true,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 250 * 1024,
    maxEntrypointSize: 250 * 1024,
  },
};
