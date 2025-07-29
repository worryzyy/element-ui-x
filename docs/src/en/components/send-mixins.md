# sendMixin & XRequest

## Feature Description

A mixin for send operations that provides unified request state management and interruption control, supporting the following features:

- Supports two request methods: SSE (Server-Sent Events) and Fetch
- Error handling mechanism
- Supports custom data transformers
- Integrates the XRequest class to provide powerful request handling capabilities

## Import and Usage

```js
import { sendMixin } from 'vue-element-ui-x';

export default {
  mixins: [sendMixin],
  // ...
};
```

:::tip Note
The import method in the following examples is to resolve an error during the documentation site's packaging. Under normal circumstances, please import it in the standard way.
:::

## Usage Examples

### Basic Usage of sendMixin

::: tip Basic Flow
User Action → handleSend/handleAbort/handleFinish → Update loading state → Call user callback
:::

:::demo

```html
<template>
  <div class="container">
    <div class="btn-list">
      <el-button
        :disabled="loading"
        type="primary"
        @click="customSend"
      >
        {{ loading ? 'Loading...' : 'Simulate Request' }}
      </el-button>
      <el-button
        :disabled="!loading"
        type="primary"
        @click="handleFinish"
      >
        Finish Request
      </el-button>
      <el-button
        :disabled="!loading"
        type="danger"
        @click="handleAbort"
      >
        Abort Request
      </el-button>
    </div>
    <div
      v-if="basicResult"
      class="result"
    >
      Result: {{ basicResult }}
    </div>
  </div>
</template>
<script>
  let sendMixin = {};
  if (typeof window !== 'undefined') {
    sendMixin = require('vue-element-ui-x').sendMixin;
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
      if (typeof window !== 'undefined') {
        // Initialize send configuration
        this.initSend({
          sendHandler: this.startFn,
          finishHandler: this.finishBasicRequest,
          abortHandler: this.abortBasicRequest,
          onAbort: this.onBasicAbort,
        });
      }
    },
    methods: {
      customSend() {
        if (typeof window !== 'undefined') {
          this.handleSend();
        }
      },
      handleFinish() {
        if (typeof window !== 'undefined') {
          this.handleFinish();
        }
      },
      handleAbort() {
        if (typeof window !== 'undefined') {
          this.handleAbort();
        }
      },
      async startFn() {
        // Perform an asynchronous operation here, such as making a request
        console.log('Starting simulated request');
        this.basicResult = '';
      },
      finishBasicRequest() {
        this.basicResult =
          'Request completed successfully! Time: ' + new Date().toLocaleTimeString();
        console.log('Basic request processing finished');
      },
      abortBasicRequest() {
        this.basicResult = 'Request was aborted';
        console.log('Basic request aborted', this.loading);
      },
      onBasicAbort() {
        console.log('Basic request abort callback');
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

With state control, we can easily customize the loading state of some buttons.

:::demo

```html
<template>
  <div class="custom-btn-container">
    <div class="btn-description">
      <p>
        Click any button to start the operation. The button will automatically switch to a loading
        state and end after a few seconds:
      </p>
    </div>

    <div class="btn-list">
      <!-- Voice button -->
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

      <!-- Send button -->
      <el-button
        v-if="!senderLoading"
        style="background-color: transparent; border-color: #c2306a; color: #c2306a;"
        round
        size="mini"
        @click="startSender"
      >
        <i class="el-icon-s-promotion"></i>
        <span style="margin-left: 5px;">Send</span>
      </el-button>

      <el-button
        v-if="senderLoading"
        style="background-color: transparent; border-color: #c2306a; color: #c2306a;"
        round
        size="mini"
        @click="stopSender"
      >
        <i class="el-icon-refresh el-icon-loading"></i>
        <span style="margin-left: 5px;">Sending</span>
      </el-button>

      <!-- Play button -->
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
        <span style="margin-left: 5px;">Play</span>
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
        <span style="margin-left: 5px;">Playing</span>
      </el-button>

      <!-- Record button -->
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
        Current Status: {{ type }} | Active Button:
        <span
          v-if="voiceLoading"
          class="status-active"
        >
          Recording Voice
        </span>
        <span
          v-if="senderLoading"
          class="status-active"
        >
          Sending Text
        </span>
        <span
          v-if="readLoading"
          class="status-active"
        >
          Playing Video
        </span>
        <span
          v-if="recordLoading"
          class="status-active"
        >
          Recording Video
        </span>
        <span
          v-if="!voiceLoading && !senderLoading && !readLoading && !recordLoading"
          class="status-idle"
        >
          Idle
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
        // Multiple independent loading states
        voiceLoading: false,
        senderLoading: false,
        readLoading: false,
        recordLoading: false,

        // Store timer references
        timers: {},
      };
    },
    methods: {
      // Voice button operations
      startVoice() {
        this.type = 'voice';
        this.voiceLoading = true;
        this.$message.success('Custom voice button, starting recording!');

        // Simulate auto-finish after 3 seconds
        this.timers.voice = setTimeout(() => {
          this.stopVoice();
        }, 3000);
      },
      stopVoice() {
        this.voiceLoading = false;
        this.$message.info('Custom voice button, finishing recording!');
        if (this.timers.voice) {
          clearTimeout(this.timers.voice);
          delete this.timers.voice;
        }
      },

      // Send button operations
      startSender() {
        this.type = 'sender';
        this.senderLoading = true;
        this.$message.success('Custom send button, starting to send text!');

        // Simulate auto-finish after 2 seconds
        this.timers.sender = setTimeout(() => {
          this.stopSender();
        }, 2000);
      },
      stopSender() {
        this.senderLoading = false;
        this.$message.info('Custom send button, finished sending!');
        if (this.timers.sender) {
          clearTimeout(this.timers.sender);
          delete this.timers.sender;
        }
      },

      // Play button operations
      startRead() {
        this.type = 'read';
        this.readLoading = true;
        this.$message.success('Custom play, starting to play!');

        // Simulate auto-finish after 4 seconds
        this.timers.read = setTimeout(() => {
          this.stopRead();
        }, 4000);
      },
      stopRead() {
        this.readLoading = false;
        this.$message.info('Custom play button, finished playing!');
        if (this.timers.read) {
          clearTimeout(this.timers.read);
          delete this.timers.read;
        }
      },

      // Record button operations
      startRecord() {
        this.type = 'record';
        this.recordLoading = true;
        this.$message.success('Custom record, starting to record!');

        // Simulate auto-finish after 5 seconds
        this.timers.record = setTimeout(() => {
          this.stopRecord();
        }, 5000);
      },
      stopRecord() {
        this.recordLoading = false;
        this.$message.info('Custom record button, finished recording!');
        if (this.timers.record) {
          clearTimeout(this.timers.record);
          delete this.timers.record;
        }
      },
    },

    beforeDestroy() {
      // Clear all timers
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

  /* Icon animation effect */
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

  /* Responsive Design */
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

The above examples control the `front-end loading state`. Of course, `request state` control is also essential. Next, let's introduce the basic usage of the utility class XRequest.

### XRequest Basic Usage (sse)

:::demo

```html
<template>
  <div class="xrequest-container">
    <div class="description">
      <p>The SSE request method supported by the XRequest utility class</p>
    </div>

    <div class="btn-list">
      <el-button
        type="primary"
        :disabled="loading"
        @click="startSSERequest"
      >
        {{ loading ? 'Requesting...' : 'Initiate SSE Request' }}
      </el-button>

      <el-button
        type="danger"
        :disabled="!loading"
        @click="abortRequest"
      >
        Cancel Request
      </el-button>

      <el-button
        type="info"
        @click="clearResult"
      >
        Clear Result
      </el-button>
    </div>

    <div class="result-container">
      <div class="result-header">
        <h4>Received Messages:</h4>
        <el-tag
          v-if="loading"
          type="success"
          size="mini"
        >
          Connected
        </el-tag>
        <el-tag
          v-else
          type="info"
          size="mini"
        >
          Disconnected
        </el-tag>
      </div>
      <div class="result-content">
        <div
          v-if="!str"
          class="empty-state"
        >
          No messages yet
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
      // Initialize XRequest instance
      this.initXRequest();
    },
    methods: {
      initXRequest() {
        // Import XRequest class
        const { XRequest } = require('vue-element-ui-x');

        // Create XRequest instance
        this.sse = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'sse', // Use SSE mode

          onMessage: msg => {
            console.log('Message received:', msg);
            // Assume message format is { data: string }
            if (msg && msg.data) {
              this.str += `
              ${msg.data}`;
            } else {
              this.str += `
              ${JSON.stringify(msg)}`;
            }
          },
          onOpen: () => {
            console.log('SSE connection opened');
            this.$message.success('SSE connection established');
            this.loading = true;
          },
          onError: error => {
            console.error('SSE error:', error);
            this.loading = false;
          },
          onAbort: () => {
            console.log('SSE connection aborted');
            this.loading = false;
          },
          onFinish: messages => {
            console.log('SSE connection finished, total messages received:', messages?.length || 0);
            this.$message.success('Connection finished');
            this.loading = false;
          },
        });
      },

      startSSERequest() {
        if (this.loading) {
          return;
        }

        // Clear previous results
        this.str = '';

        try {
          // Initiate SSE request
          this.sse.send('/api/sse');
          this.$message.info('Establishing SSE connection...');
        } catch (error) {
          console.error('Failed to initiate request:', error);
          this.$message.error('Failed to initiate request');
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
      // Clean up resources when the component is destroyed
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

  /* Responsive Design */
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

### XRequest Basic Usage (fetch)

:::demo

```html
<template>
  <div class="xrequest-container">
    <div class="description">
      <p>The fetch request method of the XRequest utility class</p>
    </div>

    <div class="btn-list">
      <el-button
        type="primary"
        :disabled="loading"
        @click="startSSERequest"
      >
        {{ loading ? 'Requesting...' : 'Initiate Request' }}
      </el-button>

      <el-button
        type="danger"
        :disabled="!loading"
        @click="abortRequest"
      >
        Cancel Request
      </el-button>

      <el-button
        type="info"
        @click="clearResult"
      >
        Clear Result
      </el-button>
    </div>

    <div class="result-container">
      <div class="result-header">
        <h4>Received Messages:</h4>
        <el-tag
          v-if="loading"
          type="success"
          size="mini"
        >
          Connected
        </el-tag>
        <el-tag
          v-else
          type="info"
          size="mini"
        >
          Disconnected
        </el-tag>
      </div>
      <div class="result-content">
        <div
          v-if="!str"
          class="empty-state"
        >
          No messages yet
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
      // Initialize XRequest instance
      this.initXRequest();
    },
    methods: {
      initXRequest() {
        // Import XRequest class
        const { XRequest } = require('vue-element-ui-x');

        // Create XRequest instance
        this.sse = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'fetch', // Use fetch mode
          onMessage: msg => {
            // Assume message format is { data: string }
            if (msg && msg.data) {
              this.str += `
              ${msg.data}`;
            } else {
              this.str += `
              ${JSON.stringify(msg)}`;
            }
          },

          onError: error => {
            console.error('Error:', error);
            this.$message.error('An error occurred during the request');
            this.loading = false;
          },
          onAbort: () => {
            console.log('Request aborted');
            // this.$message.info('Request aborted');
            this.loading = false;
          },
          onFinish: messages => {
            console.log('Request finished, total messages received:', messages?.length || 0);
            this.$message.success('Request finished');
            this.loading = false;
          },
        });
      },

      startSSERequest() {
        if (this.loading) {
          return;
        }

        // Clear previous results
        this.str = '';

        try {
          // Initiate fetch request
          this.sse.send('/api/sse');
          this.$message.info('Requesting...');
          this.loading = true;
        } catch (error) {
          console.error('Failed to initiate request:', error);
          this.$message.error('Failed to initiate request');
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
      // Clean up resources when the component is destroyed
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

  /* Responsive Design */
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

### Mixed Usage of `sendMixin` and `XRequest`

Use `sendMixin` for front-end state control and `XRequest` for back-end request control.

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
      @click="customSend"
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
      No messages yet
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
  if (typeof window !== 'undefined') {
    sendMixin = window['vue-element-ui-x'].sendMixin;
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
      // Initialize XRequest instance
      if (typeof window !== 'undefined') {
        this.initXRequest();
        this.initSend({
          sendHandler: this.startFn,
          finishHandler: this.finishBasicRequest,
          abortHandler: this.abortBasicRequest,
          onAbort: this.onBasicAbort,
        });
      }
    },
    methods: {
      customSend() {
        this.handleSend();
      },
      initXRequest() {
        // Import XRequest class
        const { XRequest } = require('vue-element-ui-x');

        // Create XRequest instance
        this.sse = new XRequest({
          baseURL: 'https://testsse.element-ui-x.com',
          type: 'fetch', // Use fetch mode

          onMessage: msg => {
            console.log('Message received:', msg);
            if (msg && msg.data) {
              this.str += `
                  ${msg.data}`;
            } else {
              this.str += `
                  ${JSON.stringify(msg)}`;
            }
          },

          onError: error => {
            console.error('Error:', error);
            this.$message.error('An error occurred during the request');
          },
          onAbort: () => {},
          onFinish: messages => {
            this.handleFinish();
            console.log('Request finished, total messages received:', messages?.length || 0);
          },
        });
      },
      finishBasicRequest() {
        console.log('Basic request processing finished');
      },
      abortBasicRequest() {
        if (this.sse) {
          this.sse.abort();
        }
        console.log('Basic request aborted', this.loading);
      },
      onBasicAbort() {
        console.log('Basic request abort callback');
      },
      startFn() {
        this.str = '';
        this.sse.send('/api/sse');
      },
    },

    beforeDestroy() {
      // Clean up resources when the component is destroyed
      if (this.sse) {
        this.sse.abort();
        this.sse = null;
      }
    },
  };
</script>
```

:::

## Mixin Properties

| Parameter        | Description            | Type    | Default |
| ---------------- | ---------------------- | ------- | ------- |
| loading          | Request loading state  | Boolean | false   |
| \_sendPromise    | Send operation Promise | Promise | null    |
| \_sendController | Send controller        | Object  | null    |

## Mixin Methods

| Method Name    | Description                   | Parameters                                                     | Return Value |
| -------------- | ----------------------------- | -------------------------------------------------------------- | ------------ |
| initSend       | Initialize send configuration | options: { onAbort, sendHandler, abortHandler, finishHandler } | -            |
| handleSend     | Execute send operation        | ...args: Arguments passed to sendHandler                       | -            |
| handleAbort    | Abort send operation          | -                                                              | -            |
| handleFinish   | Finish send operation         | -                                                              | -            |
| createXRequest | Create XRequest instance      | options: XRequest configuration options                        | XRequest     |

## XRequest Class

### Constructor Options

| Parameter   | Description                         | Type     | Default |
| ----------- | ----------------------------------- | -------- | ------- |
| baseURL     | Base URL                            | String   | ''      |
| type        | Request type (sse/fetch)            | String   | 'sse'   |
| transformer | Data transformer                    | Function | -       |
| baseOptions | Base configuration options          | Object   | {}      |
| onAbort     | Abort callback                      | Function | -       |
| onMessage   | Message callback                    | Function | -       |
| onError     | Error callback                      | Function | -       |
| onOpen      | Connection open callback (SSE mode) | Function | -       |
| onFinish    | Finish callback                     | Function | -       |

### XRequest Methods

| Method Name | Description   | Parameters                         | Return Value |
| ----------- | ------------- | ---------------------------------- | ------------ |
| send        | Send request  | url: Request URL, options: options | XRequest     |
| abort       | Abort request | -                                  | -            |

## Events

The mixin itself does not trigger events directly, but it supports configuring callback functions in `initSend`:

| Callback Function | Description                           | Callback Parameters      |
| ----------------- | ------------------------------------- | ------------------------ |
| onAbort           | Triggered when the request is aborted | -                        |
| sendHandler       | Send handler                          | ...args: send parameters |
| abortHandler      | Abort handler                         | -                        |
| finishHandler     | Finish handler                        | -                        |

## Precautions

1. This mixin supports modern browsers' Fetch API and EventSource API. Please ensure browser compatibility before use.
2. SSE mode is suitable for server-push scenarios, while Fetch mode is for streaming response data.
3. A custom `transformer` function can be used to preprocess received data.
4. The `baseOptions` configuration is only effective in SSE mode and is used for the EventSource constructor.
5. The `options` parameter in Fetch mode is passed to the fetch function and supports all standard fetch options.
