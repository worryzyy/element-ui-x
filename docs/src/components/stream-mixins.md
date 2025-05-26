# streamMixin

## 功能说明

提供 SSE (Server-Sent Events) 数据解析和中断功能，支持以下特性：

- 支持 SSE 数据流解析和处理
- 提供完整的生命周期事件
- 支持流式请求的中断控制
- 自动处理流数据状态
- 错误处理机制
- 支持自定义转换流
- 支持非组件场景的工具函数版本

## 导入和使用

有以下几种方式可以导入和使用 streamMixin：

### 方式一：通过 ES 模块导入(推荐)

```js
// 单独导入 streamMixin
import { customMixins } from 'vue-element-ui-x';

export default {
  mixins: [customMixins.streamMixin],
  // ...
};
```

### 方式二：通过 CommonJS 导入

```js
// 单独导入 streamMixin
const { streamMixin } = require('vue-element-ui-x').customMixins;

export default {
  mixins: [streamMixin],
  // ...
};
```

### 方式三：通过全局变量使用（浏览器环境）

如果您已经通过 CDN 或 script 标签引入了完整的组件库，可以这样使用：

```js
export default {
  mixins: [window['vue-element-ui-x'].customMixins.streamMixin],
  // ...
};
```

## 使用示例

### SSE 流式数据示例

展示如何处理 SSE 流式数据，并在 Bubble 组件中展示 Markdown 内容。

:::demo

```html
<template>
  <div class="container">
    <div class="btn-list">
      <el-button
        :disabled="streamLoading"
        @click="startSSE"
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
      is-markdown
    ></el-x-bubble>
  </div>
</template>
<script>
  let streamMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      streamMixin = window['vue-element-ui-x'].customMixins.streamMixin;
    } else if (typeof require !== 'undefined') {
      streamMixin = require('vue-element-ui-x').customMixins.streamMixin;
    }
  } catch (e) {
    streamMixin = {
      data() {
        return { streamData: [], streamError: null, streamLoading: false };
      },
      methods: {
        startStream() {},
        cancelStream() {},
        resetStream() {},
        createStreamProcessor() {},
      },
    };
  }
  export default {
    name: 'SSEStreamDemo',
    mixins: [streamMixin],
    data() {
      return {
        content: '',
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
          console.log('Text:', text);
          this.content = text;
        },
        deep: true,
      },
    },
    methods: {
      async startSSE() {
        try {
          const response = await fetch('https://node-test.element-plus-x.com/api/sse', {
            headers: { 'Content-Type': 'text/event-stream' },
          });
          const readableStream = response.body;
          await this.startStream({ readableStream });
        } catch (err) {
          console.error('Fetch error:', err);
        }
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
  .container .el-button {
    width: fit-content;
  }
  .container .markdown-body {
    background-color: transparent;
    padding: 12px;
  }
  .error {
    color: #f56c6c;
    margin-top: 8px;
  }
</style>
```

:::

### SIP 协议数据处理示例

展示如何处理 SIP 协议的流式数据，并使用自定义转换流。

:::demo

```html
<template>
  <div class="sip-container">
    <div class="btn-list">
      <el-button
        :disabled="streamLoading"
        @click="startSIPStream"
        type="primary"
      >
        {{ streamLoading ? '加载中...' : '获取 SIP 协议数据' }}
      </el-button>

      <el-button
        :disabled="!streamLoading"
        @click="cancelStream"
        type="danger"
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
      is-markdown
    ></el-x-bubble>
  </div>
</template>
<script>
  let streamMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      streamMixin = window['vue-element-ui-x'].customMixins.streamMixin;
    } else if (typeof require !== 'undefined') {
      streamMixin = require('vue-element-ui-x').customMixins.streamMixin;
    }
  } catch (e) {
    streamMixin = {
      data() {
        return { streamData: [], streamError: null, streamLoading: false };
      },
      methods: {
        startStream() {},
        cancelStream() {},
        resetStream() {},
        createStreamProcessor() {},
      },
    };
  }
  export default {
    name: 'SIPStreamDemo',
    mixins: [streamMixin],
    data() {
      return {
        content: '',
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
            const chunk = newData[index];
            try {
              console.log('chunk', chunk);
              text += chunk;
            } catch (error) {
              console.error('解析数据时出错:', error);
            }
          }
          console.log('Text:', text);
          this.content = text;
        },
        deep: true,
      },
    },
    methods: {
      async startSIPStream() {
        try {
          const response = await fetch('https://node-test.element-plus-x.com/api/sip', {
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

          await this.startStream({
            readableStream,
            transformStream: sipTransformStream,
          });
        } catch (err) {
          console.error('Fetch error:', err);
        }
      },
    },
  };
</script>

<style>
  .sip-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sip-container .el-button {
    width: fit-content;
  }
  .sip-container .markdown-body {
    background-color: transparent;
    padding: 12px;
  }
</style>
```

:::

## 混入属性

| 参数          | 说明       | 类型    | 默认值 |
| ------------- | ---------- | ------- | ------ |
| streamData    | 流数据数组 | Array   | []     |
| streamError   | 流错误信息 | Error   | null   |
| streamLoading | 流处理状态 | Boolean | false  |

## 混入方法

| 方法名                | 说明                   | 参数                                         | 返回值  |
| --------------------- | ---------------------- | -------------------------------------------- | ------- |
| startStream           | 启动流式请求           | options: { readableStream, transformStream } | Promise |
| cancelStream          | 中断流式请求           | -                                            | -       |
| resetStream           | 重置流状态             | -                                            | -       |
| createStreamProcessor | 创建流处理器的便捷方法 | readableStream, transformStream              | Object  |

## 事件

| 事件名          | 说明             | 回调参数         |
| --------------- | ---------------- | ---------------- |
| stream-data     | 收到新数据时触发 | item: 流数据项   |
| stream-complete | 流完成时触发     | data: 所有流数据 |
| stream-error    | 流错误时触发     | error: 错误对象  |
| stream-finish   | 流处理结束时触发 | -                |
| stream-cancel   | 流被中断时触发   | -                |

## 工具函数版本

对于非组件场景，提供了工具函数版本：

```js
import { createStreamUtils } from 'vue-element-ui-x';

// 创建流处理工具
const streamUtils = createStreamUtils({
  onData: item => console.log('数据:', item),
  onComplete: allData => console.log('完成:', allData.length, '条数据'),
  onError: error => console.error('错误:', error),
  onCancel: () => console.log('已取消'),
  onFinish: () => console.log('处理结束'),
});

// 使用工具处理流数据
async function processStreamData() {
  const response = await fetch('/api/stream');
  await streamUtils.startStream({ readableStream: response.body });
}

// 取消处理
function cancelProcessing() {
  streamUtils.cancel();
}

// 获取当前状态
function getStatus() {
  return {
    isLoading: streamUtils.state.loading,
    hasError: !!streamUtils.state.error,
    dataCount: streamUtils.state.data.length,
  };
}
```

## 注意事项

1. 该混入依赖现代浏览器的 Streams API，使用前请确保浏览器支持。
2. 流处理过程中产生的错误会通过 `streamError` 属性和 `stream-error` 事件提供。
3. 在组件销毁时会自动清理相关资源。
4. 自定义转换流需要实现 `transform` 和可选的 `flush` 方法。
5. 对于大量数据的流处理，建议实现节流或批处理以提高性能。
