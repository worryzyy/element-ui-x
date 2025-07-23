import ElXTypewriter from '@/components/Typewriter';
import TypewriterDemo from './TypewriterDemo.vue';

export default {
  title: '组件库/Typewriter 打字器',
  component: ElXTypewriter,
  parameters: {
    controls: {
      exclude: [
        'start',
        'writing',
        'finish',
        'interrupt',
        'continue',
        'restart',
        'highlight',
        'mdPlugins',
      ],
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: '要显示的文本内容',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    isMarkdown: {
      control: 'boolean',
      description: '是否为Markdown格式',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    typing: {
      control: 'object',
      description:
        '打字机配置。可以是布尔值或对象 { step: 每次打字字符数, interval: 间隔毫秒, suffix: 光标字符 }',
      table: {
        type: { summary: 'Boolean | Object' },
        defaultValue: { summary: 'false' },
      },
    },
    isFog: {
      control: 'object',
      description: '雾化效果配置。可以是布尔值或对象 { bgColor: 背景色, width: 雾化宽度 }',
      table: {
        type: { summary: 'Boolean | Object' },
        defaultValue: { summary: 'false' },
      },
    },

    mdPlugins: {
      control: false,
      description: 'Markdown插件数组',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export const Default = {
  name: '基础演示',
  render: args => ({
    components: { TypewriterDemo },
    template: '<TypewriterDemo v-bind="$props" />',
    props: ['content', 'typing', 'isMarkdown', 'isFog'],
  }),

  args: {
    content: `# Markdown示例
这是一个支持**Markdown**渲染的打字器效果演示。

## 功能特点
- 支持标题
- 支持**粗体**和*斜体*
- 支持代码块

\`\`\`javascript
// 示例代码
function greet(name) {
    return 'Hello, ' + name + '!';
}
console.log(greet('World'));
\`\`\``,
    typing: {
      step: 2,
      interval: 100,
      suffix: '|',
    },
    isMarkdown: true,
    isFog: {
      bgColor: '#FFFFFF',
      width: '80px',
    },
  },
};
