# Theme Customization

Element-UI-X's theme system is fully compatible with and extends Element UI's theme system, allowing you to easily customize the appearance of components.

## Theme Variables Overview

Element-UI-X uses the SCSS variable system to define and extend themes:

1. **Inherit Element UI Variables**: Element-UI-X components directly use Element UI's theme variables to ensure visual consistency
2. **Extend AI-specific Variables**: Element-UI-X defines variables specifically for AI interaction scenarios, prefixed with `$--color-ai-*`
3. **BEM Naming Convention**: Component styles follow the BEM (Block Element Modifier) naming convention

## Theme Variables List

### AI Conversation Bubble Colors

- `$--color-ai-bubble-user`: User message bubble background color, defaults to `$--color-primary-light-9`
- `$--color-ai-bubble-bot`: AI message bubble background color, defaults to `$--background-color-base`

### Typewriter Effect

- `$--color-ai-cursor`: Cursor color, defaults to `$--color-text-placeholder`
- `$--transition-ai-typewriter`: Typing speed transition time, defaults to `0.05s`

### Thinking Animation

- `$--color-ai-thinking`: Thinking animation color, defaults to `$--color-primary`

### Connection Line Color

- `$--color-ai-chain-line`: Chain of thought connection line color, defaults to `$--border-color-light`

### Conversation List

- `$--color-ai-conversation-active`: Active conversation highlight color, defaults to `$--color-primary-light-8`

### Prompt Tags

- `$--color-ai-prompt-tag`: Prompt tag color, defaults to `$--color-info`

### Attachment Area

- `$--color-ai-attachment-border`: Attachment area border color, defaults to `$--border-color-base`
- `$--color-ai-attachment-error`: Attachment error state color, defaults to `$--color-danger`

### File Cards

- `$--color-ai-file-icon`: File icon color, defaults to `$--color-info`

## Theme Customization Methods

### Method 1: Customize in SCSS Files

Create an SCSS file (such as `element-variables.scss`) and import variables:

```scss
/* Import Element UI variables */
@import '~element-ui/packages/theme-chalk/src/common/var';

/* Custom Element UI theme variables */
$--color-primary: #409eff;
$--color-success: #67c23a;
$--color-warning: #e6a23c;
$--color-danger: #f56c6c;
$--color-info: #909399;

/* Custom Element-UI-X theme variables */
$--color-ai-bubble-user: #f0f9ff;
$--color-ai-bubble-bot: #f8f9fa;
$--color-ai-cursor: $--color-primary;
$--color-ai-thinking: $--color-primary;
$--color-ai-conversation-active: lighten($--color-primary, 35%);

/* Import component styles */
@import '~element-ui/packages/theme-chalk/src/index';
@import '~vue-element-ui-x/src/theme/index';
```

Then import this style file in the entry file:

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import ElementX from 'vue-element-ui-x';
import './element-variables.scss';

Vue.use(ElementUI);
Vue.use(ElementX);
```

### Method 2: Using CSS Variables

Both Element-UI-X and Element UI support theme customization using CSS variables, which allows dynamic theme modification at runtime:

```js
// Set CSS variables on the root element
document.documentElement.style.setProperty('--color-primary', '#6b46c1');
document.documentElement.style.setProperty('--color-ai-bubble-user', '#f0e7ff');
document.documentElement.style.setProperty('--color-ai-bubble-bot', '#f5f5f5');
```

## Component-level Style Customization

In addition to using theme variables, you can also customize component styles in the following ways:

### Override Component Styles

```css
/* Override typewriter component cursor style */
.el-x-typewriter__cursor {
  width: 3px;
  height: 1.2em;
  background-color: #ff4500;
}

/* Custom bubble component styles */
.el-x-bubble--user {
  border-radius: 12px 12px 0 12px;
}

.el-x-bubble--bot {
  border-radius: 12px 12px 12px 0;
}
```

### Using Scoped Styles

When using `scoped` styles in components, you can use deep selectors `::v-deep` or `/deep/` to modify child component styles:

```html
<style scoped>
  /* Vue 2.x uses ::v-deep or /deep/ */
  ::v-deep .el-x-typewriter__cursor {
    animation-duration: 0.5s;
  }

  /* Custom bubble text color */
  ::v-deep .el-x-bubble--user .el-x-bubble__content {
    color: #345678;
  }
</style>
```

## Full Dark Mode Support

Element-UI-X components fully support Element UI's dark mode:

```js
// Import Element UI dark theme
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/dark/css-vars.css';

// Import Element-UI-X dark mode adaptation
import 'vue-element-ui-x/lib/theme/dark/css-vars.css';
```

You can switch to dark mode by adding the `dark` class name to the HTML or body element:

```js
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
```

## Theme Switching

Here's an example of dynamically switching themes:

```html
<template>
  <div>
    <el-switch
      v-model="isDarkMode"
      active-text="Dark Mode"
      inactive-text="Light Mode"
      @change="toggleTheme"
    />

    <!-- Theme color selection -->
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
          '#409EFF', // 默认蓝色
          '#67C23A', // Green
          '#E6A23C', // Yellow
          '#F56C6C', // Red
          '#909399', // Gray
          '#6b46c1', // Purple
        ],
      };
    },
    methods: {
      toggleTheme(value) {
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      changeThemeColor(color) {
        // Set primary color
        document.documentElement.style.setProperty('--color-primary', color);

        // Generate related AI component colors based on primary color
        document.documentElement.style.setProperty(
          '--color-ai-bubble-user',
          this.lightenColor(color, 0.9),
        );
        document.documentElement.style.setProperty('--color-ai-cursor', color);
      },
      lightenColor(color, amount) {
        // Simple color lightening algorithm (you can use color libraries in actual development)
        const rgb = this.hexToRgb(color);
        const lightened = {
          r: Math.round(rgb.r + (255 - rgb.r) * amount),
          g: Math.round(rgb.g + (255 - rgb.g) * amount),
          b: Math.round(rgb.b + (255 - rgb.b) * amount),
        };
        return `rgb(${lightened.r}, ${lightened.g}, ${lightened.b})`;
      },
      hexToRgb(hex) {
        // Convert hexadecimal color to RGB
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

## Complete Theme Customization

If you need more complex theme customization, you can refer to the [Element UI Theme Customization](https://element.eleme.cn/#/zh-CN/component/custom-theme) documentation, Element-UI-X is fully compatible with it.
