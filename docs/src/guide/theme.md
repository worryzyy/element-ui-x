# 主题定制

Element-X 的主题系统完全兼容并扩展了 Element UI 的主题系统，使你能够轻松定制组件的外观。

## 主题变量概述

Element-X 使用 SCSS 变量系统来定义和扩展主题：

1. **继承 Element UI 变量**：Element-X 的组件直接使用 Element UI 的主题变量，确保视觉一致性
2. **扩展 AI 专用变量**：Element-X 定义了专门用于 AI 交互场景的变量，以 `$--color-ai-*` 为前缀
3. **BEM 命名规范**：组件样式遵循 BEM（Block Element Modifier）命名规范

## 主题变量列表

### AI 对话气泡颜色

- `$--color-ai-bubble-user`：用户消息气泡背景色，默认为 `$--color-primary-light-9`
- `$--color-ai-bubble-bot`：AI 消息气泡背景色，默认为 `$--background-color-base`

### 打字机效果

- `$--color-ai-cursor`：光标颜色，默认为 `$--color-text-placeholder`
- `$--transition-ai-typewriter`：打字速度过渡时间，默认为 `0.05s`

### 思考动画

- `$--color-ai-thinking`：思考动画颜色，默认为 `$--color-primary`

### 连接线颜色

- `$--color-ai-chain-line`：思维链连接线颜色，默认为 `$--border-color-light`

### 会话列表

- `$--color-ai-conversation-active`：激活会话高亮色，默认为 `$--color-primary-light-8`

### 提示词标签

- `$--color-ai-prompt-tag`：提示词标签颜色，默认为 `$--color-info`

### 附件区域

- `$--color-ai-attachment-border`：附件区域边框颜色，默认为 `$--border-color-base`
- `$--color-ai-attachment-error`：附件错误状态颜色，默认为 `$--color-danger`

### 文件卡片

- `$--color-ai-file-icon`：文件图标颜色，默认为 `$--color-info`

## 定制主题的方式

### 方式一：在 SCSS 文件中定制

创建一个 SCSS 文件（如 `element-variables.scss`）并引入变量：

```scss
/* 引入 Element UI 变量 */
@import "~element-ui/packages/theme-chalk/src/common/var";

/* 自定义 Element UI 主题变量 */
$--color-primary: #409eff;
$--color-success: #67c23a;
$--color-warning: #e6a23c;
$--color-danger: #f56c6c;
$--color-info: #909399;

/* 自定义 Element-X 主题变量 */
$--color-ai-bubble-user: #f0f9ff;
$--color-ai-bubble-bot: #f8f9fa;
$--color-ai-cursor: $--color-primary;
$--color-ai-thinking: $--color-primary;
$--color-ai-conversation-active: lighten($--color-primary, 35%);

/* 引入组件样式 */
@import "~element-ui/packages/theme-chalk/src/index";
@import "~@element-x/core/src/theme/index";
```

然后在入口文件中引入这个样式文件：

```js
import Vue from "vue";
import ElementUI from "element-ui";
import ElementX from "@element-x/core";
import "./element-variables.scss";

Vue.use(ElementUI);
Vue.use(ElementX);
```

### 方式二：使用 CSS 变量

Element-X 和 Element UI 都支持使用 CSS 变量进行主题定制，这种方式可以在运行时动态修改主题：

```js
// 在根元素上设置CSS变量
document.documentElement.style.setProperty("--color-primary", "#6b46c1");
document.documentElement.style.setProperty("--color-ai-bubble-user", "#f0e7ff");
document.documentElement.style.setProperty("--color-ai-bubble-bot", "#f5f5f5");
```

## 组件级样式定制

除了使用主题变量，你还可以通过以下方式定制组件样式：

### 覆盖组件样式

```css
/* 覆盖打字机组件的光标样式 */
.el-x-typewriter__cursor {
  width: 3px;
  height: 1.2em;
  background-color: #ff4500;
}

/* 自定义气泡组件样式 */
.el-x-bubble--user {
  border-radius: 12px 12px 0 12px;
}

.el-x-bubble--bot {
  border-radius: 12px 12px 12px 0;
}
```

### 使用 scoped 样式

在组件中使用 `scoped` 样式时，你可以使用深度选择器 `::v-deep` 或 `/deep/` 修改子组件样式：

```html
<style scoped>
  /* Vue 2.x 使用 ::v-deep 或 /deep/ */
  ::v-deep .el-x-typewriter__cursor {
    animation-duration: 0.5s;
  }

  /* 自定义气泡文本颜色 */
  ::v-deep .el-x-bubble--user .el-x-bubble__content {
    color: #345678;
  }
</style>
```

## 完整暗黑模式支持

Element-X 的组件完全支持 Element UI 的暗黑模式：

```js
// 引入 Element UI 暗黑主题
import "element-ui/lib/theme-chalk/display.css";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/dark/css-vars.css";

// 引入 Element-X 暗黑模式适配
import "@element-x/core/lib/theme/dark/css-vars.css";
```

你可以通过添加 `dark` 类名到 HTML 或者 body 元素来切换暗黑模式：

```js
// 启用暗黑模式
document.documentElement.classList.add("dark");

// 禁用暗黑模式
document.documentElement.classList.remove("dark");
```

## 主题切换

以下是一个动态切换主题的示例：

```html
<template>
  <div>
    <el-switch
      v-model="isDarkMode"
      active-text="暗黑模式"
      inactive-text="亮色模式"
      @change="toggleTheme"
    />

    <!-- 主题色选择 -->
    <div class="theme-colors">
      <div
        v-for="color in colors"
        :key="color"
        class="color-block"
        :style="{ backgroundColor: color }"
        @click="changeThemeColor(color)"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isDarkMode: false,
        colors: [
          "#409EFF", // 默认蓝色
          "#67C23A", // 绿色
          "#E6A23C", // 黄色
          "#F56C6C", // 红色
          "#909399", // 灰色
          "#6b46c1", // 紫色
        ],
      };
    },
    methods: {
      toggleTheme(value) {
        if (value) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      changeThemeColor(color) {
        // 设置主色调
        document.documentElement.style.setProperty("--color-primary", color);

        // 根据主色调生成相关的 AI 组件颜色
        document.documentElement.style.setProperty(
          "--color-ai-bubble-user",
          this.lightenColor(color, 0.9)
        );
        document.documentElement.style.setProperty("--color-ai-cursor", color);
      },
      lightenColor(color, amount) {
        // 简单的颜色变浅算法（实际开发中可以使用color库）
        const rgb = this.hexToRgb(color);
        const lightened = {
          r: Math.round(rgb.r + (255 - rgb.r) * amount),
          g: Math.round(rgb.g + (255 - rgb.g) * amount),
          b: Math.round(rgb.b + (255 - rgb.b) * amount),
        };
        return `rgb(${lightened.r}, ${lightened.g}, ${lightened.b})`;
      },
      hexToRgb(hex) {
        // 将十六进制颜色转换为RGB
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : null;
      },
    },
  };
</script>

<style>
  .theme-colors {
    display: flex;
    margin-top: 15px;
  }

  .color-block {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .color-block:hover {
    transform: scale(1.1);
  }
</style>
```

## 完整主题定制

如果你需要进行更复杂的主题定制，可以参考 [Element UI 主题定制](https://element.eleme.cn/#/zh-CN/component/custom-theme) 文档，Element-X 与其完全兼容。
