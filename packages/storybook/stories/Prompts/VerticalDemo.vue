<template>
  <el-x-prompts
    :items="items || verticalItems"
    :title="title || '🤔 您可能还想问这些：'"
    :vertical="vertical !== undefined ? vertical : true"
    :wrap="wrap"
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
    name: 'VerticalDemo',
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
        verticalItems: [
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: { color: '#964B00' },
            label: '有效休息',
            description: '长时间工作后如何有效休息？',
            disabled: false,
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#FAAD14' },
            label: '保持积极心态',
            description: '保持积极心态的秘诀是什么？',
            disabled: false,
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            label: '压力管理',
            description: '如何在巨大压力下保持冷静？',
            disabled: false,
          },
        ],
      };
    },
  };
</script>
