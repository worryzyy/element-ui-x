<template>
  <el-x-prompts
    :items="items || wrapItems"
    :title="title || '✨ 创意灵感与精彩提示'"
    :vertical="vertical"
    :wrap="wrap !== undefined ? wrap : true"
    :direction="direction"
    :root-class-name="rootClassName"
    :styles="styles"
    :class-names="classNames"
    :custom-style="customStyle"
  >
    <template v-slot:icon="{ item }">
      <i
        :class="item.icon"
        :style="item.iconStyle"
      ></i>
    </template>
  </el-x-prompts>
</template>

<script>
  import ElXPrompts from '@/components/Prompts';

  export default {
    name: 'WrapDemo',
    components: { ElXPrompts },
    props: {
      items: Array,
      title: String,
      vertical: Boolean,
      wrap: Boolean,
      direction: String,
      rootClassName: String,
      styles: Object,
      classNames: Object,
      customStyle: Object,
      onItemClick: Function,
    },
    data() {
      return {
        wrapItems: [
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
          {
            key: '5',
            icon: 'el-icon-check',
            iconStyle: { color: '#52C41A' },
            label: '完成任务技巧',
            description: '有哪些完成任务的诀窍？',
          },
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
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            label: '压力管理',
            description: '如何在巨大压力下保持冷静？',
          },
        ],
      };
    },
  };
</script>
