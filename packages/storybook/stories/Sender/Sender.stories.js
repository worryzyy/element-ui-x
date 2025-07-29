import ElXSender from '@/components/Sender';
import BasicDemo from './BasicDemo.vue';
import SlotDemo from './SlotDemo.vue';

export default {
  title: '组件库/Sender 消息发送器',
  component: ElXSender,
  parameters: {
    controls: {
      exclude: [
        'update:triggerPopoverVisible',
        'input',
        'trigger',
        'recording-change',
        'recordingChange',
        'submit',
        'cancel',
        'action-list',
        'trigger-popover',
      ],
    },
  },
  argTypes: {
    value: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "''" },
      },
    },
    autoSize: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{ minRows: 1, maxRows: 6 }' },
      },
    },
    readOnly: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    allowSpeech: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    submitType: {
      control: { type: 'select' },
      options: ['enter', 'shiftEnter'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'enter'" },
      },
    },
    headerAnimationTimer: {
      control: {
        type: 'number',
        min: 0,
        max: 1000,
        step: 100,
      },
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '300' },
      },
    },
    inputWidth: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'100%'" },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'updown'],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'default'" },
      },
    },
    showUpdown: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    submitBtnDisabled: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inputStyle: {
      control: 'object',
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    triggerStrings: {
      control: 'object',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
    },
    triggerPopoverVisible: {
      control: 'boolean',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    triggerPopoverWidth: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'fit-content'" },
      },
    },
    triggerPopoverLeft: {
      control: 'text',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'0px'" },
      },
    },
    triggerPopoverOffset: {
      control: {
        type: 'number',
        min: -50,
        max: 50,
        step: 1,
      },
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: '0' },
      },
    },
    triggerPopoverPlacement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: "'top-start'" },
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
    value: '',
    placeholder: '💌 欢迎使用 Element-UI-X',
    clearable: true,
    inputWidth: '480px',
    variant: 'default',
    submitType: 'enter',
    loading: false,
    disabled: false,
    readOnly: false,
    allowSpeech: false,
    autoSize: { minRows: 1, maxRows: 6 },
    inputStyle: {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.5',
    },
    triggerStrings: ['@', '#', '/'],
    triggerPopoverVisible: false,
    triggerPopoverWidth: '200px',
    triggerPopoverLeft: '10px',
    triggerPopoverOffset: 5,
    triggerPopoverPlacement: 'top-start',
    headerAnimationTimer: 300,
    showUpdown: true,
    submitBtnDisabled: false,
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
    placeholder: '带有头部、前缀和底部的发送器...',
    clearable: true,
    variant: 'default',
    submitType: 'enter',
    loading: false,
    disabled: false,
    readOnly: false,
    allowSpeech: true,
    autoSize: { minRows: 1, maxRows: 6 },
    inputStyle: {
      fontSize: '15px',
      padding: '12px',
      backgroundColor: '#fff',
      borderRadius: '6px',
    },
    headerAnimationTimer: 800,
    showUpdown: true,
    submitBtnDisabled: false,
  },
};
