# 快速上手

本节将介绍如何在项目中快速使用 Element-UI-X 组件。

## 基础用法

在成功 [安装](./installation.md) Element-UI-X 之后，你可以开始使用组件库中的组件。以下是一个简单的示例，展示如何使用打字机组件：

:::demo

```html
<template>
  <div class="demo-container">
    <h3>AI 回复示例</h3>

    <div class="chat-container">
      <div class="message user">
        <div class="avatar">用户</div>
        <div class="content">解释一下Vue的生命周期钩子函数</div>
      </div>

      <div class="message ai">
        <div class="avatar">AI</div>
        <div class="content">
          <el-x-typewriter
            :content="aiResponse"
            :typing="{ interval: 30, step: 1 }"
            @finish="onTypingComplete"
            ref="typewriter"
          />
        </div>
      </div>
    </div>

    <div class="actions">
      <el-button
        type="primary"
        @click="regenerateResponse"
      >
        重新生成
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aiResponse:
          'Vue的生命周期钩子函数是Vue实例在特定阶段自动执行的函数。主要包括：\n\n1. beforeCreate: 实例初始化之后，数据观测和事件配置之前调用\n2. created: 实例创建完成后调用，此时已完成数据观测、属性和方法的运算\n3. beforeMount: 挂载开始之前调用\n4. mounted: 挂载完成后调用，此时可以访问DOM元素\n5. beforeUpdate: 数据更新时调用，发生在虚拟DOM重新渲染之前\n6. updated: 数据更改导致的虚拟DOM重新渲染后调用\n7. beforeDestroy: 实例销毁之前调用\n8. destroyed: 实例销毁后调用',
      };
    },
    mounted() {
      // 页面加载后自动开始打字效果
      this.$nextTick(() => {
        this.$refs.typewriter.restart();
      });
    },
    methods: {
      onTypingComplete(instance) {
        console.log('打字效果完成:', instance);
      },
      regenerateResponse() {
        // 模拟重新生成回复
        this.$refs.typewriter.restart();
      },
    },
  };
</script>

<style>
  .demo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .chat-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 15px;
    background-color: #f8f8f8;
    margin-bottom: 20px;
  }

  .message {
    display: flex;
    margin-bottom: 15px;
  }

  .message .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .message .content {
    margin-left: 10px;
    padding: 10px;
    border-radius: 4px;
    max-width: 80%;
  }

  .message.user .avatar {
    background-color: #67c23a;
  }

  .message.user .content {
    background-color: #f0f9eb;
  }

  .message.ai .avatar {
    background-color: #409eff;
  }

  .message.ai .content {
    background-color: #ecf5ff;
    white-space: pre-wrap;
  }

  .actions {
    text-align: center;
  }
</style>
```

:::

## 使用多个组件

Element-UI-X 提供了多个组件，你可以组合使用它们来构建完整的 AI 交互界面。以下是一个简化的示例：

:::demo

```html
<template>
  <div class="ai-chat">
    <!-- 思考动画组件 -->
    <el-x-thinking
      v-if="isThinking"
      status="thinking"
      content="AI正在思考中..."
    />

    <!-- 打字机组件 -->
    <el-x-typewriter
      v-else-if="aiResponse"
      :content="aiResponse"
      :typing="{ interval: 40, step: 1 }"
      ref="typewriter"
    />
    <br />
    <!-- 发送框组件 -->
    <el-x-sender
      v-model="userInput"
      @submit="sendMessage"
      :disabled="isThinking"
      :loading="senderLoading"
      ref="sender"
      clearable
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInput: '',
        aiResponse: '',
        isThinking: false,
        senderLoading: false,
        timeoutId: null,
      };
    },
    methods: {
      sendMessage(message) {
        if (!message.trim()) return;

        const userMessage = message;
        this.senderLoading = true;

        // 模拟AI响应
        this.timeoutId = setTimeout(() => {
          this.isThinking = true;
          this.senderLoading = false;

          setTimeout(() => {
            this.isThinking = false;
            this.aiResponse = `你发送的消息是: "${userMessage}"。这是一个AI响应示例。`;

            this.$nextTick(() => {
              this.$refs.typewriter.restart();
            });
          }, 1500);
        }, 500);
      },
      handleCancel() {
        this.senderLoading = false;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
        this.$message.info('取消发送');
      },
    },
  };
</script>

<style>
  .ai-chat {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
</style>
```

:::

## 组件引用和方法调用

Element-UI-X 的组件支持通过 ref 引用来调用组件方法：

:::demo

```html
<template>
  <div>
    <el-x-typewriter
      ref="typewriter"
      :content="text"
      :typing="{ interval: 40, step: 1 }"
    />

    <div class="demo-controls">
      <el-button-group>
        <el-button @click="finishTyping">立即完成</el-button>
        <el-button @click="restart">重新开始</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: '这是一段示例文本',
      };
    },
    methods: {
      finishTyping() {
        this.$refs.typewriter.finishTyping();
      },
      restart() {
        this.$refs.typewriter.restart();
      },
    },
  };
</script>

<style>
  .demo-controls {
    margin-top: 15px;
  }
</style>
```

:::

## 下一步

现在你已经了解了 Element-UI-X 的基本用法，可以：

- 查看 [组件](../components/) 文档了解每个组件的详细用法
