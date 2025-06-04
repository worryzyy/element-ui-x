# sendMixin & XRequest

## 功能说明

发送操作混入，提供统一的请求状态管理和中断控制，支持以下特性：

- 支持 SSE (Server-Sent Events) 和 Fetch 两种请求方式
- 提供完整的请求生命周期管理
- 支持请求的中断控制
- 自动处理请求状态
- 错误处理机制
- 支持自定义数据转换器
- 支持非组件场景的工具函数版本
- 集成 XRequest 类提供强大的请求处理能力

## 导入和使用

```js
import { sendMixin } from 'vue-element-ui-x';

export default {
  mixins: [sendMixin],
  // ...
};
```

:::tip 说明
以下示例的导入方式是解决文档站打包时的报错，正常情况下请按正常的方式导入即可
:::

## 使用示例

### sendMixin 基本用法

::: tip 基本流程
用户操作 → handleSend/handleAbort/handleFinish → 更新 loading 状态 → 调用用户回调
:::

:::demo

```html
<template>
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
</template>
<script>
  let sendMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      sendMixin = window['vue-element-ui-x'].customMixins.sendMixin;
    } else if (typeof require !== 'undefined') {
      sendMixin = require('vue-element-ui-x').customMixins.sendMixin;
    }
  } catch (e) {
    sendMixin = {
      data() {
        return { loading: false };
      },
      methods: {
        initSend() {},
        handleSend() {},
        handleFinish() {},
        handleAbort() {},
      },
    };
  }
  export default {
    name: 'SendBasicDemo',
    mixins: [sendMixin],
    data() {
      return {
        basicResult: '',
      };
    },
    mounted() {
      // 初始化发送配置
      this.initSend({
        sendHandler: this.startFn,
        finishHandler: this.finishBasicRequest,
        abortHandler: this.abortBasicRequest,
        onAbort: this.onBasicAbort,
      });
    },
    methods: {
      async startFn() {
        // 在这里做一个异步操作，可以是发请求
        console.log('开始模拟请求');
        this.basicResult = '';
      },
      finishBasicRequest() {
        this.basicResult = '请求成功完成！时间：' + new Date().toLocaleTimeString();
        console.log('基础请求处理完成');
      },
      abortBasicRequest() {
        this.basicResult = '请求被中止';
        console.log('基础请求被中止', this.loading);
      },
      onBasicAbort() {
        console.log('基础请求中止回调');
      },
    },
  };
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .btn-list {
    display: flex;
    gap: 12px;
  }
  .btn-list .el-button {
    width: fit-content;
  }
  .result {
    color: #67c23a;
    padding: 8px;
    background-color: #f0f9ff;
    border-radius: 4px;
  }
</style>
```

:::

有了对状态的控制，我们可以很方便的，自定义一些按钮的加载状态

:::demo

```html
<template>
  <div class="custom-btn-container">
    <div class="btn-description">
      <p>点击任意按钮开始操作，按钮会自动切换到加载状态，几秒后自动结束：</p>
    </div>

    <div class="btn-list">
      <!-- 语音按钮 -->
      <el-button
        v-if="!voiceLoading"
        style="background-color: #9145c8; border-color: #9145c8; color: white;"
        circle
        size="mini"
        @click="startVoice"
      >
        <i class="el-icon-microphone"></i>
      </el-button>

      <el-button
        v-if="voiceLoading"
        style="background-color: #9145c8; border-color: #9145c8; color: white;"
        circle
        size="mini"
        @click="stopVoice"
      >
        <i class="el-icon-loading"></i>
      </el-button>

      <!-- 发送按钮 -->
      <el-button
        v-if="!senderLoading"
        style="background-color: transparent; border-color: #c2306a; color: #c2306a;"
        round
        size="mini"
        @click="startSender"
      >
        <i class="el-icon-s-promotion"></i>
        <span style="margin-left: 5px;">发送</span>
      </el-button>

      <el-button
        v-if="senderLoading"
        style="background-color: transparent; border-color: #c2306a; color: #c2306a;"
        round
        size="mini"
        @click="stopSender"
      >
        <i class="el-icon-refresh el-icon-loading"></i>
        <span style="margin-left: 5px;">发送中</span>
      </el-button>

      <!-- 播放按钮 -->
      <el-button
        v-if="!readLoading"
        size="mini"
        type="success"
        style="background-color: #ff7f7f; border-color: #ff7f7f;"
        @click="startRead"
      >
        <i
          class="el-icon-video-play"
          style="font-size: 20px; color: #fff;"
        ></i>
        <span style="margin-left: 5px;">播放</span>
      </el-button>

      <el-button
        v-if="readLoading"
        size="mini"
        type="success"
        style="background-color: #ff7f7f; border-color: #ff7f7f;"
        @click="stopRead"
      >
        <i
          class="el-icon-video-pause"
          style="font-size: 20px; color: #fff;"
        ></i>
        <span style="margin-left: 5px;">播放中</span>
      </el-button>

      <!-- 录制按钮 -->
      <el-button
        v-if="!recordLoading"
        size="mini"
        circle
        style="background-color: #fff884; border-color: #fff884; color: #104674;"
        @click="startRecord"
      >
        <i class="el-icon-camera"></i>
      </el-button>

      <el-button
        v-if="recordLoading"
        size="mini"
        circle
        style="background-color: #fff884; border-color: #fff884; color: #104674;"
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
</template>
<script>
  export default {
    name: 'CustomButtonDemo',
    data() {
      return {
        type: 'voice',
        // 多个独立的loading状态
        voiceLoading: false,
        senderLoading: false,
        readLoading: false,
        recordLoading: false,

        // 存储定时器引用
        timers: {},
      };
    },
    methods: {
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
    },

    beforeDestroy() {
      // 清理所有定时器
      Object.values(this.timers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    },
  };
</script>

<style>
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

  .btn-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn-list .el-button {
    min-width: fit-content;
    transition: all 0.3s ease;
  }

  .btn-list .el-button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      gap: 15px;
    }

    .btn-list .el-button {
      min-width: 80px;
    }
  }
</style>
```

:::

以上都是 `前端加载状态` 的控制，那一定少不了 `请求状态` 控制。接下来我们来介绍一下 工具类 XRequest 的简单用法

### XRequest 基础用法(sse)

:::demo

```html
<template>
  <div class="xrequest-container">
    <div class="description">
      <p>XRequest 工具类支持的SSE请求方式</p>
    </div>

    <div class="btn-list">
      <el-button
        type="primary"
        :disabled="loading"
        @click="startSSERequest"
      >
        {{ loading ? '请求中...' : '发起 SSE 请求' }}
      </el-button>

      <el-button
        type="danger"
        :disabled="!loading"
        @click="abortRequest"
      >
        取消请求
      </el-button>

      <el-button
        type="info"
        @click="clearResult"
      >
        清空结果
      </el-button>
    </div>

    <div class="result-container">
      <div class="result-header">
        <h4>接收到的消息：</h4>
        <el-tag
          v-if="loading"
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
          v-if="!str"
          class="empty-state"
        >
          暂无消息
        </div>
        <pre
          v-else
          class="message-display"
        >
{{ str }}</pre
        >
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'XRequestDemo',
    data() {
      return {
        str: '',
        loading: false,
        sse: null,
      };
    },
    mounted() {
      // 初始化 XRequest 实例
      this.initXRequest();
    },
    methods: {
      initXRequest() {
        // 导入 XRequest 类
        const { XRequest } = require('vue-element-ui-x').customMixins;

        // 创建 XRequest 实例
        this.sse = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'sse', // 使用 SSE 模式

          onMessage: msg => {
            console.log('收到消息:', msg);
            // 假设消息格式为 { data: string }
            if (msg && msg.data) {
              this.str += `
              ${msg.data}`;
            } else {
              this.str += `
              ${JSON.stringify(msg)}`;
            }
          },
          onOpen: () => {
            console.log('SSE 连接已打开');
            this.$message.success('SSE 连接已建立');
            this.loading = true;
          },
          onError: error => {
            console.error('SSE 错误:', error);
            this.loading = false;
          },
          onAbort: () => {
            console.log('SSE 连接已中止');
            this.loading = false;
          },
          onFinish: messages => {
            console.log('SSE 连接已完成，共接收消息:', messages?.length || 0);
            this.$message.success('连接已完成');
            this.loading = false;
          },
        });
      },

      startSSERequest() {
        if (this.loading) {
          return;
        }

        // 清空之前的结果
        this.str = '';

        try {
          // 发起 SSE 请求
          this.sse.send('/api/sse');
          this.$message.info('正在建立 SSE 连接...');
        } catch (error) {
          console.error('发起请求失败:', error);
          this.$message.error('发起请求失败');
        }
      },

      abortRequest() {
        if (this.sse) {
          this.sse.abort();
        }
      },

      clearResult() {
        this.str = '';
      },
    },

    beforeDestroy() {
      // 组件销毁时清理资源
      if (this.sse) {
        this.sse.abort();
        this.sse = null;
      }
    },
  };
</script>

<style>
  .xrequest-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background-color: #fafafa;
  }

  .description {
    text-align: center;
  }

  .description p {
    margin: 0;
    color: #606266;
    font-size: 14px;
  }

  .btn-list {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
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
  }

  .result-header h4 {
    margin: 0;
    font-size: 14px;
    color: #303133;
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
```

:::

### XRequest 基础用法(fetch)

:::demo

```html
<template>
  <div class="xrequest-container">
    <div class="description">
      <p>XRequest 工具类的fetch请求方式</p>
    </div>

    <div class="btn-list">
      <el-button
        type="primary"
        :disabled="loading"
        @click="startSSERequest"
      >
        {{ loading ? '请求中...' : '发起请求' }}
      </el-button>

      <el-button
        type="danger"
        :disabled="!loading"
        @click="abortRequest"
      >
        取消请求
      </el-button>

      <el-button
        type="info"
        @click="clearResult"
      >
        清空结果
      </el-button>
    </div>

    <div class="result-container">
      <div class="result-header">
        <h4>接收到的消息：</h4>
        <el-tag
          v-if="loading"
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
          v-if="!str"
          class="empty-state"
        >
          暂无消息
        </div>
        <pre
          v-else
          class="message-display"
        >
{{ str }}</pre
        >
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'XRequestDemo',
    data() {
      return {
        str: '',
        loading: false,
        sse: null,
      };
    },
    mounted() {
      // 初始化 XRequest 实例
      this.initXRequest();
    },
    methods: {
      initXRequest() {
        // 导入 XRequest 类
        const { XRequest } = require('vue-element-ui-x').customMixins;

        // 创建 XRequest 实例
        this.sse = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'fetch', // 使用 fetch 模式
          transformer: e => {
            const a = e.trim().split('\n');
            const r = a.pop();
            return r;
          },
          onMessage: msg => {
            // 假设消息格式为 { data: string }
            if (msg && msg.data) {
              this.str += `
              ${msg.data}`;
            } else {
              this.str += `
              ${JSON.stringify(msg)}`;
            }
          },

          onError: error => {
            console.error('错误:', error);
            this.$message.error('请求出现错误');
            this.loading = false;
          },
          onAbort: () => {
            console.log('请求已中止');
            // this.$message.info('请求已中止');
            this.loading = false;
          },
          onFinish: messages => {
            console.log('请求已完成，共接收消息:', messages?.length || 0);
            this.$message.success('请求已完成');
            this.loading = false;
          },
        });
      },

      startSSERequest() {
        if (this.loading) {
          return;
        }

        // 清空之前的结果
        this.str = '';

        try {
          // 发起 SSE 请求
          this.sse.send('/api/sse');
          this.$message.info('正在请求...');
          this.loading = true;
        } catch (error) {
          console.error('发起请求失败:', error);
          this.$message.error('发起请求失败');
        }
      },

      abortRequest() {
        if (this.sse) {
          this.sse.abort();
        }
      },

      clearResult() {
        this.str = '';
      },
    },

    beforeDestroy() {
      // 组件销毁时清理资源
      if (this.sse) {
        this.sse.abort();
        this.sse = null;
      }
    },
  };
</script>

<style>
  .xrequest-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background-color: #fafafa;
  }

  .description {
    text-align: center;
  }

  .description p {
    margin: 0;
    color: #606266;
    font-size: 14px;
  }

  .btn-list {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
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
  }

  .result-header h4 {
    margin: 0;
    font-size: 14px;
    color: #303133;
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
```

:::

### `sendMixin` 和 `XRequest`的混合使用

使用 `sendMixin` 对前端进行状态控制，使用 `XRequest` 对后端进行状态控制

:::demo

```html
<template>
  <div class="btn-list">
    <el-button
      v-if="!loading"
      style="background-color: #c2306a; border-color:#c2306a; color: white;"
      round
      plain
      icon="el-icon-position"
      size="large"
      @click="handleSend"
    ></el-button>

    <el-button
      v-if="loading"
      style="background-color: #c2306a; border-color:#c2306a; color: white;"
      round
      plain
      icon="el-icon-loading"
      size="large"
      @click="handleAbort"
    ></el-button>
  </div>
  <div class="result-content">
    <div
      v-if="!str"
      class="empty-state"
    >
      暂无消息
    </div>
    <pre
      v-else
      class="message-display"
    >
{{ str }}</pre
    >
  </div>
</template>
<script>
  let sendMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      sendMixin = window['vue-element-ui-x'].customMixins.sendMixin;
    } else if (typeof require !== 'undefined') {
      sendMixin = require('vue-element-ui-x').customMixins.sendMixin;
    }
  } catch (e) {
    sendMixin = {
      data() {
        return { loading: false };
      },
      methods: {
        initSend() {},
        handleSend() {},
        handleFinish() {},
        handleAbort() {},
      },
    };
  }
  export default {
    name: 'XRequestDemo',
    mixins: [sendMixin],
    data() {
      return {
        str: '',
        sse: null,
      };
    },
    mounted() {
      // 初始化 XRequest 实例
      this.initXRequest();
      this.initSend({
        sendHandler: this.startFn,
        finishHandler: this.finishBasicRequest,
        abortHandler: this.abortBasicRequest,
        onAbort: this.onBasicAbort,
      });
    },
    methods: {
      initXRequest() {
        // 导入 XRequest 类
        const { XRequest } = require('vue-element-ui-x').customMixins;

        // 创建 XRequest 实例
        this.sse = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'fetch', // 使用 fetch 模式
          transformer: e => {
            console.log('transformer:', e);
            const a = e.trim().split('\n');
            const r = a.pop();
            return r;
          },
          onMessage: msg => {
            console.log('收到消息:', msg);
            if (msg && msg.data) {
              this.str += `
              ${msg.data}`;
            } else {
              this.str += `
              ${JSON.stringify(msg)}`;
            }
          },

          onError: error => {
            console.error('错误:', error);
            this.$message.error('请求出现错误');
          },
          onAbort: () => {},
          onFinish: messages => {
            this.handleFinish();
            console.log('请求已完成，共接收消息:', messages?.length || 0);
          },
        });
      },
      finishBasicRequest() {
        console.log('基础请求处理完成');
      },
      abortBasicRequest() {
        if (this.sse) {
          this.sse.abort();
        }
        console.log('基础请求被中止', this.loading);
      },
      onBasicAbort() {
        console.log('基础请求中止回调');
      },
      startFn() {
        this.str = '';
        this.sse.send('/api/sse');
      },
    },

    beforeDestroy() {
      // 组件销毁时清理资源
      if (this.sse) {
        this.sse.abort();
        this.sse = null;
      }
    },
  };
</script>
```

:::

## 混入属性

| 参数             | 说明             | 类型    | 默认值 |
| ---------------- | ---------------- | ------- | ------ |
| loading          | 请求加载状态     | Boolean | false  |
| \_sendPromise    | 发送操作 Promise | Promise | null   |
| \_sendController | 发送控制器       | Object  | null   |

## 混入方法

| 方法名         | 说明               | 参数                                                           | 返回值   |
| -------------- | ------------------ | -------------------------------------------------------------- | -------- |
| initSend       | 初始化发送配置     | options: { onAbort, sendHandler, abortHandler, finishHandler } | -        |
| handleSend     | 执行发送操作       | ...args: 传递给 sendHandler 的参数                             | -        |
| handleAbort    | 中止发送操作       | -                                                              | -        |
| handleFinish   | 完成发送操作       | -                                                              | -        |
| createXRequest | 创建 XRequest 实例 | options: XRequest 配置选项                                     | XRequest |

## XRequest 类

### 构造函数选项

| 参数        | 说明                    | 类型     | 默认值 |
| ----------- | ----------------------- | -------- | ------ |
| baseURL     | 基础 URL                | String   | ''     |
| type        | 请求类型 (sse/fetch)    | String   | 'sse'  |
| transformer | 数据转换器              | Function | -      |
| baseOptions | 基础配置选项            | Object   | {}     |
| onAbort     | 中止回调                | Function | -      |
| onMessage   | 消息回调                | Function | -      |
| onError     | 错误回调                | Function | -      |
| onOpen      | 连接打开回调 (SSE 模式) | Function | -      |
| onFinish    | 完成回调                | Function | -      |

### XRequest 方法

| 方法名 | 说明     | 参数                         | 返回值   |
| ------ | -------- | ---------------------------- | -------- |
| send   | 发送请求 | url: 请求地址, options: 配置 | XRequest |
| abort  | 中止请求 | -                            | -        |

## 事件

混入本身不直接触发事件，但支持在 `initSend` 中配置回调函数：

| 回调函数      | 说明           | 回调参数          |
| ------------- | -------------- | ----------------- |
| onAbort       | 请求中止时触发 | -                 |
| sendHandler   | 发送处理器     | ...args: 发送参数 |
| abortHandler  | 中止处理器     | -                 |
| finishHandler | 完成处理器     | -                 |

## 工具函数版本

对于非组件场景，提供了工具函数版本：

```js
import { createSendUtils, XRequest } from 'vue-element-ui-x';

// 创建发送工具
const sendUtils = createSendUtils({
  sendHandler: (...args) => {
    console.log('开始发送:', args);
    // 执行发送逻辑
  },
  abortHandler: () => console.log('请求已中止'),
  finishHandler: () => console.log('请求完成'),
  onAbort: () => console.log('中止回调'),
});

// 使用工具发送请求
function sendRequest() {
  sendUtils.send('param1', 'param2');
}

// 中止请求
function abortRequest() {
  sendUtils.abort();
}

// 获取当前状态
function getStatus() {
  return {
    isLoading: sendUtils.state.loading,
  };
}

// 直接使用 XRequest 类
const xRequest = new XRequest({
  baseURL: 'https://api.example.com',
  type: 'fetch',
  transformer: data => JSON.parse(data),
  onMessage: message => console.log('消息:', message),
  onError: error => console.error('错误:', error),
  onFinish: messages => console.log('完成:', messages.length, '条消息'),
});

// 发送请求
xRequest.send('/api/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'hello' }),
});

// 中止请求
xRequest.abort();
```

## 注意事项

1. 该混入支持现代浏览器的 Fetch API 和 EventSource API，使用前请确保浏览器兼容性。
2. SSE 模式适用于服务器推送场景，Fetch 模式适用于流式读取响应数据。
3. 自定义 `transformer` 函数可以对接收的数据进行预处理。
4. 在组件销毁时会自动清理相关资源，避免内存泄漏。
5. 对于长时间运行的请求，建议实现适当的错误重试机制。
6. `baseOptions` 配置仅在 SSE 模式下生效，用于 EventSource 构造函数。
7. Fetch 模式下的 `options` 参数会传递给 fetch 函数，支持所有标准 fetch 选项。

## SSE 连接结束检测机制

XRequest 类在 SSE 模式下采用了多重检测机制来准确判断连接是否正常结束：

1. **结束消息检测**：支持检测 `[DONE]` 或 `data: [DONE]` 等结束标记
2. **超时检测**：当 10 秒内没有新消息时，如果连接状态非正在连接，则认为连接已结束
3. **状态检测**：结合 EventSource 的 readyState 和已接收消息数量进行综合判断
4. **防重复触发**：使用内部标志位避免同一连接多次触发结束事件

这样的设计可以有效避免正常结束的连接被误判为错误，确保 `onFinish` 和 `onError` 回调的正确触发。

### 服务器端配置建议

为了确保客户端能够正确检测到连接结束，建议服务器端：

1. **发送结束标记**：在数据流结束时发送 `data: [DONE]` 消息
2. **正确关闭连接**：使用适当的 HTTP 状态码关闭连接
3. **避免突然断开**：不要在没有通知的情况下突然关闭连接

### 自定义超时时间

如果需要调整超时检测时间，可以在创建 XRequest 实例时进行配置：

```js
const xRequest = new XRequest({
  // 其他配置...
  onMessage: msg => {
    // 处理消息
    console.log('收到消息:', msg);
  },
  onFinish: messages => {
    console.log('连接正常结束，共收到', messages.length, '条消息');
  },
  onError: error => {
    console.error('连接发生错误:', error);
  },
});

// 可以通过修改实例的超时时间来自定义检测间隔
// 注意：这需要在 send 之前设置
xRequest._finishTimeout = 5000; // 5秒超时
```
