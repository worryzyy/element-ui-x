# Installation

This section will introduce how to install and configure Element-UI-X in your project.

## Environment Requirements

| Tool    | Version     | Description                                              |
| ------- | ----------- | -------------------------------------------------------- |
| Node.js | 14.x - 18.x | For Vue2 projects, avoid latest versions, 16.x is safest |
| Vue     | 2.x         | --                                                       |
| Element | --          | --                                                       |
| npm     | --          | --                                                       |

## Installation Methods

### Install using npm

```bash
# Install Element UI
npm install element-ui

# Install Element-UI-X
npm install vue-element-ui-x
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

### Manual Import

```js
import Vue from 'vue';
import { ElXTypewriter } from 'vue-element-ui-x';

// Register component
Vue.component(ElXTypewriter.name, ElXTypewriter);
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

## Related Links

- [Element UI Official Website](https://element.eleme.cn/)
- [Vue.js Official Website](https://v2.vuejs.org/)
- [Element-UI-X Demo](https://demo.element-ui-x.com/)
- [Element-UI-X GitHub Repository](https://github.com/worryzyy/element-ui-x)
- [If you're looking for Vue3 version Element-Plus-X, portal here](https://element-plus-x.com/)

Next, please check the [Installation](./installation.md) section to learn how to use Element-UI-X in your project.
