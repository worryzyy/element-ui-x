<template>
  <el-drawer
    :visible="visible"
    direction="ltr"
    :with-header="false"
    :modal="true"
    :show-close="false"
    size="280px"
    class="mobile-drawer"
    @close="handleDrawerClose"
  >
    <div class="drawer-content">
      <div class="drawer-header">
        <h2>Dify chat</h2>
        <div
          @click="handleClose"
          class="drawer-close-btn"
          role="button"
          tabindex="0"
        >
          <SvgIcon
            size="28"
            name="menu-left"
            color="rgb(139, 139, 139)"
          />
        </div>
      </div>
      <div
        class="drawer-new-chat"
        @click="handleNewChat"
      >
        <div style="margin-right: 10px">
          <SvgIcon
            size="28"
            name="plus"
            color="rgb(139, 139, 139)"
          />
        </div>
        新对话
        <span class="keyboard-shortcut">Ctrl+K</span>
      </div>
      <el-x-conversations
        v-if="conversationList.length"
        :styleConfig="{ width: '100%', backgroundColor: '#f9fbff', padding: 0 }"
        class="drawer-conversation-list"
        :items="conversationList"
        :active="activeConversation"
        :show-built-in-menu="true"
        :label-max-width="190"
        :menu="customMenu"
        :groupable="true"
        v-loading="isLoadingConversations"
        @menu-command="$emit('menu-command', $event, arguments[1])"
        @change="handleConversationChange"
      />
      <el-empty
        v-else
        description="请开始今天的聊天吧"
      ></el-empty>
    </div>
  </el-drawer>
</template>

<script>
  export default {
    name: 'MobileDrawer',
    data() {
      return { isClosing: false };
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      conversationList: {
        type: Array,
        default: () => [],
      },
      activeConversation: {
        type: String,
        default: null,
      },
      customMenu: {
        type: Array,
        default: () => [],
      },
      isLoadingConversations: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['close', 'new-chat', 'conversation-change', 'menu-command'],
    methods: {
      debouncedClose() {
        if (this.isClosing) return;
        this.isClosing = true;
        this.$emit('close');
        setTimeout(() => {
          this.isClosing = false;
        }, 100);
      },
      handleClose() {
        this.debouncedClose();
      },
      handleDrawerClose() {
        this.debouncedClose();
      },
      handleNewChat() {
        this.$emit('new-chat');
        this.$emit('close');
      },
      handleConversationChange(conversation) {
        this.$emit('conversation-change', conversation);
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .mobile-drawer {
    .drawer-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #f9fbff;

      .drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid $--border-color-lighter;

        h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: $--color-text-primary;
        }

        .drawer-close-btn {
          padding: 8px;
          font-size: 16px;
          color: $--color-text-regular;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color 0.2s ease;

          // 移动端触摸优化
          touch-action: manipulation;
          user-select: none;
          -webkit-tap-highlight-color: transparent;

          // 悬停效果
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }

          // 激活效果
          &:active {
            background-color: rgba(0, 0, 0, 0.1);
          }

          // 焦点样式（键盘导航）
          &:focus {
            outline: 2px solid $--color-primary;
            outline-offset: 2px;
          }
        }
      }

      .drawer-new-chat {
        margin: 16px;
        color: #4d6bfe;
        background-color: rgb(219, 234, 254);
        cursor: pointer;
        height: 44px;
        border-radius: 14px;
        align-items: center;
        width: calc(100% - 32px);
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        display: flex;
        padding: 0 16px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #c6dcf8;
        }

        .keyboard-shortcut {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          padding: 0 6px;
          height: 20px;
          font-size: 12px;
          color: #909399;
          background-color: #f5f7fa;
          border-radius: 4px;
          border: 1px solid #e4e7ed;
        }
      }

      .drawer-conversation-list {
        flex: 1;
        overflow-y: auto;
        padding: 0 16px 16px;
      }
    }
  }
</style>
