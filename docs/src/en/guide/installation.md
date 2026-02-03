# Installation

This section will introduce how to install and configure Element-UI-X in your project.

## Environment Requirements

- Node.js 14.x+
- Vue 2.5.x ~ 2.6.x (recommended 2.6.14)
- Element UI 2.15.0+

::: warning Vue Version Notice
This component library is developed based on Vue 2.5+. We recommend using **Vue 2.5.x** or **Vue 2.6.x**. Versions lower than 2.5 may have compatibility issues.
:::

## Installation Methods

### Install using npm

```bash
# Install Element UI
npm install element-ui

# Install Element-UI-X
npm install vue-element-ui-x
```

### Install using yarn

```bash
# Install Element UI
yarn add element-ui

# Install Element-UI-X
yarn add vue-element-ui-x
```

## Full Import

Import Element UI and Element-UI-X in main.js:

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUIX from 'vue-element-ui-x';

// Import Element UI
Vue.use(ElementUI);

// Import Element-UI-X
Vue.use(ElementUIX);

new Vue({
  el: '#app',
  render: h => h(App),
});
```

The above code completes the import of Element-UI-X. Note that Element-UI-X depends on Element UI, so Element UI must be imported first.

## On-demand Import

If you only want to import some components, you can use on-demand import:

### Method 1: Manual Import

```js
import Vue from 'vue';
import { ElXTypewriter } from 'vue-element-ui-x';

// Register component
Vue.component(ElXTypewriter.name, ElXTypewriter);
```

### Method 2: Using babel-plugin-component

First, install babel-plugin-component:

```bash
npm install babel-plugin-component -D
```

Then, add to .babelrc or babel.config.js:

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
      "element-ui-x"
    ]
  ]
}
```

Next, import components on-demand in main.js:

```js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import { ElXTypewriter } from 'vue-element-ui-x';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(ElXTypewriter.name, ElXTypewriter);
```

## Verify Installation

After installation, you can use Element-UI-X components in your components:

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
          Preview
        </el-button>
        <el-button
          size="small"
          @click="resetBasic"
        >
          Reset
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        basicContent:
          'This is a basic typing effect demonstration, showcasing the basic functionality of the Typewriter component.',
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

Next, please check the [Quick Start](./quickstart.md) section to learn how to use Element-UI-X components.
