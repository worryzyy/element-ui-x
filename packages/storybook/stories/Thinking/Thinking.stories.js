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
      description: '思考内容',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    modelValue: {
      control: 'boolean',
      description: '是否展开',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['start', 'thinking', 'end', 'error'],
      description: '状态',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'start'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoCollapse: {
      control: 'boolean',
      description: '是否自动收起',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    buttonWidth: {
      control: 'text',
      description: '按钮宽度',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'160px'" },
      },
    },
    duration: {
      control: 'text',
      description: '动画持续时间',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'0.2s'" },
      },
    },
    maxWidth: {
      control: 'text',
      description: '最大宽度',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'500px'" },
      },
    },
    backgroundColor: {
      control: 'color',
      description: '背景颜色',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'#fcfcfc'" },
      },
    },
    color: {
      control: 'color',
      description: '文字颜色',
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
