import ElXPrompts from '@/components/Prompts';
import BasicDemo from './BasicDemo.vue';
import VerticalDemo from './VerticalDemo.vue';
import WrapDemo from './WrapDemo.vue';
import DisabledDemo from './DisabledDemo.vue';
import NestedDemo from './NestedDemo.vue';

export default {
  title: '组件库/Prompts 提示列表',
  component: ElXPrompts,
  parameters: { controls: { exclude: ['on-item-click', 'icon', 'label', 'description'] } },
  argTypes: {
    items: {
      control: 'object',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
    },
    title: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    onItemClick: {
      control: false,
      table: {
        type: { summary: 'Function' },
        defaultValue: { summary: 'null' },
      },
    },
    vertical: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    wrap: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    styles: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    classNames: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    rootClassName: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    customStyle: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['ltr', 'rtl'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'ltr'" },
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
    items: [
      {
        key: '1',
        icon: 'el-icon-sunrise',
        iconStyle: { color: '#FFD700' },
        label: '点燃你的创造力',
        description: '有什么新项目的灵感吗？',
      },
      {
        key: '2',
        icon: 'el-icon-info',
        iconStyle: { color: '#1890FF' },
        label: '揭示背景信息',
        description: '帮我了解这个主题的背景。',
      },
      {
        key: '3',
        icon: 'el-icon-position',
        iconStyle: { color: '#722ED1' },
        label: '效率提升战',
        description: '我如何能工作得更快更好？',
      },
    ],
    title: '✨ 创意灵感与精彩提示',
    vertical: false,
    wrap: false,
    direction: 'ltr',
    rootClassName: 'demo-prompts',
    styles: {
      title: { color: '#409EFF', marginBottom: '16px' },
      item: { padding: '12px', borderRadius: '4px' },
    },
    classNames: {
      title: 'custom-title',
      list: 'custom-list',
      item: 'custom-item',
    },
    customStyle: { margin: '20px 0' },
  },
};

export const Vertical = {
  name: '垂直排列',
  render: args => ({
    components: { VerticalDemo },
    template: '<VerticalDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    items: [
      {
        key: '6',
        icon: 'el-icon-coffee-cup',
        iconStyle: { color: '#964B00' },
        label: '有效休息',
        description: '长时间工作后如何有效休息？',
      },
      {
        key: '7',
        icon: 'el-icon-lollipop',
        iconStyle: { color: '#FAAD14' },
        label: '保持积极心态',
        description: '保持积极心态的秘诀是什么？',
      },
    ],
    title: '🤔 您可能还想问这些：',
    vertical: true,
    wrap: false,
    direction: 'ltr',
    rootClassName: 'vertical-prompts',
    styles: {
      title: { color: '#67C23A', fontSize: '16px' },
      item: { marginBottom: '8px' },
    },
    classNames: {
      list: 'vertical-list',
      item: 'vertical-item',
    },
    customStyle: { maxWidth: '400px' },
  },
};

export const Wrap = {
  name: '换行布局',
  render: args => ({
    components: { WrapDemo },
    template: '<WrapDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    items: [
      {
        key: '1',
        icon: 'el-icon-sunrise-1',
        iconStyle: { color: '#FFD700' },
        label: '新项目灵感',
        description: '有什么新项目的灵感吗？',
      },
      {
        key: '2',
        icon: 'el-icon-info',
        iconStyle: { color: '#1890FF' },
        label: '背景信息',
        description: '帮我了解这个主题的背景。',
      },
      {
        key: '3',
        icon: 'el-icon-warning',
        iconStyle: { color: '#FF4D4F' },
        label: '解决常见问题',
        description: '如何解决常见问题？分享一些技巧！',
      },
      {
        key: '4',
        icon: 'el-icon-position',
        iconStyle: { color: '#722ED1' },
        label: '提高效率',
        description: '我如何能工作得更快更好？',
      },
    ],
    title: '✨ 创意灵感与精彩提示',
    vertical: false,
    wrap: true,
    direction: 'ltr',
    rootClassName: 'wrap-prompts',
    styles: {
      title: { textAlign: 'center', marginBottom: '20px' },
      list: { gap: '10px' },
      item: { flex: '1 1 200px' },
    },
    classNames: {
      list: 'wrap-list',
      item: 'wrap-item',
    },
    customStyle: { width: '100%' },
  },
};

export const Disabled = {
  name: '禁用状态',
  render: args => ({
    components: { DisabledDemo },
    template: '<DisabledDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    items: [
      {
        key: '5',
        icon: 'el-icon-check',
        iconStyle: { color: '#52C41A' },
        label: '任务完成秘诀',
        description: '有哪些完成任务的技巧？',
        disabled: true,
      },
      {
        key: '6',
        icon: 'el-icon-coffee-cup',
        iconStyle: { color: '#964B00' },
        label: '是时候喝杯咖啡了',
        description: '长时间工作后如何有效休息？',
      },
    ],
    title: '☕️ 是时候放松一下了！',
    vertical: false,
    wrap: false,
    direction: 'ltr',
    rootClassName: 'disabled-prompts',
    styles: {
      title: { color: '#E6A23C' },
      item: { opacity: '0.6' },
    },
    classNames: { item: 'disabled-item' },
    customStyle: { padding: '16px' },
  },
};

export const Nested = {
  name: '嵌套提示',
  render: args => ({
    components: { NestedDemo },
    template: '<NestedDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    items: [
      {
        key: '1',
        label: '热门话题',
        icon: 'el-icon-star-off',
        iconStyle: { color: '#FF4D4F' },
        description: '你对什么感兴趣？',
        children: [
          {
            key: '1-1',
            description: 'X的最新动态是什么？',
          },
          {
            key: '1-2',
            description: '什么是AGI？',
          },
        ],
      },
      {
        key: '2',
        label: '设计指南',
        icon: 'el-icon-reading',
        iconStyle: { color: '#1890FF' },
        description: '如何设计一个好产品？',
        children: [
          {
            key: '2-1',
            icon: 'el-icon-star-on',
            description: '了解用户需求',
          },
          {
            key: '2-2',
            icon: 'el-icon-ice-cream-round',
            description: '设定AI角色',
          },
        ],
      },
      {
        key: '3',
        label: '开始创作',
        icon: 'el-icon-position',
        iconStyle: { color: '#722ED1' },
        description: '如何开始一个新项目？',
        children: [
          {
            key: '3-1',
            label: '快速开始',
            description: '安装Element UI X',
          },
          {
            key: '3-2',
            label: '在线演练场',
            description: '无需安装，直接在网页上体验',
          },
        ],
      },
    ],
    title: '您需要什么？',
    vertical: false,
    wrap: true,
    direction: 'ltr',
    rootClassName: 'nested-prompts',
    styles: {
      item: {
        flex: 'none',
        width: 'calc(50% - 6px)',
        backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
        border: '0',
      },
      subItem: {
        background: 'rgba(255,255,255,0.45)',
        border: '1px solid #FFF',
      },
    },
    classNames: {
      list: 'nested-list',
      item: 'nested-item',
      subList: 'nested-sub-list',
      subItem: 'nested-sub-item',
    },
    customStyle: { maxWidth: '800px' },
  },
};
