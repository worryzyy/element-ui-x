const commonConfig = require('./webpack.common.conf');
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.esm.js',
    library: 'ElementUIX',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  // 外部化依赖，不打包进组件库
  externals: {
    vue: 'Vue',
    'element-ui': 'ELEMENT',
    // 'markdown-it': 'markdown-it',
    // dompurify: 'DOMPurify',
    // prismjs: 'Prism',
    // lodash: '_',
  },
  // 生产模式优化
  mode: 'production',
  optimization: {
    usedExports: true, // 启用 Tree Shaking
    minimize: true, // 启用代码压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
            drop_debugger: true, // 移除 debugger
            pure_funcs: ['console.log'], // 移除 console.log
            unused: true, // 删除未使用的变量和函数
            dead_code: true, // 删除不可达代码
          },
          mangle: true, // 混淆变量名
          output: {
            comments: false, // 移除注释
            beautify: false, // 不美化输出
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    sideEffects: true, // 启用副作用标记
  },
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // 忽略特定的模块
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
});
