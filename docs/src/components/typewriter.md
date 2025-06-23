# Typewriter 打字器组件

## 功能说明

模拟打字效果的文本展示组件，支持以下特性：

- 可配置的打字动画效果
- Markdown 内容渲染
- 代码语法高亮(通过 Prism.js)
- 光标雾化效果
- 插件系统扩展

## 使用示例

### 基础用法

最简单的打字效果，使用默认配置。

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

### 自定义打字速度和步长

通过 `typing` 属性配置打字速度和每次打字的字符数。

:::demo

```html
<template>
  <div>
    <div class="control-panel">
      <div class="control-item">
        <span>打字速度：</span>
        <el-slider
          v-model="typingConfig.interval"
          :min="10"
          :max="100"
          :step="5"
          :marks="{ 10: '快', 50: '中', 100: '慢' }"
          style="width: 200px;"
        />
      </div>
      <div class="control-item">
        <span>每次字符数：</span>
        <el-slider
          v-model="typingConfig.step"
          :min="1"
          :max="5"
          :step="1"
          style="width: 200px;"
        />
      </div>
    </div>

    <el-x-typewriter
      :content="speedContent"
      :typing="typingConfig"
      ref="speedDemo"
    />

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startSpeedDemo"
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
        speedContent:
          '通过配置可以调整打字速度和每次打字的字符数，实现不同的打字效果。速度越慢，interval值越大；步长越大，每次显示的字符越多。',
        typingConfig: {
          interval: 40,
          step: 2,
          suffix: '|',
        },
      };
    },
    methods: {
      startSpeedDemo() {
        this.$refs.speedDemo.restart();
      },
    },
  };
</script>

<style>
  .control-panel {
    margin-bottom: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 15px;
    background-color: #f8f8f8;
  }
  .control-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
</style>
```

:::

### 自定义光标

通过 `typing.suffix` 属性自定义光标字符。

:::demo

```html
<template>
  <div>
    <div class="control-panel">
      <div class="control-item">
        <span>光标字符：</span>
        <el-select
          v-model="cursorChar"
          placeholder="选择光标字符"
          style="width: 120px;"
        >
          <el-option
            label="|"
            value="|"
          ></el-option>
          <el-option
            label="_"
            value="_"
          ></el-option>
          <el-option
            label="❚"
            value="❚"
          ></el-option>
          <el-option
            label="▊"
            value="▊"
          ></el-option>
          <el-option
            label="➤"
            value="➤"
          ></el-option>
          <el-option
            label="😊"
            value="😊"
          ></el-option>
        </el-select>
      </div>
    </div>

    <el-x-typewriter
      :content="cursorContent"
      :typing="{ interval: 40, step: 1, suffix: cursorChar }"
      ref="cursorDemo"
    />

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startCursorDemo"
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
        cursorContent: '通过自定义光标字符，可以实现不同的视觉效果。尝试切换不同的光标字符来体验。',
        cursorChar: '|',
      };
    },
    methods: {
      startCursorDemo() {
        this.$refs.cursorDemo.restart();
      },
    },
  };
</script>
```

:::

### 雾化效果

通过 `isFog` 属性配置光标雾化效果，可以自定义雾化区域宽度和背景色。

:::demo

```html
<template>
  <div>
    <div class="control-panel">
      <div class="control-item">
        <span>雾化宽度：</span>
        <el-slider
          v-model="fogWidth"
          :min="50"
          :max="200"
          @change="updateFogConfig"
          style="width: 200px;"
        />
      </div>
      <div class="control-item">
        <span>背景颜色：</span>
        <el-color-picker
          v-model="fogConfig.bgColor"
          @change="updateFogConfig"
          size="small"
        />
        <span>{{ fogConfig.bgColor }}</span>
      </div>
    </div>

    <el-x-typewriter
      :content="fogContent"
      :typing="{ interval: 40, step: 1 }"
      :is-fog="fogConfig"
      ref="fogDemo"
    />

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startFogDemo"
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
        fogContent:
          '雾化效果可以增强打字过程的视觉体验，通过调整雾化宽度和背景色来匹配不同的设计风格。',
        fogWidth: 80,
        fogConfig: {
          bgColor: '#FFFFFF',
          width: '80px',
        },
      };
    },
    methods: {
      updateFogConfig() {
        this.fogConfig.width = `${this.fogWidth}px`;
      },
      startFogDemo() {
        this.$refs.fogDemo.restart();
      },
    },
  };
</script>
```

:::

### Markdown 渲染

通过 `isMarkdown` 属性启用 Markdown 内容渲染。

:::demo

```html
<template>
  <div>
    <el-x-typewriter
      :content="markdownContent"
      :typing="{ interval: 30, step: 2 }"
      :is-markdown="true"
      ref="markdownDemo"
    />

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startMarkdownDemo"
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
这是一个支持**Markdown**渲染的打字器效果演示。

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
      startMarkdownDemo() {
        this.$refs.markdownDemo.restart();
      },
    },
  };
</script>
```

:::

### 暂停与继续

使用 `interrupt()` 和 `continueTyping()` 方法控制打字过程的暂停和继续。

:::demo

```html
<template>
  <div>
    <el-x-typewriter
      :content="controlContent"
      :typing="{ interval: 40, step: 1 }"
      ref="controlDemo"
      @start="onStart"
      @writing="onWriting"
      @finish="onFinish"
      @interrupt="onInterrupt"
    />

    <div class="progress-bar">
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
          @click="startControl"
        >
          开始
        </el-button>
        <el-button
          size="small"
          type="warning"
          :disabled="!isTyping || progress >= 100"
          @click="pauseControl"
        >
          暂停
        </el-button>
        <el-button
          size="small"
          type="success"
          :disabled="isTyping || progress >= 100"
          @click="continueControl"
        >
          继续
        </el-button>
        <el-button
          size="small"
          @click="resetControl"
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
        controlContent:
          '这个示例展示了如何控制打字过程，包括开始、暂停、继续和重置功能。你可以通过下方的按钮来体验这些控制功能。',
        isTyping: false,
        progress: 0,
      };
    },
    methods: {
      startControl() {
        this.$refs.controlDemo.restart();
      },
      pauseControl() {
        this.$refs.controlDemo.interrupt();
      },
      continueControl() {
        this.$refs.controlDemo.continueTyping();
      },
      resetControl() {
        this.progress = 0;
        this.$refs.controlDemo.restart();
      },
      onStart() {
        this.isTyping = true;
      },
      onWriting({ progress }) {
        this.progress = progress;
        this.isTyping = true;
      },
      onFinish() {
        this.isTyping = false;
      },
      onInterrupt() {
        this.isTyping = false;
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
</style>
```

:::

### 完整功能演示

综合展示 Typewriter 组件的所有主要功能。

:::demo

```html
<template>
  <div>
    <el-x-typewriter
      :content="contentText"
      :typing="{
        interval: typingSpeed,
        step: 2,
        suffix: '❚',
      }"
      :is-fog="{
        bgColor: '#f0f0f0',
        width: '120px',
      }"
      :is-markdown="true"
      @start="handleStart"
      @writing="handleTyping"
      @finish="handleFinish"
      ref="completeDemo"
    />

    <div class="control-panel">
      <div class="control-item">
        <span>打字速度：</span>
        <el-slider
          v-model="typingSpeed"
          :min="10"
          :max="100"
          :step="5"
          style="width: 200px;"
        />
      </div>
      <div>当前进度: {{ progress }}%</div>
    </div>

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startComplete"
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
        contentText: `# 完整功能演示
- 支持**Markdown**渲染
- 代码高亮: \`const example = true\`
- 可配置的打字效果

\`\`\`javascript
// 示例代码
function demo() {
  console.log('Typewriter组件');
}
\`\`\``,
        typingSpeed: 40,
        progress: 0,
      };
    },
    methods: {
      handleStart() {
        console.log('打字开始');
      },
      handleTyping({ progress }) {
        this.progress = progress;
      },
      handleFinish(instance) {
        console.log('打字完成', instance);
      },
      startComplete() {
        this.$refs.completeDemo.restart();
      },
    },
  };
</script>
```

:::

## 属性

| 参数       | 说明                                                                                                                           | 类型           | 默认值 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------ |
| content    | 要显示的内容                                                                                                                   | String         | ''     |
| isMarkdown | 是否解析 Markdown 内容                                                                                                         | Boolean        | false  |
| typing     | 打字效果配置，设为 true 使用默认值或传入对象配置：<br>- interval: 打字间隔(ms)<br>- step: 每次打字字符数<br>- suffix: 光标字符 | Boolean/Object | false  |
| isFog      | 雾化效果配置，设为 true 使用默认值或传入对象配置：<br>- bgColor: 背景色<br>- width: 雾化宽度                                   | Boolean/Object | false  |
| highlight  | 自定义代码高亮函数，接收(code, lang)参数                                                                                       | Function       | -      |
| mdPlugins  | Markdown 插件数组                                                                                                              | Array          | -      |

## 方法

| 方法名         | 说明             | 参数 | 返回值                                                                                                                                            |
| -------------- | ---------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| startTyping    | 开始打字动画     | -    | -                                                                                                                                                 |
| finishTyping   | 立即完成打字     | -    | -                                                                                                                                                 |
| interrupt      | 中断打字过程     | -    | -                                                                                                                                                 |
| continueTyping | 继续被中断的打字 | -    | -                                                                                                                                                 |
| restart        | 重新开始打字     | -    | -                                                                                                                                                 |
| destroy        | 销毁组件实例     | -    | -                                                                                                                                                 |
| getInstance    | 获取组件实例 API | -    | 对象，包含：<br>- interrupt/continue/restart/destroy: 控制方法<br>- renderedContent: 渲染内容<br>- isTyping: 是否正在打字<br>- progress: 当前进度 |

## 事件

| 事件名    | 说明             | 回调参数                                                              |
| --------- | ---------------- | --------------------------------------------------------------------- |
| start     | 打字开始事件     | 无参数                                                                |
| writing   | 打字进行事件     | 对象，包含：<br>- progress: 当前进度<br>- renderedContent: 已渲染内容 |
| finish    | 打字完成事件     | getInstance()返回的对象                                               |
| interrupt | 打字中断事件     | getInstance()返回的对象                                               |
| continue  | 打字继续事件     | getInstance()返回的对象                                               |
| restart   | 打字重新开始事件 | getInstance()返回的对象                                               |
