# Typewriter 打字机组件

## 功能说明

模拟打字效果的文本展示组件，支持以下特性：

- 可配置的打字动画效果
- Markdown 内容渲染
- 代码语法高亮(通过 Prism.js)
- 光标雾化效果
- 插件系统扩展

## 属性

| 参数       | 说明                                                                                                                           | 类型           | 默认值 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------ |
| content    | 要显示的内容                                                                                                                   | String         | ''     |
| isMarkdown | 是否解析 Markdown 内容                                                                                                         | Boolean        | false  |
| typing     | 打字效果配置，设为 true 使用默认值或传入对象配置：<br>- interval: 打字间隔(ms)<br>- step: 每次打字字符数<br>- suffix: 光标字符 | Boolean/Object | false  |
| isFog      | 雾化效果配置，设为 true 使用默认值或传入对象配置：<br>- bgColor: 背景色<br>- width: 雾化宽度                                   | Boolean/Object | false  |
| highlight  | 自定义代码高亮函数，接收(code, lang)参数                                                                                       | Function       | -      |
| mdPlugins  | Markdown 插件数组                                                                                                              | Array          | -      |

## 计算属性

- `mergedConfig`: 合并后的打字配置，包含：
  - interval: 实际打字间隔
  - step: 每次打字字符数
  - suffix: 光标字符
- `typingProgress`: 当前打字进度百分比(0-100)
- `renderedContent`: 最终渲染的内容(已处理 Markdown 和代码高亮)

## 方法

- `startTyping()`: 开始打字动画
- `finishTyping()`: 立即完成打字
- `interrupt()`: 中断打字过程
- `continueTyping()`: 继续被中断的打字
- `restart()`: 重新开始打字
- `destroy()`: 销毁组件实例
- `getInstance()`: 获取组件实例 API，返回：
  - interrupt/continue/restart/destroy: 控制方法
  - renderedContent: 渲染内容
  - isTyping: 是否正在打字
  - progress: 当前进度

## 事件

- `start`: 打字开始事件，无参数
- `writing`: 打字进行事件，携带：
  - progress: 当前进度
  - renderedContent: 已渲染内容
- `finish`: 打字完成事件，携带 getInstance()返回的对象

## 使用示例

```html
<template>
  <div>
    <el-x-typewriter
      :content="contentText"
      :typing="{
        interval: typingSpeed,
        step: 2,
        suffix: '❚',
      }"
      :is-fog="{
        bgColor: '#f0f0f0',
        width: '120px',
      }"
      @start="handleStart"
      @writing="handleTyping"
      @finish="handleFinish"
    />

    <div>当前进度: {{ progress }}%</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contentText: `# 完整功能演示
- 支持**Markdown**渲染
- 代码高亮: \`const example = true\`
- 可配置的打字效果`,
        typingSpeed: 40,
        progress: 0,
      };
    },
    methods: {
      handleStart() {
        console.log("打字开始");
      },
      handleTyping({ progress }) {
        this.progress = progress;
      },
      handleFinish(instance) {
        console.log("打字完成", instance);
      },
    },
  };
</script>
```
