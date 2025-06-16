<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>streamMixin 流式处理</h2>
      </div>

      <div class="demo-block">
        <h3>SSE 流式数据示例</h3>
        <p>展示如何处理 SSE 流式数据，并在 Bubble 组件中展示 Markdown 内容。</p>

        <div class="btn-list">
          <el-button
            :disabled="streamLoading"
            @click="startSSE"
            type="primary"
          >
            {{ streamLoading ? '加载中...' : '获取 SSE流数据' }}
          </el-button>

          <el-button
            type="danger"
            :disabled="!streamLoading"
            @click="cancelStream"
          >
            中断请求
          </el-button>
        </div>

        <div
          v-if="streamError"
          class="error"
        >
          {{ streamError.message }}
        </div>

        <el-x-bubble
          v-if="content"
          :content="content"
          :is-markdown="true"
          class="mt-10"
        ></el-x-bubble>
      </div>

      <div class="demo-block">
        <h3>SIP 协议数据处理示例</h3>
        <p>展示如何处理 SIP 协议的流式数据，并使用自定义转换流。</p>

        <div class="btn-list">
          <el-button
            :disabled="sipStreamLoading"
            @click="startSIPStream"
            type="success"
          >
            {{ sipStreamLoading ? '加载中...' : '获取 SIP 协议数据' }}
          </el-button>

          <el-button
            :disabled="!sipStreamLoading"
            @click="cancelSIPStream"
            type="danger"
          >
            中断请求
          </el-button>
        </div>

        <div
          v-if="sipStreamError"
          class="error"
        >
          {{ sipStreamError.message }}
        </div>

        <el-x-bubble
          v-if="sipContent"
          :content="sipContent"
          :is-markdown="true"
          class="mt-10"
        ></el-x-bubble>
      </div>

      <div class="demo-block">
        <h3>状态信息</h3>
        <p>查看当前流处理的状态信息。</p>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="status-card">
              <div slot="header">SSE 流状态</div>
              <div class="status-item">
                <span class="label">加载状态:</span>
                <span :class="{ 'status-loading': streamLoading }">
                  {{ streamLoading ? '加载中' : '空闲' }}
                </span>
              </div>
              <div class="status-item">
                <span class="label">数据条数:</span>
                <span>{{ streamData.length }}</span>
              </div>
              <div class="status-item">
                <span class="label">错误状态:</span>
                <span :class="{ 'status-error': streamError }">
                  {{ streamError ? '有错误' : '正常' }}
                </span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="status-card">
              <div slot="header">SIP 流状态</div>
              <div class="status-item">
                <span class="label">加载状态:</span>
                <span :class="{ 'status-loading': sipStreamLoading }">
                  {{ sipStreamLoading ? '加载中' : '空闲' }}
                </span>
              </div>
              <div class="status-item">
                <span class="label">数据条数:</span>
                <span>{{ sipStreamData.length }}</span>
              </div>
              <div class="status-item">
                <span class="label">错误状态:</span>
                <span :class="{ 'status-error': sipStreamError }">
                  {{ sipStreamError ? '有错误' : '正常' }}
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div class="demo-controls">
          <el-button
            @click="resetStream"
            size="small"
          >
            重置 SSE 流
          </el-button>
          <el-button
            @click="resetSIPStream"
            size="small"
          >
            重置 SIP 流
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { createStreamUtils, streamMixin } from 'vue-element-ui-x';

  export default {
    name: 'SSEStreamDemo',
    mixins: [streamMixin],
    data() {
      return {
        content: '',
        sipContent: '',
        sipStreamLoading: false,
        sipStreamError: null,
        sipStreamData: [],
        sipStreamProcessor: null,
      };
    },
    watch: {
      // 监听流数据变化，更新内容
      streamData: {
        handler(newData) {
          if (!newData || newData.length === 0) {
            this.content = '';
            return;
          }
          let text = '';
          for (let index = 0; index < newData.length; index++) {
            const chunk = newData[index].data;
            try {
              const parsedChunk = JSON.parse(chunk).content;
              text += parsedChunk;
            } catch (error) {
              // 这个结束标识是后端给的，所以这里这样判断
              // 实际项目中，以项目需要为准
              if (chunk === ' [DONE]') {
                // 处理数据结束的情况
                // console.log('数据接收完毕');
              } else {
                console.error('解析数据时出错:', error);
              }
            }
          }
          // console.log('Textqqq:', text);
          this.content = text;
        },
        deep: true,
      },

      // 监听 SIP 流数据变化
      sipStreamData: {
        handler(newData) {
          if (!newData || newData.length === 0) {
            this.sipContent = '';
            return;
          }

          let text = '';
          for (let index = 0; index < newData.length; index++) {
            const chunk = newData[index];
            try {
              console.log('chunk', chunk);
              text += chunk;
            } catch (error) {
              console.error('解析数据时出错:', error);
            }
          }
          console.log('Tex11111111111t:', text);
          this.sipContent = text;
        },
        deep: true,
      },
    },
    methods: {
      async startSSE() {
        try {
          const response = await fetch('https://testsse.element-ui-x.com/api/sse', {
            headers: { 'Content-Type': 'text/event-stream' },
          });
          const readableStream = response.body;
          await this.startStream({ readableStream });
        } catch (err) {
          console.error('Fetch error:', err);
          // 如果真实接口不可用，使用模拟数据
          await this.startStream({ readableStream: 'mock' });
        }
      },

      async startSIPStream() {
        this.sipStreamLoading = true;
        this.sipStreamError = null;
        this.sipStreamData = [];

        try {
          const response = await fetch('https://testsse.element-ui-x.com/api/sip', {
            headers: { 'Content-Type': 'application/sip' },
          });
          const readableStream = response.body;

          // 自定义 transformStream 处理 SIP 数据
          const sipTransformStream = new TransformStream({
            transform(chunk, controller) {
              // 这里可以添加 SIP 数据的解析逻辑
              controller.enqueue(chunk);
            },
          });

          // 使用工具函数创建完全独立的流处理器

          this.sipStreamProcessor = createStreamUtils({
            onData: item => {
              this.sipStreamData.push(item);
            },
            onComplete: allData => {
              this.sipStreamLoading = false;
              console.log('SIP 流完成，共收到', allData.length, '条数据');
            },
            onError: error => {
              this.sipStreamError = error;
              this.sipStreamLoading = false;
              console.error('SIP 流错误:', error);
            },
            onCancel: () => {
              this.sipStreamLoading = false;
              console.log('SIP 流已取消');
            },
            onFinish: () => {
              console.log('SIP 流处理结束');
            },
          });

          // 启动独立的流处理
          await this.sipStreamProcessor.startStream({
            readableStream,
            transformStream: sipTransformStream,
          });
        } catch (err) {
          console.error('Fetch error:', err);
          this.sipStreamError = err;
          this.sipStreamLoading = false;
        }
      },

      cancelSIPStream() {
        // 使用独立流工具的取消方法
        if (this.sipStreamProcessor) {
          this.sipStreamProcessor.cancel();
        }
        this.sipStreamLoading = false;
      },

      resetSIPStream() {
        this.sipStreamData = [];
        this.sipStreamError = null;
        this.sipStreamLoading = false;
        this.sipContent = '';
      },
    },
    beforeDestroy() {
      // 组件销毁时清理 SIP 流处理器
      if (this.sipStreamProcessor) {
        this.sipStreamProcessor.cancel();
        this.sipStreamProcessor = null;
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

  .demo-controls {
    margin-top: 20px;
  }

  .btn-list {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .error {
    color: #f56c6c;
    background: #fef0f0;
    border: 1px solid #fbc4c4;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .status-card {
    height: 100%;
  }

  .status-item {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-weight: 500;
      color: #606266;
    }

    .status-loading {
      color: #409eff;
      font-weight: 500;
    }

    .status-error {
      color: #f56c6c;
      font-weight: 500;
    }
  }

  .mt-10 {
    margin-top: 10px;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .btn-list {
      flex-direction: column;
    }

    .btn-list .el-button {
      width: 100%;
    }
  }
</style>
