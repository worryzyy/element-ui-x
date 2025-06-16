<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>sendMixin 发送操作</h2>
        <p>提供统一的请求状态管理和中断控制，支持 SSE 和 Fetch 两种请求方式</p>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <p>简单的发送操作演示，模拟异步请求</p>
        <div class="container">
          <div class="btn-list">
            <el-button
              :disabled="loading"
              type="primary"
              @click="handleSend"
            >
              {{ loading ? '加载中...' : '模拟请求' }}
            </el-button>
            <el-button
              :disabled="!loading"
              type="primary"
              @click="handleFinish"
            >
              结束请求
            </el-button>
            <el-button
              :disabled="!loading"
              type="danger"
              @click="handleAbort"
            >
              终止请求
            </el-button>
          </div>
          <div
            v-if="basicResult"
            class="result"
          >
            结果：{{ basicResult }}
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>自定义按钮</h3>
        <p>展示如何自定义不同类型的按钮及其加载状态。</p>
        <div class="custom-btn-container">
          <div class="btn-description">
            <p>点击任意按钮开始操作，按钮会自动切换到加载状态，几秒后自动结束：</p>
          </div>

          <div class="btn-list">
            <!-- 语音按钮 -->
            <el-button
              v-if="!voiceLoading"
              style="background-color: #9145c8; border-color: #9145c8; color: white"
              circle
              @click="startVoice"
              icon="el-icon-microphone"
            ></el-button>

            <el-button
              v-if="voiceLoading"
              style="background-color: #9145c8; border-color: #9145c8; color: white"
              circle
              @click="stopVoice"
              icon="el-icon-loading"
            ></el-button>

            <!-- 发送按钮 -->
            <el-button
              v-if="!senderLoading"
              style="background-color: transparent; border-color: #c2306a; color: #c2306a"
              round
              size="mini"
              icon="el-icon-s-promotion"
              @click="startSender"
            >
              <span style="margin-left: 5px">发送</span>
            </el-button>

            <el-button
              v-if="senderLoading"
              style="background-color: transparent; border-color: #c2306a; color: #c2306a"
              round
              size="mini"
              icon="el-icon-refresh el-icon-loading"
              @click="stopSender"
            >
              <span style="margin-left: 5px">发送中</span>
            </el-button>

            <!-- 播放按钮 -->
            <el-button
              v-if="!readLoading"
              size="mini"
              type="success"
              style="background-color: #ff7f7f; border-color: #ff7f7f"
              @click="startRead"
              icon="el-icon-video-play"
            >
              <span style="margin-left: 5px">播放</span>
            </el-button>

            <el-button
              v-if="readLoading"
              size="mini"
              type="success"
              style="background-color: #ff7f7f; border-color: #ff7f7f"
              @click="stopRead"
              icon="el-icon-video-pause"
            >
              播放中
            </el-button>

            <!-- 录制按钮 -->
            <el-button
              v-if="!recordLoading"
              circle
              style="background-color: #fff884; border-color: #fff884; color: #104674"
              @click="startRecord"
            >
              <i class="el-icon-camera"></i>
            </el-button>

            <el-button
              v-if="recordLoading"
              circle
              style="background-color: #fff884; border-color: #fff884; color: #104674"
              @click="stopRecord"
            >
              <i class="el-icon-aim el-icon-loading"></i>
            </el-button>
          </div>

          <div class="status-info">
            <p>
              当前状态：{{ type }} | 活跃按钮：
              <span
                v-if="voiceLoading"
                class="status-active"
              >
                语音录制中
              </span>
              <span
                v-if="senderLoading"
                class="status-active"
              >
                文本发送中
              </span>
              <span
                v-if="readLoading"
                class="status-active"
              >
                视频播放中
              </span>
              <span
                v-if="recordLoading"
                class="status-active"
              >
                视频录制中
              </span>
              <span
                v-if="!voiceLoading && !senderLoading && !readLoading && !recordLoading"
                class="status-idle"
              >
                空闲
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>XRequest SSE 示例</h3>
        <p>展示如何使用 XRequest 处理 SSE 流式数据。</p>
        <div class="xrequest-container">
          <div class="btn-list">
            <el-button
              type="primary"
              :disabled="sseLoading"
              @click="startSSERequest"
            >
              {{ sseLoading ? '请求中...' : '发起 SSE 请求' }}
            </el-button>

            <el-button
              type="danger"
              :disabled="!sseLoading"
              @click="abortSSERequest"
            >
              取消请求
            </el-button>

            <el-button
              type="info"
              @click="clearSSEResult"
            >
              清空结果
            </el-button>
          </div>

          <div class="result-container">
            <div class="result-header">
              <h4>接收到的消息：</h4>
              <el-tag
                v-if="sseLoading"
                type="success"
                size="mini"
              >
                连接中
              </el-tag>
              <el-tag
                v-else
                type="info"
                size="mini"
              >
                已断开
              </el-tag>
            </div>
            <div class="result-content">
              <div
                v-if="!sseResult"
                class="empty-state"
              >
                暂无消息
              </div>
              <pre
                v-else
                class="message-display"
                >{{ sseResult }}</pre
              >
            </div>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>XRequest Fetch 示例</h3>
        <p>展示如何使用 XRequest 处理 Fetch 流式数据。</p>
        <div class="xrequest-container">
          <div class="btn-list">
            <el-button
              type="primary"
              :disabled="fetchLoading"
              @click="startFetchRequest"
            >
              {{ fetchLoading ? '请求中...' : '发起请求' }}
            </el-button>

            <el-button
              type="danger"
              :disabled="!fetchLoading"
              @click="abortFetchRequest"
            >
              取消请求
            </el-button>

            <el-button
              type="info"
              @click="clearFetchResult"
            >
              清空结果
            </el-button>
          </div>

          <div class="result-container">
            <div class="result-header">
              <h4>接收到的消息：</h4>
              <el-tag
                v-if="fetchLoading"
                type="success"
                size="mini"
              >
                连接中
              </el-tag>
              <el-tag
                v-else
                type="info"
                size="mini"
              >
                已断开
              </el-tag>
            </div>
            <div class="result-content">
              <div
                v-if="!fetchResult"
                class="empty-state"
              >
                暂无消息
              </div>
              <pre
                v-else
                class="message-display"
                >{{ fetchResult }}</pre
              >
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { sendMixin, XRequest } from 'vue-element-ui-x';

  export default {
    name: 'SendMixinsDemo',
    mixins: [sendMixin],
    data() {
      return {
        // 基础用法
        basicResult: '',

        // 自定义按钮
        type: 'voice',
        voiceLoading: false,
        senderLoading: false,
        readLoading: false,
        recordLoading: false,
        timers: {},

        // SSE 示例
        sseLoading: false,
        sseResult: '',
        sseRequest: null,

        // Fetch 示例
        fetchLoading: false,
        fetchResult: '',
        fetchRequest: null,
      };
    },

    mounted() {
      // 初始化基础发送配置
      this.initSend({
        sendHandler: this.startBasicRequest,
        finishHandler: this.finishBasicRequest,
        abortHandler: this.abortBasicRequest,
        onAbort: this.onBasicAbort,
      });

      // 初始化 XRequest 实例
      this.initXRequest();
    },

    methods: {
      // ==================== 基础用法 ====================
      async startBasicRequest() {
        console.log('开始请求');
        this.basicResult = '';
      },

      finishBasicRequest() {
        this.basicResult = '请求成功完成！时间：' + new Date().toLocaleTimeString();
        console.log('基础请求处理完成');
      },

      abortBasicRequest() {
        this.basicResult = '请求被中止';
        console.log('基础请求被中止');
      },

      onBasicAbort() {
        console.log('基础请求中止回调');
      },

      // ==================== 自定义按钮 ====================
      // 语音按钮操作
      startVoice() {
        this.type = 'voice';
        this.voiceLoading = true;
        this.$message.success('自定义语音按钮，开始录音！');

        // 模拟3秒后自动结束
        this.timers.voice = setTimeout(() => {
          this.stopVoice();
        }, 3000);
      },
      stopVoice() {
        this.voiceLoading = false;
        this.$message.info('自定义语音按钮，结束录音！');
        if (this.timers.voice) {
          clearTimeout(this.timers.voice);
          delete this.timers.voice;
        }
      },

      // 发送按钮操作
      startSender() {
        this.type = 'sender';
        this.senderLoading = true;
        this.$message.success('自定义发送按钮，开始发送文本！');

        // 模拟2秒后自动结束
        this.timers.sender = setTimeout(() => {
          this.stopSender();
        }, 2000);
      },
      stopSender() {
        this.senderLoading = false;
        this.$message.info('自定义发送按钮，结束发送！');
        if (this.timers.sender) {
          clearTimeout(this.timers.sender);
          delete this.timers.sender;
        }
      },

      // 播放按钮操作
      startRead() {
        this.type = 'read';
        this.readLoading = true;
        this.$message.success('自定义播放，开始播放啦！');

        // 模拟4秒后自动结束
        this.timers.read = setTimeout(() => {
          this.stopRead();
        }, 4000);
      },
      stopRead() {
        this.readLoading = false;
        this.$message.info('自定义播放按钮，结束播放！');
        if (this.timers.read) {
          clearTimeout(this.timers.read);
          delete this.timers.read;
        }
      },

      // 录制按钮操作
      startRecord() {
        this.type = 'record';
        this.recordLoading = true;
        this.$message.success('自定义录制，开始录制啦！');

        // 模拟5秒后自动结束
        this.timers.record = setTimeout(() => {
          this.stopRecord();
        }, 5000);
      },
      stopRecord() {
        this.recordLoading = false;
        this.$message.info('自定义录制按钮，结束录制！');
        if (this.timers.record) {
          clearTimeout(this.timers.record);
          delete this.timers.record;
        }
      },

      // ==================== XRequest SSE 示例 ====================
      initXRequest() {
        // 创建 SSE 实例
        this.sseRequest = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'sse',
          onMessage: msg => {
            console.log('SSE 消息:', msg);
            try {
              const parsedMessage = JSON.parse(msg.data);
              this.sseResult += `[${new Date().toLocaleTimeString()}] ${parsedMessage.content}\n`;
            } catch (error) {
              if (msg.data === ' [DONE]') {
                console.log('数据接收完毕');
              } else {
                this.sseResult += `[${new Date().toLocaleTimeString()}] ${msg.data}\n`;
              }
            }
          },
          onError: (source, error) => {
            console.error('SSE 错误:', error);
            this.sseLoading = false;
          },
          onOpen: () => {
            console.log('SSE 连接已建立');
            this.$message.success('SSE 连接已建立');
          },
          onFinish: messages => {
            console.log('SSE 连接结束，共收到', messages.length, '条消息');
            this.sseLoading = false;
          },
          onAbort: () => {
            console.log('SSE 连接被中止');
            this.sseLoading = false;
          },
        });

        // 创建 Fetch 实例
        this.fetchRequest = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'fetch',
          onMessage: message => {
            console.log('Fetch 数据片段:', message);
            try {
              const parsedMessage = JSON.stringify(message);
              this.fetchResult += `[${new Date().toLocaleTimeString()}] ${parsedMessage}\n`;
            } catch (error) {
              this.fetchResult += `[${new Date().toLocaleTimeString()}] ${message}\n`;
            }
          },
          onError: error => {
            console.error('Fetch 错误:', error);
            this.$message.error('Fetch 请求错误');
            this.fetchLoading = false;
          },
          onFinish: messages => {
            console.log('Fetch 请求结束，共收到', messages.length, '个数据片段');
            this.fetchLoading = false;
          },
          onAbort: () => {
            console.log('Fetch 请求被中止');
            this.fetchLoading = false;
          },
        });
      },

      startSSERequest() {
        if (this.sseLoading) return;
        this.sseLoading = true;
        this.sseResult = '';
        this.sseRequest.send('/api/sse');
      },

      abortSSERequest() {
        if (this.sseRequest) {
          this.sseRequest.abort();
        }
      },

      clearSSEResult() {
        this.sseResult = '';
      },

      // ==================== XRequest Fetch 示例 ====================
      startFetchRequest() {
        if (this.fetchLoading) return;
        this.fetchLoading = true;
        this.fetchResult = '';
        this.fetchRequest.send('/api/sse');
      },

      abortFetchRequest() {
        if (this.fetchRequest) {
          this.fetchRequest.abort();
        }
      },

      clearFetchResult() {
        this.fetchResult = '';
      },
    },

    beforeDestroy() {
      // 清理定时器和请求
      Object.values(this.timers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });

      if (this.sseRequest) {
        this.sseRequest.abort();
      }
      if (this.fetchRequest) {
        this.fetchRequest.abort();
      }
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

  .container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .result {
    color: #67c23a;
    padding: 8px;
    background-color: #f0f9ff;
    border-radius: 4px;
  }

  .custom-btn-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background-color: #fafafa;
  }

  .btn-description {
    text-align: center;
  }

  .btn-description p {
    margin: 0;
    color: #606266;
    font-size: 14px;
  }

  .status-info {
    text-align: center;
    padding-top: 10px;
    border-top: 1px solid #e4e7ed;
  }

  .status-info p {
    margin: 0;
    color: #909399;
    font-size: 13px;
  }

  .status-active {
    color: #409eff;
    font-weight: bold;
  }

  .status-idle {
    color: #67c23a;
  }

  .xrequest-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .result-container {
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    background-color: #fff;
    overflow: hidden;
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;

    h4 {
      margin: 0;
      font-size: 14px;
      color: #303133;
    }
  }

  .result-content {
    padding: 16px;
    min-height: 120px;
    max-height: 300px;
    overflow-y: auto;
  }

  .empty-state {
    color: #909399;
    text-align: center;
    font-style: italic;
    line-height: 88px;
  }

  .message-display {
    margin: 0;
    padding: 12px;
    background-color: #f9f9f9;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-all;
    color: #2c3e50;
  }

  /* 图标动画效果 */
  .el-icon-loading {
    animation: rotating 2s linear infinite;
  }

  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .btn-list {
      flex-direction: column;
      gap: 8px;
    }

    .btn-list .el-button {
      width: 100%;
    }

    .result-header {
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
  }
</style>
