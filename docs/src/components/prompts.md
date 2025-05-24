# Prompts 提示组件

## 功能说明

Prompts 提示组件用于展示交互式提示选项，适用于 AI 对话场景中的引导选择、快捷操作等场景，支持以下特性：

- 水平与垂直布局切换
- 自动换行与固定布局
- 嵌套提示结构
- 自定义样式与图标
- 禁用状态控制

## 使用示例

### 基础用法

:::demo 基础用法展示了 Prompts 组件的基本功能，包括图标、标题和描述文本。

```html
<template>
  <div>
    <el-x-prompts
      :items="inspirationalItems"
      :title="'✨ 创意灵感与精彩提示'"
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
        :title="`已选择: ${selectedItem.label}`"
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
            label: '点燃你的创造力',
            description: '有什么新项目的灵感吗？',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: { color: '#1890FF' },
            label: '揭示背景信息',
            description: '帮我了解这个主题的背景。',
          },
          {
            key: '3',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            label: '效率提升战',
            description: '我如何能工作得更快更好？',
          },
          {
            key: '4',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#52C41A' },
            label: '讲个笑话',
            description: '为什么蚂蚁不生病？因为它们有小小的抗体！',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: '常见问题解决方案',
            description: '如何解决常见问题？分享一些技巧！',
          },
        ],
      };
    },
    methods: {
      handleInspirationalItemClick(info) {
        this.selectedItem = info.data;
        this.$message({
          message: `点击了: ${info.data.label}`,
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

### 垂直排列

:::demo 通过设置 `vertical` 属性为 `true` 可以使提示项垂直排列。

```html
<template>
  <div>
    <el-x-prompts
      :items="verticalItems"
      :vertical="true"
      :title="'🤔 您可能还想问这些：'"
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
            label: '有效休息',
            description: '长时间工作后如何有效休息？',
            disabled: false,
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#FAAD14' },
            label: '保持积极心态',
            description: '保持积极心态的秘诀是什么？',
            disabled: false,
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            label: '压力管理',
            description: '如何在巨大压力下保持冷静？',
            disabled: false,
          },
        ],
      };
    },
  };
</script>
```

:::

### 换行布局

:::demo 通过设置 `wrap` 属性为 `true` 可以使提示项在容器宽度不足时自动换行。

```html
<template>
  <div>
    <el-x-prompts
      :items="wrapItems"
      :wrap="true"
      :title="'✨ 创意灵感与精彩提示'"
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
            label: '新项目灵感',
            description: '有什么新项目的灵感吗？',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: { color: '#1890FF' },
            label: '背景信息',
            description: '帮我了解这个主题的背景。',
          },
          {
            key: '3',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: '解决常见问题',
            description: '如何解决常见问题？分享一些技巧！',
          },
          {
            key: '4',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            label: '提高效率',
            description: '我如何能工作得更快更好？',
          },
          {
            key: '5',
            icon: 'el-icon-check',
            iconStyle: { color: '#52C41A' },
            label: '完成任务技巧',
            description: '有哪些完成任务的诀窍？',
          },
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: { color: '#964B00' },
            label: '有效休息',
            description: '长时间工作后如何有效休息？',
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: { color: '#FAAD14' },
            label: '保持积极心态',
            description: '保持积极心态的秘诀是什么？',
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            label: '压力管理',
            description: '如何在巨大压力下保持冷静？',
          },
        ],
      };
    },
  };
</script>
```

:::

### 禁用状态

:::demo 通过设置 `disabled: true` 可以将某一项禁用。

```html
<template>
  <div>
    <el-x-prompts
      :items="relaxItems"
      :title="'☕️ 是时候放松一下了！'"
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
            label: '任务完成秘诀',
            description: '有哪些完成任务的技巧？',
            disabled: true,
          },
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: { color: '#964B00' },
            label: '是时候喝杯咖啡了',
            description: '长时间工作后如何有效休息？',
          },
        ],
      };
    },
  };
</script>
```

:::

### 自定义布局

### 自定义宽度与样式

:::demo 通过设置 `styles` 属性可以自定义提示项的宽度和样式。

```html
<template>
  <div>
    <el-x-prompts
      :items="halfWidthItems"
      :wrap="true"
      :title="'✨ 创意灵感与精彩提示'"
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
            label: '点燃你的创造力',
            description: '有新项目的灵感吗？',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: { color: '#1890FF' },
            label: '揭示背景信息',
            description: '帮我了解这个主题的背景。',
          },
          {
            key: '3',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            label: '效率提升战',
            description: '我怎样才能工作得更快更好？',
          },
          {
            key: '4',
            icon: 'el-icon-ice-cream-round',
            iconStyle: { color: '#52C41A' },
            label: '讲个笑话',
            description: '为什么蚂蚁不生病？因为它们有小小的蚂蚁抗体！',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: { color: '#FF4D4F' },
            label: '常见问题解决方案',
            description: '如何解决常见问题？分享一些技巧！',
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

### 自定义样式

:::demo 通过 `styles` 和 `classNames` 属性可以自定义提示项的样式。

```html
<template>
  <div>
    <el-x-prompts
      :items="basicItems"
      :title="'自定义样式提示列表'"
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
            label: '编写邮件',
            description: '帮助您撰写专业的电子邮件',
          },
          {
            key: 'prompt2',
            label: '生成代码',
            description: '根据描述生成代码片段',
          },
          {
            key: 'prompt3',
            label: '内容总结',
            description: '对长文本进行摘要总结',
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
          message: `您选择了: ${info.data.label}`,
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

### 嵌套提示

:::demo 通过在 `items` 中设置 `children` 属性可以创建嵌套的提示结构。

```html
<template>
  <div>
    <el-x-prompts
      :items="antdItems"
      :title="'您需要什么？'"
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
            label: '热门话题',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            description: '你对什么感兴趣？',
            children: [
              {
                key: '1-1',
                description: 'X的最新动态是什么？',
              },
              {
                key: '1-2',
                description: '什么是AGI？',
              },
              {
                key: '1-3',
                description: '文档在哪里？',
              },
            ],
          },
          {
            key: '2',
            label: '设计指南',
            icon: 'el-icon-reading',
            iconStyle: { color: '#1890FF' },
            description: '如何设计一个好产品？',
            children: [
              {
                key: '2-1',
                icon: 'el-icon-star-on',
                description: '了解用户需求',
              },
              {
                key: '2-2',
                icon: 'el-icon-ice-cream-round',
                description: '设定AI角色',
              },
              {
                key: '2-3',
                icon: 'el-icon-chat-dot-round',
                description: '表达情感',
              },
            ],
          },
          {
            key: '3',
            label: '开始创作',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            description: '如何开始一个新项目？',
            children: [
              {
                key: '3-1',
                label: '快速开始',
                description: '安装Ant Design X',
              },
              {
                key: '3-2',
                label: '在线演练场',
                description: '无需安装，直接在网页上体验',
              },
            ],
          },
        ],
        antdStyles: {
          item: {
            flex: 'none',
            width: 'calc(30% - 6px)',
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
          message: `点击了: ${info.data.key}`,
          type: 'success',
        });
      },
    },
  };
</script>
```

:::

## 属性

| 参数          | 说明                                     | 类型    | 默认值 |
| ------------- | ---------------------------------------- | ------- | ------ |
| items         | 包含多个提示项的列表                     | Array   | []     |
| title         | 显示在提示列表顶部的标题                 | String  | ''     |
| vertical      | 提示列表是否垂直排列                     | Boolean | false  |
| wrap          | 提示列表是否换行                         | Boolean | false  |
| styles        | 自定义样式，用于各个提示项的不同部分     | Object  | {}     |
| classNames    | 自定义样式类名，用于各个提示项的不同部分 | Object  | {}     |
| rootClassName | 根节点的样式类名                         | String  | ''     |
| customStyle   | 自定义样式                               | Object  | {}     |
| direction     | 方向                                     | String  | 'ltr'  |

### items 数据结构

```js
[
  {
    key: 'unique_key', // 唯一标识
    icon: 'el-icon-star-off', // 图标类名
    iconStyle: { color: '#FFD700' }, // 图标样式
    label: '选项标题', // 选项标题
    description: '选项描述文本', // 选项描述
    disabled: false, // 是否禁用
    children: [], // 嵌套子选项
  },
  // 更多选项...
];
```

## 属性

| 参数          | 说明                                     | 类型    | 默认值 |
| ------------- | ---------------------------------------- | ------- | ------ |
| items         | 包含多个提示项的列表                     | Array   | []     |
| title         | 显示在提示列表顶部的标题                 | String  | ''     |
| vertical      | 提示列表是否垂直排列                     | Boolean | false  |
| wrap          | 提示列表是否换行                         | Boolean | false  |
| styles        | 自定义样式，用于各个提示项的不同部分     | Object  | {}     |
| classNames    | 自定义样式类名，用于各个提示项的不同部分 | Object  | {}     |
| rootClassName | 根节点的样式类名                         | String  | ''     |
| customStyle   | 自定义样式                               | Object  | {}     |
| direction     | 方向                                     | String  | 'ltr'  |

### styles 对象结构

```js
{
  title: {}, // 标题样式
  list: {}, // 列表容器样式
  item: {}, // 选项项样式
  itemContent: {}, // 选项内容样式
  subList: {}, // 子列表样式
  subItem: {} // 子选项样式
}
```

### classNames 对象结构

```js
{
  title: '', // 标题类名
  list: '', // 列表容器类名
  item: '', // 选项项类名
  itemContent: '', // 选项内容类名
  subList: '', // 子列表类名
  subItem: '' // 子选项类名
}
```

## 事件

| 事件名        | 说明             | 回调参数                                   |
| ------------- | ---------------- | ------------------------------------------ |
| on-item-click | 点击提示项时触发 | { data: item } item 为当前点击的提示项对象 |

## 插槽

| 插槽名      | 说明           | 作用域参数          |
| ----------- | -------------- | ------------------- |
| icon        | 自定义图标内容 | { item } 当前提示项 |
| label       | 自定义标签内容 | { item } 当前提示项 |
| description | 自定义描述内容 | { item } 当前提示项 |
