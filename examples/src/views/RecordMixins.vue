<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>recordMixin 语音识别</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <p>基本的语音识别功能使用示例。</p>
        <div class="btn-list">
          <el-button
            type="primary"
            :disabled="recordLoading"
            @click="beginRecord"
          >
            开始录音
          </el-button>
          <el-button
            type="danger"
            :disabled="!recordLoading"
            @click="endRecord"
          >
            停止录音
          </el-button>
        </div>

        <div
          class="result"
          v-if="recordValue"
        >
          识别结果: {{ recordValue }}
        </div>
      </div>

      <div class="demo-block">
        <h3>自定义控制</h3>
        <p>展示如何自定义控制语音识别的开始和结束。</p>
        <div class="btn-list">
          <el-button
            type="success"
            :disabled="recordLoading"
            @click="beginCustomRecord"
          >
            开始录音
          </el-button>
          <el-button
            type="danger"
            :disabled="!recordLoading"
            @click="endCustomRecord"
          >
            停止录音
          </el-button>
        </div>

        <el-card
          class="record-status"
          style="margin-top: 20px"
        >
          <div slot="header">
            <span>识别状态</span>
          </div>
          <div
            v-if="recordLoading"
            class="recording"
          >
            <i
              class="el-icon-microphone"
              style="color: #f56c6c"
            ></i>
            正在录音...
          </div>
          <div
            v-if="customRecordValue"
            class="record-result"
          >
            <div class="label">识别结果：</div>
            <div class="content">{{ customRecordValue }}</div>
          </div>
        </el-card>
      </div>

      <div class="demo-block">
        <h3>错误处理</h3>
        <p>展示如何处理语音识别过程中的错误。</p>
        <el-alert
          v-if="error"
          :title="error.message"
          type="error"
          show-icon
          :closable="false"
          style="margin-bottom: 20px"
        />

        <el-button
          type="primary"
          :loading="errorRecordLoading"
          @click="handleErrorRecord"
        >
          {{ errorRecordLoading ? '停止录音' : '开始录音' }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { recordMixin } from 'vue-element-ui-x';

  export default {
    name: 'RecordMixinsDemo',
    mixins: [recordMixin],
    data() {
      return {
        // 基础用法

        // 自定义控制
        customRecordValue: '',

        // 错误处理
        error: null,
        errorRecordLoading: false,

        // 聊天应用
        chatInput: '',
        chatRecordValue: '',
        chatRecordLoading: false,

        // 记录当前使用的场景
        currentScene: '',
      };
    },
    mounted() {
      // console.log('customMixins', customMixins);
      // return;
      // 基础用法初始化
      this.initRecord({
        onStart: () => {
          console.log('开始录音');
          if (this.currentScene === 'chat') {
            this.chatRecordLoading = true;
          } else if (this.currentScene === 'error') {
            this.errorRecordLoading = true;
          }
        },
        onEnd: value => {
          console.log('录音结束', value);
          if (this.currentScene === 'chat') {
            this.chatRecordValue = value;
            this.chatRecordLoading = false;
            this.currentScene = '';
          } else if (this.currentScene === 'error') {
            this.errorRecordLoading = false;
            this.currentScene = '';
          }
        },
        onError: error => {
          this.$message.error('录音失败：' + error.message);
          if (this.currentScene === 'error') {
            this.error = error;
            this.errorRecordLoading = false;
          } else if (this.currentScene === 'chat') {
            this.chatRecordLoading = false;
          }
          this.currentScene = '';
        },
        onResult: result => {
          console.log('实时识别结果：', result);
          if (this.currentScene === 'custom') {
            this.customRecordValue = result;
          }
        },
      });
    },
    methods: {
      // 基础用法
      beginRecord() {
        this.currentScene = 'basic';
        this.startRecord();
      },
      endRecord() {
        this.stopRecord();
        this.currentScene = '';
      },

      // 自定义控制
      beginCustomRecord() {
        this.currentScene = 'custom';
        this.customRecordValue = '';
        this.startRecord();
        this.$message({
          type: 'success',
          message: '开始录音',
        });
      },
      endCustomRecord() {
        this.stopRecord();
        this.currentScene = '';
        this.$message({
          type: 'info',
          message: '录音结束',
        });
      },

      // 错误处理
      handleErrorRecord() {
        if (this.errorRecordLoading) {
          this.stopRecord();
          this.currentScene = '';
        } else {
          this.error = null;
          this.currentScene = 'error';
          this.startRecord();
        }
      },

      // 聊天应用
      handleChatRecord() {
        if (this.chatRecordLoading) {
          this.stopRecord();
          this.currentScene = '';
        } else {
          this.currentScene = 'chat';
          this.startRecord();
        }
      },
      sendMessage() {
        if (!this.chatInput.trim()) return;
        this.chatRecordValue = this.chatInput;
        this.chatInput = '';
      },
    },
    beforeDestroy() {
      this.cleanupRecord();
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    font-weight: bold !important;
    font-size: 20px !important;
  }

  .demo-card {
    margin-bottom: 20px;
  }

  .demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      color: #606266;
      margin-bottom: 15px;
    }
  }

  .demo-controls {
    margin-top: 20px;
  }

  .result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }

  .recording {
    color: #f56c6c;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .record-result {
    margin-top: 15px;
  }

  .record-result .label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .record-result .content {
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 4px;
  }

  .chat-container {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .btn-list {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .chat-input-group {
    display: flex;
    gap: 12px;

    .el-input {
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    .btn-list {
      flex-direction: column;
    }

    .btn-list .el-button {
      width: 100%;
    }

    .chat-input-group {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }
</style>
