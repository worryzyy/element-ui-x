# Element-UI-X

**开箱即用的企业级 AI 组件库（基于 Vue 2.x + Element-Ui）**

<div align="center">
<img src="https://element-ui-x.com/demo/demo.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo1.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo2.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo3.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo4.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo5.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo6.png"  />&emsp;
<img src="https://element-ui-x.com/demo/demo7.png"  />&emsp;

</div>

## 📢 快速链接

| 资源类型     | <div style="width: 300px;" >链接</div>                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **文档**     | [📖 开发文档](https://element-ui-x.com/)                                                                                                                                                                            |
| **在线演示** | [👁️ 在线预览](https://demo.element-ui-x.com)                                                                                                                                                                        |
| **代码仓库** | [🐙 GitHub](https://github.com/worryzyy/element-ui-x)<br/>[📝 GitCode](https://gitcode.com/worryzyy/element-ui-x.git)<br/>[📝 Gitee](https://gitee.com/worryzyy/element-ui-x.git)                                   |
| **NPM 包**   | [📦 npm](https://www.npmjs.com/package/vue-element-ui-x)                                                                                                                                                            |
| **问题反馈** | [🐛 GitHub Issues](https://github.com/worryzyy/element-ui-x/issues)<br/>[🐛 GitCode Issues](https://gitcode.com/worryzyy/element-ui-x/issues)<br/>[🐛 Gitee Issues](https://gitee.com/worryzyy/element-ui-x/issues) |
| **交流讨论** | [🐒 交流群]()                                                                                                                                                                                                       |

## 🛠️ 核心特性

- ✨ **企业级 AI 组件**：内置聊天机器人、语音交互等场景化组件
- 🚀 **零配置集成**：基于 Element-UI 设计体系，开箱即用
- 📦 **按需加载**

## 📦 安装

```bash
# NPM
npm install vue-element-ui-x

# PNPM（推荐）
pnpm install vue-element-ui-x

# Yarn
yarn install vue-element-ui-x

```

## 📚 使用案例

1. **按需引入**

```vue
<script>
  import { ElXTypewriter } from 'vue-element-ui-x';
</script>

<template>
  <div
    style="display: flex; flex-direction: column; height: 230px; justify-content: space-between;"
  >
    <el-x-typewriter
      content="这是一个基础打字效果演示，展示Typewriter组件的基本功能。"
      :typing="true"
      ref="basicDemo"
    />
  </div>
</template>
```

2. **全局引入**

```ts
// main.ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import './assets/styles/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

import ElementUIX from 'vue-element-ui-x';
import App from './App.vue';
import router from './router';

Vue.use(ElementUI);
Vue.use(ElementUIX);

Vue.config.productionTip = false;

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
```

## 🌟 已实现 组件 和 Mixins

| 组件名                 | 描述              | 文档链接                                                          |
| ---------------------- | ----------------- | ----------------------------------------------------------------- |
| `Typewriter`           | 打字动画组件      | [📄 文档](https://element-ui-x.com/components/typewriter.html)    |
| `Bubble`               | 气泡消息组件      | [📄 文档](https://element-ui-x.com/components/bubble.html)        |
| `BubbleList`           | 气泡消息列表      | [📄 文档](https://element-ui-x.com/components/bubbleList.html)    |
| `Conversations`        | 会话管理组件      | [📄 文档](https://element-ui-x.com/components/conversations.html) |
| `Welcome`              | 欢迎组件          | [📄 文档](https://element-ui-x.com/components/welcome.html)       |
| `Prompts `             | 提示集组件        | [📄 文档](https://element-ui-x.com/components/prompts.html)       |
| `FilesCard`            | 文件卡片组件      | [📄 文档](https://element-ui-x.com/components/filesCard.html)     |
| `Attachments`          | 上传附件组件      | [📄 文档](https://element-ui-x.com/components/attachments.html)   |
| `Sender`               | 智能输入框        | [📄 文档](https://element-ui-x.com/components/sender.html)        |
| `Thinking`             | 思考中组件        | [📄 文档](https://element-ui-x.com/components/thinking.html)      |
| `ThoughtChain`         | 思考链组件        | [📄 文档](https://element-ui-x.com/components/thoughtChain.html)  |
| `recordMixin`          | 语音识别 Mixins   | [📄 文档](https://element-ui-x.com/components/record-mixins.html) |
| `streamMixin`          | 流模式接口 Mixins | [📄 文档](https://element-ui-x.com/components/stream-mixins.html) |
| `sendMixin & XRequest` | 流模式 Mixins     | [📄 文档](https://element-ui-x.com/components/send-mixins.html)   |

## 🎯 开发计划 (每周更新)

🎀 我们会在 issue 、交流群 等多方面收集大家的遇到的问题，和需求场景，制定短期和长期的开发计划，查看详情请移步 👉 **[开发计划](https://element-ui-x.com/roadmap.html)**

## 🤝 参与贡献

1. **Fork 仓库** → 2. **创建 Feature 分支** → 3. **提交 Pull Request**

详情可以移步 👉 **[开发指南](https://element-ui-x.com/guide/installation.html)**

欢迎：

- 🐛 Bug 修复
- 💡 新功能提案
- 📝 文档完善
- 🎨 样式优化
