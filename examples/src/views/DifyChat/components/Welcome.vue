<template>
  <div>
    <el-x-welcome
      variant="borderless"
      title="欢迎使用 Dify AI 助手"
      description="我是您的智能助手，可以帮助您完成各种任务，包括内容创作、代码编写、数据分析等。请告诉我您需要什么帮助！"
    >
      <template #image>
        <img
          :src="require('@/assets/images/dify-logo.svg')"
          alt="Dify"
        />
      </template>
    </el-x-welcome>
    <br v-if="!isMobile" />
    <el-x-prompts
      v-if="!isMobile"
      :items="promptItems"
      :wrap="true"
      :styles="promptStyles"
      @on-item-click="handlePromptItemClick"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    computed: {
      isMobile() {
        return window.innerWidth <= 767;
      },
    },
    data() {
      return {
        promptItems: [
          {
            key: '1',
            label: 'AI 应用场景',
            icon: 'el-icon-magic-stick',
            iconStyle: { color: '#4d6bfe' },
            description: '探索 Dify 的强大功能',
            children: [
              {
                key: '1-1',
                icon: 'el-icon-cpu',
                iconStyle: { color: '#4d6bfe' },
                description: '如何使用 Dify 创建 AI 应用？',
              },
              {
                key: '1-2',
                icon: 'el-icon-monitor',
                iconStyle: { color: '#4d6bfe' },
                description: 'Dify 支持哪些大语言模型？',
              },
              {
                key: '1-3',
                icon: 'el-icon-user',
                iconStyle: { color: '#4d6bfe' },
                description: '如何自定义 AI 助手的角色？',
              },
            ],
          },
          {
            key: '2',
            label: '开发指南',
            icon: 'el-icon-code',
            iconStyle: { color: '#626aef' },
            description: '快速上手 Dify 开发',
            children: [
              {
                key: '2-1',
                icon: 'el-icon-document',
                iconStyle: { color: '#626aef' },
                description: 'Dify API 接口使用说明',
              },
              {
                key: '2-2',
                icon: 'el-icon-connection',
                iconStyle: { color: '#626aef' },
                description: '如何集成到现有应用',
              },
              {
                key: '2-3',
                icon: 'el-icon-data-analysis',
                iconStyle: { color: '#626aef' },
                description: '数据集管理最佳实践',
              },
            ],
          },
        ],
        promptStyles: {
          item: {
            flex: 'none',
            backgroundImage: 'linear-gradient(137deg, #f0f7ff 0%, #edf1ff 100%)',
            border: '0',
            width: 'calc(50% - 6px)',
          },
          subItem: {
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid #e6efff',
          },
        },
      };
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handlePromptItemClick({ data }) {
        this.$emit('click-prompt', data);
      },
      handleResize() {
        this.$forceUpdate();
      },
    },
  };
</script>

<style lang="scss" scoped>
  // 移动端微调 (<768px)
  @media screen and (max-width: 767px) {
    ::v-deep .el-x-prompts {
      padding: 0 20px;
      .el-x-prompts-list {
        gap: 8px;
      }
      .el-x-prompts-list-vertical {
        .el-x-prompts-item {
          width: 100% !important;
          // width: calc(100% - 8px) !important; // 移动端单列布局
          margin-bottom: 8px !important;
          padding: 14px 16px !important;

          .el-x-prompts-content {
            gap: 6px !important;
          }

          .el-x-prompts-label {
            font-size: 15px !important;
            line-height: 1.4 !important;
          }

          .el-x-prompts-desc {
            font-size: 13px !important;
            line-height: 1.3 !important;
          }
        }
      }
    }
  }
</style>
