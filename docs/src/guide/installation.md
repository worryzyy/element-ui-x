# 安装

本节将介绍如何在项目中安装和配置 Element-UI-X。

## 环境要求

- Node.js 14.x+
- Vue 2.x
- Element UI 2.15.0+

## 安装方式

### 使用 npm 安装

```bash
# 安装 Element UI
npm install element-ui

# 安装 Element-UI-X
npm install Element-UI-X
```

### 使用 yarn 安装

```bash
# 安装 Element UI
yarn add element-ui

# 安装 Element-UI-X
yarn add Element-UI-X
```

## 完整引入

在 main.js 中引入 Element UI 和 Element-UI-X：

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUIX from 'vue-element-ui-x';

// 引入 Element UI
Vue.use(ElementUI);

// 引入 Element-UI-X
Vue.use(ElementUIX);

new Vue({
  el: '#app',
  render: h => h(App),
});
```

以上代码便完成了 Element-UI-X 的引入。需要注意的是，Element-UI-X 依赖于 Element UI，所以必须先引入 Element UI。

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式：

### 方式一：手动引入

```js
import Vue from 'vue';
import { ElXTypewriter } from 'vue-element-ui-x';

// 注册组件
Vue.component(ElXTypewriter.name, ElXTypewriter);
```

### 方式二：使用 babel-plugin-component

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，在 .babelrc 或 babel.config.js 中添加：

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "component",
      {
        "libraryName": "vue-element-ui-x",
        "style": false
      },
      "element-x"
    ]
  ]
}
```

接下来，在 main.js 中按需引入组件：

```js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import { ElXTypewriter } from 'vue-element-ui-x';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(ElXTypewriter.name, ElXTypewriter);
```

## 验证安装

安装完成后，你可以在组件中使用 Element-UI-X 的组件：

```html
<template>
  <div>
    <el-button>Element UI 按钮</el-button>
    <el-x-typewriter content="这是一个打字机效果组件"></el-x-typewriter>
  </div>
</template>
```

接下来，请查看 [快速上手](./quickstart.md) 章节了解如何使用 Element-UI-X 的组件。
