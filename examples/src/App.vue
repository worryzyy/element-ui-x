<template>
  <div id="app">
    <el-container
      v-if="$route.path != '/difychat'"
      class="app-container"
    >
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
              Element-UI-X
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
                  <span>Typewriter - 打字机效果</span>
                </el-menu-item>
                <el-menu-item index="/bubble">
                  <i class="el-icon-chat-dot-round"></i>
                  <span>Bubble - 对话气泡</span>
                </el-menu-item>
                <el-menu-item index="/bubblelist">
                  <i class="el-icon-chat-line-round"></i>
                  <span>BubbleList - 气泡列表</span>
                </el-menu-item>
                <el-menu-item index="/thinking">
                  <i class="el-icon-loading"></i>
                  <span>Thinking - 思考动画</span>
                </el-menu-item>
              </el-menu-item-group>

              <!-- 交互组件分组 -->
              <el-menu-item-group title="交互组件">
                <el-menu-item index="/welcome">
                  <i class="el-icon-star-on"></i>
                  <span>Welcome - 欢迎界面</span>
                </el-menu-item>
                <el-menu-item index="/prompts">
                  <i class="el-icon-magic-stick"></i>
                  <span>Prompts - 提示词</span>
                </el-menu-item>
                <el-menu-item index="/conversations">
                  <i class="el-icon-message"></i>
                  <span>Conversations - 对话管理</span>
                </el-menu-item>
                <el-menu-item index="/sender">
                  <i class="el-icon-s-promotion"></i>
                  <span>Sender - 消息发送</span>
                </el-menu-item>
              </el-menu-item-group>

              <!-- 高级组件分组 -->
              <el-menu-item-group title="高级组件">
                <el-menu-item index="/thoughtchain">
                  <i class="el-icon-connection"></i>
                  <span>ThoughtChain - 思维链</span>
                </el-menu-item>
                <el-menu-item index="/filescard">
                  <i class="el-icon-folder-opened"></i>
                  <span>FilesCard - 文件卡片</span>
                </el-menu-item>
                <el-menu-item index="/attachments">
                  <i class="el-icon-paperclip"></i>
                  <span>Attachments - 附件管理</span>
                </el-menu-item>
              </el-menu-item-group>

              <!-- 功能组件分组 -->
              <el-menu-item-group title="功能组件">
                <el-menu-item index="/record">
                  <i class="el-icon-microphone"></i>
                  <span>RecordMixin - 语音录制</span>
                </el-menu-item>
                <el-menu-item index="/sendmixins">
                  <i class="el-icon-setting"></i>
                  <span>SendMixin - 发送配置</span>
                </el-menu-item>
                <el-menu-item index="/streammixins">
                  <i class="el-icon-connection"></i>
                  <span>StreamMixin - 流式处理</span>
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
            <div class="header-links">
              <el-tooltip
                content="查看文档"
                placement="bottom"
              >
                <a
                  href="https://element-ui-x.com"
                  target="_blank"
                  class="header-link"
                >
                  <i class="el-icon-document"></i>
                </a>
              </el-tooltip>
              <el-tooltip
                content="GitHub 仓库"
                placement="bottom"
              >
                <a
                  href="https://github.com/worryzyy/element-ui-x"
                  target="_blank"
                  class="header-link github-link"
                ></a>
              </el-tooltip>
            </div>
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
    <div v-else>
      <router-view></router-view>
    </div>
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
    mounted() {
      console.log(this.$route.path);
    },
    methods: {
      getCurrentPageTitle() {
        const routeMap = {
          '/': '总览',
          '/typewriter': 'Typewriter - 打字机效果',
          '/bubble': 'Bubble - 对话气泡',
          '/bubblelist': 'BubbleList - 气泡列表',
          '/welcome': 'Welcome - 欢迎界面',
          '/prompts': 'Prompts - 提示词',
          '/conversations': 'Conversations - 对话管理',
          '/thinking': 'Thinking - 思考动画',
          '/thoughtchain': 'ThoughtChain - 思维链',
          '/sender': 'Sender - 消息发送',
          '/filescard': 'FilesCard - 文件卡片',
          '/attachments': 'Attachments - 附件管理',
          '/record': 'RecordMixin - 语音录制',
          '/sendmixins': 'SendMixin - 发送配置',
          '/streammixins': 'StreamMixin - 流式处理',
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
  $main-bg: #ffffff;
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
    min-width: 768px;
    overflow-x: auto;
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
    min-width: 400px;
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

      .header-links {
        display: flex;
        align-items: center;
        gap: 16px;

        .header-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: $--color-primary-light-9;
          color: $--color-primary;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 16px;

          &:hover {
            background: $--color-primary;
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
          }

          i {
            font-size: 16px;
          }

          &.github-link {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23409eff' d='M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 20px 20px;

            &:hover {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='white' d='M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.20c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E");
            }
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
    height: calc(100vh - #{$header-height});
    min-width: 320px;

    .main-content {
      height: 100%;
      padding: 24px;
      display: flex;
      flex-direction: column;
      min-width: 320px;

      .page-content {
        flex: 1;
        background: white;
        border-radius: 12px;
        box-shadow: $shadow-medium;
        padding: 24px;
        overflow-y: auto;
        min-width: 280px;
        min-height: 400px;

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
  @media (max-width: 1200px) {
    .app-container {
      min-width: 720px;
    }

    .main-container {
      min-width: 380px;
    }

    .app-main {
      .main-content {
        padding: 20px;
        min-width: 300px;

        .page-content {
          min-width: 260px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .app-container {
      min-width: 640px;
    }

    .main-container {
      min-width: 360px;
    }

    .app-aside {
      width: 220px !important;

      .logo-section {
        padding: 12px 16px;

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
            height: 40px;
            line-height: 40px;

            span {
              font-size: 13px;
            }

            i {
              font-size: 14px;
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
        min-width: 280px;

        .page-content {
          min-width: 240px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .app-container {
      min-width: 576px;
    }

    .main-container {
      min-width: 320px;
    }

    .app-aside {
      width: 200px !important;

      .logo-section {
        padding: 10px 12px;

        .header-title {
          font-size: 14px;
        }

        .header-logo {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }

      .sidebar-nav {
        .nav-menu {
          .el-menu-item {
            padding: 0 12px 0 24px;
            margin: 1px 6px;
            height: 36px;
            line-height: 36px;

            span {
              font-size: 12px;
            }

            i {
              font-size: 13px;
              margin-right: 8px;
            }
          }

          .el-menu-item-group {
            .el-menu-item-group__title {
              padding: 8px 12px 4px 12px;
              font-size: 10px;
            }
          }
        }
      }
    }

    .app-header {
      padding: 0 12px;

      .page-title {
        font-size: 16px;
      }

      .header-links {
        gap: 8px;

        .header-link {
          width: 32px;
          height: 32px;
          font-size: 14px;

          i {
            font-size: 14px;
          }

          &.github-link {
            background-size: 16px 16px;
          }
        }
      }
    }

    .app-main {
      .main-content {
        padding: 12px;
        min-width: 260px;

        .page-content {
          padding: 16px;
          border-radius: 8px;
          min-width: 220px;
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
  .el-menu-item-group .el-menu-item {
    min-width: auto;
  }

  .el-badge__content {
    background-color: $--color-danger;
    border: none;
  }
</style>
