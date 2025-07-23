import ElXWelcome from '@/components/Welcome';

export default {
  title: '组件库/Welcome 欢迎页',
  component: ElXWelcome,
  parameters: { controls: { exclude: ['image'] } },
  argTypes: {
    className: {
      control: 'text',
      description: '自定义类名',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    rootClassName: {
      control: 'text',
      description: '根容器自定义类名',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'borderless'],
      description: '组件变体样式',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'filled'" },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['ltr', 'rtl'],
      description: '文本方向',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'ltr'" },
      },
    },
    classNames: {
      control: 'object',
      description: '各部分的自定义类名对象',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    icon: {
      control: 'text',
      description: '图标 URL',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    title: {
      control: 'text',
      description: '标题文本',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    extra: {
      control: 'text',
      description: '额外内容',
      table: {
        type: { summary: 'String | Object' },
        defaultValue: { summary: "''" },
      },
    },
    description: {
      control: 'text',
      description: '描述文本',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    styleConfig: {
      control: 'object',
      description: '样式配置对象',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    styles: {
      control: 'object',
      description: '各部分的样式对象',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

export const Default = {
  name: '基础演示',
  render: args => ({
    components: { ElXWelcome },
    template: '<ElXWelcome v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    className: 'demo-welcome',
    rootClassName: 'welcome-container',
    variant: 'filled',
    direction: 'ltr',
    classNames: {
      icon: 'custom-icon',
      title: 'custom-title',
      extra: 'custom-extra',
      description: 'custom-description',
    },
    icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp',
    title: '欢迎使用 Element UI X',
    extra: '开始使用',
    description: '这是一个功能强大且易于使用的 Vue 组件库，为您的项目提供优质的用户界面组件。',
    styleConfig: {
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    styles: {
      icon: { marginBottom: '16px' },
      title: { fontSize: '24px', fontWeight: 'bold' },
      extra: { color: '#409EFF' },
      description: { lineHeight: '1.6' },
    },
  },
};
