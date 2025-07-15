const path = require('path');

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        // 配置 Sass 以忽略弃用警告
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
      scss: {
        // 配置 SCSS 以忽略弃用警告
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
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
};
