# streamMixin

## Feature Description

Provides SSE (Server-Sent Events) data parsing and interruption capabilities, supporting the following features:

- Supports parsing and processing of SSE data streams
- Supports interruption control for streaming requests
- Automatically handles stream data status
- Error handling mechanism
- Supports custom transform streams

## Import and Usage

```js
import { streamMixin } from 'vue-element-ui-x';

export default {
  mixins: [streamMixin],
  // ...
};
```

:::tip Note

The import method in the following example is to resolve an error during the documentation site's packaging. Under normal circumstances, please import it in the standard way.

:::

## Usage Examples

### SSE Stream Data Example

Demonstrates how to handle SSE stream data and display Markdown content in the Bubble component.

:::demo

```html
<template>
  <div class="container">
    <div class="btn-list">
      <el-button
        :disabled="streamLoading"
        @click="startSSE"
      >
        {{ streamLoading ? 'Loading...' : 'Get SSE Stream Data' }}
      </el-button>

      <el-button
        type="danger"
        :disabled="!streamLoading"
        @click="stopStream"
      >
        Cancel Request
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
  if (typeof window !== 'undefined') {
    streamMixin = require('vue-element-ui-x').streamMixin;
  }

  export default {
    name: 'SSEStreamDemo',
    mixins: [streamMixin],
    data() {
      return {
        content: '',
      };
    },
    methods: {
      stopStream() {
        if (typeof window !== 'undefined') {
          this.cancelStream();
        }
      },
      async startSSE() {
        if (typeof window === 'undefined') return;
        try {
          const response = await fetch('https://testsse.element-ui-x.com/api/sse', {
            headers: { 'Content-Type': 'text/event-stream' },
          });
          const readableStream = response.body;
          await this.startStream({ readableStream });
        } catch (err) {
          console.error('Fetch error:', err);
        }
      },
    },
    watch: {
      // Watch for changes in stream data and update content
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
              // This end identifier is provided by the backend, hence the check here
              // In actual projects, this should be based on project requirements
              if (chunk === ' [DONE]') {
                // Handle the case where data reception is complete
                // console.log('Data reception complete');
              } else {
                console.error('Error parsing data:', error);
              }
            }
          }
          console.log('Text:', text);
          this.content = text;
        },
        deep: true,
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

### SIP Protocol Data Handling Example

Demonstrates how to handle SIP protocol stream data and use a custom transform stream.

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
        {{ streamLoading ? 'Loading...' : 'Get SIP Protocol Data' }}
      </el-button>

      <el-button
        :disabled="!streamLoading"
        @click="stopStream"
        type="danger"
      >
        Cancel Request
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
  if (typeof window !== 'undefined') {
    streamMixin = require('vue-element-ui-x').streamMixin;
  }
  export default {
    name: 'SIPStreamDemo',
    mixins: [streamMixin],
    data() {
      return {
        content: '',
      };
    },
    methods: {
      stopStream() {
        if (typeof window !== 'undefined') {
          this.cancelStream();
        }
      },
      async startSIPStream() {
        if (typeof window === 'undefined') return;
        try {
          const response = await fetch('https://testsse.element-ui-x.com/api/sip', {
            headers: { 'Content-Type': 'application/sip' },
          });
          const readableStream = response.body;

          // Custom transformStream to handle SIP data
          const sipTransformStream = new TransformStream({
            transform(chunk, controller) {
              // SIP data parsing logic can be added here
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
    watch: {
      // Watch for changes in stream data and update content
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
              console.error('Error parsing data:', error);
            }
          }
          console.log('Text:', text);
          this.content = text;
        },
        deep: true,
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

## Mixin Properties

| Parameter     | Description              | Type    | Default |
| ------------- | ------------------------ | ------- | ------- |
| streamData    | Stream data array        | Array   | []      |
| streamError   | Stream error info        | Error   | null    |
| streamLoading | Stream processing status | Boolean | false   |

## Mixin Methods

| Method Name           | Description                                   | Parameters                                   | Return Value |
| --------------------- | --------------------------------------------- | -------------------------------------------- | ------------ |
| startStream           | Starts a streaming request                    | options: { readableStream, transformStream } | Promise      |
| cancelStream          | Cancels the streaming request                 | -                                            | -            |
| resetStream           | Resets the stream state                       | -                                            | -            |
| createStreamProcessor | A utility method to create a stream processor | readableStream, transformStream              | Object       |

## Events

| Event Name      | Description                       | Callback Parameter         |
| --------------- | --------------------------------- | -------------------------- |
| stream-data     | Fired when new data is received   | item: The stream data item |
| stream-complete | Fired when the stream is complete | data: All stream data      |
| stream-error    | Fired when a stream error occurs  | error: The error object    |
| stream-finish   | Fired when stream processing ends | -                          |
| stream-cancel   | Fired when the stream is canceled | -                          |

## Precautions

1. This mixin depends on the modern browser's Streams API. Please ensure your browser supports it before use.
2. Errors that occur during stream processing are provided through the `streamError` property and the `stream-error` event.
3. Relevant resources are automatically cleaned up when the component is destroyed.
4. Custom transform streams need to implement `transform` and optional `flush` methods.
5. For processing large amounts of data streams, it is recommended to implement throttling or batching to improve performance.
