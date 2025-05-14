const commonConfig = require('./webpack.common.conf')
const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(commonConfig, {
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'element-x-ui.umd.js',
    library: 'ElementXUI',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  }
})
