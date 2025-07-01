<template>
  <div class="demo-block">
    <h3>分组与吸顶效果</h3>
    <div class="control-row">
      <h4>列表高度：</h4>
      <el-slider
        style="width: 200px"
        v-model="listHeight"
        :min="200"
        :max="500"
        :step="50"
      />
    </div>
    <div
      class="grouped-container"
      :style="{ height: `${listHeight}px` }"
    >
      <el-x-conversations
        :items="groupedItems"
        :active="activeGroupedConversation"
        :groupable="true"
        @change="handleGroupedChange"
      />
    </div>
    <div class="demo-description">启用分组功能后，滚动时分组标题会自动吸顶显示</div>
  </div>
</template>

<script>
  export default {
    name: 'GroupStickyDemo',
    data() {
      return {
        listHeight: 300,
        groupedItems: [
          {
            id: 'g1',
            label: '工作群1',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g2',
            label: '工作群2',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g3',
            label: '工作群3',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g4',
            label: '学习小组1',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g5',
            label: '学习小组2',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g6',
            label: '学习小组3',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g7',
            label: '朋友圈1',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g8',
            label: '朋友圈2',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g9',
            label: '朋友圈3',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g10',
            label: '家庭群1',
            group: '家庭',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g11',
            label: '家庭群2',
            group: '家庭',
            prefixIcon: 'el-icon-house',
          },
        ],
        activeGroupedConversation: 'g1',
      };
    },
    methods: {
      handleGroupedChange(item) {
        this.activeGroupedConversation = item.uniqueKey;
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

    .control-row {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      gap: 10px;

      h4 {
        margin: 0;
        font-size: 14px;
        color: #606266;
      }
    }

    .grouped-container {
      border: 1px solid #ebeef5;
      border-radius: 4px;
      overflow: hidden;
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
