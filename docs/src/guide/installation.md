# 安装

本节将介绍如何在项目中安装和配置 Element-X。

## 环境要求

- Node.js 12.x+
- Vue 2.6+
- Element UI 2.15.0+

## 安装方式

### 使用 npm 安装

```bash
# 安装 Element UI
npm install element-ui

# 安装 Element-X
npm install @element-x/core
```

### 使用 yarn 安装

```bash
# 安装 Element UI
yarn add element-ui

# 安装 Element-X
yarn add @element-x/core
```

## 完整引入

在 main.js 中引入 Element UI 和 Element-X：

```js
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ElementX from "@element-x/core";

// 引入 Element UI
Vue.use(ElementUI);

// 引入 Element-X
Vue.use(ElementX);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

以上代码便完成了 Element-X 的引入。需要注意的是，Element-X 依赖于 Element UI，所以必须先引入 Element UI。

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式：

### 方式一：手动引入

```js
import Vue from "vue";
import { ElXTypewriter } from "@element-x/core";

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
        "libraryName": "@element-x/core",
        "style": false
      },
      "element-x"
    ]
  ]
}
```

接下来，在 main.js 中按需引入组件：

```js
import Vue from "vue";
import { Button, Select } from "element-ui";
import { ElXTypewriter } from "@element-x/core";

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(ElXTypewriter.name, ElXTypewriter);
```

## 引入样式

Element-X 的样式依赖于 Element UI 的主题系统。你需要在项目中引入样式文件：

### 完整引入样式

```js
// 在 main.js 中
import "element-ui/lib/theme-chalk/index.css";
import "@element-x/core/lib/theme/index.css";
```

### 使用 SCSS

如果你使用 SCSS，可以在样式文件中引入：

```scss
/* 引入 Element UI 变量 */
@import "~element-ui/packages/theme-chalk/src/common/var";

/* 引入 Element-X 变量 */
@import "~@element-x/core/src/theme/common/var";

/* 自定义变量 */
$--color-ai-bubble-user: #e8f4ff;
$--color-ai-bubble-bot: #f7f7f7;

/* 引入组件样式 */
@import "~element-ui/packages/theme-chalk/src/index";
@import "~@element-x/core/src/theme/index";
```

## CDN 引入

你也可以通过 CDN 引入 Element-X（暂未提供）：

```html
<!-- 引入 Vue -->
<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>

<!-- 引入 Element UI -->
<link
  rel="stylesheet"
  href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
/>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<!-- 引入 Element-X（未来将提供） -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@element-x/core/lib/theme/index.css"
/>
<script src="https://unpkg.com/@element-x/core/lib/index.js"></script>
```

## 验证安装

安装完成后，你可以在组件中使用 Element-X 的组件：

```vue
<template>
  <div>
    <el-button>Element UI 按钮</el-button>
    <el-x-typewriter text="这是一个打字机效果组件"></el-x-typewriter>
  </div>
</template>
```

接下来，请查看 [快速上手](./quickstart.md) 章节了解如何使用 Element-X 的组件。
