import ElXAttachments from '@/components/Attachments';
import BasicDemo from './BasicDemo.vue';
import SlotDemo from './SlotDemo.vue';

export default {
  title: '组件库/Attachments 文件附件',
  component: ElXAttachments,
  parameters: {
    controls: {
      exclude: [
        'upload-change',
        'upload-success',
        'upload-error',
        'upload-drop',
        'delete-card',
        'file-list',
        'empty-upload',
        'no-empty-upload',
        'prev-button',
        'next-button',
        'drop-area',
      ],
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: '文件列表数组',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
    },
    overflow: {
      control: { type: 'select' },
      options: ['scrollX', 'scrollY', 'wrap'],
      description: '溢出处理方式',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'scrollX' },
      },
    },
    listStyle: {
      control: 'object',
      description: '列表容器样式',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    uploadIconSize: {
      control: 'text',
      description: '上传图标尺寸',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '64px' },
      },
    },
    dragTarget: {
      control: 'text',
      description: '拖拽目标元素ID或选择器',
      table: {
        type: { summary: 'String | Object | HTMLElement' },
        defaultValue: { summary: 'undefined' },
      },
    },
    hideUpload: {
      control: 'boolean',
      description: '是否隐藏上传按钮',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    limit: {
      control: {
        type: 'number',
        min: 1,
        max: 50,
        step: 1,
      },
      description: '文件数量限制',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    uploadAction: {
      control: 'text',
      description: '上传地址',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '#' },
      },
    },
    // 继承的Upload属性
    accept: {
      control: 'text',
      description: '接受的文件类型',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'undefined' },
      },
    },
    multiple: {
      control: 'boolean',
      description: '是否支持多选文件',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用上传',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    drag: {
      control: 'boolean',
      description: '是否启用拖拽上传',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
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
        uid: '1',
        name: '示例文档.pdf',
        fileSize: 1024000,
        fileType: 'pdf',
        showDelIcon: true,
        imgVariant: 'rectangle',
      },
      {
        uid: '2',
        name: '测试图片.jpg',
        fileSize: 2048000,
        fileType: 'image',
        url: 'https://avatars.githubusercontent.com/u/76239030?v=4',
        showDelIcon: true,
        imgVariant: 'square',
      },
      {
        uid: '3',
        name: '数据表格.xlsx',
        fileSize: 512000,
        fileType: 'excel',
        showDelIcon: true,
        imgVariant: 'rectangle',
      },
    ],
    overflow: 'scrollX',
    listStyle: {},
    uploadIconSize: '64px',
    dragTarget: undefined,
    hideUpload: false,
    limit: undefined,
    uploadAction: '#',
    accept: undefined,
    multiple: false,
    disabled: false,
    drag: true,
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
    items: [
      {
        uid: '1',
        name: '自定义文件1.doc',
        fileSize: 1536000,
        fileType: 'word',
        showDelIcon: true,
      },
      {
        uid: '2',
        name: '自定义文件2.ppt',
        fileSize: 3072000,
        fileType: 'ppt',
        showDelIcon: true,
      },
    ],
    overflow: 'wrap',
    listStyle: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '16px',
    },
    uploadIconSize: '48px',
    dragTarget: undefined,
    hideUpload: false,
    limit: 5,
    uploadAction: '#',
    accept: '.doc,.docx,.pdf,.jpg,.png',
    multiple: true,
    disabled: false,
    drag: true,
  },
};