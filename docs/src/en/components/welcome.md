# Welcome

## Features

The Welcome component is used to display the application's welcome screen and introductory information, supporting the following features:

- Customizable icon, title, and description content
- Switch between left and right layout directions
- Provides bordered and borderless style variants
- Extendable extra content area
- Flexible style customization capabilities

## Usage Examples

### Basic Usage

Basic usage of the Welcome component, displaying an icon, title, and description.

:::demo

```html
<template>
  <client-only>
    <el-x-welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="Welcome to Element UI X"
      description="An enterprise-level component library extension for Element UI"
    />
  </client-only>
</template>
```

:::

### Different Style Variants

Supports two style variants: `filled` and `borderless`.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-welcome
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Default Filled Style (filled)"
        description="A welcome component with a background color and border"
        style="margin-bottom: 20px;"
      />

      <el-x-welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Borderless Style (borderless)"
        description="A clean welcome component without a background or border"
      />
    </client-only>
  </div>
</template>
```

:::

### Layout Direction

Supports both left-to-right (ltr) and right-to-left (rtl) layout directions.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-welcome
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Left-to-Right Layout (ltr)"
        description="The default layout direction, suitable for most scenarios"
        style="margin-bottom: 20px;"
      />

      <el-x-welcome
        direction="rtl"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Right-to-Left Layout (rtl)"
        description="Suitable for right-to-left writing environments like Arabic"
      />
    </client-only>
  </div>
</template>
```

:::

### Extra Content Area

Add extra content through the `extra` attribute or slot.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-welcome
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Welcome Component with Extra Content"
        description="Add simple text content via the extra attribute"
        extra="2023-12-31"
        style="margin-bottom: 20px;"
      />

      <el-x-welcome
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Use a Slot to Add Complex Content"
        description="Interactive elements like buttons can be added via the extra slot"
      >
        <template #extra>
          <el-button
            type="primary"
            size="small"
          >
            Get Started
          </el-button>
        </template>
      </el-x-welcome>
    </client-only>
  </div>
</template>
```

:::

### Custom Icon

Customize the icon area content through the `image` slot.

:::demo

```html
<template>
  <client-only>
    <el-x-welcome
      title="Custom Icon Area"
      description="Use the image slot to customize the icon content"
    >
      <template #image>
        <div
          style="width: 64px; height: 64px; background: #409EFF; border-radius: 8px; display: flex; align-items: center; justify-content: center;"
        >
          <i
            class="el-icon-star-on"
            style="font-size: 32px; color: white;"
          ></i>
        </div>
      </template>
    </el-x-welcome>
  </client-only>
</template>
```

:::

### Style Customization

Use the `styleConfig` and `styles` attributes to customize the component's style.

:::demo

```html
<template>
  <client-only>
    <el-x-welcome
      icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      title="Custom Styles"
      description="Customize the component's appearance through style attributes"
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
  </client-only>
</template>
```

:::

## Attributes

| Attribute     | Description                                  | Type          | Options             | Default  |
| ------------- | -------------------------------------------- | ------------- | ------------------- | -------- |
| className     | Custom class name                            | String        | —                   | ''       |
| rootClassName | Custom class name for the root element       | String        | —                   | ''       |
| variant       | Component style variant                      | String        | filled / borderless | 'filled' |
| direction     | Layout direction                             | String        | ltr / rtl           | 'ltr'    |
| classNames    | Custom class name object for different parts | Object        | —                   | {}       |
| icon          | Icon image address                           | String        | —                   | ''       |
| title         | Title text                                   | String        | —                   | ''       |
| extra         | Extra content                                | String/Object | —                   | ''       |
| description   | Description text                             | String        | —                   | ''       |
| styleConfig   | Component container style                    | Object        | —                   | {}       |
| styles        | Custom style object for different parts      | Object        | —                   | {}       |

## Slots

| Slot Name | Description               |
| --------- | ------------------------- |
| image     | Custom icon area content  |
| extra     | Custom extra content area |
