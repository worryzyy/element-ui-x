<template>
  <div class="component-overview">
    <h2 class="overview-title">Element-UI-X 组件</h2>
    <p class="overview-description">
      基于 Element UI 和 Vue2 的 AI 组件库，专为构建现代化 AI 交互界面设计
    </p>

    <!-- 组件分类标签页 -->
    <el-tabs
      v-model="activeTab"
      class="component-tabs"
    >
      <el-tab-pane
        label="全部组件"
        name="all"
      >
        <div class="components-grid">
          <component-card
            v-for="component in allComponents"
            :key="component.path"
            :component="component"
            @click.native="navigateTo(component.path)"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="基础组件"
        name="basic"
      >
        <div class="components-grid">
          <component-card
            v-for="component in getComponentsByCategory('basic')"
            :key="component.path"
            :component="component"
            @click.native="navigateTo(component.path)"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="交互组件"
        name="interaction"
      >
        <div class="components-grid">
          <component-card
            v-for="component in getComponentsByCategory('interaction')"
            :key="component.path"
            :component="component"
            @click.native="navigateTo(component.path)"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="高级组件"
        name="advanced"
      >
        <div class="components-grid">
          <component-card
            v-for="component in getComponentsByCategory('advanced')"
            :key="component.path"
            :component="component"
            @click.native="navigateTo(component.path)"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="功能组件"
        name="features"
      >
        <div class="components-grid">
          <component-card
            v-for="component in getComponentsByCategory('features')"
            :key="component.path"
            :component="component"
            @click.native="navigateTo(component.path)"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="实战项目"
        name="projects"
      >
        <div class="project-intro">
          <div class="intro-content">
            <h3>🚀 实战项目</h3>
            <p>完整的企业级AI聊天应用实战案例，展示如何将Element-UI-X组件集成到真实项目中</p>
          </div>
        </div>
        <div class="components-grid">
          <component-card
            v-for="component in getComponentsByCategory('projects')"
            :key="component.path"
            :component="component"
            @click.native="navigateTo(component.path)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // 组件卡片子组件
  const ComponentCard = {
    props: {
      component: {
        type: Object,
        required: true,
      },
    },
    render(h) {
      return h(
        'div',
        { class: ['component-card', this.component.category === 'projects' ? 'project-card' : ''] },
        [
          h('div', { class: 'component-icon' }, [h('i', { class: this.component.icon })]),
          h('div', { class: 'component-info' }, [
            h('h3', { class: 'component-name' }, this.component.name),
            h('p', { class: 'component-desc' }, this.component.description),
          ]),
        ],
      );
    },
  };

  export default {
    name: 'Overview',
    components: { ComponentCard },
    data() {
      return {
        activeTab: 'all',
        components: [
          // 基础组件
          {
            name: '打字器效果',
            path: '/typewriter',
            icon: 'el-icon-edit-outline',
            description: '模拟打字器输入效果的文本动画组件',
            category: 'basic',
          },
          {
            name: '对话气泡',
            path: '/bubble',
            icon: 'el-icon-chat-dot-round',
            description: '用于展示对话内容的气泡组件',
            category: 'basic',
          },
          {
            name: '气泡列表',
            path: '/bubblelist',
            icon: 'el-icon-chat-line-round',
            description: '用于展示对话列表的组件',
            category: 'basic',
          },
          {
            name: '思考动画',
            path: '/thinking',
            icon: 'el-icon-loading',
            description: 'AI思考状态的动画效果组件',
            category: 'basic',
          },

          // 交互组件
          {
            name: '欢迎界面',
            path: '/welcome',
            icon: 'el-icon-star-on',
            description: 'AI应用的欢迎界面组件',
            category: 'interaction',
          },
          {
            name: '提示词',
            path: '/prompts',
            icon: 'el-icon-magic-stick',
            description: '提示词管理和展示组件',
            category: 'interaction',
          },
          {
            name: '对话管理',
            path: '/conversations',
            icon: 'el-icon-message',
            description: '对话历史记录管理组件',
            category: 'interaction',
          },
          {
            name: '消息发送',
            path: '/sender',
            icon: 'el-icon-s-promotion',
            description: '消息输入和发送组件',
            category: 'interaction',
          },

          // 高级组件
          {
            name: '思维处理',
            path: '/think',
            icon: 'el-icon-cpu',
            description: 'AI思维处理过程展示组件',
            category: 'advanced',
          },
          {
            name: '思维链',
            path: '/thoughtchain',
            icon: 'el-icon-connection',
            description: 'AI思维链可视化组件',
            category: 'advanced',
          },
          {
            name: '文件卡片',
            path: '/filescard',
            icon: 'el-icon-folder-opened',
            description: '文件展示卡片组件',
            category: 'advanced',
          },
          {
            name: '附件管理',
            path: '/attachments',
            icon: 'el-icon-paperclip',
            description: '附件上传和管理组件',
            category: 'advanced',
          },

          // 功能组件
          {
            name: '语音录制',
            path: '/record',
            icon: 'el-icon-microphone',
            description: '语音录制和转写组件',
            category: 'features',
          },
          {
            name: '发送配置',
            path: '/sendmixins',
            icon: 'el-icon-setting',
            description: '消息发送相关配置组件',
            category: 'features',
          },
          {
            name: '流式处理',
            path: '/streammixins',
            icon: 'el-icon-connection',
            description: '流式处理组件',
            category: 'features',
          },

          // 实战项目
          {
            name: 'DifyChat 对接',
            path: '/difychat',
            icon: 'el-icon-postcard',
            description: '完整的 Dify 后台接口对接实战项目，展示真实 AI 聊天应用',
            category: 'projects',
          },
        ],
      };
    },
    computed: {
      allComponents() {
        return this.components;
      },
    },
    methods: {
      getComponentsByCategory(category) {
        return this.components.filter(component => component.category === category);
      },
      navigateTo(path) {
        // 查找当前路径对应的组件
        const component = this.components.find(comp => comp.path === path);

        // 如果是实战项目，在新窗口打开
        if (component && component.category === 'projects') {
          const newUrl = window.location.origin + window.location.pathname + '#' + path;
          window.open(newUrl, '_blank');
        } else {
          // 其他组件在当前窗口导航
          this.$router.push(path);
        }
      },
    },
  };
</script>

<style lang="scss">
  @import '~element-ui/packages/theme-chalk/src/common/var';

  .component-overview {
    padding: 20px;

    .overview-title {
      font-size: 28px;
      font-weight: 600;
      color: $--color-text-primary;
      margin-bottom: 12px;
      text-align: center;
    }

    .overview-description {
      font-size: 16px;
      color: $--color-text-secondary;
      text-align: center;
      margin-bottom: 32px;
    }

    .component-tabs {
      margin-bottom: 24px;

      .el-tabs__header {
        margin-bottom: 24px;
      }

      .el-tabs__nav {
        display: flex;
        justify-content: center;
      }
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      animation: fadeIn 0.3s ease-in-out;
    }

    .project-intro {
      margin-bottom: 32px;
      text-align: center;

      .intro-content {
        padding: 24px;
        background: linear-gradient(135deg, $--color-primary-light-9, #f0f9ff);
        border-radius: 12px;
        border: 1px solid $--color-primary-light-7;

        h3 {
          margin: 0 0 12px 0;
          font-size: 20px;
          font-weight: 600;
          color: $--color-text-primary;
        }

        p {
          margin: 0;
          font-size: 14px;
          color: $--color-text-secondary;
          line-height: 1.6;
        }
      }
    }

    .component-card {
      height: 100px;
      border-radius: 8px;
      border: 1px solid $--border-color-lighter;
      padding: 16px;
      display: flex;
      align-items: center;
      transition: all 0.3s;
      cursor: pointer;
      background-color: $--color-white;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        border-color: $--color-primary-light-7;
      }

      // 实战项目特殊样式
      &.project-card {
        height: 120px;
        background: linear-gradient(135deg, $--color-primary-light-9, #f0f9ff);
        border: 2px solid $--color-primary-light-7;

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(64, 158, 255, 0.2);
          border-color: $--color-primary;
        }

        .component-icon {
          background: linear-gradient(135deg, $--color-primary, #67c23a);

          i {
            color: white;
          }
        }

        .component-info .component-name {
          background: linear-gradient(135deg, $--color-primary, #67c23a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }
      }

      .component-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: $--color-primary-light-9;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;

        i {
          font-size: 24px;
          color: $--color-primary;
        }
      }

      .component-info {
        flex: 1;
        overflow: hidden;

        .component-name {
          font-size: 16px;
          font-weight: 500;
          color: $--color-text-primary;
          margin: 0 0 8px;
        }

        .component-desc {
          font-size: 13px;
          color: $--color-text-secondary;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .component-overview {
      .components-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }

      .component-card {
        height: 90px;
        padding: 12px;

        .component-icon {
          width: 40px;
          height: 40px;

          i {
            font-size: 20px;
          }
        }

        .component-info {
          .component-name {
            font-size: 14px;
          }

          .component-desc {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
