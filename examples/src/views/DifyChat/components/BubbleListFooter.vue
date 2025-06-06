<template>
  <div v-if="item.content && !item.typing">
    <div
      class="end-action"
      v-if="item.placement === 'end'"
    >
      <el-tooltip
        effect="dark"
        content="复制"
        placement="top"
      >
        <SvgIcon
          iconClass="action-btn"
          size="20"
          name="copy"
          color="rgb(139 139 139)"
          @click.native="handleCopyMessage(item)"
        />
      </el-tooltip>
      <el-tooltip
        ref="editTooltip"
        effect="dark"
        content="修改"
        placement="top"
      >
        <SvgIcon
          iconClass="action-btn"
          size="20"
          name="edit"
          color="rgb(139 139 139)"
          @click.native="handleEditMessage(item)"
        />
      </el-tooltip>
    </div>

    <!-- 只在AI消息中显示点赞和踩按钮 -->
    <template v-if="item.placement === 'start'">
      <div class="start-action">
        <el-tooltip
          effect="dark"
          content="复制"
          placement="top"
          :enterable="false"
        >
          <SvgIcon
            iconClass="action-btn"
            size="20"
            name="copy"
            color="rgb(139 139 139)"
            @click.native="handleCopyMessage(item)"
          />
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="重试"
          placement="top"
          :enterable="false"
          :manual="false"
        >
          <SvgIcon
            iconClass="action-btn"
            size="20"
            name="refresh"
            color="rgb(139 139 139)"
            @click.native="handleRetryMessage(item)"
          />
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="喜欢"
          placement="top"
          :enterable="false"
        >
          <SvgIcon
            iconClass="action-btn"
            size="20"
            name="like"
            :color="
              item.feedback != null && item.feedback.rating === 'like'
                ? '#626aef'
                : 'rgb(139 139 139)'
            "
            @click.native="handleLikeMessage(item)"
          />
        </el-tooltip>
        <el-tooltip
          ref="dislikeTooltip"
          effect="dark"
          content="不喜欢"
          placement="top"
          :enterable="false"
          :manual="false"
          trigger="hover"
          :open-delay="200"
          :close-delay="0"
          :hide-after="0"
        >
          <SvgIcon
            iconClass="action-btn"
            size="20"
            name="dislike"
            :color="
              item.feedback != null && item.feedback.rating === 'dislike'
                ? '#f56c6c'
                : 'rgb(139 139 139)'
            "
            @click.native="handleDislikeMessage(item)"
          />
        </el-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
  import { messageApi } from '@/api/dify';

  export default {
    name: 'BubbleListFooter',
    props: {
      item: {
        type: Object,
        required: true,
      },
      difyConfig: {
        type: Object,
        required: true,
      },
      messages: {
        type: Array,
        required: true,
      },
    },
    methods: {
      // 复制消息内容
      async handleCopyMessage(item) {
        if (!item.content) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(item.content);
            this.$message.success('内容已复制到剪贴板');
          } else {
            // 兼容旧浏览器
            const textArea = document.createElement('textarea');
            textArea.value = item.content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.$message.success('内容已复制到剪贴板');
          }
        } catch (error) {
          console.error('复制失败:', error);
          this.$message.error('复制失败，请手动复制');
        }
      },

      // 编辑用户消息
      handleEditMessage(item) {
        if (item.placement !== 'end') return;

        // 强制隐藏tooltip并移除焦点
        if (this.$refs.editTooltip) {
          // 移除按钮焦点
          document.activeElement && document.activeElement.blur();
        }

        // 使用setTimeout确保tooltip完全隐藏
        setTimeout(() => {
          this.$prompt('请修改您的消息', '编辑消息', {
            confirmButtonText: '重新发送',
            cancelButtonText: '取消',
            inputValue: item.content,
            inputType: 'textarea',
          })
            .then(({ value }) => {
              if (value && value.trim()) {
                // 通过事件向父组件传递编辑后的内容
                this.$emit('edit-message', value.trim());
              }
            })
            .catch(() => {});
        }, 50);
      },

      // 重试AI消息
      async handleRetryMessage(item) {
        if (item.placement !== 'start') return;

        try {
          // 找到对应的用户消息
          const messageIndex = this.messages.findIndex(msg => msg.id === item.id);
          if (messageIndex === -1) return;

          // 找到前一条用户消息
          let userMessage = null;
          for (let i = messageIndex - 1; i >= 0; i--) {
            if (this.messages[i].placement === 'end') {
              userMessage = this.messages[i];
              break;
            }
          }

          if (!userMessage) {
            this.$message.error('未找到对应的用户消息');
            return;
          }

          // 通过事件向父组件传递重试请求
          this.$emit('retry-message', userMessage.content);
        } catch (error) {
          console.error('重试失败:', error);
          this.$message.error('重试失败: ' + error.message);
        }
      },

      // 点赞消息
      async handleLikeMessage(item) {
        if (item.placement !== 'start') return;

        try {
          // 直接使用message_id
          const messageId = item.id;

          // 切换点赞状态
          let newRating;
          if (item.feedback != null && item.feedback.rating === 'like') {
            // 如果已经点赞，则取消点赞
            newRating = null;
          } else {
            // 否则点赞
            newRating = 'like';
          }

          await messageApi.feedbackMessage(messageId, newRating, '', this.difyConfig.user);

          // 通过事件向父组件传递反馈更新
          this.$emit('update-feedback', {
            messageId: item.id,
            feedback: newRating
              ? {
                  rating: newRating,
                }
              : null,
          });

          this.$message.success(newRating === 'like' ? '已点赞' : '已取消点赞');
        } catch (error) {
          console.error('点赞失败:', error);
          this.$message.error('操作失败: ' + error.message);
        }
      },

      // 踩消息
      async handleDislikeMessage(item) {
        if (item.placement !== 'start') return;
        // 强制隐藏tooltip并移除焦点
        if (this.$refs.dislikeTooltip) {
          // 移除按钮焦点
          document.activeElement && document.activeElement.blur();
        }
        try {
          // 直接使用message_id
          const messageId = item.id;

          let newRating;
          let content = '';

          if (item.feedback != null && item.feedback.rating === 'dislike') {
            // 如果已经踩过，则取消踩
            newRating = null;
          } else {
            // 否则踩，需要弹出对话框填写content
            const { value } = await this.$prompt('请填写反馈内容（可选）', '反馈', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputType: 'textarea',
              inputPlaceholder: '请输入您的反馈意见...',
              inputValidator: null, // 允许空内容
            }).catch(() => {
              // 用户取消了对话框
              return {
                value: null,
              };
            });

            if (value === null) {
              // 用户取消了操作
              return;
            }

            newRating = 'dislike';
            content = value || '';
          }

          await messageApi.feedbackMessage(messageId, newRating, content, this.difyConfig.user);

          // 通过事件向父组件传递反馈更新
          this.$emit('update-feedback', {
            messageId: item.id,
            feedback: newRating
              ? {
                  rating: newRating,
                  content,
                }
              : null,
          });

          this.$message.success(newRating === 'dislike' ? '已标记为不喜欢' : '已取消标记');
        } catch (error) {
          console.error('操作失败:', error);
          this.$message.error('操作失败: ' + error.message);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~element-ui/packages/theme-chalk/src/common/var';

  .end-action,
  .start-action {
    display: flex;
    gap: 10px;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;

    .action-btn {
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;
      flex-shrink: 0;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  // 防止tooltip导致水平滚动
  ::deep .el-tooltip__popper {
    max-width: 200px;
    word-wrap: break-word;
    z-index: 9999;
  }

  // 最后一条消息的 footer 始终显示
  ::deep .el-x-bubble:last-child {
    .end-action,
    .start-action {
      opacity: 1;
    }
  }

  // hover 时显示 footer
  ::deep .el-x-bubble:hover {
    .end-action,
    .start-action {
      opacity: 1;
    }
  }

  // 移动端适配 (<768px)
  @media (max-width: 767px) {
    .end-action,
    .start-action {
      display: flex;
      gap: 10px;
      align-items: center;
      opacity: 0;
      transition: opacity 0.2s ease;

      .action-btn {
        cursor: pointer;
      }
    }

    // 移动端鼠标悬停时显示footer
    ::deep .el-x-bubble:hover {
      .end-action,
      .start-action {
        opacity: 1;
      }
    }
  }
</style>
