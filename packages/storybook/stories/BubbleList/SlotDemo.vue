<template>
  <div class="component-container">
    <div class="component-title">插槽演示</div>
    <ElXBubbleList
      v-bind="bubbleListProps"
      :list="messageList"
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
            <i class="el-icon-star-off"></i>
          </button>
          <button class="icon-button primary">
            <i class="el-icon-document-copy"></i>
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

      <template slot="backToBottom">
        <div class="custom-back-button">
          <i class="el-icon-bottom"></i>
          <span class="back-text">回到底部</span>
        </div>
      </template>
    </ElXBubbleList>
  </div>
</template>

<script>
  import ElXBubbleList from '@/components/BubbleList';

  export default {
    name: 'BubbleListSlotDemo',
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
      defaultPlacement: {
        type: String,
        default: '',
      },
      defaultLoading: {
        type: Boolean,
        default: undefined,
      },
      defaultShape: {
        type: String,
        default: '',
      },
      defaultVariant: {
        type: String,
        default: '',
      },
      defaultIsMarkdown: {
        type: Boolean,
        default: true,
      },
      defaultIsFog: {
        type: Boolean,
        default: false,
      },
      defaultTyping: {
        type: [Boolean, Object],
        default: undefined,
      },
      defaultMaxWidth: {
        type: String,
        default: '',
      },
      defaultAvatar: {
        type: String,
        default: '',
      },
      defaultAvatarSize: {
        type: Number,
        default: undefined,
      },
      defaultAvatarGap: {
        type: Number,
        default: undefined,
      },
      defaultAvatarShape: {
        type: String,
        default: '',
      },
      defaultAvatarSrcSet: {
        type: String,
        default: '',
      },
      defaultAvatarAlt: {
        type: String,
        default: '',
      },
      defaultAvatarFit: {
        type: String,
        default: '',
      },
      defaultNoStyle: {
        type: Boolean,
        default: undefined,
      },
    },
    data() {
      return {
        messageList: Array.from({ length: 10 }, (_, i) => ({
          content: `这是第${i + 1}条消息，演示插槽功能`,
          placement: i % 2 === 0 ? 'start' : 'end',
          avatar:
            i % 2 === 0
              ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
              : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          avatarSize: 40,
          loading: i >= 8, // 最后两条消息显示加载状态
        })),
      };
    },
    computed: {
      bubbleListProps() {
        return {
          list: this.list.length > 0 ? this.list : this.messageList,
          maxHeight: this.maxHeight,
          triggerIndices: this.triggerIndices,
          alwaysShowScrollbar: this.alwaysShowScrollbar,
          backButtonThreshold: this.backButtonThreshold,
          showBackButton: this.showBackButton,
          backButtonPosition: this.backButtonPosition,
          btnLoading: this.btnLoading,
          btnColor: this.btnColor,
          btnIconSize: this.btnIconSize,
          defaultPlacement: this.defaultPlacement,
          defaultLoading: this.defaultLoading,
          defaultShape: this.defaultShape,
          defaultVariant: this.defaultVariant,
          defaultIsMarkdown: this.defaultIsMarkdown,
          defaultIsFog: this.defaultIsFog,
          defaultTyping: this.defaultTyping,
          defaultMaxWidth: this.defaultMaxWidth,
          defaultAvatar: this.defaultAvatar,
          defaultAvatarSize: this.defaultAvatarSize,
          defaultAvatarGap: this.defaultAvatarGap,
          defaultAvatarShape: this.defaultAvatarShape,
          defaultAvatarSrcSet: this.defaultAvatarSrcSet,
          defaultAvatarAlt: this.defaultAvatarAlt,
          defaultAvatarFit: this.defaultAvatarFit,
          defaultNoStyle: this.defaultNoStyle,
        };
      },
    },
    methods: {
      recallMessage(item) {
        const index = this.messageList.indexOf(item);
        if (index !== -1) {
          this.messageList.splice(index, 1);
          console.log('消息已撤回');
        }
      },
      deleteMessage(item) {
        const index = this.messageList.indexOf(item);
        if (index !== -1) {
          this.messageList.splice(index, 1);
          console.log('消息已删除');
        }
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
          background-color: #626aef;
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

    .custom-back-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 8px;
      background: rgba(64, 158, 255, 0.1);
      border-radius: 8px;
      color: #409eff;

      .back-text {
        font-size: 10px;
        line-height: 1;
      }
    }
  }
</style>
