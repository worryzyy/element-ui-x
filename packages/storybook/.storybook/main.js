const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  // 自定义标题
  title: 'Element UI X',

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false, // 👈 disable the backgrounds addon
      },
    },
  ],

  framework: {
    name: '@storybook/vue-webpack5',
    options: {
      // 禁用 Vue 组件的自动推断以减少自动生成的控件
      docgen: false,
    },
  },

  webpackFinal: async config => {
    // 添加SCSS支持
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    // 配置别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../element-ui-x/src'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
    };

    return config;
  },

  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },

  // 自定义页面标题
  managerHead: head => `
    ${head}
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
    <title>Element UI X</title>
    <meta name="description" content="Element UI X 组件库 Storybook 文档" />
  `,
};
