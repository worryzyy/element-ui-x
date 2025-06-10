<template>
  <div class="chat-input">
    <div class="chat-input-container">
      <el-x-sender
        ref="senderRef"
        :value="value"
        @input="$emit('input', $event)"
        variant="updown"
        @submit="$emit('send', $event)"
        :loading="loading"
      >
        <template #header>
          <SenderHeader
            :file-list="uploadedFiles"
            @delete-file="$emit('delete-file', $event)"
          />
        </template>

        <template #prefix>
          <div style="display: flex; align-items: center; flex-wrap: wrap">
            <el-button
              round
              plain
              color="#626aef"
              size="small"
              @click="$emit('file-upload')"
            >
              <i class="el-icon-paperclip"></i>
            </el-button>

            <!-- <template>
              <div
                :class="['thinking', { 'thinking--active': isSelect }]"
                @click="$emit('update:is-select', !isSelect)"
              >
                <i class="el-icon-plus"></i>
                <span>深度思考</span>
              </div>
            </template> -->
          </div>
        </template>

        <template #action-list>
          <div style="display: flex; align-items: center; gap: 8px">
            <!-- 录音按钮 -->

            <el-button
              circle
              :class="[
                'record-btn',
                { 'record-btn--active': recordLoading, 'record-btn--error': recordError },
              ]"
              :style="
                recordLoading
                  ? 'background: #ff6b6b; color: #fff'
                  : 'background: #52c41a; color: #fff'
              "
              size="small"
              @click="handleRecord"
              :disabled="loading"
            >
              <i :class="recordLoading ? 'el-icon-close' : 'el-icon-microphone'"></i>
            </el-button>

            <el-button
              v-if="loading"
              circle
              class="stop-btn"
              style="background: #f56c6c; color: #fff"
              size="small"
              @click="$emit('stop')"
            >
              <i class="el-icon-close"></i>
            </el-button>
            <el-button
              v-else
              circle
              class="send-btn"
              style="background: #626aef; color: #fff"
              size="small"
              @click="$emit('send', value)"
              :disabled="!value || !value.trim()"
            >
              <i class="el-icon-position"></i>
            </el-button>
          </div>
        </template>
      </el-x-sender>
    </div>

    <div class="chat-input-footer">内容由 AI 生成，请仔细甄别</div>
  </div>
</template>

<script>
  import { recordMixin } from 'vue-element-ui-x';
  import SenderHeader from './SenderHeader.vue';

  export default {
    name: 'ChatInput',
    components: { SenderHeader },
    mixins: [recordMixin],
    props: {
      value: {
        type: String,
        default: '',
      },
      loading: {
        type: Boolean,
        default: false,
      },
      isSelect: {
        type: Boolean,
        default: false,
      },
      uploadedFiles: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        recordError: null,
        recordAnimating: false,
      };
    },
    emits: ['input', 'send', 'stop', 'file-upload', 'delete-file', 'update:is-select'],
    methods: {
      handleRecord() {
        if (this.recordLoading) {
          this.stopRecord();
        } else {
          this.recordError = null;
          this.startRecord();
        }
      },

      handleRecordResult(value) {
        if (value && value.trim()) {
          // 如果输入框已有内容，追加到末尾，否则直接设置
          const currentValue = this.value || '';
          const newValue = currentValue ? `${currentValue} ${value}` : value;
          this.$emit('input', newValue);
        }
      },

      handleRecordError(error) {
        this.recordError = error;
        this.recordAnimating = true;
        setTimeout(() => {
          this.recordAnimating = false;
        }, 500);

        // 显示用户友好的错误信息
        let errorMessage = '录音失败';
        if (error.message) {
          if (error.message.includes('not-allowed')) {
            errorMessage = '请允许麦克风权限后重试';
          } else if (error.message.includes('network')) {
            errorMessage = '网络错误，请检查网络连接';
          } else if (error.message.includes('no-speech')) {
            errorMessage = '未检测到语音，请重试';
          } else {
            errorMessage = error.message;
          }
        }

        this.$message && this.$message.error(errorMessage);
      },
    },
    watch: {
      uploadedFiles: {
        handler(newFiles) {
          // 监听上传文件变化，控制header显示隐藏
          this.$nextTick(() => {
            const senderRef = this.$refs.senderRef;
            if (senderRef) {
              if (newFiles.length > 0) {
                senderRef.openHeader();
              } else {
                senderRef.closeHeader();
              }
            }
          });
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      // 初始化录音功能
      this.initRecord({
        onStart: () => {
          this.recordAnimating = true;
          console.log('开始录音');
        },
        onEnd: value => {
          this.recordAnimating = false;
          this.handleRecordResult(value);
          console.log('录音结束', value);
        },
        onError: error => {
          this.handleRecordError(error);
          console.error('录音错误', error);
        },
        onResult: result => {
          // 实时识别结果处理（可选）
          console.log('实时识别结果：', result);
        },
      });
    },
    beforeDestroy() {
      // 组件销毁时清理录音资源
      if (this.cleanupRecord) {
        this.cleanupRecord();
      }
    },
  };
</script>

<style lang="scss" scoped>
  .el-button + .el-button,
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0 !important;
  }
  .chat-input {
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    display: flex;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;

    .chat-input-container {
      max-width: 800px;
      flex-grow: 1;
      width: 100%;
      position: relative;
    }

    .chat-input-footer {
      font-size: 12px;
      color: #a3a3a3;
      margin: 6px 0;
      line-height: 14px;
    }
  }

  .thinking {
    display: flex;
    height: 32px;
    box-sizing: border-box;
    align-items: center;
    gap: 4px;
    padding: 2px 12px;
    border-width: 1px;
    border-style: solid;
    border-color: #0000001f;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    color: black;
    transition: background-color 0.3s ease;

    // 未激活时的hover效果
    &:hover {
      background-color: #e0e4ed;
    }

    // 激活状态
    &--active {
      background-color: #dbeafe;
      color: #4d6bfe;
      border-color: #007aff26;
      padding: 3px 12px;
      font-weight: 700;

      // 激活时的hover效果
      &:hover {
        background-color: #c3daf8;
      }
    }
  }

  // 录音按钮样式
  .record-btn {
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    // 录音激活状态 - 呼吸灯效果
    &--active {
      animation: recordPulse 1.5s ease-in-out infinite;

      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 50%;
        background: rgba(255, 107, 107, 0.3);
        animation: recordRipple 1.5s ease-out infinite;
      }
    }

    // 错误状态
    &--error {
      animation: recordShake 0.5s ease-in-out;
    }
  }

  // 录音按钮呼吸灯动画
  @keyframes recordPulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(255, 107, 107, 0.1);
    }
  }

  // 录音按钮波纹动画
  @keyframes recordRipple {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  // 错误震动动画
  @keyframes recordShake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
  }

  @media (max-width: 767px) {
    .chat-input {
      padding: 0 16px 16px;

      .chat-input-container {
        max-width: none;
      }
    }
  }
</style>
