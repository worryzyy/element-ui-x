---
home: true
heroImage: /images/logo.png
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 基于 Element UI
    details: 完全兼容 Element UI 2.15.14，无缝集成到现有项目
  - title: AI 聊天组件
    details: 专为 OpenAI 等 AI 交互场景设计的组件，包括打字机效果、聊天气泡等
  - title: 主题系统集成
    details: 继承 Element UI 的主题变量，并扩展了专用于 AI 交互场景的主题变量
footer: MIT Licensed | Copyright © 2023 Element-X Team
---

# Element-X 企业级 AI 组件库

基于 Element UI 和 Vue 2.x 构建的企业级 AI 组件库，专为打造现代化 AI 对话界面设计。Element-X 提供了一系列高质量的 AI 交互组件，帮助开发者快速构建类似 ChatGPT 的用户界面。

## 特色组件

### 对话类组件

- **Typewriter 打字机**：模拟 AI 回复内容的逐字显示效果
- **Bubble 聊天气泡**：展示用户和 AI 的对话内容
- **Thinking 思考动画**：展示 AI 思考过程的动画效果

### 交互类组件

- **Sender 发送框**：用于用户输入和发送消息
- **Attachments 附件上传**：支持文件上传和预览

### 导航类组件

- **Conversations 会话列表**：管理多个 AI 对话会话
- **Prompts 提示词库**：提供常用提示词模板

## 快速上手

```bash
# 安装
npm install @element-x/core

# 引入
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementX from '@element-x/core'

Vue.use(ElementUI)
Vue.use(ElementX)
```

查看 [快速上手](/guide/quickstart) 了解更多信息。

## 示例预览

<div class="features">
  <div class="feature">
    <h2>打字机效果</h2>
    <p>模拟AI回复内容的逐字显示</p>
    <p><a href="/components/typewriter">查看文档</a> | <a href="/examples/typewriter/">查看示例</a></p>
  </div>
  <div class="feature">
    <img src="/images/preview-typewriter.png" alt="打字机效果预览">
  </div>
</div>

<style>
.features {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  border: 1px solid #eaecef;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f9f9f9;
}
.feature {
  flex: 1;
}
.feature img {
  max-width: 100%;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
