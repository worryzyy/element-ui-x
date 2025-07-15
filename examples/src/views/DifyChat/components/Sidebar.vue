<template>
  <transition name="sidebar">
    <!-- 收起状态的独立侧边栏 -->
    <div
      class="side-menu-collapsed"
      v-if="isSideCollapsed"
    >
      <div class="collapsed-header">
        <div
          class="toggle-side"
          @click="$emit('toggle')"
        >
          <img src="../../../assets/images/dify-logo.svg" />
        </div>
      </div>
      <div
        class="toggle-side collapsed-new-chat"
        @click="$emit('toggle')"
      >
        <SvgIcon
          :size="28"
          name="toggle-right"
          color="rgb(139 139 139)"
        />
      </div>
      <div
        class="collapsed-new-chat"
        @click="$emit('new-chat')"
      >
        <SvgIcon
          :size="28"
          name="plus"
          color="rgb(139 139 139)"
        />
      </div>
    </div>
    <!-- 展开状态的侧边栏 -->
    <div
      class="side-menu"
      v-if="!isSideCollapsed"
    >
      <div class="side-header">
        <div class="side-action">
          <h2>Dify chat</h2>
          <div
            class="toggle-side"
            @click="$emit('toggle')"
          >
            <SvgIcon
              :size="28"
              name="toggle-left"
              color="rgb(139 139 139)"
            />
          </div>
        </div>

        <div
          class="new-chat"
          @click="$emit('new-chat')"
        >
          <div style="margin-right: 10px"><i class="el-icon-plus"></i></div>
          新对话
          <span class="keyboard-shortcut">Ctrl+K</span>
        </div>
      </div>
      <el-x-conversations
        v-if="conversationList.length"
        :styleConfig="{ width: '260px', backgroundColor: '#f9fbff', padding: 0 }"
        class="conversation-list"
        :items="conversationList"
        :active="activeConversation"
        :show-built-in-menu="true"
        :label-max-width="190"
        :menu="customMenu"
        :groupable="true"
        v-loading="isLoadingConversations"
        @menu-command="$emit('menu-command', $event, arguments[1])"
        @change="$emit('conversation-change', $event)"
      />
      <el-empty
        v-else
        description="请开始今天的聊天吧"
      ></el-empty>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: {
      isSideCollapsed: {
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
  };
</script>

<style lang="scss" scoped>
  $--color-primary: #409eff;
  $--color-primary-light-9: #ecf5ff;
  $--color-text-primary: #303133;
  $--color-text-regular: #606266;
  $--border-color-lighter: #ebeef5;

  .sidebar-enter-active,
  .sidebar-leave-active {
    transition: all 0.3s ease;
  }
  .sidebar-enter,
  .sidebar-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }

  // 为新对话按钮添加专门的动画
  .sidebar-enter-active .new-chat,
  .sidebar-leave-active .new-chat {
    transition: all 0.3s ease 0.1s;
  }
  .sidebar-enter .new-chat,
  .sidebar-leave-to .new-chat {
    opacity: 0;
    transform: translateY(-10px);
  }

  // 为键盘快捷键添加动画
  .sidebar-enter-active .keyboard-shortcut,
  .sidebar-leave-active .keyboard-shortcut {
    transition: all 0.3s ease 0.15s;
  }
  .sidebar-enter .keyboard-shortcut,
  .sidebar-leave-to .keyboard-shortcut {
    opacity: 0;
    transform: scale(0.8);
  }

  .side-menu-collapsed {
    width: 68px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f9fbff;
    border-right: 1px solid $--border-color-lighter;
    transition: all 0.3s ease;

    .collapsed-header {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 0;
      border-bottom: 1px solid $--border-color-lighter;
    }

    .collapsed-new-chat {
      width: fit-content;
      height: fit-content;
      margin: 16px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: $--color-primary-light-9;
        border-color: $--color-primary;
      }

      i {
        font-size: 16px;
        color: $--color-text-regular;
      }
    }
  }

  .side-menu {
    width: 260px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f9fbff;
    border-right: 1px solid $--border-color-lighter;
    transition: all 0.3s ease;

    .side-header {
      flex-shrink: 0;
      padding: 16px;
      text-align: center;

      .side-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;

        h2 {
          min-width: 180px;
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: $--color-text-primary;
        }
      }

      .new-chat {
        --local-button: #dbeafe;
        --local-button-text: rgb(77 107 254);
        --local-button-hover: #c6dcf8;
        color: #4d6bfe;
        background-color: rgb(219, 234, 254);
        cursor: pointer;
        height: 44px;
        border-radius: 14px;
        flex-shrink: 0;
        align-items: center;
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        display: flex;
        overflow: hidden;
        padding: 0 10px;
        white-space: nowrap;
        opacity: 1;
        transition: opacity 0.3s ease, width 0.3s ease, padding 0.3s ease;

        .keyboard-shortcut {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          padding: 0 6px;
          height: 20px;
          font-size: 12px;
          color: #909399;
          background-color: #f5f7fa;
          border-radius: 4px;
          border: 1px solid #e4e7ed;
          transition: opacity 0.3s ease;
        }

        &:hover {
          background-color: #c6dcf8;
        }
      }

      .new-chat-btn {
        width: 100%;
      }
    }

    .conversation-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }

  // 通用的切换按钮样式
  .toggle-side {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    i {
      font-size: 14px;
      color: $--color-text-regular;
    }
  }

  // 移动端隐藏侧边栏
  @media (max-width: 767px) {
    .side-menu,
    .side-menu-collapsed {
      display: none;
    }
  }
</style>
