# Prompts

## Features

The Prompts component is used to display interactive prompt options, suitable for guided selection, quick operations, and other scenarios in AI conversations. It supports the following features:

- Switch between horizontal and vertical layouts
- Automatic wrapping and fixed layouts
- Nested prompt structures
- Custom styles and icons
- Disable state control

## Usage Examples

### Basic Usage

:::demo The basic usage demonstrates the fundamental features of the Prompts component, including icons, titles, and description text.

```html
<template>
  <div>
    <el-x-prompts
      :items="inspirationalItems"
      :title="'✨ Creative Inspirations & Brilliant Prompts'"
      @on-item-click="handleInspirationalItemClick"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
    <div class="demo-controls">
      <el-alert
        v-if="selectedItem"
        :title="`Selected: ${selectedItem.label}`"
        type="success"
        :closable="false"
        show-icon
      ></el-alert>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedItem: null,
        inspirationalItems: [
          {
            key: '1',
            icon: 'el-icon-sunrise',
            iconStyle: { color: '#FFD700' },
            label: 'Ignite Your Creativity',
            description: 'Any inspiration for a new project?',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: { color: '#1890FF' },
            label: 'Reveal Background Information',
            description: 'Help me understand the background of this topic.',
          },
          {
            key: '3',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            label: 'Efficiency Boost Battle',
            description: 'How can I work faster and better?',
          },
          {
            key: '4',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#52C41A' },
            label: 'Tell a joke',
            description: 'Why dont ants get sick? Because they have little antibodies!',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: 'Common Issue Solutions',
            description: 'How to solve common issues? Share some tips!',
          },
        ],
      };
    },
    methods: {
      handleInspirationalItemClick(info) {
        this.selectedItem = info.data;
        this.$message({
          message: `Clicked: ${info.data.label}`,
          type: 'success',
        });
      },
    },
  };
</script>

<style>
  .demo-controls {
    margin-top: 20px;
  }
</style>
```

:::

### Vertical Layout

:::demo Setting the `vertical` attribute to `true` arranges the prompt items vertically.

```html
<template>
  <div>
    <el-x-prompts
      :items="verticalItems"
      :vertical="true"
      :title="'🤔 You might also want to ask:'"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        verticalItems: [
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: { color: '#964B00' },
            label: 'Effective Rest',
            description: 'How to rest effectively after long hours of work?',
            disabled: false,
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#FAAD14' },
            label: 'Maintain a Positive Mindset',
            description: 'What are the secrets to maintaining a positive mindset?',
            disabled: false,
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            label: 'Stress Management',
            description: 'How to stay calm under immense pressure?',
            disabled: false,
          },
        ],
      };
    },
  };
</script>
```

:::

### Wrap Layout

:::demo Setting the `wrap` attribute to `true` allows prompt items to wrap automatically when the container width is insufficient.

```html
<template>
  <div>
    <el-x-prompts
      :items="wrapItems"
      :wrap="true"
      :title="'✨ Creative Inspirations & Brilliant Prompts'"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        wrapItems: [
          {
            key: '1',
            icon: 'el-icon-sunrise-1',
            iconStyle: { color: '#FFD700' },
            label: 'New Project Inspiration',
            description: 'Any inspiration for a new project?',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: { color: '#1890FF' },
            label: 'Background Information',
            description: 'Help me understand the background of this topic.',
          },
          {
            key: '3',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: 'Solve Common Issues',
            description: 'How to solve common issues? Share some tips!',
          },
          {
            key: '4',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            label: 'Improve Efficiency',
            description: 'How can I work faster and better?',
          },
          {
            key: '5',
            icon: 'el-icon-check',
            iconStyle: { color: '#52C41A' },
            label: 'Task Completion Tips',
            description: 'What are some tips for completing tasks?',
          },
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: { color: '#964B00' },
            label: 'Effective Rest',
            description: 'How to rest effectively after long hours of work?',
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#FAAD14' },
            label: 'Maintain a Positive Mindset',
            description: 'What are the secrets to maintaining a positive mindset?',
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            label: 'Stress Management',
            description: 'How to stay calm under immense pressure?',
          },
        ],
      };
    },
  };
</script>
```

:::

### Disabled State

:::demo Setting `disabled: true` disables an item.

```html
<template>
  <div>
    <el-x-prompts
      :items="relaxItems"
      :title="'☕️ Time to relax!'"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        relaxItems: [
          {
            key: '5',
            icon: 'el-icon-check',
            iconStyle: { color: '#52C41A' },
            label: 'Task Completion Secrets',
            description: 'What are some techniques for completing tasks?',
            disabled: true,
          },
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: { color: '#964B00' },
            label: 'Time for a coffee break',
            description: 'How to rest effectively after long hours of work?',
          },
        ],
      };
    },
  };
</script>
```

:::

### Custom Layout

### Custom Width and Style

:::demo Customize the width and style of prompt items by setting the `styles` attribute.

```html
<template>
  <div>
    <el-x-prompts
      :items="halfWidthItems"
      :wrap="true"
      :title="'✨ Creative Inspirations & Brilliant Prompts'"
      :styles="halfWidthStyles"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        halfWidthItems: [
          {
            key: '1',
            icon: 'el-icon-sunrise-1',
            iconStyle: { color: '#FFD700' },
            label: 'Ignite Your Creativity',
            description: 'Inspiration for a new project?',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: { color: '#1890FF' },
            label: 'Reveal Background Information',
            description: 'Help me understand the background of this topic.',
          },
          {
            key: '3',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            label: 'Efficiency Boost Battle',
            description: 'How can I work faster and better?',
          },
          {
            key: '4',
            icon: 'el-icon-ice-cream-round',
            iconStyle: { color: '#52C41A' },
            label: 'Tell a joke',
            description: 'Why dont ants get sick? Because they have little antibodies!',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: 'Common Issue Solutions',
            description: 'How to solve common issues? Share some tips!',
          },
        ],
        halfWidthStyles: {
          item: {
            flex: 'none',
            width: 'calc(50% - 6px)',
          },
        },
      };
    },
  };
</script>
```

:::

### Custom Styles

:::demo Customize the style of prompt items with the `styles` and `classNames` attributes.

```html
<template>
  <div>
    <el-x-prompts
      :items="basicItems"
      :title="'Custom Styled Prompt List'"
      :styles="customStyles"
      :class-names="customClassNames"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        basicItems: [
          {
            key: 'prompt1',
            label: 'Write an email',
            description: 'Help you compose a professional email',
          },
          {
            key: 'prompt2',
            label: 'Generate code',
            description: 'Generate code snippets from a description',
          },
          {
            key: 'prompt3',
            label: 'Summarize content',
            description: 'Summarize a long text',
          },
        ],
        customStyles: {
          item: {
            borderColor: '#67C23A',
            borderRadius: '8px',
            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
          },
          title: {
            color: '#409EFF',
            fontWeight: 'bold',
          },
        },
        customClassNames: {
          list: 'custom-list',
          item: 'custom-item',
        },
      };
    },
    methods: {
      handleItemClick(info) {
        this.selectedItem = info.data;
        this.$message({
          message: `You selected: ${info.data.label}`,
          type: 'success',
        });
      },
    },
  };
</script>

<style>
  .custom-list {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 4px;
  }

  .custom-item {
    transition: all 0.3s;
  }

  .custom-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
</style>
```

:::

### Nested Prompts

:::demo Create nested prompt structures by setting the `children` attribute in `items`.

```html
<template>
  <div>
    <el-x-prompts
      :items="antdItems"
      :title="'What do you need?'"
      :wrap="true"
      :styles="antdStyles"
      @on-item-click="handleAntdItemClick"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        antdItems: [
          {
            key: '1',
            label: 'Hot Topics',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            description: 'What are you interested in?',
            children: [
              {
                key: '1-1',
                description: 'What is the latest news about X?',
              },
              {
                key: '1-2',
                description: 'What is AGI?',
              },
              {
                key: '1-3',
                description: 'Where is the documentation?',
              },
            ],
          },
          {
            key: '2',
            label: 'Design Guidelines',
            icon: 'el-icon-reading',
            iconStyle: { color: '#1890FF' },
            description: 'How to design a good product?',
            children: [
              {
                key: '2-1',
                icon: 'el-icon-star-on',
                description: 'Understand user needs',
              },
              {
                key: '2-2',
                icon: 'el-icon-ice-cream-round',
                description: 'Set AI roles',
              },
              {
                key: '2-3',
                icon: 'el-icon-chat-dot-round',
                description: 'Express emotions',
              },
            ],
          },
        ],
        antdStyles: {
          item: {
            flex: 'none',
            width: 'calc(50% - 6px)',
            backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
            border: '0',
          },
          subItem: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
      };
    },
    methods: {
      handleAntdItemClick(info) {
        this.$message({
          message: `Clicked: ${info.data.key}`,
          type: 'success',
        });
      },
    },
  };
</script>
```

:::

## Attributes

| Attribute     | Description                             | Type    | Default |
| ------------- | --------------------------------------- | ------- | ------- |
| items         | A list of prompt items                  | Array   | []      |
| title         | Title displayed at the top of the list  | String  | ''      |
| vertical      | Whether the list is vertically arranged | Boolean | false   |
| wrap          | Whether the list items should wrap      | Boolean | false   |
| styles        | Custom styles for different parts       | Object  | {}      |
| classNames    | Custom class names for different parts  | Object  | {}      |
| rootClassName | The class name for the root node        | String  | ''      |
| customStyle   | Custom style                            | Object  | {}      |
| direction     | Direction                               | String  | 'ltr'   |

### items Data Structure

```js
[
  {
    key: 'unique_key', // Unique identifier
    icon: 'el-icon-star-off', // Icon class name
    iconStyle: { color: '#FFD700' }, // Icon style
    label: 'Option Title', // Option title
    description: 'Option description text', // Option description
    disabled: false, // Whether it is disabled
    children: [], // Nested child options
  },
  // more options...
];
```

### styles Object Structure

```js
{
  title: {}, // Title style
  list: {}, // List container style
  item: {}, // Option item style
  itemContent: {}, // Option content style
  subList: {}, // Sub-list style
  subItem: {} // Sub-option style
}
```

### classNames Object Structure

```js
{
  title: '', // Title class name
  list: '', // List container class name
  item: '', // Option item class name
  itemContent: '', // Option content class name
  subList: '', // Sub-list class name
  subItem: '' // Sub-option class name
}
```

## Events

| Event Name    | Description             | Callback Parameters                            |
| ------------- | ----------------------- | ---------------------------------------------- |
| on-item-click | Triggered on item click | { data: item } item is the clicked item object |

## Slots

| Slot Name   | Description                | Scope Parameters             |
| ----------- | -------------------------- | ---------------------------- |
| icon        | Custom icon content        | { item } current prompt item |
| label       | Custom label content       | { item } current prompt item |
| description | Custom description content | { item } current prompt item |
