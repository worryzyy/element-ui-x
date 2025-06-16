# Bubble 聊天气泡组件

## 功能说明

聊天气泡组件，用于展示对话内容，支持以下特性：

- 自定义气泡样式和颜色
- 支持用户和机器人两种角色布局
- 自适应内容宽度
- 支持 Markdown 内容渲染
- 打字器效果集成
- 加载状态显示
- 自定义头像和布局

## 使用示例

### 基础用法

基本的气泡组件使用，展示不同位置的气泡效果。

:::demo

```html
<template>
  <div>
    <el-x-bubble
      content="这是一个基础的左侧气泡示例，通常用于展示机器人或对方的消息。"
      avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      placement="start"
    />

    <div style="margin-top: 20px;">
      <el-x-bubble
        content="这是一个基础的右侧气泡示例，通常用于展示用户自己的消息。"
        avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        placement="end"
      />
    </div>
  </div>
</template>
```

:::

### 不同样式的气泡

通过 `variant` 和 `shape` 属性配置不同样式和形状的气泡。

:::demo

```html
<template>
  <div>
    <div class="bubble-row">
      <el-x-bubble
        content="默认填充样式 (filled)"
        variant="filled"
        placement="start"
        :avatarSize="40"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <div class="bubble-row">
      <el-x-bubble
        content="带边框样式 (borderless)"
        variant="borderless"
        placement="start"
        :avatarSize="40"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <div class="bubble-row">
      <el-x-bubble
        content="轮廓样式 (outlined)"
        variant="outlined"
        placement="start"
        :avatarSize="40"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <div class="bubble-row">
      <el-x-bubble
        content="阴影样式 (shadow)"
        variant="shadow"
        placement="start"
        :avatarSize="40"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <div class="bubble-row">
      <el-x-bubble
        content="圆角样式 (shape='round')"
        shape="round"
        placement="start"
        :avatarSize="40"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <div class="bubble-row">
      <el-x-bubble
        content="尖角样式 (shape='corner')"
        shape="corner"
        placement="start"
        :avatarSize="40"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
  </div>
</template>

<style>
  .bubble-row {
    margin-bottom: 15px;
  }
</style>
```

:::

### 打字器效果

通过 `typing` 属性启用打字器效果，模拟实时输入。

:::demo

```html
<template>
  <div>
    <el-x-bubble
      :content="typingContent"
      :typing="typingConfig"
      avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      placement="start"
      ref="typingDemo"
      @start="onStart"
      @writing="onWriting"
      @finish="onFinish"
    />

    <div
      class="progress-bar"
      v-if="isTyping"
    >
      <el-progress
        :percentage="progress"
        :show-text="false"
      ></el-progress>
      <div class="progress-text">{{ Math.floor(progress) }}%</div>
    </div>

    <div class="demo-controls">
      <el-button-group>
        <el-button
          size="small"
          type="primary"
          @click="startTyping"
        >
          开始
        </el-button>
        <el-button
          size="small"
          type="warning"
          :disabled="!isTyping"
          @click="pauseTyping"
        >
          暂停
        </el-button>
        <el-button
          size="small"
          type="success"
          :disabled="isTyping || progress >= 100"
          @click="continueTyping"
        >
          继续
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typingContent:
          '这是一个带有打字器效果的气泡示例，可以模拟实时输入的效果。你可以通过下方的按钮控制打字过程。',
        typingConfig: {
          interval: 50,
          step: 1,
          suffix: '|',
        },
        isTyping: false,
        progress: 0,
      };
    },
    methods: {
      startTyping() {
        this.$refs.typingDemo.restart();
      },
      pauseTyping() {
        this.$refs.typingDemo.interrupt();
        this.isTyping = false;
      },
      continueTyping() {
        this.$refs.typingDemo.continueTyping();
        this.isTyping = true;
      },
      onStart() {
        this.isTyping = true;
        this.progress = 0;
      },
      onWriting({ progress }) {
        this.progress = progress;
      },
      onFinish() {
        this.isTyping = false;
        this.progress = 100;
      },
    },
  };
</script>

<style>
  .progress-bar {
    margin: 15px 0;
    display: flex;
    align-items: center;
  }
  .progress-text {
    margin-left: 10px;
    width: 40px;
  }
  .demo-controls {
    margin-top: 15px;
  }
</style>
```

:::

### 加载状态

通过 `loading` 属性显示加载状态，支持自定义加载动画。

:::demo

```html
<template>
  <div>
    <div class="bubble-row">
      <el-x-bubble
        loading
        placement="start"
      />
    </div>

    <div class="bubble-row">
      <el-x-bubble
        loading
        placement="end"
      >
        <template #loading>
          <span style="margin-left: 5px;">正在输入...</span>
        </template>
      </el-x-bubble>
    </div>
  </div>
</template>
```

:::

### Markdown 渲染

通过 `isMarkdown` 属性启用 Markdown 内容渲染。

:::demo

```html
<template>
  <div>
    <el-x-bubble
      :content="markdownContent"
      :is-markdown="true"
      :is-fog="true"
      :typing="{ interval: 30, step: 2 }"
      avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      placement="start"
      ref="markdownDemo"
    />

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startMarkdown"
      >
        预览
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        markdownContent: `# Markdown示例
这是一个支持**Markdown**渲染的气泡组件。

## 功能特点
- 支持标题
- 支持**粗体**和*斜体*
- 支持代码块

\`\`\`javascript
// 示例代码
function greet(name) {
    return 'Hello, ' + name + '!';
}
console.log(greet('World'));
\`\`\``,
      };
    },
    methods: {
      startMarkdown() {
        this.$refs.markdownDemo.restart();
      },
    },
  };
</script>
```

:::

### 自定义头像和内容

使用插槽自定义气泡的头像和内容。

:::demo

```html
<template>
  <div>
    <el-x-bubble placement="start">
      <template #avatar>
        <el-avatar
          :size="40"
          icon="el-icon-user-solid"
          style="background-color: #409EFF;"
        ></el-avatar>
      </template>

      <template #header>
        <div style="font-weight: bold; margin-bottom: 5px;">自定义头部</div>
      </template>

      <template #content>
        <div style="padding: 10px;">
          <p>这是使用内容插槽的自定义内容示例。</p>
          <el-rate
            v-model="rating"
            disabled
            show-score
          ></el-rate>
        </div>
      </template>

      <template #footer>
        <div style="font-size: 12px; color: #909399;">
          <i class="el-icon-time"></i>
          <span>12:30</span>
        </div>
      </template>
    </el-x-bubble>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rating: 4.5,
      };
    },
  };
</script>
```

:::

### 聊天对话场景

结合多个气泡组件，模拟完整的聊天对话场景。

:::demo

```html
<template>
  <div class="chat-container">
    <el-x-bubble
      content="你好，我是AI助手，有什么可以帮助你的？"
      avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      placement="start"
    />

    <el-x-bubble
      content="你能介绍一下Element UI吗？"
      avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      placement="end"
      style="margin-top: 15px;"
    />

    <el-x-bubble
      :content="aiResponse"
      :typing="{ interval: 30, step: 2 }"
      :is-markdown="true"
      avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      placement="start"
      style="margin-top: 15px;"
      ref="responseDemo"
    />

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="regenerateResponse"
      >
        重新生成回答
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aiResponse: `**Element UI** 是一套基于 Vue 2.0 的桌面端组件库，提供了丰富的组件和功能：

- 丰富的组件：包括表单、表格、导航、通知等
- 一致的设计：遵循统一的设计规范
- 响应式布局：适应不同尺寸的屏幕
- 主题定制：支持自定义主题色和样式

你可以通过 npm 安装：
\`\`\`bash
npm i element-ui -S
\`\`\``,
      };
    },
    methods: {
      regenerateResponse() {
        this.$refs.responseDemo.restart();
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.responseDemo.restart();
      });
    },
  };
</script>

<style>
  .chat-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 15px;
    background-color: #f8f8f8;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
```

:::

## 属性

| 参数              | 说明                                                                                                                           | 类型           | 默认值    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------- | --------- |
| content           | 气泡内容文本                                                                                                                   | String         | ''        |
| reasoning_content | 推理内容（备用内容）                                                                                                           | String         | ''        |
| avatar            | 头像图片地址                                                                                                                   | String         | ''        |
| placement         | 气泡位置，可选值：'start'(左侧)/'end'(右侧)                                                                                    | String         | 'start'   |
| variant           | 气泡样式，可选值：'filled'/'borderless'/'outlined'/'shadow'                                                                    | String         | 'filled'  |
| maxWidth          | 气泡最大宽度                                                                                                                   | String         | '500px'   |
| avatarSize        | 头像尺寸                                                                                                                       | String         | ''        |
| avatarGap         | 头像与气泡间距                                                                                                                 | String         | '12px'    |
| avatarShape       | 头像形状，可选值：'circle'/'square'                                                                                            | String         | 'circle'  |
| avatarIcon        | 头像图标（当没有头像图片时）                                                                                                   | String         | ''        |
| avatarSrcSet      | 头像图片 srcset 属性                                                                                                           | String         | ''        |
| avatarAlt         | 头像图片 alt 属性                                                                                                              | String         | ''        |
| avatarFit         | 头像图片填充方式                                                                                                               | String         | 'cover'   |
| noStyle           | 是否移除默认样式                                                                                                               | Boolean        | false     |
| typing            | 打字效果配置，设为 true 使用默认值或传入对象配置：<br>- interval: 打字间隔(ms)<br>- step: 每次打字字符数<br>- suffix: 光标字符 | Boolean/Object | undefined |
| loading           | 是否显示加载状态                                                                                                               | Boolean        | false     |
| shape             | 气泡形状，可选值：''/'round'/'corner'                                                                                          | String         | ''        |
| isMarkdown        | 是否解析 Markdown 内容                                                                                                         | Boolean        | false     |
| isFog             | 是否启用雾化效果                                                                                                               | Boolean        | false     |

## 方法

| 方法名         | 说明             | 参数 | 返回值 |
| -------------- | ---------------- | ---- | ------ |
| interrupt      | 中断打字过程     | -    | -      |
| continueTyping | 继续被中断的打字 | -    | -      |
| restart        | 重新开始打字     | -    | -      |
| destroy        | 销毁组件实例     | -    | -      |

## 事件

| 事件名      | 说明             | 回调参数 |
| ----------- | ---------------- | -------- |
| start       | 打字开始事件     | 组件实例 |
| writing     | 打字进行事件     | 组件实例 |
| finish      | 打字完成事件     | 组件实例 |
| avatarError | 头像加载错误事件 | 错误对象 |

## 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| avatar  | 自定义头像内容     |
| header  | 自定义气泡头部内容 |
| content | 自定义气泡主体内容 |
| footer  | 自定义气泡底部内容 |
| loading | 自定义加载状态内容 |
