import ElXFilesCard from '@/components/FilesCard';
import BasicDemo from './BasicDemo.vue';
import SlotDemo from './SlotDemo.vue';

export default {
  title: '组件库/FilesCard 文件卡片',
  component: ElXFilesCard,
  parameters: {
    controls: {
      exclude: [
        'delete',
        'image-preview',
        'description',
        'icon',
        'image-preview-actions',
        'content',
        'name-prefix',
        'name-suffix',
        'del-icon',
      ],
    },
  },
  argTypes: {
    uid: {
      control: 'text',
      table: {
        type: { summary: 'String | Number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    name: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    fileSize: {
      control: 'number',
      table: {
        type: { summary: 'String | Number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    fileType: {
      control: { type: 'select' },
      options: [
        'word',
        'excel',
        'ppt',
        'pdf',
        'txt',
        'mark',
        'image',
        'audio',
        'video',
        'three',
        'code',
        'database',
        'link',
        'zip',
        'file',
        'unknown',
      ],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    url: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    thumbUrl: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconSize: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '42px' },
      },
    },
    iconColor: {
      control: 'color',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    showDelIcon: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '236px' },
      },
    },
    styleConfig: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: 'undefined' },
      },
    },
    hoverStyle: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: 'undefined' },
      },
    },
    imgVariant: {
      control: { type: 'select' },
      options: ['rectangle', 'square'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'rectangle' },
      },
    },
    imgPreview: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    imgPreviewMask: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['uploading', 'done', 'error'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    percent: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
      },
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    errorTip: {
      control: 'text',
      table: {
        type: { summary: 'String' },
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
    uid: '1',
    name: '测试文件.pdf',
    fileSize: 1024000,
    fileType: 'pdf',
    description: '',
    url: '',
    thumbUrl: '',
    iconSize: '42px',
    iconColor: '',
    showDelIcon: false,
    maxWidth: '236px',
    styleConfig: {},
    hoverStyle: {},
    imgVariant: 'rectangle',
    imgPreview: true,
    imgPreviewMask: true,
    status: undefined,
    percent: 0,
    errorTip: '',
  },
};

export const Slot = {
  name: '插槽用法',
  render: args => ({
    components: { SlotDemo },
    template: '<SlotDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {
    uid: '2',
    name: '自定义插槽.jpg',
    fileSize: 2048000,
    fileType: 'image',
    description: '这是一个自定义插槽示例',
    url: 'https://avatars.githubusercontent.com/u/76239030?v=4',
    thumbUrl: '',
    iconSize: '64px',
    iconColor: '#409EFF',
    showDelIcon: true,
    maxWidth: '300px',
    styleConfig: {
      backgroundColor: '#f0f9eb',
      border: '1px solid #67c23a',
      borderRadius: '8px',
    },
    hoverStyle: {
      'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      'border-color': '#409EFF',
      'background-color': 'rgba(64, 158, 255, 0.1)',
    },
    imgVariant: 'square',
    imgPreview: true,
    imgPreviewMask: true,
    status: undefined,
    percent: 0,
    errorTip: '',
  },
};
