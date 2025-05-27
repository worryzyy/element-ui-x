<template>
  <div id="app">
    <el-container class="app-container">
      <!-- 侧边栏 -->
      <el-aside class="app-aside">
        <div class="aside-content">
          <!-- Logo 区域 -->
          <div class="logo-section">
            <img
              src="../public/logo.png"
              alt="Logo"
              class="header-logo"
            />
            <h1
              @click="goHome"
              class="header-title"
            >
              Element X UI
            </h1>
          </div>

          <!-- 侧边栏菜单 -->
          <div class="sidebar-nav">
            <el-menu
              :default-active="$route.path"
              router
              class="nav-menu"
            >
              <!-- 总览 -->
              <el-menu-item
                index="/"
                data-index="/"
              >
                <i class="el-icon-s-home"></i>
                <span>总览</span>
              </el-menu-item>

              <!-- 基础组件分组 -->
              <el-menu-item-group title="基础组件">
                <el-menu-item index="/typewriter">
                  <i class="el-icon-edit-outline"></i>
                  <span>打字机效果</span>
                </el-menu-item>
                <el-menu-item index="/bubble">
                  <i class="el-icon-chat-dot-round"></i>
                  <span>对话气泡</span>
                </el-menu-item>
                <el-menu-item index="/bubblelist">
                  <i class="el-icon-chat-line-round"></i>
                  <span>气泡列表</span>
                </el-menu-item>
                <el-menu-item index="/thinking">
                  <i class="el-icon-loading"></i>
                  <span>思考动画</span>
                </el-menu-item>
              </el-menu-item-group>

              <!-- 交互组件分组 -->
              <el-menu-item-group title="交互组件">
                <el-menu-item index="/welcome">
                  <i class="el-icon-star-on"></i>
                  <span>欢迎界面</span>
                </el-menu-item>
                <el-menu-item index="/prompts">
                  <i class="el-icon-magic-stick"></i>
                  <span>提示词</span>
                </el-menu-item>
                <el-menu-item index="/conversations">
                  <i class="el-icon-message"></i>
                  <span>对话管理</span>
                </el-menu-item>
                <el-menu-item index="/sender">
                  <i class="el-icon-s-promotion"></i>
                  <span>消息发送</span>
                </el-menu-item>
              </el-menu-item-group>

              <!-- 高级组件分组 -->
              <el-menu-item-group title="高级组件">
                <el-menu-item index="/thoughtchain">
                  <i class="el-icon-connection"></i>
                  <span>思维链</span>
                </el-menu-item>
                <el-menu-item index="/filescard">
                  <i class="el-icon-folder-opened"></i>
                  <span>文件卡片</span>
                </el-menu-item>
                <el-menu-item index="/attachments">
                  <i class="el-icon-paperclip"></i>
                  <span>附件管理</span>
                </el-menu-item>
              </el-menu-item-group>

              <!-- 功能组件分组 -->
              <el-menu-item-group title="功能组件">
                <el-menu-item index="/record">
                  <i class="el-icon-microphone"></i>
                  <span>语音录制</span>
                </el-menu-item>
                <el-menu-item index="/sendmixins">
                  <i class="el-icon-setting"></i>
                  <span>发送配置</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </div>
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-container class="main-container">
        <!-- 顶部标题栏 -->
        <el-header class="app-header">
          <div class="header-content">
            <h2 class="page-title">{{ getCurrentPageTitle() }}</h2>
          </div>
        </el-header>

        <!-- 主内容 -->
        <el-main class="app-main">
          <div class="main-content">
            <!-- 页面内容 -->
            <div
              class="page-content"
              ref="pageContent"
            >
              <router-view></router-view>
            </div>
          </div>
        </el-main>
      </el-container>
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
    watch: {
      $route() {
        this.$nextTick(() => {
          if (this.$refs.pageContent) {
            this.$refs.pageContent.scrollTop = 0;
          }
        });
      },
    },
    methods: {
      getCurrentPageTitle() {
        const routeMap = {
          '/': '总览',
          '/typewriter': '打字机效果',
          '/bubble': '对话气泡',
          '/bubblelist': '气泡列表',
          '/welcome': '欢迎界面',
          '/prompts': '提示词',
          '/conversations': '对话管理',
          '/thinking': '思考动画',
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
  $aside-width: 260px;
  $header-height: 60px;
  $aside-bg: #ffffff;
  $main-bg: #f8fafc;
  $border-color: #e5e7eb;
  $shadow-light: 0 1px 3px rgba(0, 0, 0, 0.1);
  $shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.07);

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

  // 侧边栏样式
  .app-aside {
    width: $aside-width !important;
    background: $aside-bg;
    border-right: 1px solid $border-color;
    box-shadow: $shadow-light;
    overflow: hidden;

    .aside-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .logo-section {
      height: 60px;
      border-bottom: 1px solid $border-color;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .header-logo {
        width: 32px;
        height: 32px;
        margin-right: 12px;
        object-fit: contain;
      }

      .header-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        background: linear-gradient(135deg, $--color-primary, #667eea);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.02);
        }
      }
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 10px 0;

      // 自定义滚动条
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 2px;

        &:hover {
          background: rgba(0, 0, 0, 0.2);
        }
      }

      .nav-menu {
        border: none;
        background: transparent;

        .el-menu-item-group {
          .el-menu-item-group__title {
            padding: 12px 20px 8px 20px;
            color: #909399;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        }

        .el-menu-item {
          height: 44px;
          line-height: 44px;
          padding: 0 20px 0 40px;
          margin: 2px 10px;
          border-radius: 8px;
          transition: all 0.2s;
          color: #606266;

          &:hover {
            background-color: $--color-primary-light-9;
            color: $--color-primary;
          }

          &.is-active {
            background-color: $--color-primary;
            color: white;

            i {
              color: white;
            }
          }

          i {
            margin-right: 12px;
            font-size: 16px;
            width: 16px;
            text-align: center;
            color: #909399;
            transition: color 0.2s;
          }

          span {
            font-size: 14px;
            font-weight: 500;
          }

          // 首页特殊样式
          &[data-index='/'] {
            margin: 10px;
            background: linear-gradient(135deg, $--color-primary-light-9, $--color-primary-light-8);
            border: 1px solid $--color-primary-light-7;

            &:hover {
              background: linear-gradient(
                135deg,
                $--color-primary-light-8,
                $--color-primary-light-7
              );
            }

            &.is-active {
              background: linear-gradient(135deg, $--color-primary, #667eea);
            }
          }
        }
      }
    }
  }

  // 主容器样式
  .main-container {
    flex: 1;
    overflow: hidden;
  }

  // 顶部标题栏样式
  .app-header {
    background: white;
    border-bottom: 1px solid $border-color;
    box-shadow: $shadow-light;
    height: $header-height !important;
    line-height: $header-height;
    padding: 0 24px;

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;

      .page-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
      }
    }
  }

  // 主内容区样式
  .app-main {
    background-color: $main-bg;
    padding: 0;
    overflow: hidden;
    height: calc(100vh - #{$header-height});

    .main-content {
      height: 100%;
      padding: 24px;
      display: flex;
      flex-direction: column;

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

  // 响应式设计
  @media (max-width: 992px) {
    .app-aside {
      width: 220px !important;

      .logo-section {
        padding: 16px;

        .header-title {
          font-size: 16px;
        }

        .header-logo {
          width: 28px;
          height: 28px;
        }
      }

      .sidebar-nav {
        .nav-menu {
          .el-menu-item {
            padding: 0 16px 0 32px;
            margin: 2px 8px;

            span {
              font-size: 13px;
            }
          }

          .el-menu-item-group {
            .el-menu-item-group__title {
              padding: 10px 16px 6px 16px;
              font-size: 11px;
            }
          }
        }
      }
    }

    .app-main {
      .main-content {
        padding: 16px;
      }
    }
  }

  @media (max-width: 768px) {
    .app-aside {
      width: 200px !important;

      .logo-section {
        .header-title {
          font-size: 14px;
        }

        .header-logo {
          width: 24px;
          height: 24px;
        }
      }
    }

    .app-header {
      padding: 0 16px;

      .page-title {
        font-size: 18px;
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
  .el-menu-item-group .el-menu-item {
    min-width: auto;
  }

  .el-badge__content {
    background-color: $--color-danger;
    border: none;
  }
</style>
