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
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    avatar: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    placement: {
      control: { type: 'select' },
      options: ['start', 'end'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'start'" },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'borderless', 'shadow'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'filled'" },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['', 'round', 'corner'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    maxWidth: {
      control: 'text',
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
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '12' },
      },
    },
    avatarShape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'circle'" },
      },
    },
    avatarSrcSet: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    avatarAlt: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    avatarFit: {
      control: { type: 'select' },
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'cover'" },
      },
    },
    noStyle: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    typing: {
      control: 'object',
      table: {
        type: { summary: 'Boolean | Object' },
        defaultValue: { summary: 'undefined' },
      },
    },
    loading: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isMarkdown: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFog: {
      control: 'object',
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
