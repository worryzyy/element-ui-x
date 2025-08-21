import ElXEditorSender from '@/components/EditorSender';
import BasicDemo from './BasicDemo.vue';

export default {
  title: '组件库/EditorSender 消息发送器',
  component: ElXEditorSender,
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
};

export const Basic = {
  name: '基础用法',
  render: args => ({
    components: { BasicDemo },
    template: '<BasicDemo v-bind="$props" />',
    props: Object.keys(args),
  }),
  args: {},
};
