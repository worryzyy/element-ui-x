# 组件使用指南

Element-X 提供了一系列专为 AI 交互设计的 Vue 组件，让你能够轻松构建类似 ChatGPT 这样的现代化 AI 对话界面。

本指南将介绍如何使用这些组件。

## 安装组件库

首先确保你已经安装了 Element-X：

```bash
# npm
npm install @element-x/core

# 或者使用 yarn
yarn add @element-x/core
```

然后在你的入口文件中引入组件库：

```js
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ElementX from "@element-x/core";

Vue.use(ElementUI);
Vue.use(ElementX);
```

## Typewriter 打字机组件

打字机组件是最常用的 AI 交互组件之一，可以模拟 AI 回复内容的逐字显示效果，提升用户体验。

### 基础用法

```html
<template>
  <div>
    <el-x-typewriter
      :text="aiResponse"
      :type-speed="30"
      @typing-complete="onTypingComplete"
      ref="typewriter"
    />
    <el-button @click="regenerateResponse">重新生成</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aiResponse:
          "这是一段 AI 生成的回复内容，使用打字机效果逐字显示，提升用户体验。",
      };
    },
    mounted() {
      // 页面加载后自动开始打字效果
      this.$nextTick(() => {
        this.$refs.typewriter.startTyping();
      });
    },
    methods: {
      onTypingComplete(text) {
        console.log("打字效果完成:", text);
        // 可以在此处执行后续操作
      },
      regenerateResponse() {
        // 模拟重新生成回复
        this.$refs.typewriter.eraseAll();
        setTimeout(() => {
          this.aiResponse =
            "这是一段新生成的 AI 回复内容，展示了打字机组件的重新开始功能。";
          this.$refs.typewriter.startTyping();
        }, 300);
      },
    },
  };
</script>
```

### 高级设置

打字机组件支持多种配置，以满足不同场景的需求：

```html
<el-x-typewriter :text="text" :type-speed="50" <!-- 打字速度，数值越大越慢 -->
  :start-delay="1000"
  <!-- 开始前延迟1秒 -->
  :show-cursor="true"
  <!-- 显示光标 -->
  :has-blur="true"
  <!-- 启用模糊效果 -->
  :auto-start="false"
  <!-- 禁用自动开始 -->
  @typing-start="onStart" @typing-progress="onProgress"
  @typing-complete="onComplete" @typing-erased="onErased" ref="typewriter"
  /></el-x-typewriter
>
```

### 与 AI 聊天界面集成

打字机组件通常与聊天气泡组件一起使用，构建完整的 AI 对话界面：

```html
<div class="message-container">
  <!-- 用户消息 -->
  <div class="message user">
    <div class="avatar">用户</div>
    <div class="content">请解释一下 Vue 的生命周期</div>
  </div>

  <!-- AI回复 -->
  <div class="message ai">
    <div class="avatar">AI</div>
    <div class="content">
      <el-x-typewriter :text="aiResponse" :type-speed="20" ref="aiWriter" />
    </div>
  </div>
</div>
```

### 在组合场景中使用

打字机组件可以与其他组件组合使用，例如与思考动画组件配合：

```html
<div class="ai-response">
  <el-x-thinking v-if="isThinking" />
  <el-x-typewriter v-else :text="response" :type-speed="30" ref="typewriter" />
</div>
```

## 其他 AI 组件

Element-X 还提供了其他 AI 交互组件，如：

- **Bubble** - 聊天气泡组件
- **BubbleList** - 消息列表组件
- **Thinking** - AI 思考状态动画
- **ThoughtChain** - 思维链组件
- **Sender** - 消息发送组件

这些组件将在后续文档中详细介绍。

## 示例项目

你可以在 [examples](../examples/typewriter/basic.vue) 目录中查看更多完整的示例，包括打字机组件的完整示例。
