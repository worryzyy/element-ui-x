# FilesCard 文件卡片组件

## 功能说明

文件卡片组件，用于展示文件信息和提供文件操作，支持以下特性：

- 文件类型图标自动识别（支持 40+种文件类型）
- 文件预览和下载功能
- 支持自定义操作按钮
- 可配置的文件信息展示
- 多种状态显示（上传中、完成、错误）
- 图片文件特殊处理（支持预览和变体布局）
- 自定义图标颜色和大小

## 使用示例

### 基本用法

展示不同文件类型的卡片组件。

:::demo

```html
<template>
  <div class="files-card-container">
    <el-x-files-card name="测试文件" />
    <el-x-files-card name="测试文件.pdf" />
    <el-x-files-card name="测试doc后缀.doc" />
    <el-x-files-card name="测试xls后缀.xls" />
    <el-x-files-card name="测试ppt后缀.ppt" />
    <el-x-files-card name="测试txt后缀.txt" />
    <el-x-files-card name="测试pdf后缀.pdf" />
    <el-x-files-card name="测试png后缀.png" />
    <el-x-files-card name="测试jpg后缀.jpg" />
    <el-x-files-card name="测试gif后缀.gif" />
    <el-x-files-card name="测试mp4后缀.mp4" />
    <el-x-files-card name="测试mp3后缀.mp3" />
    <el-x-files-card name="测试zip后缀.zip" />
    <el-x-files-card name="测试rar后缀.rar" />
    <el-x-files-card name="测试7z后缀.7z" />
    <el-x-files-card name="测试lnk后缀.lnk" />
    <el-x-files-card name="测试obj后缀.obj" />
    <el-x-files-card name="测试fbx后缀.fbx" />
    <el-x-files-card name="测试glb后缀.glb" />
    <el-x-files-card name="测试sql后缀.sql" />
    <el-x-files-card name="测试db后缀.db" />
    <el-x-files-card name="测试md后缀.md" />
    <el-x-files-card name="测试js后缀.js" />
    <el-x-files-card name="测试py后缀.py" />
    <el-x-files-card name="测试java后缀.java" />
    <el-x-files-card name="测试php后缀.php" />
    <el-x-files-card name="测试json后缀.json" />
  </div>
</template>

<style>
  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
```

:::

### 状态设置

展示不同状态的文件卡片。

:::demo

```html
<template>
  <div class="files-card-container">
    <el-x-files-card name="uploading 测试文件.pdf" status="uploading" />
    <el-x-files-card name="done 测试文件.pdf" status="done" />
    <el-x-files-card name="error 测试文件.pdf" status="error" />
    <el-x-files-card
      name="uploading 测试文件.doc"
      status="uploading"
      :percent="50"
    />
    <el-x-files-card
      name="error 测试文件.doc"
      status="error"
      error-tip="自定义失败提示"
    />
  </div>
</template>

<style>
  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
```

:::

### 删除功能

展示带删除按钮的文件卡片。

:::demo

```html
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <el-x-files-card
      name="删除测试文件.md"
      show-del-icon
      @delete="handleDelete"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      handleDelete() {
        this.$message.success("删除成功");
      },
    },
  };
</script>
```

:::

### 图片文件展示

展示图片文件的不同变体和状态。

:::demo

```html
<template>
  <div class="files-card-container-wrapper">
    <span
      >图片文件 <span style="color: red;">可预览</span> 和
      <span style="color: red;">不可预览</span></span
    >
    <div class="files-card-container">
      <el-x-files-card
        name="可预览的图片.jpeg"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card name="无法预览的图片.jpeg" show-del-icon />
    </div>
    <span
      >图片文件
      <span style="color: red;">正方形变体</span> 其他格式不受变体属性影响</span
    >
    <div class="files-card-container">
      <el-x-files-card
        name="可预览的图片.jpeg"
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
        img-variant="square"
        show-del-icon
      />
      <el-x-files-card
        name="无法预览的图片.jpeg"
        img-variant="square"
        show-del-icon
      />
      <el-x-files-card
        name="其他文件不受变体影响.txt"
        img-variant="square"
        show-del-icon
        :file-size="30000"
      />
    </div>
    <span
      >图片文件 默认长方形变体
      <span style="color: red;"
        >支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span
      ></span
    >
    <div class="files-card-container">
      <el-x-files-card
        name="上传进度.jpeg"
        :percent="50"
        status="uploading"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="上传失败.jpeg"
        status="error"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="关闭预览悬停遮罩.jpeg"
        :img-preview-mask="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="关闭预览功能.jpeg"
        :img-preview="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
    </div>

    <span
      >图片文件 正方形变体
      <span style="color: red;"
        >支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span
      ></span
    >
    <div class="files-card-container">
      <el-x-files-card
        name="上传进度.jpeg"
        img-variant="square"
        :percent="50"
        status="uploading"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="上传失败.jpeg"
        img-variant="square"
        status="error"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="上传完成.jpeg"
        img-variant="square"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="关闭预览悬停遮罩.jpeg"
        img-variant="square"
        :img-preview-mask="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="关闭预览功能.jpeg"
        img-variant="square"
        :img-preview="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
    </div>
  </div>
</template>

<style>
  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .files-card-container-wrapper {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
</style>
```

:::

### 自定义颜色

通过 iconColor 属性自定义图标颜色。

:::demo

```html
<template>
  <div class="files-card-container-wrapper">
    <p>自定义颜色1</p>
    <div class="files-card-container">
      <el-x-files-card
        v-for="items in colorKeys"
        :key="items"
        v-bind="filesCardProps"
        :icon-color="colorMap1[items]"
        :file-type="items"
      />
    </div>
    <p>自定义颜色2</p>
    <div class="files-card-container">
      <el-x-files-card
        v-for="items in colorKeys"
        :key="items"
        v-bind="filesCardProps"
        :icon-color="colorMap2[items]"
        :file-type="items"
      />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        colorMap1: {
          word: "#5E74A8",
          excel: "#4A6B4A",
          ppt: "#C27C40",
          pdf: "#5A6976",
          txt: "#D4C58C",
          mark: "#FFA500",
          image: "#8E7CC3",
          audio: "#A67B5B",
          video: "#4A5568",
          three: "#5F9E86",
          code: "#4B636E",
          database: "#4A5A6B",
          link: "#5D7CBA",
          zip: "#8B5E3C",
          file: "#AAB2BF",
          unknown: "#888888",
        },
        colorMap2: {
          word: "#0078D4",
          excel: "#4CB050",
          ppt: "#FF9933",
          pdf: "#E81123",
          txt: "#666666",
          mark: "#FFA500",
          image: "#B490F3",
          audio: "#00B2EE",
          video: "#2EC4B6",
          three: "#00C8FF",
          code: "#00589F",
          database: "#F5A623",
          link: "#007BFF",
          zip: "#888888",
          file: "#F0D9B5",
          unknown: "#D8D8D8",
        },
        filesCardProps: {
          uid: "1",
          name: "测试名称",
          description: "测试description",
        },
      };
    },
    computed: {
      colorKeys() {
        return Object.keys(this.colorMap1);
      },
    },
  };
</script>

<style>
  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .files-card-container-wrapper {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
</style>
```

:::

## 属性

| 参数           | 说明                                   | 类型          | 默认值      |
| -------------- | -------------------------------------- | ------------- | ----------- |
| uid            | 唯一标识                               | String/Number | -           |
| name           | 文件名                                 | String        | -           |
| fileSize       | 文件大小                               | String/Number | -           |
| fileType       | 文件类型                               | String        | -           |
| description    | 文件描述                               | String        | -           |
| url            | 文件 URL                               | String        | -           |
| thumbUrl       | 缩略图 URL                             | String        | -           |
| imgFile        | 图片文件对象                           | Object        | -           |
| iconSize       | 图标大小                               | String        | '42px'      |
| iconColor      | 图标颜色                               | String        | -           |
| showDelIcon    | 是否显示删除图标                       | Boolean       | false       |
| maxWidth       | 最大宽度                               | String        | '236px'     |
| styleConfig    | 自定义样式                             | Object        | -           |
| hoverStyle     | 悬停样式                               | Object        | -           |
| imgVariant     | 图片变体（'rectangle'或'square'）      | String        | 'rectangle' |
| imgPreview     | 是否开启图片预览                       | Boolean       | true        |
| imgPreviewMask | 是否显示图片预览遮罩                   | Boolean       | true        |
| status         | 文件状态（'uploading','done','error'） | String        | -           |
| percent        | 上传进度（0-100）                      | Number        | -           |
| errorTip       | 错误提示信息                           | String        | -           |

## 方法

| 方法名              | 说明             | 参数                 | 返回值 |
| ------------------- | ---------------- | -------------------- | ------ |
| handleDelete        | 处理删除操作     | -                    | -      |
| handlePreviewAction | 处理图片预览操作 | type: 'self'或'mask' | -      |

## 事件

| 事件名       | 说明               | 回调参数     |
| ------------ | ------------------ | ------------ |
| delete       | 点击删除按钮时触发 | 文件数据对象 |
| imagePreview | 图片预览时触发     | 文件数据对象 |
