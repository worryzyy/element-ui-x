<template>
  <div class="component-container">
    <div class="component-title">头像插槽</div>
    <el-x-bubble v-bind="bubbleProps">
      <template slot="avatar">
        <img
          src="https://avatars.githubusercontent.com/u/76239030?s=40&v=4"
          class="avatar"
        />
      </template>
    </el-x-bubble>

    <div class="component-title">头部插槽</div>
    <el-x-bubble v-bind="bubbleProps">
      <template slot="avatar">
        <img
          src="https://avatars.githubusercontent.com/u/76239030?s=40&v=4"
          class="avatar"
        />
      </template>

      <template slot="header">
        <div class="header-time">
          {{ currentTime }}
        </div>
      </template>
    </el-x-bubble>

    <div class="component-title">内容插槽 搭配 noStyle 属性</div>
    <el-x-bubble v-bind="bubblePropsWithNoStyle">
      <template slot="avatar">
        <img
          src="https://avatars.githubusercontent.com/u/76239030?s=40&v=4"
          class="avatar"
        />
      </template>

      <template slot="header">
        <div class="header-time">
          {{ currentTime }}
        </div>
      </template>

      <template slot="content">
        <div class="content">
          {{ content }}
        </div>
      </template>
    </el-x-bubble>

    <div class="component-title">底部插槽</div>
    <el-x-bubble v-bind="bubblePropsWithNoStyle">
      <template slot="avatar">
        <img
          src="https://avatars.githubusercontent.com/u/76239030?s=40&v=4"
          class="avatar"
        />
      </template>

      <template slot="header">
        <div class="header-time">
          {{ currentTime }}
        </div>
      </template>

      <template slot="content">
        <div class="content">
          {{ content }}
        </div>
      </template>

      <template slot="footer">
        <div class="footer-container">
          <button class="icon-button info">
            <i class="el-icon-refresh"></i>
          </button>
          <button class="icon-button success">
            <i class="el-icon-search"></i>
          </button>
          <button class="icon-button warning">
            <i class="el-icon-star-off"></i>
          </button>
          <button class="icon-button primary">
            <i class="el-icon-document-copy"></i>
          </button>
        </div>
      </template>
    </el-x-bubble>

    <div class="component-title">加载中插槽 loading 为 true 时展示</div>
    <el-x-bubble v-bind="bubbleProps">
      <template slot="loading">
        <div class="loading-container">
          <div class="dot1" />
          <div class="dot2" />
          <div class="dot3" />
        </div>
      </template>
    </el-x-bubble>
  </div>
</template>

<script>
  import ElXBubble from '@/components/Bubble';

  export default {
    name: 'BubbleSlotDemo',
    components: { ElXBubble },
    props: {
      content: {
        type: String,
        default: '这是插槽演示内容',
      },
      avatar: {
        type: String,
        default: '',
      },
      placement: {
        type: String,
        default: 'start',
      },
      variant: {
        type: String,
        default: 'filled',
      },
      maxWidth: {
        type: String,
        default: '500px',
      },
      avatarSize: {
        type: Number,
        default: 32,
      },
      avatarGap: {
        type: Number,
        default: 12,
      },
      avatarShape: {
        type: String,
        default: 'circle',
      },
      noStyle: {
        type: Boolean,
        default: false,
      },
      typing: {
        type: [Boolean, Object],
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      shape: {
        type: String,
        default: '',
      },
      isMarkdown: {
        type: Boolean,
        default: false,
      },
      isFog: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return { currentTime: new Date().toLocaleString() };
    },
    computed: {
      bubbleProps() {
        return {
          content: this.content,
          avatar: this.avatar,
          placement: this.placement,
          variant: this.variant,
          maxWidth: this.maxWidth,
          avatarSize: this.avatarSize,
          avatarGap: this.avatarGap,
          avatarShape: this.avatarShape,
          noStyle: this.noStyle,
          typing: this.typing,
          loading: this.loading,
          shape: this.shape,
          isMarkdown: this.isMarkdown,
          isFog: this.isFog,
        };
      },
      bubblePropsWithNoStyle() {
        return {
          ...this.bubbleProps,
          noStyle: true,
        };
      },
    },
    mounted() {
      this.updateTime();
      this.timeInterval = setInterval(this.updateTime, 60000);
    },
    beforeDestroy() {
      if (this.timeInterval) {
        clearInterval(this.timeInterval);
      }
    },
    methods: {
      updateTime() {
        this.currentTime = new Date().toLocaleString();
      },
    },
  };
</script>

<style scoped lang="scss">
  .component-container {
    background-color: white;
    padding: 12px;
    border-radius: 15px;

    .component-title {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 12px;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 12px;
      margin-top: 24px;

      &::after {
        position: absolute;
        content: '';
        display: block;
        width: 5px;
        height: 75%;
        border-radius: 15px;
        left: 0;
        background-color: #409eff;
      }
    }

    .avatar {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    .header-time {
      margin-bottom: 4px;
    }

    ::v-deep .content {
      font-size: 14px;
      font-weight: 700;
      color: #333;
      padding: 12px;
      background: linear-gradient(to right, #fdfcfb 0%, #ffd1ab 100%);
      border-radius: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .footer-container {
      .icon-button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 8px;
        font-size: 14px;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.1);
        }

        &.info {
          background-color: #909399;
          color: white;
        }

        &.success {
          background-color: #67c23a;
          color: white;
        }

        &.warning {
          background-color: #e6a23c;
          color: white;
        }

        &.primary {
          background-color: #626aef;
          color: white;
        }
      }
    }

    .loading-container {
      display: flex;
      gap: 4px;
      .dot1,
      .dot2,
      .dot3 {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .dot1 {
        animation: jump 1.6s -0.32s linear infinite;
        background: #626aef;
      }

      .dot2 {
        animation: jump 1.6s -0.16s linear infinite;
        background: #626aef;
      }

      .dot3 {
        animation: jump 1.6s linear infinite;
        background: #626aef;
      }

      @keyframes jump {
        0%,
        80%,
        100% {
          -webkit-transform: scale(0);
          transform: scale(0);
        }

        40% {
          -webkit-transform: scale(0.8);
          transform: scale(0.8);
        }
      }
    }
  }
</style>
