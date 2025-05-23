# Element UI X

基于 Element UI 2.15.14 和 Vue2 的企业级 AI 聊天组件库

## 安装

```bash
npm install vue-element-ui-x --save
```

## 快速开始

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import ElementUIX from 'vue-element-ui-x';

// 确保已安装Element UI 2.15.x
Vue.use(ElementUI);
Vue.use(ElementUIX);
```

## 依赖说明

- 本包不打包 Element UI，依赖用户项目中的 Element UI
- 要求用户项目已安装 Element UI 2.15.x
- 如果用户项目没有 Element UI，会自动安装 peerDependencies 中指定的版本
- 避免重复安装，节省项目体积

## 组件列表

- Typewriter.vue
- Bubble.vue
- BubbleList.vue
- Conversations.vue
- Welcome.vue
- Prompts.vue
- FilesCard.vue
- Attachments.vue
- Sender.vue
- MentionSender.vue
- Thinking.vue
- ThoughtChain.vue

## 开发指南

[查看开发文档](./docs/README.md)
