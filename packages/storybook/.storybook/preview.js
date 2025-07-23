import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mermaid from 'mermaid';

// 配置Element UI
Vue.use(ElementUI);

// 配置 Mermaid
if (typeof window !== 'undefined') {
  window.mermaid = mermaid;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily:
      '"Helvetica Neue", Arial, "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
  });
}

// 配置Storybook参数
export const parameters = {
  actions: {
    argTypesRegex: '^$', // 禁用自动事件检测
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    hideNoControlsWarning: true,
    // 隐藏 Vue 组件的 events 和 slots
    exclude: [
      /^on.*/,     // 隐藏所有以 'on' 开头的事件
      /.*slot.*/,  // 隐藏所有包含 'slot' 的属性
      'v-slots',
      'v-on', 
      'slots',
      'events',
      '$listeners',
      '$slots',
      '$attrs',
      '$emit',
      'v-model',
      'v-if',
      'v-show',
      'v-for',
      'key',
      'ref',
      'default', // 隐藏默认插槽
      'header',  // 隐藏头部插槽
      'footer',  // 隐藏底部插槽
      'prefix',  // 隐藏前缀插槽
      'suffix',  // 隐藏后缀插槽
    ],
  },
  docs: {
    source: {
      type: 'code',
    },
  },
  layout: 'padded',
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
  // 全局配置 - 隐藏 Vue 自动生成的 argTypes
  previewTabs: {
    'storybook/docs/panel': { title: 'Docs' },
    canvas: { title: 'Canvas' },
  },
};

// 全局装饰器
export const decorators = [
  story => ({
    components: { story },
    template: '<div style=""><story /></div>',
  }),
];

// 全局参数
export const globalTypes = {};

// 全局 argTypes 配置 - 隐藏 Vue 相关的属性
export const argTypes = {
  // 隐藏 Vue 事件
  'onUpdate': { table: { disable: true }, control: false },
  'onClick': { table: { disable: true }, control: false },
  'onChange': { table: { disable: true }, control: false },
  'onInput': { table: { disable: true }, control: false },
  'onFocus': { table: { disable: true }, control: false },
  'onBlur': { table: { disable: true }, control: false },
  'onSubmit': { table: { disable: true }, control: false },
  'onClear': { table: { disable: true }, control: false },
  'onSpeech': { table: { disable: true }, control: false },
  
  // 隐藏 Vue 插槽
  'default': { table: { disable: true }, control: false },
  'header': { table: { disable: true }, control: false },
  'footer': { table: { disable: true }, control: false },
  'prefix': { table: { disable: true }, control: false },
  'suffix': { table: { disable: true }, control: false },
  'prepend': { table: { disable: true }, control: false },
  'append': { table: { disable: true }, control: false },
  
  // 隐藏 Vue 内置属性
  'v-slots': { table: { disable: true }, control: false },
  'v-on': { table: { disable: true }, control: false },
  'slots': { table: { disable: true }, control: false },
  'events': { table: { disable: true }, control: false },
  '$listeners': { table: { disable: true }, control: false },
  '$slots': { table: { disable: true }, control: false },
  '$attrs': { table: { disable: true }, control: false },
  '$emit': { table: { disable: true }, control: false },
  
  // 隐藏 Vue 指令
  'v-model': { table: { disable: true }, control: false },
  'v-if': { table: { disable: true }, control: false },
  'v-show': { table: { disable: true }, control: false },
  'v-for': { table: { disable: true }, control: false },
  'key': { table: { disable: true }, control: false },
  'ref': { table: { disable: true }, control: false },
};
