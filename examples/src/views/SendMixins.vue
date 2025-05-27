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
            @click="handleFinish"
          >
            结束请求
          </el-button>
        </div>
        <div class="demo-controls">
          <p>状态：{{ loading ? '请求进行中...' : '空闲状态' }}</p>
          <p v-if="basicResult">结果：{{ basicResult }}</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>自动完成演示</h3>
        <p>发送请求后自动在3秒后完成</p>
        <div class="btn-list">
          <el-button
            :disabled="autoLoading"
            type="success"
            @click="handleAutoSend"
          >
            {{ autoLoading ? '自动加载中...' : '自动请求' }}
          </el-button>

          <el-button
            :disabled="!autoLoading"
            @click="handleAutoAbort"
          >
            中止请求
          </el-button>
        </div>
        <div class="demo-controls">
          <p>状态：{{ autoLoading ? '请求进行中，将在3秒后自动完成...' : '空闲状态' }}</p>
          <p v-if="autoResult">结果：{{ autoResult }}</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>SSE 流式请求演示</h3>
        <p>使用 XRequest 类进行 SSE 流式数据接收</p>
        <div class="btn-list">
          <el-button
            :disabled="sseLoading"
            type="warning"
            @click="handleSSESend"
          >
            {{ sseLoading ? 'SSE 连接中...' : '开始 SSE 连接' }}
          </el-button>

          <el-button
            :disabled="!sseLoading"
            @click="handleSSEAbort"
          >
            断开连接
          </el-button>
        </div>
        <div class="demo-controls">
          <p>状态：{{ sseLoading ? 'SSE 连接中...' : '连接已断开' }}</p>
          <div
            v-if="sseMessages.length > 0"
            class="sse-messages"
          >
            <p><strong>接收到的消息：</strong></p>
            <div
              v-for="(message, index) in sseMessages"
              :key="index"
              class="sse-message"
            >
              {{ message }}
            </div>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>Fetch 流式请求演示</h3>
        <p>使用 XRequest 类进行 Fetch 流式数据读取</p>
        <div class="btn-list">
          <el-button
            :disabled="fetchLoading"
            type="info"
            @click="handleFetchSend"
          >
            {{ fetchLoading ? 'Fetch 请求中...' : '开始 Fetch 流式请求' }}
          </el-button>

          <el-button
            :disabled="!fetchLoading"
            @click="handleFetchAbort"
          >
            中止请求
          </el-button>
        </div>
        <div class="demo-controls">
          <p>状态：{{ fetchLoading ? 'Fetch 请求进行中...' : '请求已结束' }}</p>
          <div
            v-if="fetchMessages.length > 0"
            class="fetch-messages"
          >
            <p><strong>接收到的数据片段：</strong></p>
            <div
              v-for="(message, index) in fetchMessages"
              :key="index"
              class="fetch-message"
            >
              {{ message }}
            </div>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>错误处理演示</h3>
        <p>演示请求错误时的处理机制</p>
        <div class="btn-list">
          <el-button
            :disabled="errorLoading"
            type="danger"
            @click="handleErrorSend"
          >
            {{ errorLoading ? '错误请求中...' : '模拟错误请求' }}
          </el-button>

          <el-button
            :disabled="!errorLoading"
            @click="handleErrorAbort"
          >
            中止请求
          </el-button>
        </div>
        <div class="demo-controls">
          <p>状态：{{ errorLoading ? '请求进行中...' : '空闲状态' }}</p>
          <p
            v-if="errorResult"
            class="error-result"
          >
            {{ errorResult }}
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { customMixins } from 'vue-element-ui-x';

  export default {
    name: 'SendMixinsDemo',
    mixins: [customMixins.sendMixin],
    data() {
      return {
        // 基础用法
        basicResult: '',

        // 自动完成
        autoLoading: false,
        autoResult: '',
        autoTimer: null,

        // SSE 演示
        sseLoading: false,
        sseMessages: [],
        sseRequest: null,

        // Fetch 演示
        fetchLoading: false,
        fetchMessages: [],
        fetchRequest: null,

        // 错误处理
        errorLoading: false,
        errorResult: '',
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
    },

    methods: {
      // ==================== 基础用法 ====================
      async startBasicRequest() {
        console.log('开始模拟请求');
        this.basicResult = '';

        // 模拟异步操作
        await new Promise(resolve => {
          setTimeout(resolve, 1000);
        });

        console.log('基础请求完成');
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

      // ==================== 自动完成演示 ====================
      handleAutoSend() {
        if (this.autoLoading) return;

        this.autoLoading = true;
        this.autoResult = '';
        console.log('开始自动请求');

        // 3秒后自动完成
        this.autoTimer = setTimeout(() => {
          this.handleAutoFinish();
        }, 3000);
      },

      handleAutoAbort() {
        if (this.autoTimer) {
          clearTimeout(this.autoTimer);
          this.autoTimer = null;
        }
        this.autoLoading = false;
        this.autoResult = '自动请求被中止';
        console.log('自动请求被中止');
      },

      handleAutoFinish() {
        this.autoLoading = false;
        this.autoResult = '自动请求成功完成！时间：' + new Date().toLocaleTimeString();
        console.log('自动请求完成');
      },

      // ==================== SSE 流式请求演示 ====================
      handleSSESend() {
        if (this.sseLoading) return;

        this.sseLoading = true;
        this.sseMessages = [];

        // 创建 XRequest 实例进行 SSE 连接
        this.sseRequest = this.createXRequest({
          type: 'sse',
          onMessage: message => {
            console.log('SSE 消息:', message);
            this.sseMessages.push(`[${new Date().toLocaleTimeString()}] ${message}`);
          },
          onError: (source, error) => {
            console.error('SSE 错误:', error);
            this.$message.error('SSE 连接错误');
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

        // 模拟 SSE 端点（实际使用时替换为真实的 SSE 端点）
        // this.sseRequest.send('/api/sse-stream');

        // 为了演示，我们手动模拟消息接收
        this.simulateSSEMessages();
      },

      handleSSEAbort() {
        if (this.sseRequest) {
          this.sseRequest.abort();
          this.sseRequest = null;
        }
        this.sseLoading = false;
      },

      // 模拟 SSE 消息
      simulateSSEMessages() {
        let count = 0;
        const interval = setInterval(() => {
          if (!this.sseLoading || count >= 5) {
            clearInterval(interval);
            if (this.sseLoading) {
              this.handleSSEAbort();
            }
            return;
          }

          const message = `SSE 消息 ${count + 1}: Hello from Server!`;
          this.sseMessages.push(`[${new Date().toLocaleTimeString()}] ${message}`);
          count++;
        }, 1000);
      },

      // ==================== Fetch 流式请求演示 ====================
      handleFetchSend() {
        if (this.fetchLoading) return;

        this.fetchLoading = true;
        this.fetchMessages = [];

        // 创建 XRequest 实例进行 Fetch 流式请求
        this.fetchRequest = this.createXRequest({
          type: 'fetch',
          transformer: data => {
            // 数据转换器，处理接收到的数据
            return data;
          },
          onMessage: message => {
            console.log('Fetch 数据片段:', message);
            this.fetchMessages.push(`[${new Date().toLocaleTimeString()}] ${message}`);
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

        // 模拟 Fetch 流式端点（实际使用时替换为真实的流式端点）
        // this.fetchRequest.send('/api/stream', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ query: 'hello' })
        // });

        // 为了演示，我们手动模拟数据接收
        this.simulateFetchMessages();
      },

      handleFetchAbort() {
        if (this.fetchRequest) {
          this.fetchRequest.abort();
          this.fetchRequest = null;
        }
        this.fetchLoading = false;
      },

      // 模拟 Fetch 数据接收
      simulateFetchMessages() {
        let count = 0;
        const interval = setInterval(() => {
          if (!this.fetchLoading || count >= 5) {
            clearInterval(interval);
            if (this.fetchLoading) {
              this.handleFetchAbort();
            }
            return;
          }

          const message = `数据片段 ${count + 1}: {"id": ${count + 1}, "data": "stream data"}`;
          this.fetchMessages.push(`[${new Date().toLocaleTimeString()}] ${message}`);
          count++;
        }, 800);
      },

      // ==================== 错误处理演示 ====================
      handleErrorSend() {
        if (this.errorLoading) return;

        this.errorLoading = true;
        this.errorResult = '';
        console.log('开始错误请求演示');

        // 模拟2秒后发生错误
        setTimeout(() => {
          if (this.errorLoading) {
            this.handleErrorAbort();
            this.errorResult = '请求发生错误：模拟网络超时';
            this.$message.error('请求失败');
          }
        }, 2000);
      },

      handleErrorAbort() {
        this.errorLoading = false;
        if (!this.errorResult) {
          this.errorResult = '错误请求被手动中止';
        }
        console.log('错误请求被中止');
      },
    },

    beforeDestroy() {
      // 清理定时器和请求
      if (this.autoTimer) {
        clearTimeout(this.autoTimer);
      }
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
  h4 {
    font-size: 16px !important;
    margin-top: 10px;
    margin-bottom: 10px;
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
  }
  .demo-controls {
    margin-top: 20px;
  }
  .control-row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    h4 {
      margin: 0 10px 0 0;
      font-size: 14px;
      font-weight: normal;
      width: 80px;
    }
  }
  .btn-list {
    margin-bottom: 20px;
    .el-button {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }
  .sse-messages,
  .fetch-messages {
    margin-top: 10px;
    max-height: 200px;
    overflow-y: auto;
    .sse-message,
    .fetch-message {
      padding: 8px 12px;
      margin-bottom: 5px;
      background-color: #f0f9ff;
      border-left: 3px solid #67c23a;
      border-radius: 2px;
      font-size: 13px;
      line-height: 1.4;
      color: #303133;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .fetch-message {
    background-color: #fdf6ec;
    border-left-color: #e6a23c;
  }
  .error-result {
    color: #f56c6c !important;
    font-weight: 500;
  }
  .loading-text {
    color: #409eff;
    font-weight: 500;
  }
  // 响应式设计
  @media (max-width: 768px) {
    .btn-list {
      .el-button {
        display: block;
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
</style>
