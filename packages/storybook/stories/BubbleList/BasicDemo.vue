<template>
  <div class="bubble-list-demo">
    <div class="demo-section">
      <h3>滚动与返回按钮 & 加载状态与样式</h3>
      <div class="bubble-list-container">
        <el-x-bubble-list
          v-bind="bubbleListProps"
          :list="displayList"
          ref="bubbleListDemo"
        >
          <template
            slot="footer"
            slot-scope="{ item }"
          >
            <div
              class="bubble-footer"
              v-if="item.placement === 'start'"
            >
              <button class="icon-button info">
                <i class="el-icon-refresh"></i>
              </button>
              <button class="icon-button success">
                <i class="el-icon-search"></i>
              </button>
              <button class="icon-button warning">
                <i class="el-icon-star-on"></i>
              </button>
              <button class="icon-button primary">
                <i class="el-icon-document"></i>
              </button>
            </div>
            <div
              class="bubble-footer text-right"
              v-else
            >
              <button
                class="text-button"
                @click="recallMessage(item)"
              >
                <i class="el-icon-refresh-left"></i>
                撤回
              </button>
              <button
                class="text-button"
                @click="deleteMessage(item)"
              >
                <i class="el-icon-delete"></i>
                删除
              </button>
            </div>
          </template>
        </el-x-bubble-list>
      </div>

      <div class="demo-controls">
        <div class="button-group">
          <button
            class="demo-button primary"
            @click="scrollToTop"
          >
            滚动到顶部
          </button>
          <button
            class="demo-button primary"
            @click="scrollToBottom"
          >
            滚动到底部
          </button>
          <button
            class="demo-button"
            @click="scrollToMessage(5)"
          >
            滚动到第5条
          </button>
          <button
            class="demo-button warning"
            @click="toggleLoading"
          >
            切换加载状态
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ElXBubbleList from '@/components/BubbleList';

  export default {
    name: 'BubbleListBasicDemo',
    components: { ElXBubbleList },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      maxHeight: {
        type: String,
        default: '400px',
      },
      triggerIndices: {
        type: [String, Array],
        default: 'only-last',
      },
      alwaysShowScrollbar: {
        type: Boolean,
        default: false,
      },
      backButtonThreshold: {
        type: Number,
        default: 80,
      },
      showBackButton: {
        type: Boolean,
        default: true,
      },
      backButtonPosition: {
        type: Object,
        default: () => ({
          bottom: '20px',
          left: 'calc(50% - 19px)',
        }),
      },
      btnLoading: {
        type: Boolean,
        default: true,
      },
      btnColor: {
        type: String,
        default: '#409EFF',
      },
      btnIconSize: {
        type: Number,
        default: 24,
      },
      defaultIsMarkdown: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        scrollList: Array.from({ length: 20 }, (_, i) => ({
          content: `滚动列表消息${i + 1}`,
          placement: i % 2 === 0 ? 'start' : 'end',
          avatarSize: 40,
          avatar:
            i % 2 === 0
              ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg'
              : 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
          loading: i >= 18, // 最后两条消息显示加载状态
        })),
      };
    },
    computed: {
      bubbleListProps() {
        return {
          maxHeight: this.maxHeight,
          triggerIndices: this.triggerIndices,
          alwaysShowScrollbar: this.alwaysShowScrollbar,
          backButtonThreshold: this.backButtonThreshold,
          showBackButton: this.showBackButton,
          backButtonPosition: this.backButtonPosition,
          btnLoading: this.btnLoading,
          btnColor: this.btnColor,
          btnIconSize: this.btnIconSize,

          defaultIsMarkdown: this.defaultIsMarkdown,
        };
      },
      displayList() {
        // 如果外部传入了list，使用外部的，否则使用内部默认的
        return this.list.length > 0 ? this.list : this.scrollList;
      },
    },
    methods: {
      scrollToTop() {
        this.$refs.bubbleListDemo.scrollToTop();
      },
      scrollToBottom() {
        this.$refs.bubbleListDemo.scrollToBottom();
      },
      scrollToMessage(index) {
        this.$refs.bubbleListDemo.scrollToBubble(index - 1);
      },
      toggleLoading() {
        // 切换最后两条消息的加载状态
        const currentList = this.list.length > 0 ? this.list : this.scrollList;
        const len = currentList.length;
        if (len >= 2) {
          currentList[len - 1].loading = !currentList[len - 1].loading;
          currentList[len - 2].loading = !currentList[len - 2].loading;
        }
      },
      recallMessage(item) {
        const currentList = this.list.length > 0 ? this.list : this.scrollList;
        const index = currentList.indexOf(item);
        if (index !== -1) {
          currentList.splice(index, 1);
          console.log('消息已撤回');
        }
      },
      deleteMessage(item) {
        const currentList = this.list.length > 0 ? this.list : this.scrollList;
        const index = currentList.indexOf(item);
        if (index !== -1) {
          currentList.splice(index, 1);
          console.log('消息已删除');
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .bubble-list-demo {
    padding: 20px;
  }

  .demo-section {
    margin-bottom: 30px;
  }

  .demo-section h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  .bubble-list-container {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .demo-controls {
    margin-top: 20px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .demo-button {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }

    &.primary {
      background-color: #409eff;
      border-color: #409eff;
      color: #fff;

      &:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
    }

    &.warning {
      background-color: #e6a23c;
      border-color: #e6a23c;
      color: #fff;

      &:hover {
        background-color: #ebb563;
        border-color: #ebb563;
      }
    }
  }

  .bubble-footer {
    padding: 4px 0 0;
    display: flex;

    &.text-right {
      justify-content: flex-end;
    }

    .icon-button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-right: 6px;
      font-size: 12px;
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
        background-color: #409eff;
        color: white;
      }
    }

    .text-button {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 2px 4px;
      font-size: 12px;
      margin-left: 8px;
      display: inline-flex;
      align-items: center;
      gap: 2px;

      &:hover {
        color: #409eff;
      }
    }
  }
</style>
