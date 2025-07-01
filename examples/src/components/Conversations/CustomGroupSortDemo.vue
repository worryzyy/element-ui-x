<template>
  <div class="demo-block">
    <h3>自定义分组排序</h3>
    <el-x-conversations
      :items="customGroupedItems"
      :groupable="groupSortOptions"
      :active="activeCustomGrouped"
      @change="handleCustomGroupedChange"
    />
    <div class="demo-description">
      可以通过自定义排序函数控制分组的顺序，例如按字母排序或其他逻辑
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomGroupSortDemo',
    data() {
      return {
        customGroupedItems: [
          {
            id: 'cg1',
            label: '苹果手机',
            group: 'Apple',
            prefixIcon: 'el-icon-mobile-phone',
          },
          {
            id: 'cg2',
            label: 'MacBook',
            group: 'Apple',
            prefixIcon: 'el-icon-monitor',
          },
          {
            id: 'cg3',
            label: 'Galaxy手机',
            group: 'Samsung',
            prefixIcon: 'el-icon-mobile-phone',
          },
          {
            id: 'cg4',
            label: 'Note系列',
            group: 'Samsung',
            prefixIcon: 'el-icon-mobile-phone',
          },
          {
            id: 'cg5',
            label: 'ThinkPad',
            group: 'Lenovo',
            prefixIcon: 'el-icon-monitor',
          },
          {
            id: 'cg6',
            label: 'IdeaPad',
            group: 'Lenovo',
            prefixIcon: 'el-icon-monitor',
          },
          {
            id: 'cg7',
            label: 'Mi手机',
            group: 'Xiaomi',
            prefixIcon: 'el-icon-mobile-phone',
          },
          {
            id: 'cg8',
            label: 'RedMi',
            group: 'Xiaomi',
            prefixIcon: 'el-icon-mobile-phone',
          },
        ],
        activeCustomGrouped: 'cg1',
        groupSortOptions: {
          sort: (a, b) => {
            // 自定义排序：按字母顺序排列
            return a.localeCompare(b);
          },
        },
      };
    },
    methods: {
      handleCustomGroupedChange(item) {
        this.activeCustomGrouped = item.uniqueKey;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    .demo-description {
      margin-top: 15px;
      padding: 10px;
      background-color: #f5f7fa;
      border-radius: 4px;
      color: #606266;
      font-size: 13px;
      line-height: 1.5;
    }
  }
</style>
