# recordMixin

## Feature Description

Provides voice input functionality with the following features:

- Supports native browser speech recognition
- Provides complete lifecycle events
- Supports Chinese speech recognition
- Automatically handles recognition status
- Error handling mechanism
- Supports custom callback functions

## Import and Usage

```js
// Import recordMixin individually
import { recordMixin } from 'vue-element-ui-x';

export default {
  mixins: [recordMixin],
  // ...
};
```

:::tip Note
The import method in the following example is to resolve an error during the documentation site's packaging. Under normal circumstances, please import it in the standard way.
:::

## Usage Examples

### Basic Usage

An example of a basic speech recognition feature.

:::demo

```html
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button
          type="primary"
          :disabled="recordLoading"
          @click="start"
        >
          Start Recording
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          type="danger"
          :disabled="!recordLoading"
          @click="stop"
        >
          Stop Recording
        </el-button>
      </el-col>
    </el-row>

    <div
      class="result"
      v-if="recordValue"
    >
      Recognition Result: {{ recordValue }}
    </div>
  </div>
</template>
<script>
  // This is to avoid build errors
  let recordMixin = {};
  if (typeof window !== 'undefined') {
    recordMixin = require('vue-element-ui-x').recordMixin;
  }

  export default {
    name: 'BasicRecordDemo',
    mixins: [recordMixin],
    mounted() {
      this.initRecord({
        onStart: () => {
          console.log('Recording started');
        },
        onEnd: value => {
          console.log('Recording ended', value);
        },
        onError: error => {
          this.$message.error('Recording failed: ' + error.message);
        },
        onResult: result => {
          console.log('Real-time recognition result:', result);
        },
      });
    },
    methods: {
      start() {
        this.startRecord();
      },
      stop() {
        this.stopRecord();
      },
    },
  };
</script>

<style>
  .result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
</style>
```

:::

### Custom Control

Shows how to customize the start and end of speech recognition.

:::demo

```html
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button
          type="success"
          :disabled="recordLoading"
          @click="start"
        >
          Start Recording
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          type="danger"
          :disabled="!recordLoading"
          @click="stop"
        >
          Stop Recording
        </el-button>
      </el-col>
    </el-row>

    <el-card
      class="record-status"
      style="margin-top: 20px;"
    >
      <div slot="header">
        <span>Recognition Status</span>
      </div>
      <div
        v-if="recordLoading"
        class="recording"
      >
        <i
          class="el-icon-microphone"
          style="color: #F56C6C;"
        ></i>
        Recording...
      </div>
      <div
        v-if="recordValue"
        class="record-result"
      >
        <div class="label">Recognition Result:</div>
        <div class="content">{{ recordValue }}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
  let recordMixin = {};
  if (typeof window !== 'undefined') {
    recordMixin = require('vue-element-ui-x').recordMixin;
  }
  export default {
    name: 'CustomControlDemo',
    mixins: [recordMixin],
    mounted() {
      this.initRecord({
        onStart: () => {
          this.$message({
            type: 'success',
            message: 'Recording started',
          });
        },
        onEnd: value => {
          this.$message({
            type: 'info',
            message: 'Recording ended',
          });
        },
        onError: error => {
          this.$message.error(error.message);
        },
      });
    },
    methods: {
      start() {
        this.startRecord();
      },
      stop() {
        this.stopRecord();
      },
    },
  };
</script>

<style>
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
</style>
```

:::

### Error Handling

Shows how to handle errors during the speech recognition process.

:::demo

```html
<template>
  <div>
    <el-alert
      v-if="error"
      :title="error.message"
      type="error"
      show-icon
      :closable="false"
      style="margin-bottom: 20px;"
    />

    <el-button
      type="primary"
      :loading="recordLoading"
      @click="handleRecord"
    >
      {{ recordLoading ? 'Stop Recording' : 'Start Recording' }}
    </el-button>
  </div>
</template>
<script>
  let recordMixin = {};
  if (typeof window !== 'undefined') {
    recordMixin = require('vue-element-ui-x').recordMixin;
  }
  export default {
    name: 'ErrorHandlingDemo',
    mixins: [recordMixin],
    data() {
      return {
        error: null,
      };
    },
    methods: {
      handleRecord() {
        if (this.recordLoading) {
          this.stopRecord();
        } else {
          this.error = null;
          this.startRecord();
        }
      },
    },
    mounted() {
      this.initRecord({
        onError: error => {
          this.error = error;
          this.recordLoading = false;
        },
      });
    },
  };
</script>
```

:::

## Mixin Properties

| Parameter         | Description                  | Type    | Default Value                                                 |
| ----------------- | ---------------------------- | ------- | ------------------------------------------------------------- |
| recordLoading     | Speech recognition status    | Boolean | false                                                         |
| recordValue       | Recognized text result       | String  | ''                                                            |
| recordRecognition | Recognition instance         | Object  | null                                                          |
| recordOptions     | Configuration options object | Object  | { onError: null, onStart: null, onEnd: null, onResult: null } |

## Mixin Methods

| Method Name   | Description                           | Parameters                                     | Return Value |
| ------------- | ------------------------------------- | ---------------------------------------------- | ------------ |
| initRecord    | Initialize speech recognition config  | options: { onError, onStart, onEnd, onResult } | -            |
| startRecord   | Start speech recognition              | -                                              | -            |
| stopRecord    | Stop speech recognition               | -                                              | -            |
| cleanupRecord | Clean up speech recognition resources | -                                              | -            |

## Configuration Options

| Parameter | Description              | Type              | Default Value |
| --------- | ------------------------ | ----------------- | ------------- |
| onError   | Error callback function  | Function(error)   | null          |
| onStart   | Start callback function  | Function          | null          |
| onEnd     | End callback function    | Function(value)   | null          |
| onResult  | Result callback function | Function(results) | null          |

## Precautions

1.  This mixin depends on the browser's `webkitSpeechRecognition` API. Please ensure browser support before use.
2.  Currently, only Chinese speech recognition is supported (lang='zh-CN').
3.  Resources are automatically cleaned up when the component is destroyed.
4.  It is recommended to perform browser compatibility checks during development.
5.  This feature must be used in an HTTPS environment or a localhost development environment.
