import ElXBubbleList from '@/components/BubbleList';
import BasicDemo from './BasicDemo.vue';
import SlotDemo from './SlotDemo.vue';

export default {
  title: '组件库/BubbleList 对话列表',
  component: ElXBubbleList,
  parameters: {
    controls: {
      exclude: [
        'complete',
        'defaultNoStyle',
        'defaultIsMarkdown',
        'defaultIsFog',
        'defaultTyping',
        'defaultMaxWidth',
        'defaultAvatar',
        'defaultAvatarSize',
        'defaultAvatarGap',
        'defaultAvatarShape',
        'defaultPlacement',
        'defaultLoading',
        'defaultShape',
        'defaultVariant',
        'defaultIsMarkdown',
        'defaultIsFog',
        'defaultTyping',
        'defaultAvatarSrcSet',
        'defaultAvatarAlt',
        'defaultAvatarFit',
        'avatar',
        'content',
        'loading',
        'backToBottom',
      ],
    },
  },
  argTypes: {
    list: {
      control: 'object',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
    },
    maxHeight: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'500px'" },
      },
    },
    triggerIndices: {
      control: { type: 'select' },
      options: ['only-last', 'all'],
      table: {
        type: { summary: 'String | Array' },
        defaultValue: { summary: "'only-last'" },
      },
    },
    alwaysShowScrollbar: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    backButtonThreshold: {
      control: {
        type: 'number',
        min: 0,
        max: 200,
        step: 10,
      },
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '80' },
      },
    },
    showBackButton: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    backButtonPosition: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: "{ bottom: '20px', left: 'calc(50% - 19px)' }" },
      },
    },
    btnLoading: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    btnColor: {
      control: 'color',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'#409EFF'" },
      },
    },
    btnIconSize: {
      control: {
        type: 'number',
        min: 16,
        max: 32,
        step: 2,
      },
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '24' },
      },
    },

    defaultNoStyle: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'undefined' },
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
    list: Array.from({ length: 10 }, (_, i) => ({
      content: `基础消息${i + 1}`,
      placement: i % 2 === 0 ? 'start' : 'end',
      avatarSize: 40,
      avatar:
        i % 2 === 0
          ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg'
          : 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
      loading: i >= 8, // 最后两条消息显示加载状态
    })),
    maxHeight: '600px',
    triggerIndices: 'only-last',
    alwaysShowScrollbar: false,
    backButtonThreshold: 80,
    showBackButton: true,
    backButtonPosition: {
      bottom: '20px',
      left: 'calc(50% - 19px)',
    },
    defaultIsMarkdown: false,
    btnLoading: true,
    btnColor: '#409EFF',
    btnIconSize: 24,
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
    list: Array.from({ length: 10 }, (_, i) => ({
      content: `这是第${i + 1}条消息，演示插槽功能`,
      placement: i % 2 === 0 ? 'start' : 'end',
      isMarkdown: false,
      noStyle: true,
      isFog: true,
      avatar:
        i % 2 === 0
          ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
          : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      avatarSize: 40,
      loading: i >= 8, // 最后两条消息显示加载状态
    })),
    maxHeight: '500px',
    triggerIndices: 'only-last',
    alwaysShowScrollbar: false,
    backButtonThreshold: 80,
    showBackButton: true,
    backButtonPosition: {
      bottom: '20px',
      left: 'calc(50% - 19px)',
    },
    btnLoading: true,
    btnColor: '#409EFF',
    btnIconSize: 24,
  },
};
