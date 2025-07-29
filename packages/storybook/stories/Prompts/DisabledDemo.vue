<template>
  <el-x-prompts
    :items="items || relaxItems"
    :title="title || '☕️ 是时候放松一下了！'"
    :vertical="vertical"
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
    name: 'DisabledDemo',
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
        relaxItems: [
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
      };
    },
  };
</script>
