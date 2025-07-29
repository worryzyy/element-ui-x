import ElXThoughtChain from '@/components/ThoughtChain';

const defaultThinkingItems = [
  {
    id: 1,
    title: '开始分析',
    status: 'success',
    thinkTitle: '问题识别',
    thinkContent: '首先，我需要理解用户的需求和问题背景...',
    isCanExpand: true,
    isDefaultExpand: true,
  },
  {
    id: 2,
    title: '数据处理',
    status: 'loading',
    thinkTitle: '正在处理',
    thinkContent: '正在分析和处理相关数据，请稍候...',
    isCanExpand: true,
    isDefaultExpand: false,
  },
  {
    id: 3,
    title: '结果验证',
    status: 'success',
    thinkTitle: '验证完成',
    thinkContent: '经过验证，解决方案符合预期要求...',
    isCanExpand: true,
    isDefaultExpand: false,
  },
];

export default {
  title: '组件库/ThoughtChain 思考链',
  component: ElXThoughtChain,
  parameters: { controls: { exclude: ['update:expanded', 'handle-expand', 'icon'] } },
  argTypes: {
    thinkingItems: {
      control: 'object',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
    },
    dotIsIcon: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dotSize: {
      control: { type: 'select' },
      options: ['mini', 'small', 'medium', 'large'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'small'" },
      },
    },
    maxWidth: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'600px'" },
      },
    },
    lineGradient: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rowKey: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'id'" },
      },
    },
    statusKey: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'status'" },
      },
    },
    titleKey: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'title'" },
      },
    },
    thinkTitleKey: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'thinkTitle'" },
      },
    },
    thinkContentKey: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'thinkContent'" },
      },
    },
    statusEnum: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: {
          summary:
            '{ loading: { value: "loading", type: "warning" }, error: { value: "error", type: "danger" }, success: { value: "success", type: "success" } }',
        },
      },
    },
  },
  args: {
    thinkingItems: defaultThinkingItems,
    dotIsIcon: false,
    dotSize: 'small',
    maxWidth: '600px',
    lineGradient: false,
    rowKey: 'id',
    statusKey: 'status',
    titleKey: 'title',
    thinkTitleKey: 'thinkTitle',
    thinkContentKey: 'thinkContent',
    statusEnum: {
      loading: { value: 'loading', type: 'warning' },
      error: { value: 'error', type: 'danger' },
      success: { value: 'success', type: 'success' },
    },
  },
};

export const Basic = {
  name: '基础用法',
  render: args => ({
    components: { ElXThoughtChain },
    template: `
      <div style="padding: 20px;">
        <el-x-thought-chain v-bind="$props" />
      </div>
    `,
    props: Object.keys(args),
  }),
  args: {
    thinkingItems: defaultThinkingItems,
    dotIsIcon: false,
    dotSize: 'small',
    maxWidth: '600px',
    lineGradient: true,
    rowKey: 'id',
    statusKey: 'status',
    titleKey: 'title',
    thinkTitleKey: 'thinkTitle',
    thinkContentKey: 'thinkContent',
    statusEnum: {
      loading: { value: 'loading', type: 'warning' },
      error: { value: 'error', type: 'danger' },
      success: { value: 'success', type: 'success' },
    },
  },
};

export const WithIcons = {
  name: '使用图标节点',
  render: args => ({
    components: { ElXThoughtChain },
    template: `
      <div style="padding: 20px;">
        <el-x-thought-chain v-bind="$props" />
      </div>
    `,
    props: Object.keys(args),
  }),
  args: {
    thinkingItems: [
      {
        id: 1,
        title: '数据收集',
        status: 'success',
        thinkTitle: '收集用户行为数据',
        thinkContent: '成功收集了1000条用户交互数据...',
        icon: 'el-icon-data-analysis',
        iconColor: '#67C23A',
      },
      {
        id: 2,
        title: '模型训练',
        status: 'loading',
        thinkTitle: '训练推荐模型',
        thinkContent: '正在使用深度学习算法训练模型...',
        icon: 'el-icon-cpu',
        iconColor: '#409EFF',
      },
      {
        id: 3,
        title: '结果评估',
        status: 'error',
        thinkTitle: '模型评估结果',
        thinkContent: '模型准确率未达到预期，需要重新调整参数...',
        icon: 'el-icon-warning',
        iconColor: '#F56C6C',
      },
    ],
    dotIsIcon: true,
    dotSize: 'medium',
    maxWidth: '500px',
    statusEnum: {
      loading: { value: 'loading', type: 'warning' },
      error: { value: 'error', type: 'danger' },
      success: { value: 'success', type: 'success' },
    },
  },
};
