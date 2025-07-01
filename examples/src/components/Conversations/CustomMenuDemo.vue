<template>
  <div class="demo-block">
    <h3>自定义菜单交互</h3>
    <el-x-conversations
      :items="customMenuItems"
      :active="activeCustomMenuItem"
      :show-built-in-menu="true"
      :menu="customMenu"
      @change="handleCustomMenuItemChange"
      @menu-command="handleCustomMenuCommand"
    />
    <div class="demo-description">可以自定义菜单项的图标、文本和样式，并处理菜单命令事件</div>
    <div
      class="operation-log"
      v-if="operationLogs.length > 0"
    >
      <h4>操作记录：</h4>
      <div
        v-for="(log, index) in operationLogs"
        :key="index"
        class="log-item"
      >
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomMenuDemo',
    data() {
      return {
        customMenuItems: [
          {
            id: 'cm1',
            label: '重要会话',
            prefixIcon: 'el-icon-chat-dot-round',
            suffixIcon: 'el-icon-star-on',
          },
          {
            id: 'cm2',
            label: '普通会话',
            prefixIcon: 'el-icon-chat-round',
          },
          {
            id: 'cm3',
            label: '工作会话',
            prefixIcon: 'el-icon-chat-line-round',
          },
          {
            id: 'cm4',
            label: '临时会话',
            prefixIcon: 'el-icon-chat-dot-round',
          },
        ],
        activeCustomMenuItem: 'cm1',
        customMenu: [
          {
            label: '标记为重要',
            key: 'star',
            icon: 'el-icon-star-off',
            command: 'star',
          },
          {
            label: '归档',
            key: 'archive',
            icon: 'el-icon-folder',
            command: 'archive',
          },
          {
            label: '删除',
            key: 'delete',
            icon: 'el-icon-delete',
            command: 'delete',
            menuItemHoverStyle: {
              color: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
          },
        ],
        operationLogs: [],
      };
    },
    methods: {
      handleCustomMenuItemChange(item) {
        this.activeCustomMenuItem = item.uniqueKey;
      },
      handleCustomMenuCommand(command, item) {
        const actionMap = {
          star: '标记为重要',
          archive: '归档',
          delete: '删除',
        };
        const actionText = actionMap[command] || command;
        this.operationLogs.unshift(`${actionText} - ${item.label}`);

        // 如果是星标操作，切换星标状态
        if (command === 'star') {
          const targetItem = this.customMenuItems.find(i => i.id === item.id);
          if (targetItem) {
            targetItem.suffixIcon = targetItem.suffixIcon ? null : 'el-icon-star-on';
          }
        }

        // 最多显示5条记录
        if (this.operationLogs.length > 5) {
          this.operationLogs.pop();
        }
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

    .operation-log {
      margin-top: 15px;
      padding: 10px;
      background-color: #fff5f5;
      border: 1px solid #fbc4c4;
      border-radius: 4px;

      h4 {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #f56c6c;
      }

      .log-item {
        padding: 5px 0;
        font-size: 12px;
        color: #909399;
        border-bottom: 1px solid #fbc4c4;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
