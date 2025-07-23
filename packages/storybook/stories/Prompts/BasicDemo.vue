<template>
  <div>
    <el-x-prompts
      :items="items || inspirationalItems"
      :title="title || '✨ 创意灵感与精彩提示'"
      :vertical="vertical"
      :wrap="wrap"
      :direction="direction"
      :root-class-name="rootClassName"
      :styles="styles"
      :class-names="classNames"
      :custom-style="customStyle"
      @on-item-click="handleInspirationalItemClick"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
    <div class="demo-controls">
      <el-alert
        v-if="selectedItem"
        :title="`已选择: ${selectedItem.label}`"
        type="success"
        :closable="false"
        show-icon
      ></el-alert>
    </div>
  </div>
</template>

<script>
  import ElXPrompts from '@/components/Prompts';

  export default {
    name: 'BasicDemo',
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
        selectedItem: null,
        inspirationalItems: [
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
          {
            key: '4',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#52C41A' },
            label: '讲个笑话',
            description: '为什么蚂蚁不生病？因为它们有小小的抗体！',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: '常见问题解决方案',
            description: '如何解决常见问题？分享一些技巧！',
          },
        ],
      };
    },
    methods: {
      handleInspirationalItemClick(info) {
        this.selectedItem = info.data;
        this.$message({
          message: `点击了: ${info.data.label}`,
          type: 'success',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo-controls {
    margin-top: 20px;
  }
</style>
