<template>
  <div class="demo-block">
    <h3>基础用法</h3>
    <el-x-conversations
      :items="basicItems"
      :active="activeConversation"
      @change="handleConversationChange"
    />
    <div class="demo-description">默认模式下的会话列表，点击项目可以切换选中状态</div>
  </div>
</template>

<script>
  export default {
    name: 'BasicUsageDemo',
    data() {
      return {
        basicItems: [
          {
            id: '1',
            label: '最近对话1',
            prefixIcon: 'el-icon-chat-dot-round',
          },
          {
            id: '2',
            label: '最近对话2',
            prefixIcon: 'el-icon-chat-round',
          },
          {
            id: '3',
            label: '最近对话3',
            prefixIcon: 'el-icon-chat-line-round',
          },
          {
            id: '4',
            label: '最近对话4',
            prefixIcon: 'el-icon-chat-dot-round',
          },
          {
            id: '5',
            label: '最近对话5',
            prefixIcon: 'el-icon-chat-round',
            disabled: true,
          },
        ],
        activeConversation: '1',
      };
    },
    methods: {
      handleConversationChange(item) {
        this.activeConversation = item.uniqueKey;
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
