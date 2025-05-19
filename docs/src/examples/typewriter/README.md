# Typewriter 打字机示例

这里提供了打字机组件的完整示例和更多高级用法。

## 基础效果演示

下面是打字机组件的基本示例代码：

```vue
<template>
  <div>
    <el-x-typewriter
      :text="demoText"
      :type-speed="typeSpeed"
      :show-cursor="true"
      :has-blur="hasBlur"
      ref="typewriter"
    />

    <div class="controls" style="margin-top: 15px;">
      <el-button type="primary" @click="startTyping">开始打字</el-button>
      <el-button @click="typeAll">立即完成</el-button>
      <el-button @click="eraseAll">清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      demoText:
        "欢迎使用 Element-X 打字机组件！这是一个用于模拟 AI 回复内容逐字显示的组件，可以提升用户交互体验。",
      typeSpeed: 30,
      hasBlur: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.typewriter.startTyping();
    });
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

## 控制选项

打字机组件提供了多种控制选项：

| 参数        | 说明                         | 类型    | 默认值 |
| ----------- | ---------------------------- | ------- | ------ |
| text        | 要显示的文本内容             | string  | —      |
| type-speed  | 打字速度（毫秒/字符）        | number  | 30     |
| start-delay | 开始打字前的延迟（毫秒）     | number  | 0      |
| show-cursor | 是否显示光标                 | boolean | true   |
| has-blur    | 是否启用模糊效果             | boolean | false  |
| auto-start  | 是否在组件挂载后自动开始打字 | boolean | true   |

## 事件与方法

### 事件

```js
// 开始打字时触发
@typing-start

// 打字过程中触发，返回当前文本和进度
@typing-progress="onProgress"
function onProgress(data) {
  console.log(data.text, data.progress); // 当前文本, 完成百分比(0-1)
}

// 打字完成时触发
@typing-complete="onComplete"
function onComplete(text) {
  console.log('完成的文本:', text);
}

// 清空文本时触发
@typing-erased
```

### 方法

```js
// 获取组件引用
const typewriter = this.$refs.typewriter;

// 开始打字效果
typewriter.startTyping();

// 立即显示全部文本
typewriter.typeAll();

// 清空所有文本
typewriter.eraseAll();

// 重置打字机状态
typewriter.resetTypewriter();
```

## 实际应用场景

### AI 聊天应用

```vue
<template>
  <div class="chat-container">
    <!-- 用户消息 -->
    <div class="message user">您好，请介绍一下自己</div>

    <!-- AI回复 -->
    <div class="message ai">
      <div v-if="isThinking" class="thinking">
        AI正在思考<span>.</span><span>.</span><span>.</span>
      </div>
      <el-x-typewriter
        v-else
        :text="aiResponse"
        :type-speed="40"
        :has-blur="true"
        ref="typewriter"
      />
    </div>

    <div class="actions">
      <el-button @click="regenerateResponse">重新生成</el-button>
      <el-button @click="skipAnimation">跳过动画</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isThinking: true,
      aiResponse:
        "您好！我是一个AI助手，可以回答您的问题、提供信息以及帮助您完成各种任务。",
    };
  },
  mounted() {
    // 模拟AI思考过程
    setTimeout(() => {
      this.isThinking = false;
      this.$nextTick(() => {
        this.$refs.typewriter.startTyping();
      });
    }, 1500);
  },
  methods: {
    regenerateResponse() {
      this.isThinking = true;
      setTimeout(() => {
        this.isThinking = false;
        this.$nextTick(() => {
          this.$refs.typewriter.eraseAll();
          this.$refs.typewriter.startTyping();
        });
      }, 1000);
    },
    skipAnimation() {
      this.isThinking = false;
      this.$nextTick(() => {
        this.$refs.typewriter.typeAll();
      });
    },
  },
};
</script>
```

## 回到文档

查看完整的 API 文档，请返回[打字机组件文档](/components/typewriter.html)。
