# Sender 消息发送组件

## 功能说明

消息发送组件，用于用户输入和发送消息，支持以下特性：

- 自适应高度的文本输入区域
- 支持两种布局变体（默认和上下布局）
- 内置语音识别功能（使用浏览器 Web Speech API）
- 可自定义的头部和底部内容
- 触发字符弹出框功能
- 多种提交方式（Enter/Shift+Enter）
- 内置操作按钮（发送、取消、清除、语音）
- 禁用和只读状态支持

## 使用示例

### 基础用法

基本消息发送组件使用，包含默认布局和基本功能。

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="请输入消息..."
      @submit="handleSubmit"
    />
    <br />
    <el-x-sender placeholder="💌 欢迎使用 Element-X ~" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
        this.message = "";
      },
    },
  };
</script>
```

### 不同布局变体

通过 `variant` 属性配置不同布局样式。

:::demo

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-x-sender
        v-model="message1"
        placeholder="默认布局"
        variant="default"
        @submit="handleSubmit"
      />
    </div>

    <el-x-sender
      v-model="message2"
      placeholder="上下布局"
      variant="updown"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message1: "",
        message2: "",
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
      },
    },
  };
</script>
```

:::

### 语音识别功能

内置语音识别功能，通过 `allowSpeech` 属性开启即可。调用浏览器原生的语音识别 API，在谷歌浏览器中使用，需要在魔法环境中才能正常使用。

::: tip 注意
如果你不想使用内置的语音识别功能，可以通过 `@recording-change` 事件来监听录音状态，自行实现语音识别功能。

你也可以通过组件 ref 实例对象进行调用：

- `senderRef.value.startRecognition()` 触发开始录音
- `senderRef.value.stopRecognition()` 触发结束录音

:::

:::demo

```html
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <span>内置语音识别：</span>
    <el-x-sender
      v-model="message"
      allow-speech
      @submit="handleSubmit"
      @recording-change="handleRecordingChange"
    />

    <span>自定义语音识别：</span>
    <div style="display: flex;">
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="$refs.senderRef.startRecognition()"
      >
        使用组件实例 开始录音
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="$refs.senderRef.stopRecognition()"
      >
        使用组件实例 结束录音
      </el-button>
    </div>
    <el-x-sender
      ref="senderRef"
      v-model="message"
      allow-speech
      @recording-change="handleRecordingChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
        this.message = "";
      },
      handleRecordingChange(isRecording) {
        this.$message[isRecording ? "info" : "success"](
          isRecording ? "语音识别已开始" : "语音识别已结束"
        );
      },
    },
  };
</script>
```

:::

### 触发字符弹出框

通过 `triggerStrings` 配置触发字符，当输入这些字符时显示弹出框。

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="输入 @ 或 # 触发弹出框"
      :trigger-strings="['@', '#']"
      triggerPopoverLeft="100px"
      triggerPopoverPlacement="top"
      :trigger-popover-visible.sync="showTriggerPopover"
      @submit="handleSubmit"
      @trigger="handleTrigger"
    >
      <template #trigger-popover="{ triggerString }">
        <div style="padding: 10px;">
          <p>当前触发字符: {{ triggerString }}</p>
          <el-button type="text" @click="insertText('用户名')">
            插入用户名
          </el-button>
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
        showTriggerPopover: false,
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
        this.message = "";
      },
      handleTrigger({ triggerString, isOpen }) {
        this.$message.info(
          `${triggerString} 字符${isOpen ? "触发" : "关闭"}弹出框`
        );
      },
      insertText(text) {
        this.message += text;
        this.showTriggerPopover = false;
      },
    },
  };
</script>
```

:::

### 自定义操作按钮

通过 `action-list` 插槽自定义操作按钮。

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="自定义操作按钮..."
      @submit="handleSubmit"
    >
      <template #action-list>
        <div class="custom-actions">
          <el-button type="text" icon="el-icon-picture" @click="handleAttach" />
          <el-button
            type="text"
            icon="el-icon-video-camera"
            @click="handleVideo"
          />
          <el-button type="primary" :disabled="!message" @click="submit">
            发送
          </el-button>
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
        this.message = "";
      },
      handleAttach() {
        this.$message.info("点击了附件按钮");
      },
      handleVideo() {
        this.$message.info("点击了视频按钮");
      },
    },
  };
</script>

<style>
  .custom-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
```

:::

### 自定义头部和底部

通过 `header` 和 `footer` 插槽自定义头部和底部内容。

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="带自定义头部和底部的输入框..."
      @submit="handleSubmit"
    >
      <template #header>
        <div class="custom-header">
          <span>消息发送</span>
          <el-tag size="mini">工作区</el-tag>
        </div>
      </template>

      <template #footer>
        <div class="custom-footer">
          <span>字符数: {{ message.length }}</span>
          <el-button type="text" size="mini">添加表情</el-button>
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
        this.message = "";
      },
    },
  };
</script>

<style>
  .custom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
  }

  .custom-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: 12px;
    color: #909399;
    border-top: 1px solid #ebeef5;
  }
</style>
```

:::

## 属性

| 参数                    | 说明                                   | 类型                | 默认值                     |
| ----------------------- | -------------------------------------- | ------------------- | -------------------------- |
| value / v-model         | 绑定值                                 | String              | ''                         |
| placeholder             | 输入框占位文本                         | String              | '请输入内容'               |
| autoSize                | 输入框自适应配置                       | Object              | { minRows: 1, maxRows: 6 } |
| readOnly                | 是否只读                               | Boolean             | false                      |
| disabled                | 是否禁用                               | Boolean             | false                      |
| loading                 | 是否显示加载状态                       | Boolean             | false                      |
| clearable               | 是否显示清除按钮                       | Boolean             | false                      |
| allowSpeech             | 是否启用语音输入                       | Boolean             | false                      |
| submitType              | 提交方式，可选 'enter' 或 'shiftEnter' | String              | 'enter'                    |
| headerAnimationTimer    | 头部动画持续时间(ms)                   | Number              | 300                        |
| inputWidth              | 输入框宽度                             | String              | '100%'                     |
| variant                 | 布局变体，可选 'default' 或 'updown'   | String              | 'default'                  |
| showUpdown              | 在 updown 变体下是否显示操作栏         | Boolean             | true                       |
| submitBtnDisabled       | 手动控制提交按钮禁用状态               | Boolean             | -                          |
| inputStyle              | 输入框样式透传                         | Object/String/Array | {}                         |
| triggerStrings          | 触发弹出框的字符数组                   | Array               | []                         |
| triggerPopoverVisible   | 弹出框显示状态                         | Boolean             | false                      |
| triggerPopoverWidth     | 弹出框宽度                             | String              | 'fit-content'              |
| triggerPopoverLeft      | 弹出框左侧偏移                         | String              | '0px'                      |
| triggerPopoverOffset    | 弹出框偏移量                           | Number              | 8                          |
| triggerPopoverPlacement | 弹出框位置                             | String              | 'top-start'                |

## 方法

| 方法名           | 说明           | 参数                      | 返回值 |
| ---------------- | -------------- | ------------------------- | ------ |
| blur             | 移除焦点       | -                         | -      |
| focus            | 获取焦点       | type: 'all'/'start'/'end' | -      |
| focusToStart     | 聚焦到文本开头 | -                         | -      |
| focusToEnd       | 聚焦到文本末尾 | -                         | -      |
| startRecognition | 开始语音识别   | -                         | -      |
| stopRecognition  | 停止语音识别   | -                         | -      |
| submit           | 触发提交       | -                         | -      |
| cancel           | 触发取消       | -                         | -      |
| clear            | 清除内容       | -                         | -      |

## 事件

| 事件名                       | 说明                               | 回调参数                                                                                                |
| ---------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| input                        | 输入值变化时触发                   | (value: string)                                                                                         |
| submit                       | 点击提交按钮或按下提交快捷键时触发 | (value: string)                                                                                         |
| cancel                       | 点击取消按钮时触发                 | (value: string)                                                                                         |
| recordingChange              | 语音识别状态变化时触发             | (isRecording: boolean)                                                                                  |
| trigger                      | 触发字符状态变化时触发             | { oldValue: string, newValue: string, triggerString: string, isOpen: boolean, cursorPosition?: number } |
| update:triggerPopoverVisible | 弹出框显示状态变化时触发           | (visible: boolean)                                                                                      |

## 插槽

| 插槽名          | 说明               | 作用域参数                                   |
| --------------- | ------------------ | -------------------------------------------- |
| header          | 自定义头部内容     | -                                            |
| footer          | 自定义底部内容     | -                                            |
| prefix          | 输入框前缀内容     | -                                            |
| action-list     | 自定义操作按钮列表 | -                                            |
| trigger-popover | 触发字符弹出框内容 | { triggerString: string, readonly: boolean } |
