<template>
  <div class="mobile-header">
    <div class="mobile-header-left">
      <el-button
        type="text"
        @click="$emit('toggle-drawer')"
        class="mobile-menu-btn"
      >
        <SvgIcon
          size="28"
          name="menu-right"
          color="rgb(139 139 139)"
        />
      </el-button>
    </div>
    <div class="mobile-header-center">
      <span class="mobile-title">{{ title || 'Dify Chat' }}</span>
    </div>
    <div class="mobile-header-right">
      <el-button
        type="text"
        @click="$emit('new-chat')"
        class="mobile-new-chat-btn"
      >
        <SvgIcon
          size="28"
          name="plus"
          color="rgb(139 139 139)"
        />
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MobileHeader',
    props: {
      title: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style lang="scss" scoped>
  .mobile-header {
    display: none;
    height: 56px;
    background-color: $--color-white;
    border-bottom: 1px solid $--border-color-lighter;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    z-index: 1000;

    .mobile-header-left,
    .mobile-header-right {
      width: 48px;
      display: flex;
      align-items: center;
    }

    .mobile-header-center {
      flex: 1;
      text-align: center;

      .mobile-title {
        font-size: 16px;
        font-weight: 600;
        color: $--color-text-primary;
      }
    }

    .mobile-menu-btn,
    .mobile-new-chat-btn {
      padding: 8px;
      font-size: 18px;
      color: $--color-text-regular;

      &:hover {
        background-color: $--color-primary-light-9;
      }
    }
  }

  // 移动端显示
  @media (max-width: 767px) {
    .mobile-header {
      display: flex;
    }
  }
</style>
