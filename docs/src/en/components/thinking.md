# Thinking

## Features

The Thinking component is used to display the different states and content of an AI's thinking process. It supports the following features:

- Four thinking states: start, thinking, end, error
- Collapsible/expandable content area
- Customizable status icons and labels
- Automatic collapse function (after thinking is complete)
- Configurable button width, animation duration, and content area styles
- Supports custom display of status content

## Usage Examples

### Basic Usage

Basic usage of the Thinking component, showing the effects of different states.

:::demo

```html
<template>
  <div>
    <el-x-thinking status="start" />

    <el-x-thinking
      status="thinking"
      content="Processing your request..."
      style="margin-top: 20px;"
    />

    <el-x-thinking
      status="end"
      content="Thinking complete. Results are as follows: 1. First point 2. Second point"
      style="margin-top: 20px;"
    />

    <el-x-thinking
      status="error"
      style="margin-top: 20px;"
    />
  </div>
</template>
```

:::

### Custom Status Content

Customize the display content for different states using slots.

:::demo

```html
<template>
  <div>
    <el-x-thinking status="thinking">
      <template #status-icon="{ status }">
        <i
          v-if="status === 'thinking'"
          class="el-icon-loading"
        ></i>
      </template>

      <template #label="{ status }">
        {{ status === 'thinking' ? 'AI is thinking...' : status === 'error' ? 'An error occurred' :
        status === 'end' ? 'Completed' : 'Start thinking' }}
      </template>

      <template #content="{ content }">
        <div class="custom-content">
          <pre>{{ content }}</pre>
        </div>
      </template>
    </el-x-thinking>
  </div>
</template>

<style>
  .custom-content {
    padding: 10px;
    background: #f5f7fa;
    border-radius: 4px;
  }
</style>
```

:::

### Auto Collapse Function

Configure the `autoCollapse` attribute to automatically collapse the content area after thinking is complete.

:::demo

```html
<template>
  <div>
    <el-x-thinking
      :status="status"
      auto-collapse
      content="This is an example of auto-collapse. The content area will automatically collapse when the status changes to 'end'."
    />

    <div style="margin-top: 20px;">
      <el-button-group>
        <el-button
          size="small"
          @click="status = 'start'"
        >
          Start
        </el-button>
        <el-button
          size="small"
          @click="status = 'thinking'"
        >
          Thinking
        </el-button>
        <el-button
          size="small"
          @click="status = 'end'"
        >
          End
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: 'start',
      };
    },
  };
</script>
```

:::

## Attributes

| Attribute       | Description                                   | Type    | Default   | Options                             |
| --------------- | --------------------------------------------- | ------- | --------- | ----------------------------------- |
| content         | The content text to display                   | String  | ''        | -                                   |
| modelValue      | Controls whether the content area is expanded | Boolean | true      | -                                   |
| status          | The thinking state                            | String  | 'start'   | 'start', 'thinking', 'end', 'error' |
| disabled        | Whether to disable button interaction         | Boolean | false     | -                                   |
| autoCollapse    | Whether to auto-collapse after thinking       | Boolean | false     | -                                   |
| buttonWidth     | The width of the button                       | String  | '160px'   | -                                   |
| duration        | The duration of the animation                 | String  | '0.2s'    | -                                   |
| maxWidth        | The max-width of the content area             | String  | '500px'   | -                                   |
| backgroundColor | The background color of the content area      | String  | '#fcfcfc' | -                                   |
| color           | The text color of the content area            | String  | '#909399' | -                                   |

## Methods

| Method Name  | Description                        | Parameters | Return Value |
| ------------ | ---------------------------------- | ---------- | ------------ |
| changeExpand | Toggles the content area expansion | -          | -            |

## Events

| Event Name      | Description                                   | Callback Parameters                |
| --------------- | --------------------------------------------- | ---------------------------------- |
| change          | Triggered when the expansion state changes    | { value: Boolean, status: String } |
| update:expanded | Triggered on expansion state change (v-model) | Boolean                            |
| update:status   | Triggered on status change (v-model)          | String                             |

## Slots

| Slot Name   | Description                 | Scope Parameters |
| ----------- | --------------------------- | ---------------- |
| status-icon | Custom status icon          | { status }       |
| label       | Custom status label text    | { status }       |
| arrow       | Custom expand arrow icon    | -                |
| content     | Custom content area display | { content }      |
| error       | Custom error state content  | { errorContent } |
