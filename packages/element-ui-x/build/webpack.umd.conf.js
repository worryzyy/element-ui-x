const commonConfig = require('./webpack.common.conf');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(commonConfig, {
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.umd.js',
    library: 'ElementUIX',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
});
