# 安装

本节将介绍如何在项目中安装和配置 Element-UI-X。

## 环境要求

- Node.js 14.x+
- Vue 2.5.x ~ 2.6.x（推荐 2.6.14）
- Element UI 2.15.0+

::: warning Vue 版本说明
本组件库基于 Vue 2.5+ 开发，建议使用 **Vue 2.5.x** 或 **Vue 2.6.x** 版本。低于 2.5 的版本可能存在兼容性问题。
:::

## 安装方式

### 使用 npm 安装

```bash
# 安装 Element UI
npm install element-ui

# 安装 Element-UI-X
npm install vue-element-ui-x
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

### 手动引入

```js
import Vue from 'vue';
import { ElXTypewriter } from 'vue-element-ui-x';

// 注册组件
Vue.component(ElXTypewriter.name, ElXTypewriter);
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

:::demo

```html
<template>
  <div>
    <el-x-typewriter
      :content="basicContent"
      :typing="true"
      ref="basicDemo"
    />

    <div class="demo-controls">
      <el-button-group>
        <el-button
          size="small"
          type="primary"
          @click="startBasic"
        >
          预览
        </el-button>
        <el-button
          size="small"
          @click="resetBasic"
        >
          重置
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        basicContent: '这是一个基础打字效果演示，展示Typewriter组件的基本功能。',
      };
    },
    methods: {
      startBasic() {
        this.$refs.basicDemo.restart();
      },
      resetBasic() {
        this.$refs.basicDemo.restart();
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

接下来，请查看 [快速上手](./quickstart.md) 章节了解如何使用 Element-UI-X 的组件。

## 相关链接

- [Element UI 官网](https://element.eleme.cn/)
- [Vue.js 官网](https://v2.vuejs.org/)
- [Element-UI-X 演示](https://demo.element-ui-x.com/)
- [Element-UI-X GitHub 仓库](https://github.com/worryzyy/element-ui-x)
- [如果你在找 Vue3 版本的 Element-Plus-X，传送门](https://element-plus-x.com/)

接下来，请查看 [安装](./installation.md) 章节了解如何在项目中使用 Element-UI-X。
