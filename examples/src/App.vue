<template>
  <div id="app">
    <el-container class="app-container">
      <!-- 顶部导航栏 -->
      <el-header class="app-header">
        <div class="header-content">
          <!-- Logo 区域 -->
          <div class="logo-section">
            <img src="../public/logo.png" alt="Logo" class="header-logo" />
            <h1 @click="goHome" class="header-title">
              Element X UI
            </h1>
          </div>

          <!-- 主导航菜单 -->
          <div class="main-nav">
            <el-menu mode="horizontal" :default-active="$route.path" router class="nav-menu">
              <!-- 基础组件 -->
              <el-submenu index="basic" class="nav-submenu">
                <template slot="title">
                  <i class="el-icon-magic-stick"></i>
                  <span>基础组件</span>
                </template>
                <el-menu-item index="/typewriter">
                  <i class="el-icon-edit-outline"></i>
                  打字机效果
                </el-menu-item>
                <el-menu-item index="/bubble">
                  <i class="el-icon-chat-dot-round"></i>
                  对话气泡
                </el-menu-item>
                <el-menu-item index="/bubblelist">
                  <i class="el-icon-chat-line-round"></i>
                  气泡列表
                </el-menu-item>
                <el-menu-item index="/thinking">
                  <i class="el-icon-loading"></i>
                  思考动画
                </el-menu-item>
              </el-submenu>

              <!-- 交互组件 -->
              <el-submenu index="interaction" class="nav-submenu">
                <template slot="title">
                  <i class="el-icon-connection"></i>
                  <span>交互组件</span>
                </template>
                <el-menu-item index="/welcome">
                  <i class="el-icon-star-on"></i>
                  欢迎界面
                </el-menu-item>
                <el-menu-item index="/prompts">
                  <i class="el-icon-magic-stick"></i>
                  提示词
                </el-menu-item>
                <el-menu-item index="/conversations">
                  <i class="el-icon-message"></i>
                  对话管理
                </el-menu-item>
                <el-menu-item index="/sender">
                  <i class="el-icon-s-promotion"></i>
                  消息发送
                </el-menu-item>
              </el-submenu>

              <!-- 高级组件 -->
              <el-submenu index="advanced" class="nav-submenu">
                <template slot="title">
                  <i class="el-icon-cpu"></i>
                  <span>高级组件</span>
                </template>
                <el-menu-item index="/think">
                  <i class="el-icon-cpu"></i>
                  思维处理
                </el-menu-item>
                <el-menu-item index="/thoughtchain">
                  <i class="el-icon-connection"></i>
                  思维链
                </el-menu-item>
                <el-menu-item index="/filescard">
                  <i class="el-icon-folder-opened"></i>
                  文件卡片
                </el-menu-item>
                <el-menu-item index="/attachments">
                  <i class="el-icon-paperclip"></i>
                  附件管理
                </el-menu-item>
              </el-submenu>

              <!-- 功能组件 -->
              <el-submenu index="features" class="nav-submenu">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>功能组件</span>
                </template>
                <el-menu-item index="/record">
                  <i class="el-icon-microphone"></i>
                  语音录制
                </el-menu-item>
                <el-menu-item index="/sendmixins">
                  <i class="el-icon-setting"></i>
                  发送配置
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-header>

      <!-- 主内容区 -->
      <el-main class="app-main">
        <div class="main-content">
          <!-- 面包屑导航 -->
          <div class="breadcrumb-wrapper">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ getCurrentPageTitle() }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 页面内容 -->
          <div class="page-content">
            <router-view></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDark: false,
    };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      // 这里可以添加主题切换逻辑
      console.log('切换主题:', this.isDark ? '深色' : '浅色');
    },
    getCurrentPageTitle() {
      const routeMap = {
        '/typewriter': '打字机效果',
        '/bubble': '对话气泡',
        '/bubblelist': '气泡列表',
        '/welcome': '欢迎界面',
        '/prompts': '提示词',
        '/conversations': '对话管理',
        '/thinking': '思考动画',
        '/think': '思维处理',
        '/thoughtchain': '思维链',
        '/sender': '消息发送',
        '/filescard': '文件卡片',
        '/attachments': '附件管理',
        '/record': '语音录制',
        '/sendmixins': '发送配置',
      };
      return routeMap[this.$route.path] || '组件展示';
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
@import '~element-ui/packages/theme-chalk/src/common/var';

// 自定义变量
$header-bg: #ffffff;
$main-bg: #f8fafc;
$border-color: #e5e7eb;
$shadow-light: 0 1px 3px rgba(0, 0, 0, 0.1);
$shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.07);
$nav-bg: #ffffff;
$nav-hover-bg: #f8fafc;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $main-bg;
}

#app {
  height: 100vh;
  overflow: hidden;
  min-width: 375px;
}

.app-container {
  height: 100vh;
  background-color: $main-bg;
  min-width: 375px;
}

// 顶部导航栏样式
.app-header {
  background: $header-bg;
  border-bottom: 1px solid $border-color;
  box-shadow: $shadow-light;
  padding: 0 24px;
  height: 64px !important;
  line-height: 64px;
  z-index: 1000;
  min-width: 375px;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .logo-section {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 40px;

    .header-logo {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      object-fit: contain;
    }

    .header-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      background: linear-gradient(135deg, $--color-primary, #667eea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
    }
  }

  .main-nav {
    flex: 1;
    display: flex;
    justify-content: center;

    .nav-menu {
      border: none;
      background: transparent;
      width: 100%;

      .nav-submenu {
        margin: 0 8px;

        .el-submenu__title {
          padding: 0 20px;
          height: 60px;
          line-height: 60px;
          border: none;
          border-radius: 8px;
          transition: all 0.2s;
          color: #606266;
          font-weight: 500;

          &:hover {
            background-color: $nav-hover-bg;
            color: $--color-primary;
          }

          i {
            margin-right: 8px;
            font-size: 16px;
          }
        }

        &.is-active .el-submenu__title {
          color: $--color-primary;
          background-color: $--color-primary-light-9;
        }
      }

      .el-menu-item {
        padding: 0 16px;
        margin: 4px 0;
        border-radius: 6px;
        transition: all 0.2s;

        &:hover {
          background-color: $--color-primary-light-9;
          color: $--color-primary;
        }

        &.is-active {
          background-color: $--color-primary;
          color: white;
        }

        i {
          margin-right: 8px;
          font-size: 14px;
        }
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    min-width: 120px;
    justify-content: flex-end;

    .action-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &:hover {
        background-color: $--color-primary-light-9;
        color: $--color-primary;
      }

      i {
        font-size: 16px;
      }
    }

    .badge-item {
      .action-btn {
        position: relative;
      }
    }

    .user-dropdown {
      cursor: pointer;

      .user-avatar {
        background: linear-gradient(135deg, $--color-primary, #667eea);
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}

// 主内容区样式
.app-main {
  background-color: $main-bg;
  padding: 0;
  overflow: hidden;
  height: calc(100vh - 64px);
  min-width: 375px;

  .main-content {
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    flex-direction: column;

    .breadcrumb-wrapper {
      margin-bottom: 20px;
      padding: 12px 16px;
      background: white;
      border-radius: 8px;
      box-shadow: $shadow-light;

      .el-breadcrumb {
        line-height: 1;

        .el-breadcrumb__item {
          .el-breadcrumb__inner {
            color: #606266;
            font-weight: 400;

            &:hover {
              color: $--color-primary;
            }
          }

          &:last-child .el-breadcrumb__inner {
            color: $--color-primary;
            font-weight: 500;
          }
        }
      }
    }

    .page-content {
      flex: 1;
      background: white;
      border-radius: 12px;
      box-shadow: $shadow-medium;
      padding: 24px;
      overflow-y: auto;

      // 自定义滚动条
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

// 下拉菜单样式覆盖
.el-dropdown-menu {
  border: 1px solid $border-color;
  box-shadow: $shadow-medium;
  border-radius: 8px;
  padding: 8px 0;

  .el-dropdown-menu__item {
    padding: 8px 16px;

    i {
      margin-right: 8px;
      color: #909399;
    }

    &:hover {
      background-color: $--color-primary-light-9;
      color: $--color-primary;

      i {
        color: $--color-primary;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .app-header {
    .logo-section {
      margin-right: 24px;
    }

    .main-nav {
      .nav-submenu {
        margin: 0 4px;

        .el-submenu__title {
          padding: 0 16px;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .app-header {
    padding: 0 16px;
    height: auto !important;
    min-height: 64px;
    line-height: normal;

    .header-content {
      flex-direction: column;
      align-items: stretch;
      padding: 12px 0;
    }

    .logo-section {
      justify-content: center;
      margin-bottom: 12px;
      margin-right: 0;

      .header-title {
        font-size: 18px;
      }

      .header-logo {
        width: 28px;
        height: 28px;
      }
    }

    .main-nav {
      justify-content: center;

      .nav-menu {
        justify-content: center;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        padding: 0 8px;

        &::-webkit-scrollbar {
          height: 2px;
        }

        &::-webkit-scrollbar-thumb {
          background: $--color-primary;
          border-radius: 2px;
        }

        .nav-submenu {
          .el-submenu__title {
            height: 48px;
            line-height: 48px;
            padding: 0 12px;
          }
        }
      }
    }

    .header-actions {
      order: 1;
      position: absolute;
      top: 8px;
      right: 16px;
      min-width: auto;
      gap: 4px;

      .action-btn {
        width: 32px;
        height: 32px;

        i {
          font-size: 14px;
        }
      }

      .user-avatar {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }

  .app-main {
    height: calc(100vh - 100px);

    .main-content {
      padding: 16px;
    }
  }
}

@media (max-width: 768px) {
  .app-header {
    .main-nav {
      .nav-menu {
        .nav-submenu {
          margin: 0 2px;

          .el-submenu__title {
            padding: 0 10px;
            font-size: 14px;
          }
        }
      }
    }

    .logo-section {
      .header-title {
        font-size: 16px;
      }

      .header-logo {
        width: 24px;
        height: 24px;
      }
    }
  }
}

@media (max-width: 480px) {
  .app-header {
    .main-nav {
      .nav-menu {
        .nav-submenu {
          margin: 0 1px;

          .el-submenu__title {
            padding: 0 8px;
            font-size: 13px;

            i {
              margin-right: 4px;
              font-size: 14px;
            }

            span {
              display: none;
            }
          }
        }
      }
    }
  }
}

// 动画效果
@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.page-content {
  animation: slideInUp 0.3s ease-out;
}

// Element UI 组件样式覆盖
.el-submenu .el-menu-item {
  min-width: 180px;
}

.el-badge__content {
  background-color: $--color-danger;
  border: none;
}
</style>
