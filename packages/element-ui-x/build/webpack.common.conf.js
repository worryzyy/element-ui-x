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
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['> 1%', 'last 2 versions', 'ie >= 9'] },
                modules: 'commonjs',
                loose: true,
              },
            ],
          ],
          plugins: [
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-transform-block-scoping',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
                silenceDeprecations: ['legacy-js-api', 'import'],
              },
            },
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
            unused: false, // 禁用删除未使用变量，可能导致问题
            dead_code: false, // 禁用删除不可达代码，可能导致问题
            sequences: false, // 禁用逗号表达式优化
            conditionals: false, // 禁用条件表达式优化
          },
          mangle: false, // 禁用变量名混淆，避免语法错误
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 250 * 1024,
    maxEntrypointSize: 250 * 1024,
  },
};
