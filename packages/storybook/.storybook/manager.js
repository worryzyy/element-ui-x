import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Element UI X',
    brandUrl: 'https://element-ui-x.com',
    brandImage: undefined,
    brandTarget: '_self',

    colorPrimary: '#409EFF',
    colorSecondary: '#409EFF',

    // UI
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appBorderColor: '#e4e7ed',
    appBorderRadius: 4,

    // Typography
    fontBase:
      '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: '#303133',
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: '#606266',
    barSelectedColor: '#409EFF',
    barBg: '#ffffff',

    // Form colors
    inputBg: '#ffffff',
    inputBorder: '#dcdfe6',
    inputTextColor: '#303133',
    inputBorderRadius: 4,
  },

  panelPosition: 'bottom',
  showNav: true,
  showPanel: true,
  isFullscreen: false,
  isToolshown: true,
});
