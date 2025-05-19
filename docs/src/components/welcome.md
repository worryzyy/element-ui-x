# Welcome 欢迎页组件

## 功能说明

欢迎页组件，用于展示应用的欢迎界面和引导信息，支持以下特性：

- 可自定义图标、标题和描述内容
- 支持左右布局方向切换
- 提供边框和无边框样式变体
- 可扩展的额外内容区域
- 灵活的样式定制能力

## 使用示例

### 基础用法

基本的欢迎组件使用，展示图标、标题和描述。

:::demo

```vue
<template>
  <el-x-welcome
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
    title="欢迎使用 Element X UI"
    description="基于 Element UI 的企业级中后台组件库扩展"
  />
</template>
```

:::

### 不同样式变体

支持 filled 和 borderless 两种样式变体。

:::demo

```vue
<template>
  <div>
    <el-x-welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="默认填充样式 (filled)"
      description="带有背景色和边框的欢迎组件"
      style="margin-bottom: 20px;"
    />

    <el-x-welcome
      variant="borderless"
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="无边框样式 (borderless)"
      description="不带背景和边框的简洁欢迎组件"
    />
  </div>
</template>
```

:::

### 布局方向

支持从左到右(ltr)和从右到左(rtl)两种布局方向。

:::demo

```vue
<template>
  <div>
    <el-x-welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="从左到右布局 (ltr)"
      description="默认的布局方向，适合大多数场景"
      style="margin-bottom: 20px;"
    />

    <el-x-welcome
      direction="rtl"
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="从右到左布局 (rtl)"
      description="适合阿拉伯语等从右到左书写的语言环境"
    />
  </div>
</template>
```

:::

### 额外内容区域

通过 extra 属性或插槽添加额外内容。

:::demo

```vue
<template>
  <div>
    <el-x-welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="带有额外内容的欢迎组件"
      description="通过 extra 属性添加简单文本内容"
      extra="2023-12-31"
      style="margin-bottom: 20px;"
    />

    <el-x-welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="使用插槽添加复杂内容"
      description="通过 extra 插槽可以添加按钮等交互元素"
    >
      <template #extra>
        <el-button type="primary" size="small">开始使用</el-button>
      </template>
    </el-x-welcome>
  </div>
</template>
```

:::

### 自定义图标

通过 image 插槽自定义图标区域内容。

:::demo

```vue
<template>
  <el-x-welcome
    title="自定义图标区域"
    description="使用 image 插槽定制图标内容"
  >
    <template #image>
      <div
        style="width: 64px; height: 64px; background: #409EFF; border-radius: 8px; display: flex; align-items: center; justify-content: center;"
      >
        <i class="el-icon-star-on" style="font-size: 32px; color: white;"></i>
      </div>
    </template>
  </el-x-welcome>
</template>
```

:::

### 样式定制

使用 styleConfig 和 styles 属性定制组件样式。

:::demo

```vue
<template>
  <el-x-welcome
    icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
    title="自定义样式"
    description="通过样式属性定制组件外观"
    :styleConfig="{
      background: '#f0f9eb',
      border: '1px solid #e1f3d8',
      borderRadius: '12px',
    }"
    :styles="{
      icon: { background: '#f0f9eb' },
      title: { color: '#67c23a', fontSize: '18px' },
      description: { color: '#85ce61' },
    }"
  />
</template>
```

:::

## 属性

| 参数          | 说明                 | 类型          | 可选值              | 默认值   |
| ------------- | -------------------- | ------------- | ------------------- | -------- |
| className     | 自定义类名           | String        | —                   | ''       |
| rootClassName | 根元素自定义类名     | String        | —                   | ''       |
| variant       | 组件样式变体         | String        | filled / borderless | 'filled' |
| direction     | 布局方向             | String        | ltr / rtl           | 'ltr'    |
| classNames    | 各部分自定义类名对象 | Object        | —                   | {}       |
| icon          | 图标图片地址         | String        | —                   | ''       |
| title         | 标题文本             | String        | —                   | ''       |
| extra         | 额外内容             | String/Object | —                   | ''       |
| description   | 描述文本             | String        | —                   | ''       |
| styleConfig   | 组件容器样式         | Object        | —                   | {}       |
| styles        | 各部分自定义样式对象 | Object        | —                   | {}       |

## 插槽

| 插槽名 | 说明               |
| ------ | ------------------ |
| image  | 自定义图标区域内容 |
| extra  | 自定义额外内容区域 |
