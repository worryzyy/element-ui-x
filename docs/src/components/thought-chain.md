# ThoughtChain 思维链组件

## 功能说明

思维链组件，用于展示 AI 思考过程的步骤和逻辑链，支持以下特性：

- 可折叠的思考步骤
- 支持 Markdown 内容渲染
- 步骤之间的逻辑关联展示
- 可交互的思考过程展示
- 自定义时间线样式和图标
- 支持加载、错误和成功状态显示
- 渐变色时间线支持

## 使用示例

### 基础用法

展示基本的思维链组件，包含多个思考步骤。

:::demo

```html
<template>
  <div>
    <el-x-thoughtchain :thinking-items="thinkingItems" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        thinkingItems: [
          {
            id: 1,
            title: "第一步",
            thinkTitle: "理解问题",
            thinkContent: "分析用户需求的核心要点",
            status: "success",
          },
          {
            id: 2,
            title: "第二步",
            thinkTitle: "收集信息",
            thinkContent: "从知识库中检索相关信息",
            status: "success",
          },
          {
            id: 3,
            title: "第三步",
            thinkTitle: "生成回答",
            thinkContent: "基于收集的信息构建回答",
            status: "loading",
          },
        ],
      };
    },
  };
</script>
```

:::

### 可折叠的思考步骤

展示可折叠展开的详细思考内容。

:::demo

```html
<template>
  <div>
    <el-x-thoughtchain
      :thinking-items="thinkingItems"
      :line-gradient="true"
      dot-size="small"
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
            title: "分析阶段",
            thinkTitle: "问题分解",
            thinkContent: "将复杂问题拆解为多个子问题",
            isCanExpand: true,
            isDefaultExpand: true,
            status: "success",
          },
          {
            id: 2,
            title: "推理阶段",
            thinkTitle: "逻辑推理",
            thinkContent: "基于子问题逐步推导解决方案",
            isCanExpand: true,
            status: "success",
          },
        ],
      };
    },
  };
</script>
```

:::

### 自定义状态和样式

自定义思考步骤的状态和显示样式。

:::demo

```html
<template>
  <div>
    <el-x-thoughtchain
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
            value: "processing",
            type: "primary",
          },
          error: {
            value: "failed",
            type: "danger",
          },
          success: {
            value: "completed",
            type: "success",
          },
        },
        thinkingItems: [
          {
            id: 1,
            title: "数据收集",
            status: "completed",
            thinkTitle: "收集用户数据",
            thinkContent: "从数据库获取用户历史记录",
          },
          {
            id: 2,
            title: "分析处理",
            status: "processing",
            thinkTitle: "分析用户行为",
            thinkContent: "使用机器学习模型分析用户偏好",
          },
          {
            id: 3,
            title: "生成结果",
            status: "failed",
            thinkTitle: "生成推荐",
            thinkContent: "由于数据不足，无法生成准确推荐",
          },
        ],
      };
    },
  };
</script>
```

:::

## 组件属性

| 参数            | 说明                                                                                   | 类型    | 默认值                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| thinkingItems   | 思考项数组，每个项包含思考步骤信息                                                     | Array   | []                                                                                                                                            |
| dotSize         | 时间线节点大小，可选值：'mini'/'small'/'medium',或者为空,与`el-button`的`size`保持一致 | String  | 'small'                                                                                                                                       |
| maxWidth        | 组件最大宽度                                                                           | String  | '600px'                                                                                                                                       |
| lineGradient    | 是否启用时间线渐变色效果                                                               | Boolean | false                                                                                                                                         |
| rowKey          | 指定 thinkingItems 中每个项的唯一标识字段                                              | String  | 'id'                                                                                                                                          |
| statusKey       | 指定 thinkingItems 中状态字段                                                          | String  | 'status'                                                                                                                                      |
| statusEnum      | 状态枚举配置，包含 loading/error/success 等状态                                        | Object  | { loading: { value: 'loading', type: 'warning' }, error: { value: 'error', type: 'danger' }, success: { value: 'success', type: 'success' } } |
| titleKey        | 指定 thinkingItems 中标题字段                                                          | String  | 'title'                                                                                                                                       |
| thinkTitleKey   | 指定 thinkingItems 中思考标题字段                                                      | String  | 'thinkTitle'                                                                                                                                  |
| thinkContentKey | 指定 thinkingItems 中思考内容字段                                                      | String  | 'thinkContent'                                                                                                                                |
| dotIsIcon       | 是否使用图标替代默认节点，为 true 时可在 thinkingItems 中设置 icon/iconColor/iconSize  | Boolean | false                                                                                                                                         |

## thinkingItems 字段说明

thinkingItems 数组中每个对象可包含以下字段：

| 字段名          | 说明                                   | 类型           | 可选值/默认值                              |
| --------------- | -------------------------------------- | -------------- | ------------------------------------------ | --- |
| id              | 思考项的唯一标识                       | String/Number  | 必填                                       |
| title           | 思考项的标题                           | String         | 必填                                       |
| thinkTitle      | 思考项的思考标题                       | String         | 可选                                       |
| thinkContent    | 思考项的详细内容                       | String         | 可选                                       |
| status          | 思考项的状态                           | String         | 'loading'/'success'/'error' 或自定义状态   |
| isCanExpand     | 是否可展开                             | Boolean        | false                                      |
| isDefaultExpand | 是否默认展开                           | Boolean        | false                                      |
| hideTitle       | 是否隐藏标题                           | Boolean        | false                                      |
| placement       | 时间轴项的位置                         | String         | 'top'/'bottom'                             |
| isMarkdown      | 内容是否为 Markdown 格式               | Boolean        | false                                      |
| typing          | 是否启用打字机效果                     | Boolean/Object | false 或 {interval: 50, step: 1, suffix: " | "}  |
| icon            | 节点图标类名(dotIsIcon 为 true 时生效) | String         | 'el-icon-more'                             |
| iconColor       | 节点图标颜色(dotIsIcon 为 true 时生效) | String         | ''                                         |
| iconSize        | 节点图标大小(dotIsIcon 为 true 时生效) | String         | 'normal'/'large'                           |

## 方法

| 方法名       | 说明                      | 参数             | 返回值 |
| ------------ | ------------------------- | ---------------- | ------ |
| handleExpand | 处理折叠面板展开/收起事件 | item: 当前思考项 | -      |

## 事件

| 事件名       | 说明                      | 回调参数       |
| ------------ | ------------------------- | -------------- |
| handleExpand | 当思考项被展开/收起时触发 | 当前思考项对象 |
