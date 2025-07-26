# Bubble Chat Bubble Component

## Features

Chat bubble component for displaying conversation content, supporting the following features:

- Custom bubble styles and colors
- Support for user and bot role layouts
- Adaptive content width
- Markdown content rendering support
- Typewriter effect integration
- Loading state display
- Custom avatar and layout

## Usage Examples

### Basic Usage

Basic bubble component usage, demonstrating bubble effects at different positions.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble
        content="This is a basic left-side bubble example, typically used to display bot or other party messages."
        avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        :avatarSize="40"
        placement="start"
      />

      <div style="margin-top: 20px;">
        <el-x-bubble
          content="This is a basic right-side bubble example, typically used to display user's own messages."
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png"
          placement="end"
        ></el-x-bubble>
      </div>
    </client-only>
  </div>
</template>
```

:::

### Different Bubble Styles

Configure different styles and shapes of bubbles through `variant` and `shape` properties.

:::demo

```html
<template>
  <div>
    <client-only>
      <div class="bubble-row">
        <el-x-bubble
          content="Default filled style (filled)"
          variant="filled"
          placement="start"
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        />
      </div>

      <div class="bubble-row">
        <el-x-bubble
          content="Borderless style (borderless)"
          variant="borderless"
          placement="start"
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        />
      </div>

      <div class="bubble-row">
        <el-x-bubble
          content="Outlined style (outlined)"
          variant="outlined"
          placement="start"
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        />
      </div>

      <div class="bubble-row">
        <el-x-bubble
          content="Shadow style (shadow)"
          variant="shadow"
          placement="start"
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        />
      </div>

      <div class="bubble-row">
        <el-x-bubble
          content="Round style (shape='round')"
          shape="round"
          placement="start"
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        />
      </div>

      <div class="bubble-row">
        <el-x-bubble
          content="Corner style (shape='corner')"
          shape="corner"
          placement="start"
          :avatarSize="40"
          avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        />
      </div>
    </client-only>
  </div>
</template>

<style>
  .bubble-row {
    margin-bottom: 15px;
  }
</style>
```

:::

### Typewriter Effect

Enable typewriter effect through `typing` property to simulate real-time input.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble
        :content="typingContent"
        :typing="typingConfig"
        avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        :avatarSize="40"
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
            Start
          </el-button>
          <el-button
            size="small"
            type="warning"
            :disabled="!isTyping"
            @click="pauseTyping"
          >
            Pause
          </el-button>
          <el-button
            size="small"
            type="success"
            :disabled="isTyping || progress >= 100"
            @click="continueTyping"
          >
            Continue
          </el-button>
        </el-button-group>
      </div>
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typingContent:
          'This is a bubble example with typewriter effect that can simulate real-time input. You can control the typing process through the buttons below.',
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

### Loading State

Display loading state through `loading` property, supporting custom loading animations.

:::demo

```html
<template>
  <div>
    <client-only>
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
            <span style="margin-left: 5px;">Typing...</span>
          </template>
        </el-x-bubble>
      </div>
    </client-only>
  </div>
</template>
```

:::

### Markdown Rendering

Enable Markdown content rendering through `isMarkdown` property.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble
        :content="markdownContent"
        :is-markdown="true"
        :is-fog="true"
        :typing="{ interval: 30, step: 2 }"
        :avatarSize="40"
        avatar="https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png"
        placement="start"
        ref="markdownDemo"
      />

      <div class="demo-controls">
        <el-button
          size="small"
          type="primary"
          @click="startMarkdown"
        >
          Preview
        </el-button>
      </div>
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        markdownContent: `# Markdown Example
This is a bubble component that supports **Markdown** rendering.

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
      startMarkdown() {
        this.$refs.markdownDemo.restart();
      },
    },
  };
</script>
```

:::

### Custom Avatar and Content

Use slots to customize bubble avatar and content.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble placement="start">
        <template #avatar>
          <el-avatar
            :size="40"
            icon="el-icon-user-solid"
            style="background-color: #409EFF;"
          ></el-avatar>
        </template>

        <template #header>
          <div style="font-weight: bold; margin-bottom: 5px;">Custom Header</div>
        </template>

        <template #content>
          <div style="padding: 10px;">
            <p>This is a custom content example using content slot.</p>
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
    </client-only>
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

## Attributes

| Parameter    | Description                                                                                                                                                                | Type           | Default   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------- |
| content      | Bubble content text                                                                                                                                                        | String         | ''        |
| avatar       | Avatar image URL                                                                                                                                                           | String         | ''        |
| placement    | Bubble position, options: 'start'(left)/'end'(right)                                                                                                                       | String         | 'start'   |
| variant      | Bubble style, options: 'filled'/'borderless'/'outlined'/'shadow'                                                                                                           | String         | 'filled'  |
| maxWidth     | Maximum width of bubble                                                                                                                                                    | String         | '500px'   |
| avatarSize   | Avatar size                                                                                                                                                                | Number         | 0         |
| avatarGap    | Gap between avatar and bubble                                                                                                                                              | String         | '12px'    |
| avatarShape  | Avatar shape, options: 'circle'/'square'                                                                                                                                   | String         | 'circle'  |
| avatarSrcSet | Avatar image srcset attribute                                                                                                                                              | String         | ''        |
| avatarAlt    | Avatar image alt attribute                                                                                                                                                 | String         | ''        |
| avatarFit    | Avatar image fit mode                                                                                                                                                      | String         | 'cover'   |
| noStyle      | Whether to remove default styles                                                                                                                                           | Boolean        | false     |
| typing       | Typewriter effect configuration, set to true for default or pass object config:<br>- interval: typing interval(ms)<br>- step: characters per step<br>- suffix: cursor char | Boolean/Object | undefined |
| loading      | Whether to show loading state                                                                                                                                              | Boolean        | false     |
| shape        | Bubble shape, options: ''/'round'/'corner'                                                                                                                                 | String         | ''        |
| isMarkdown   | Whether to parse Markdown content                                                                                                                                          | Boolean        | false     |
| isFog        | Whether to enable fog effect                                                                                                                                               | Boolean        | false     |

## Methods

| Method Name    | Description                 | Parameters | Return Value |
| -------------- | --------------------------- | ---------- | ------------ |
| interrupt      | Interrupt typing process    | -          | -            |
| continueTyping | Continue interrupted typing | -          | -            |
| restart        | Restart typing              | -          | -            |
| destroy        | Destroy component instance  | -          | -            |

## Events

| Event Name  | Description                | Callback Parameters |
| ----------- | -------------------------- | ------------------- |
| start       | Typing start event         | Component instance  |
| writing     | Typing progress event      | Component instance  |
| finish      | Typing complete event      | Component instance  |
| avatarError | Avatar loading error event | Error object        |

## Slots

| Slot Name | Description                  |
| --------- | ---------------------------- |
| avatar    | Custom avatar content        |
| header    | Custom bubble header content |
| content   | Custom bubble main content   |
| footer    | Custom bubble footer content |
| loading   | Custom loading state content |
