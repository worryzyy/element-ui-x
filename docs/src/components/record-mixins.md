# recordMixin

## 功能说明

提供语音输入功能，支持以下特性：

- 支持浏览器原生语音识别
- 提供完整的生命周期事件
- 支持中文语音识别
- 自动处理识别状态
- 错误处理机制
- 支持自定义回调函数

## 导入和使用

```js
// 单独导入 recordMixin
import { recordMixin } from 'vue-element-ui-x';

export default {
  mixins: [recordMixin],
  // ...
};
```

:::tip 说明
以下示例的导入方式是解决文档站打包时的报错，正常情况下请按正常的方式导入即可
:::

## 使用示例

### 基础用法

基本的语音识别功能使用示例。

:::demo

```html
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button
          type="primary"
          :disabled="recordLoading"
          @click="startRecord"
        >
          开始录音
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          type="danger"
          :disabled="!recordLoading"
          @click="stopRecord"
        >
          停止录音
        </el-button>
      </el-col>
    </el-row>

    <div
      class="result"
      v-if="recordValue"
    >
      识别结果: {{ recordValue }}
    </div>
  </div>
</template>
<script>
  // 此处是为避免构建时的报错
  let recordMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      recordMixin = window['vue-element-ui-x'].recordMixin;
    } else if (typeof require !== 'undefined') {
      recordMixin = require('vue-element-ui-x').recordMixin;
    }
  } catch (e) {
    recordMixin = {
      data() {
        return {
          recordLoading: false,
          recordValue: '',
          recordRecognition: null,
          recordOptions: {},
        };
      },
      methods: {
        initRecord() {},
        startRecord() {},
        stopRecord() {},
        cleanupRecord() {},
      },
    };
  }
  export default {
    name: 'BasicRecordDemo',
    mixins: [recordMixin],
    mounted() {
      this.initRecord({
        onStart: () => {
          console.log('开始录音');
        },
        onEnd: value => {
          console.log('录音结束', value);
        },
        onError: error => {
          this.$message.error('录音失败：' + error.message);
        },
        onResult: result => {
          console.log('实时识别结果：', result);
        },
      });
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

### 自定义控制

展示如何自定义控制语音识别的开始和结束。

:::demo

```html
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button
          type="success"
          :disabled="recordLoading"
          @click="startRecord"
        >
          开始录音
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          type="danger"
          :disabled="!recordLoading"
          @click="stopRecord"
        >
          停止录音
        </el-button>
      </el-col>
    </el-row>

    <el-card
      class="record-status"
      style="margin-top: 20px;"
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
          style="color: #F56C6C;"
        ></i>
        正在录音...
      </div>
      <div
        v-if="recordValue"
        class="record-result"
      >
        <div class="label">识别结果：</div>
        <div class="content">{{ recordValue }}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
  let recordMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      recordMixin = window['vue-element-ui-x'].recordMixin;
    } else if (typeof require !== 'undefined') {
      recordMixin = require('vue-element-ui-x').recordMixin;
    }
  } catch (e) {
    recordMixin = {
      data() {
        return {
          recordLoading: false,
          recordValue: '',
          recordRecognition: null,
          recordOptions: {},
        };
      },
      methods: {
        initRecord() {},
        startRecord() {},
        stopRecord() {},
        cleanupRecord() {},
      },
    };
  }
  export default {
    name: 'CustomControlDemo',
    mixins: [recordMixin],
    mounted() {
      this.initRecord({
        onStart: () => {
          this.$message({
            type: 'success',
            message: '开始录音',
          });
        },
        onEnd: value => {
          this.$message({
            type: 'info',
            message: '录音结束',
          });
        },
        onError: error => {
          this.$message.error(error.message);
        },
      });
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

### 错误处理

展示如何处理语音识别过程中的错误。

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
      {{ recordLoading ? '停止录音' : '开始录音' }}
    </el-button>
  </div>
</template>
<script>
  let recordMixin = {};
  try {
    if (typeof window !== 'undefined' && window['vue-element-ui-x']) {
      recordMixin = window['vue-element-ui-x'].recordMixin;
    } else if (typeof require !== 'undefined') {
      recordMixin = require('vue-element-ui-x').recordMixin;
    }
  } catch (e) {
    recordMixin = {
      data() {
        return {
          recordLoading: false,
          recordValue: '',
          recordRecognition: null,
          recordOptions: {},
        };
      },
      methods: {
        initRecord() {},
        startRecord() {},
        stopRecord() {},
        cleanupRecord() {},
      },
    };
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

## 混入属性

| 参数              | 说明         | 类型    | 默认值                                                        |
| ----------------- | ------------ | ------- | ------------------------------------------------------------- |
| recordLoading     | 语音识别状态 | Boolean | false                                                         |
| recordValue       | 识别结果文本 | String  | ''                                                            |
| recordRecognition | 识别实例     | Object  | null                                                          |
| recordOptions     | 配置选项对象 | Object  | { onError: null, onStart: null, onEnd: null, onResult: null } |

## 混入方法

| 方法名        | 说明               | 参数                                           | 返回值 |
| ------------- | ------------------ | ---------------------------------------------- | ------ |
| initRecord    | 初始化语音识别配置 | options: { onError, onStart, onEnd, onResult } | -      |
| startRecord   | 开始语音识别       | -                                              | -      |
| stopRecord    | 停止语音识别       | -                                              | -      |
| cleanupRecord | 清理语音识别资源   | -                                              | -      |

## 配置选项

| 参数     | 说明         | 类型              | 默认值 |
| -------- | ------------ | ----------------- | ------ |
| onError  | 错误回调函数 | Function(error)   | null   |
| onStart  | 开始回调函数 | Function          | null   |
| onEnd    | 结束回调函数 | Function(value)   | null   |
| onResult | 结果回调函数 | Function(results) | null   |

## 注意事项

1. 该混入依赖浏览器的 `webkitSpeechRecognition` API，使用前请确保浏览器支持。
2. 目前仅支持中文语音识别（lang='zh-CN'）。
3. 在组件销毁时会自动清理相关资源。
4. 建议在开发时做好浏览器兼容性检查。
5. 需要在 HTTPS 环境下使用，或者 localhost 本地开发环境。
