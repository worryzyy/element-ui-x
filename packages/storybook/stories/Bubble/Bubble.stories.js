import ElXBubble from '@/components/Bubble';
import BasicDemo from './BasicDemo.vue';
import SlotDemo from './SlotDemo.vue';

export default {
  title: '组件库/Bubble 对话',
  component: ElXBubble,
  parameters: {
    controls: {
      exclude: [
        'start',
        'writing',
        'finish',
        'avatarError',
        'interrupt',
        'continueTyping',
        'restart',
        'destroy',
      ],
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: '汽包显示的文本内容',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    avatar: {
      control: 'text',
      description: '头像图片地址',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    placement: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: '汽包位置（左侧或右侧）',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'start'" },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'borderless', 'shadow'],
      description: '汽包样式变体',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'filled'" },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['', 'round', 'corner'],
      description: '汽包形状',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    maxWidth: {
      control: 'text',
      description: '汽包内容最大宽度',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'500px'" },
      },
    },
    avatarSize: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 4,
      },
      description: '头像大小（像素）',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '0' },
      },
    },
    avatarGap: {
      control: {
        type: 'number',
        min: 0,
        max: 50,
        step: 2,
      },
      description: '头像与内容的间距（像素）',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '12' },
      },
    },
    avatarShape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: '头像形状',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'circle'" },
      },
    },
    avatarSrcSet: {
      control: 'text',
      description: '头像 srcset 属性',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    avatarAlt: {
      control: 'text',
      description: '头像 alt 属性',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    avatarFit: {
      control: { type: 'select' },
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: '头像图片适应方式',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'cover'" },
      },
    },
    noStyle: {
      control: 'boolean',
      description: '是否禁用默认样式',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    typing: {
      control: 'object',
      description:
        '打字机效果配置。可以是布尔值或对象 { step: 每次打字字符数, interval: 间隔毫秒, suffix: 光标字符 }',
      table: {
        type: { summary: 'Boolean | Object' },
        defaultValue: { summary: 'undefined' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isMarkdown: {
      control: 'boolean',
      description: '是否渲染为 Markdown',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFog: {
      control: 'object',
      description: '雾化效果配置。可以是布尔值或对象 { bgColor: 背景色, width: 雾化宽度 }',
      table: {
        type: { summary: 'Boolean | Object' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export const Basic = {
  name: '基础用法',
  render: args => ({
    components: { BasicDemo },
    template: '<BasicDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    content: `## Markdown示例
这是一个支持**Markdown**渲染的打字器效果演示。

## 功能特点
- 支持标题
- 支持**粗体**和*斜体*
- 支持代码块
- 支持列表

\`\`\`javascript
// 示例代码
function greet(name) {
    return 'Hello, ' + name + '!';
}
console.log(greet('World'));
\`\`\`

[这是饿了么官网](https://element.eleme.cn/)`,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    placement: 'start',
    variant: 'filled',
    shape: '',
    maxWidth: '500px',
    avatarSize: 32,
    avatarGap: 12,
    avatarShape: 'circle',
    avatarSrcSet: '',
    avatarAlt: '头像',
    avatarFit: 'cover',
    noStyle: false,
    typing: true,
    loading: false,
    isMarkdown: true,
    isFog: true,
  },
};

export const Slots = {
  name: '插槽用法',
  render: args => ({
    components: { SlotDemo },
    template: '<SlotDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    content: '欢迎使用 Element UI X',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    placement: 'start',
    variant: 'filled',
    shape: '',
    maxWidth: '500px',
    avatarSize: 32,
    avatarGap: 12,
    avatarShape: 'circle',
    noStyle: false,
    typing: true,
    loading: false,
    isMarkdown: false,
    isFog: true,
  },
};
