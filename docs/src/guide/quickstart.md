# 快速上手

本节将介绍如何在项目中快速使用 Element-X 组件。

## 基础用法

在成功 [安装](./installation.md) Element-X 之后，你可以开始使用组件库中的组件。以下是一个简单的示例，展示如何使用打字机组件：

```vue
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
            :text="aiResponse"
            :type-speed="30"
            @typing-complete="onTypingComplete"
            ref="typewriter"
          />
        </div>
      </div>
    </div>

    <div class="actions">
      <el-button type="primary" @click="regenerateResponse">重新生成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aiResponse:
        "Vue的生命周期钩子函数是Vue实例在特定阶段自动执行的函数。主要包括：\n\n1. beforeCreate: 实例初始化之后，数据观测和事件配置之前调用\n2. created: 实例创建完成后调用，此时已完成数据观测、属性和方法的运算\n3. beforeMount: 挂载开始之前调用\n4. mounted: 挂载完成后调用，此时可以访问DOM元素\n5. beforeUpdate: 数据更新时调用，发生在虚拟DOM重新渲染之前\n6. updated: 数据更改导致的虚拟DOM重新渲染后调用\n7. beforeDestroy: 实例销毁之前调用\n8. destroyed: 实例销毁后调用",
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
    },
    regenerateResponse() {
      // 模拟重新生成回复
      this.$refs.typewriter.eraseAll();
      setTimeout(() => {
        this.$refs.typewriter.startTyping();
      }, 300);
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

## 使用多个组件

Element-X 提供了多个组件，你可以组合使用它们来构建完整的 AI 交互界面。以下是一个简化的示例：

```vue
<template>
  <div class="ai-chat">
    <!-- 思考动画组件 -->
    <el-x-thinking v-if="isThinking" />

    <!-- 打字机组件 -->
    <el-x-typewriter
      v-else-if="aiResponse"
      :text="aiResponse"
      ref="typewriter"
    />

    <!-- 发送框组件 -->
    <el-x-sender
      v-model="userInput"
      @send="sendMessage"
      :disabled="isThinking"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      aiResponse: "",
      isThinking: false,
    };
  },
  methods: {
    sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = this.userInput;
      this.userInput = "";
      this.isThinking = true;

      // 模拟AI响应
      setTimeout(() => {
        this.isThinking = false;
        this.aiResponse = `你发送的消息是: "${userMessage}"。这是一个AI响应示例。`;

        this.$nextTick(() => {
          this.$refs.typewriter.startTyping();
        });
      }, 1500);
    },
  },
};
</script>
```

## 主题定制

Element-X 的组件样式继承自 Element UI 的主题系统，你可以通过修改主题变量来定制组件的外观：

```scss
/* 在你的样式文件中 */
@import "~element-ui/packages/theme-chalk/src/common/var";

/* 自定义 Element UI 主题变量 */
$--color-primary: #6b46c1;
$--color-success: #38a169;
$--color-warning: #d69e2e;
$--color-danger: #e53e3e;
$--color-info: #4299e1;

/* 自定义 Element-X 主题变量 */
$--color-ai-bubble-user: lighten($--color-primary, 40%);
$--color-ai-bubble-bot: lighten($--color-info, 40%);
$--color-ai-cursor: $--color-primary;

/* 引入组件样式 */
@import "~element-ui/packages/theme-chalk/src/index";
@import "~@element-x/core/src/theme/index";
```

## 组件引用和方法调用

Element-X 的组件支持通过 ref 引用来调用组件方法：

```vue
<template>
  <div>
    <el-x-typewriter ref="typewriter" :text="text" />

    <el-button @click="startTyping">开始打字</el-button>
    <el-button @click="typeAll">立即完成</el-button>
    <el-button @click="eraseAll">清空</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "这是一段示例文本",
    };
  },
  methods: {
    startTyping() {
      this.$refs.typewriter.startTyping();
    },
    typeAll() {
      this.$refs.typewriter.typeAll();
    },
    eraseAll() {
      this.$refs.typewriter.eraseAll();
    },
  },
};
</script>
```

## 下一步

现在你已经了解了 Element-X 的基本用法，可以：

- 查看 [组件](../components/) 文档了解每个组件的详细用法
- 查看 [示例](../examples/) 了解更多实际应用场景
- 参考 [主题](./theme.md) 文档学习如何定制组件样式
