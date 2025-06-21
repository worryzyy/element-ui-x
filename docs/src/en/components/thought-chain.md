# ThoughtChain

## Features

The ThoughtChain component is used to display the steps and logical chain of an AI's thinking process, supporting the following features:

- Collapsible thinking steps
- Markdown content rendering
- Logical connection display between steps
- Interactive display of the thinking process
- Custom timeline styles and icons
- Support for loading, error, and success status displays
- Gradient color timeline support

## Usage Examples

### Basic Usage

Displays a basic thought chain component with multiple thinking steps.

:::demo

```html
<template>
  <div>
    <el-x-thought-chain :thinking-items="thinkingItems" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        thinkingItems: [
          {
            id: 1,
            title: 'Step 1',
            thinkTitle: 'Understand the Problem',
            thinkContent: "Analyze the core points of the user's request.",
            status: 'success',
          },
          {
            id: 2,
            title: 'Step 2',
            thinkTitle: 'Gather Information',
            thinkContent: 'Retrieve relevant information from the knowledge base.',
            status: 'success',
          },
          {
            id: 3,
            title: 'Step 3',
            thinkTitle: 'Generate Answer',
            thinkContent: 'Construct an answer based on the gathered information.',
            status: 'loading',
          },
        ],
      };
    },
  };
</script>
```

:::

### Collapsible Thinking Steps

Displays detailed thinking content that can be collapsed and expanded.

:::demo

```html
<template>
  <div>
    <el-x-thought-chain
      :thinking-items="thinkingItems"
      :line-gradient="true"
      dot-size="small"
      @handle-expand="expandChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        thinkingItems: [
          {
            id: 1,
            title: 'Analysis Phase',
            thinkTitle: 'Problem Decomposition',
            thinkContent: 'Break down the complex problem into multiple sub-problems.',
            isCanExpand: true,
            isDefaultExpand: true,
            status: 'success',
          },
          {
            id: 2,
            title: 'Reasoning Phase',
            thinkTitle: 'Logical Deduction',
            thinkContent: 'Derive the solution step by step based on the sub-problems.',
            isCanExpand: true,
            status: 'success',
          },
        ],
      };
    },
    methods: {
      expandChange(item) {
        console.log('change', item);
      },
    },
  };
</script>
```

:::

### Custom Status and Styles

Customize the status and display style of the thinking steps.

:::demo

```html
<template>
  <div>
    <el-x-thought-chain
      :thinking-items="thinkingItems"
      :status-enum="customStatusEnum"
      max-width="800px"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customStatusEnum: {
          loading: {
            value: 'processing',
            type: 'primary',
          },
          error: {
            value: 'failed',
            type: 'danger',
          },
          success: {
            value: 'completed',
            type: 'success',
          },
        },
        thinkingItems: [
          {
            id: 1,
            title: 'Data Collection',
            status: 'completed',
            thinkTitle: 'Collecting user data',
            thinkContent: 'Fetching user history from the database.',
          },
          {
            id: 2,
            title: 'Analysis and Processing',
            status: 'processing',
            thinkTitle: 'Analyzing user behavior',
            thinkContent: 'Using machine learning models to analyze user preferences.',
          },
          {
            id: 3,
            title: 'Result Generation',
            status: 'failed',
            thinkTitle: 'Generating recommendations',
            thinkContent: 'Could not generate accurate recommendations due to insufficient data.',
          },
        ],
      };
    },
  };
</script>
```

:::

## Component Attributes

| Attribute       | Description                                                                                                               | Type    | Default Value                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| thinkingItems   | Array of thinking items, each containing information about a thinking step.                                               | Array   | []                                                                                                                                            |
| dotSize         | Size of the timeline node, can be 'mini'/'small'/'medium', or empty, consistent with `el-button`'s `size`.                | String  | 'small'                                                                                                                                       |
| maxWidth        | Maximum width of the component.                                                                                           | String  | '600px'                                                                                                                                       |
| lineGradient    | Whether to enable gradient color effect for the timeline.                                                                 | Boolean | false                                                                                                                                         |
| rowKey          | Specifies the unique identifier field for each item in `thinkingItems`.                                                   | String  | 'id'                                                                                                                                          |
| statusKey       | Specifies the status field in `thinkingItems`.                                                                            | String  | 'status'                                                                                                                                      |
| statusEnum      | Status enumeration configuration, including loading/error/success states.                                                 | Object  | { loading: { value: 'loading', type: 'warning' }, error: { value: 'error', type: 'danger' }, success: { value: 'success', type: 'success' } } |
| titleKey        | Specifies the title field in `thinkingItems`.                                                                             | String  | 'title'                                                                                                                                       |
| thinkTitleKey   | Specifies the thinking title field in `thinkingItems`.                                                                    | String  | 'thinkTitle'                                                                                                                                  |
| thinkContentKey | Specifies the thinking content field in `thinkingItems`.                                                                  | String  | 'thinkContent'                                                                                                                                |
| dotIsIcon       | Whether to use an icon instead of the default node. If true, `icon`/`iconColor`/`iconSize` can be set in `thinkingItems`. | Boolean | false                                                                                                                                         |

## `thinkingItems` Field Descriptions

Each object in the `thinkingItems` array can contain the following fields:

| Field Name      | Description                                                | Type           | Options/Default Value                        |
| --------------- | ---------------------------------------------------------- | -------------- | -------------------------------------------- | --- |
| id              | Unique identifier for the thinking item.                   | String/Number  | Required                                     |
| title           | Title of the thinking item.                                | String         | Required                                     |
| thinkTitle      | Thinking title of the item.                                | String         | Optional                                     |
| thinkContent    | Detailed content of the item.                              | String         | Optional                                     |
| status          | Status of the item.                                        | String         | 'loading'/'success'/'error' or custom status |
| isCanExpand     | Whether the item can be expanded.                          | Boolean        | false                                        |
| isDefaultExpand | Whether the item is expanded by default.                   | Boolean        | false                                        |
| hideTitle       | Whether to hide the title.                                 | Boolean        | false                                        |
| placement       | Position of the timeline item.                             | String         | 'top'/'bottom'                               |
| isMarkdown      | Whether the content is in Markdown format.                 | Boolean        | false                                        |
| typing          | Whether to enable the typewriter effect.                   | Boolean/Object | false or {interval: 50, step: 1, suffix: "   | "}  |
| icon            | Node icon class name (effective when `dotIsIcon` is true). | String         | 'el-icon-more'                               |
| iconColor       | Node icon color (effective when `dotIsIcon` is true).      | String         | ''                                           |
| iconSize        | Node icon size (effective when `dotIsIcon` is true).       | String         | 'normal'/'large'                             |

## Events

| Event Name    | Description                                           | Callback Parameters              |
| ------------- | ----------------------------------------------------- | -------------------------------- |
| handle-expand | Triggered when a thinking item is expanded/collapsed. | The current thinking item object |
