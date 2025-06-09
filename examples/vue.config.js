const path = require('path');

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
  chainWebpack: config => {
    // 处理 SVG 文件
    config.module.rule('svg').exclude.add(path.resolve(__dirname, 'src/assets/svg')).end();

    // 添加 svg-sprite-loader 规则
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },

  // 配置全局 SCSS 变量
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~element-ui/packages/theme-chalk/src/common/var.scss";`,
      },
    },
  },
};
