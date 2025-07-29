import ElXThinking from '@/components/Thinking';
import BasicDemo from './BasicDemo.vue';

export default {
  title: '组件库/Thinking 思考过程',
  component: ElXThinking,
  parameters: {
    controls: {
      exclude: [
        'update:expanded',
        'update:status',
        'change',
        'arrow',
        'content',
        'label',
        'error',
        'change',
        'status-icon',
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
    modelValue: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['start', 'thinking', 'end', 'error'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'start'" },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoCollapse: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    buttonWidth: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'160px'" },
      },
    },
    duration: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'0.2s'" },
      },
    },
    maxWidth: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'500px'" },
      },
    },
    backgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'#fcfcfc'" },
      },
    },
    color: {
      control: 'color',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'#909399'" },
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
    content:
      '这是一个思考过程的示例内容...\n\n1. 首先分析问题\n2. 然后寻找解决方案\n3. 最后验证结果',
    modelValue: true,
    status: 'thinking',
    disabled: false,
    autoCollapse: false,
    buttonWidth: '160px',
    duration: '0.2s',
    maxWidth: '500px',
    backgroundColor: '#fcfcfc',
    color: '#909399',
  },
};
