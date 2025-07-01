<template>
  <div class="demo-block">
    <h3>内置下拉菜单</h3>
    <div class="control-row">
      <el-switch
        v-model="showBuiltInMenu"
        active-text="启用内置菜单"
      />
    </div>
    <el-x-conversations
      :items="menuItems"
      :active="activeMenuItem"
      :show-built-in-menu="showBuiltInMenu"
      @change="handleMenuItemChange"
      @menu-command="handleMenuCommand"
    />
    <div class="demo-description">
      启用内置菜单后，鼠标悬停在项目上会显示操作菜单，点击菜单项触发对应操作
    </div>
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
    name: 'BuiltInMenuDemo',
    data() {
      return {
        showBuiltInMenu: true,
        menuItems: [
          {
            id: 'm1',
            label: '会话1',
            prefixIcon: 'el-icon-chat-dot-round',
          },
          {
            id: 'm2',
            label: '会话2',
            prefixIcon: 'el-icon-chat-round',
          },
          {
            id: 'm3',
            label: '会话3',
            prefixIcon: 'el-icon-chat-line-round',
          },
          {
            id: 'm4',
            label: '会话4',
            prefixIcon: 'el-icon-chat-dot-round',
          },
        ],
        activeMenuItem: 'm1',
        operationLogs: [],
      };
    },
    methods: {
      handleMenuItemChange(item) {
        this.activeMenuItem = item.uniqueKey;
      },
      handleMenuCommand(command, item) {
        const actionMap = {
          rename: '重命名',
          delete: '删除',
        };
        const actionText = actionMap[command] || command;
        this.operationLogs.unshift(`${actionText} - ${item.label}`);

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
