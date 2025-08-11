<template>
  <div class="request-demo">
    <h2>XRequest Fetch 模式示例</h2>

    <div class="demo-section">
      <h3>阿里云通义千问流式调用</h3>

      <div class="form-section">
        <div class="input-group">
          <label>APP ID:</label>
          <input
            v-model="config.appId"
            placeholder="请输入你的 APP ID"
            class="input-field"
          />
        </div>

        <div class="input-group">
          <label>API Key:</label>
          <input
            v-model="config.apiKey"
            placeholder="请输入你的 API Key"
            type="password"
            class="input-field"
          />
        </div>

        <div class="input-group">
          <label>问题:</label>
          <textarea
            v-model="question"
            placeholder="请输入你的问题..."
            rows="3"
            class="textarea-field"
          ></textarea>
        </div>
      </div>

      <div class="button-group">
        <button
          @click="sendRequest"
          :disabled="loading || !isConfigValid"
          class="send-btn"
        >
          {{ loading ? '发送中...' : '发送请求' }}
        </button>

        <button
          @click="abortRequest"
          :disabled="!loading"
          class="abort-btn"
        >
          中止请求
        </button>

        <button
          @click="clearMessages"
          class="clear-btn"
        >
          清空消息
        </button>
      </div>
    </div>

    <div class="response-section">
      <h3>实时响应 ({{ messages.length }} 条消息)</h3>
      <div class="messages-container">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message-item"
        >
          <span class="message-index">#{{ index + 1 }}</span>
          <span class="message-content">{{ msg }}</span>
        </div>
        <div
          v-if="messages.length === 0"
          class="empty-message"
        >
          暂无消息...
        </div>
      </div>
    </div>

    <div class="status-section">
      <h3>请求状态</h3>
      <div class="status-info">
        <div>
          加载状态:
          <span :class="loading ? 'status-loading' : 'status-idle'">
            {{ loading ? '请求中' : '空闲' }}
          </span>
        </div>
        <div>
          消息数量:
          <span class="status-count">{{ messages.length }}</span>
        </div>
        <div>
          配置状态:
          <span :class="isConfigValid ? 'status-valid' : 'status-invalid'">
            {{ isConfigValid ? '已配置' : '待配置' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XRequest } from '../../../packages/element-ui-x/src/mixins/sendMixin.js';

  export default {
    name: 'RequestDemo',
    data() {
      return {
        loading: false,
        messages: [],
        question: '你是谁？请简单介绍一下自己。',
        config: {
          appId: 'xx',
          apiKey: 'sk-xxx',
        },
        xRequest: null,
      };
    },

    computed: {
      isConfigValid() {
        return this.config.appId.trim() && this.config.apiKey.trim();
      },
    },

    methods: {
      sendRequest() {
        if (!this.isConfigValid) {
          alert('请先配置 APP ID 和 API Key');
          return;
        }

        if (!this.question.trim()) {
          alert('请输入问题');
          return;
        }

        this.messages = [];
        this.loading = true;

        // 创建 XRequest 实例
        this.xRequest = new XRequest({
          type: 'fetch', // 使用 fetch 模式
          baseURL: 'https://dashscope.aliyuncs.com',
          transformer: data => {
            // 处理返回的数据
            if (typeof data === 'string') {
              try {
                const parsed = JSON.parse(data);
                return (
                  (parsed.output && parsed.output.text) ||
                  (parsed.output && parsed.output.content) ||
                  data
                );
              } catch {
                return data;
              }
            }
            return (
              (data.output && data.output.text) ||
              (data.output && data.output.content) ||
              JSON.stringify(data)
            );
          },
          onMessage: message => {
            console.log('收到消息:', message);
            this.messages.push(message);
            // 自动滚动到底部
            this.$nextTick(() => {
              const container = document.querySelector('.messages-container');
              if (container) {
                container.scrollTop = container.scrollHeight;
              }
            });
          },
          onError: error => {
            console.error('请求错误:', error);
            alert('请求失败: ' + (error.message || '未知错误'));
            this.loading = false;
          },
          onAbort: messages => {
            console.log('请求已中止，收到消息数:', messages.length);
            this.loading = false;
          },
          onFinish: messages => {
            console.log('请求完成，总消息数:', messages.length);
            this.loading = false;
          },
          onOpen: () => {
            console.log('连接已建立');
          },
        });

        // 发送请求
        this.xRequest.send(`/api/v1/apps/${this.config.appId}/completion`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'X-DashScope-SSE': 'enable',
          },
          body: JSON.stringify({
            input: { prompt: this.question },
            parameters: { incremental_output: true },
            debug: {},
          }),
        });
      },

      abortRequest() {
        if (this.xRequest) {
          this.xRequest.abort();
        }
      },

      clearMessages() {
        this.messages = [];
      },
    },

    beforeDestroy() {
      // 组件销毁时清理资源
      if (this.xRequest) {
        this.xRequest.abort();
      }
    },
  };
</script>

<style scoped>
  .request-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .demo-section {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
  }

  .input-field,
  .textarea-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .input-field:focus,
  .textarea-field:focus {
    outline: none;
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }

  .button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .send-btn,
  .abort-btn,
  .clear-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }

  .send-btn {
    background: #409eff;
    color: white;
  }

  .send-btn:hover:not(:disabled) {
    background: #337ecc;
  }

  .send-btn:disabled {
    background: #c0c4cc;
    cursor: not-allowed;
  }

  .abort-btn {
    background: #f56c6c;
    color: white;
  }

  .abort-btn:hover:not(:disabled) {
    background: #f24c4c;
  }

  .abort-btn:disabled {
    background: #c0c4cc;
    cursor: not-allowed;
  }

  .clear-btn {
    background: #909399;
    color: white;
  }

  .clear-btn:hover {
    background: #767a82;
  }

  .response-section {
    margin-bottom: 20px;
  }

  .messages-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    background: white;
  }

  .message-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 8px;
    padding: 8px;
    background: #f0f9ff;
    border-radius: 4px;
    border-left: 3px solid #409eff;
  }

  .message-index {
    color: #409eff;
    font-weight: bold;
    margin-right: 10px;
    min-width: 30px;
  }

  .message-content {
    flex: 1;
    word-break: break-word;
    line-height: 1.4;
  }

  .empty-message {
    text-align: center;
    color: #909399;
    padding: 20px;
    font-style: italic;
  }

  .status-section {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
  }

  .status-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }

  .status-info > div {
    padding: 5px 0;
  }

  .status-loading {
    color: #e6a23c;
    font-weight: bold;
  }

  .status-idle {
    color: #67c23a;
    font-weight: bold;
  }

  .status-count {
    color: #409eff;
    font-weight: bold;
  }

  .status-valid {
    color: #67c23a;
    font-weight: bold;
  }

  .status-invalid {
    color: #f56c6c;
    font-weight: bold;
  }

  h2,
  h3 {
    color: #333;
    margin-top: 0;
  }

  /* 响应式设计 */
  @media (max-width: 600px) {
    .request-demo {
      padding: 10px;
    }

    .button-group {
      flex-direction: column;
    }

    .send-btn,
    .abort-btn,
    .clear-btn {
      width: 100%;
    }

    .status-info {
      grid-template-columns: 1fr;
    }
  }
</style>
