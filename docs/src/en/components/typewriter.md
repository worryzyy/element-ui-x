# Typewriter

## Features

A text display component that simulates typing effects, supporting the following features:

- Configurable typing animation effects
- Markdown content rendering
- Code syntax highlighting (via Prism.js)
- Cursor fog effects
- Plugin system extensions

## Usage Examples

### Basic Usage

The simplest typing effect using default configuration.

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
          'This is a basic typing effect demonstration, showcasing the fundamental features of the Typewriter component.',
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

### Custom Typing Speed and Step

Configure typing speed and characters per typing step through the `typing` property.

:::demo

```html
<template>
  <div>
    <div class="control-panel">
      <div class="control-item">
        <span>Typing Speed:</span>
        <el-slider
          v-model="typingConfig.interval"
          :min="10"
          :max="100"
          :step="5"
          :marks="{ 10: 'Fast', 50: 'Medium', 100: 'Slow' }"
          style="width: 200px;"
        />
      </div>
      <div class="control-item">
        <span>Characters per Step:</span>
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
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        speedContent:
          'You can adjust typing speed and characters per step through configuration to achieve different typing effects. The slower the speed, the larger the interval value; the larger the step, the more characters displayed each time.',
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

### Custom Cursor

Customize cursor characters through the `typing.suffix` property.

:::demo

```html
<template>
  <div>
    <div class="control-panel">
      <div class="control-item">
        <span>Cursor Character:</span>
        <el-select
          v-model="cursorChar"
          placeholder="Select cursor character"
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
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cursorContent:
          'Different visual effects can be achieved through custom cursor characters. Try switching different cursor characters to experience.',
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

### Fog Effect

Configure cursor fog effects through the `isFog` property, allowing customization of fog area width and background color.

:::demo

```html
<template>
  <div>
    <div class="control-panel">
      <div class="control-item">
        <span>Fog Width:</span>
        <el-slider
          v-model="fogWidth"
          :min="50"
          :max="200"
          @change="updateFogConfig"
          style="width: 200px;"
        />
      </div>
      <div class="control-item">
        <span>Background Color:</span>
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
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fogContent:
          'Fog effects can enhance the visual experience of the typing process, matching different design styles by adjusting fog width and background color.',
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

### Markdown Rendering

Enable Markdown content rendering through the `isMarkdown` property.

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
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        markdownContent: `# Markdown Example
This is a typewriter effect demonstration that supports **Markdown** rendering.

## Features
- Support for headings
- Support for **bold** and *italic*
- Support for code blocks

\`\`\`javascript
// Example code
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

### Pause and Continue

Use `interrupt()` and `continueTyping()` methods to control pausing and continuing the typing process.

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
          Start
        </el-button>
        <el-button
          size="small"
          type="warning"
          :disabled="!isTyping || progress >= 100"
          @click="pauseControl"
        >
          Pause
        </el-button>
        <el-button
          size="small"
          type="success"
          :disabled="isTyping || progress >= 100"
          @click="continueControl"
        >
          Continue
        </el-button>
        <el-button
          size="small"
          @click="resetControl"
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
        controlContent:
          'This example demonstrates how to control the typing process, including start, pause, continue, and reset functions. You can experience these control functions through the buttons below.',
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

### Complete Feature Demonstration

Comprehensive demonstration of all major features of the Typewriter component.

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
        <span>Typing Speed:</span>
        <el-slider
          v-model="typingSpeed"
          :min="10"
          :max="100"
          :step="5"
          style="width: 200px;"
        />
      </div>
      <div>Current Progress: {{ progress }}%</div>
    </div>

    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="startComplete"
      >
        Preview
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contentText: `# Complete Feature Demo
- Support for **Markdown** rendering
- Code highlighting: \`const example = true\`
- Configurable typing effects

\`\`\`javascript
// Example code
function demo() {
  console.log('Typewriter Component');
}
\`\`\``,
        typingSpeed: 40,
        progress: 0,
      };
    },
    methods: {
      handleStart() {
        console.log('Typing started');
      },
      handleTyping({ progress }) {
        this.progress = progress;
      },
      handleFinish(instance) {
        console.log('Typing completed', instance);
      },
      startComplete() {
        this.$refs.completeDemo.restart();
      },
    },
  };
</script>
```

:::

## Attributes

| Parameter  | Description                                                                                                                                                                                    | Type           | Default |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| content    | Content to display                                                                                                                                                                             | String         | ''      |
| isMarkdown | Whether to parse Markdown content                                                                                                                                                              | Boolean        | false   |
| typing     | Typing effect configuration, set to true to use default values or pass object configuration:<br>- interval: typing interval(ms)<br>- step: characters per typing<br>- suffix: cursor character | Boolean/Object | false   |
| isFog      | Fog effect configuration, set to true to use default values or pass object configuration:<br>- bgColor: background color<br>- width: fog width                                                 | Boolean/Object | false   |
| highlight  | Custom code highlighting function, receives (code, lang) parameters                                                                                                                            | Function       | -       |
| mdPlugins  | Markdown plugin array                                                                                                                                                                          | Array          | -       |

## Methods

| Method Name    | Description                 | Parameters | Return Value                                                                                                                                                                     |
| -------------- | --------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| startTyping    | Start typing animation      | -          | -                                                                                                                                                                                |
| finishTyping   | Complete typing immediately | -          | -                                                                                                                                                                                |
| interrupt      | Interrupt typing process    | -          | -                                                                                                                                                                                |
| continueTyping | Continue interrupted typing | -          | -                                                                                                                                                                                |
| restart        | Restart typing              | -          | -                                                                                                                                                                                |
| destroy        | Destroy component instance  | -          | -                                                                                                                                                                                |
| getInstance    | Get component instance API  | -          | Object containing:<br>- interrupt/continue/restart/destroy: control methods<br>- renderedContent: rendered content<br>- isTyping: whether typing<br>- progress: current progress |

## Events

| Event Name | Description            | Callback Parameters                                                                       |
| ---------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| start      | Typing start event     | No parameters                                                                             |
| writing    | Typing progress event  | Object containing:<br>- progress: current progress<br>- renderedContent: rendered content |
| finish     | Typing complete event  | Object returned by getInstance()                                                          |
| interrupt  | Typing interrupt event | Object returned by getInstance()                                                          |
| continue   | Typing continue event  | Object returned by getInstance()                                                          |
| restart    | Typing restart event   | Object returned by getInstance()                                                          |
