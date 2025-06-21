# FilesCard

## Features

A file card component for displaying file information and providing file operations, with the following features:

- Automatic file type icon recognition (supports 40+ file types)
- File preview and download functions
- Support for custom action buttons
- Configurable file information display
- Multiple status displays (uploading, done, error)
- Special handling for image files (supports preview and layout variants)
- Custom icon color and size

## Usage Examples

### Basic Usage

Displays card components for different file types.

:::demo

```html
<template>
  <div class="files-card-container">
    <el-x-files-card name="Test File" />
    <el-x-files-card name="Test File.pdf" />
    <el-x-files-card name="Test doc suffix.doc" />
    <el-x-files-card name="Test xls suffix.xls" />
    <el-x-files-card name="Test ppt suffix.ppt" />
    <el-x-files-card name="Test txt suffix.txt" />
    <el-x-files-card name="Test pdf suffix.pdf" />
    <el-x-files-card name="Test png suffix.png" />
    <el-x-files-card name="Test jpg suffix.jpg" />
    <el-x-files-card name="Test gif suffix.gif" />
    <el-x-files-card name="Test mp4 suffix.mp4" />
    <el-x-files-card name="Test mp3 suffix.mp3" />
    <el-x-files-card name="Test zip suffix.zip" />
    <el-x-files-card name="Test rar suffix.rar" />
    <el-x-files-card name="Test 7z suffix.7z" />
    <el-x-files-card name="Test lnk suffix.lnk" />
    <el-x-files-card name="Test obj suffix.obj" />
    <el-x-files-card name="Test fbx suffix.fbx" />
    <el-x-files-card name="Test glb suffix.glb" />
    <el-x-files-card name="Test sql suffix.sql" />
    <el-x-files-card name="Test db suffix.db" />
    <el-x-files-card name="Test md suffix.md" />
    <el-x-files-card name="Test js suffix.js" />
    <el-x-files-card name="Test py suffix.py" />
    <el-x-files-card name="Test java suffix.java" />
    <el-x-files-card name="Test php suffix.php" />
    <el-x-files-card name="Test json suffix.json" />
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

### Status Settings

Displays file cards in different states.

:::demo

```html
<template>
  <div class="files-card-container">
    <el-x-files-card
      name="uploading test file.pdf"
      status="uploading"
    />
    <el-x-files-card
      name="done test file.pdf"
      status="done"
    />
    <el-x-files-card
      name="error test file.pdf"
      status="error"
    />
    <el-x-files-card
      name="uploading test file.doc"
      status="uploading"
      :percent="50"
    />
    <el-x-files-card
      name="error test file.doc"
      status="error"
      error-tip="Custom failure tip"
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

### Delete Functionality

Displays a file card with a delete button.

:::demo

```html
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <el-x-files-card
      name="delete test file.md"
      show-del-icon
      @delete="handleDelete"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      handleDelete() {
        this.$message.success('Delete successful');
      },
    },
  };
</script>
```

:::

### Image File Display

Displays different variants and states of image files.

:::demo

```html
<template>
  <div class="files-card-container-wrapper">
    <span>
      Image files with
      <span style="color: red;">preview</span>
      and
      <span style="color: red;">no preview</span>
    </span>
    <div class="files-card-container">
      <el-x-files-card
        name="Image with preview.jpeg"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Image without preview.jpeg"
        show-del-icon
      />
    </div>
    <span>
      Image file
      <span style="color: red;">square variant</span>
      . Other formats are not affected by the variant property.
    </span>
    <div class="files-card-container">
      <el-x-files-card
        name="Image with preview.jpeg"
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
        img-variant="square"
        show-del-icon
      />
      <el-x-files-card
        name="Image without preview.jpeg"
        img-variant="square"
        show-del-icon
      />
      <el-x-files-card
        name="Other files are not affected by variant.txt"
        img-variant="square"
        show-del-icon
        :file-size="30000"
      />
    </div>
    <span>
      Image file default rectangle variant
      <span style="color: red;">
        supports upload status, enabling/disabling preview, and enabling/disabling preview mask
      </span>
    </span>
    <div class="files-card-container">
      <el-x-files-card
        name="Uploading progress.jpeg"
        :percent="50"
        status="uploading"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Upload failed.jpeg"
        status="error"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Disable preview hover mask.jpeg"
        :img-preview-mask="false"
        show-del-icon
        @image-preview="imagePreviewEvent"
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Disable preview functionality.jpeg"
        :img-preview="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
    </div>

    <span>
      Image file square variant
      <span style="color: red;">
        supports upload status, enabling/disabling preview, and enabling/disabling preview mask
      </span>
    </span>
    <div class="files-card-container">
      <el-x-files-card
        name="Uploading progress.jpeg"
        img-variant="square"
        :percent="50"
        status="uploading"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Upload failed.jpeg"
        img-variant="square"
        status="error"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Upload complete.jpeg"
        img-variant="square"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Disable preview hover mask.jpeg"
        img-variant="square"
        :img-preview-mask="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
      <el-x-files-card
        name="Disable preview functionality.jpeg"
        img-variant="square"
        :img-preview="false"
        show-del-icon
        url="https://avatars.githubusercontent.com/u/76239030?v=4"
      />
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      imagePreviewEvent(e) {
        console.log(e);
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

### Customization

Customize the icon color with the `iconColor` attribute.
Customize styles with `styleConfig` and `hoverStyle` attributes.

:::demo

```html
<template>
  <div class="files-card-container-wrapper">
    <p>Custom Colors</p>
    <div class="files-card-container">
      <el-x-files-card
        v-for="items in colorKeys"
        :key="items"
        v-bind="filesCardProps"
        :icon-color="colorMap1[items]"
        :file-type="items"
      />
    </div>
    <p>Custom Style / Hover Style</p>
    <div class="files-card-container">
      <el-x-files-card
        :style-config="{
                backgroundColor: '#f0f9eb',
                border: '1px solid #67c23a',
                borderRadius: '20px',
              }"
        :hover-style="{
                'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
                'border-color': 'red',
                'background-color': 'rgba(255, 0, 0, 0.1)',
                cursor: 'pointer',
              }"
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
          word: '#5E74A8',
          excel: '#4A6B4A',
          ppt: '#C27C40',
          pdf: '#5A6976',
          txt: '#D4C58C',
          mark: '#FFA500',
          image: '#8E7CC3',
          audio: '#A67B5B',
          video: '#4A5568',
          three: '#5F9E86',
          code: '#4B636E',
          database: '#4A5A6B',
          link: '#5D7CBA',
          zip: '#8B5E3C',
          file: '#AAB2BF',
          unknown: '#888888',
        },
        colorMap2: {
          word: '#0078D4',
          excel: '#4CB050',
          ppt: '#FF9933',
          pdf: '#E81123',
          txt: '#666666',
          mark: '#FFA500',
          image: '#B490F3',
          audio: '#00B2EE',
          video: '#2EC4B6',
          three: '#00C8FF',
          code: '#00589F',
          database: '#F5A623',
          link: '#007BFF',
          zip: '#888888',
          file: '#F0D9B5',
          unknown: '#D8D8D8',
        },
        filesCardProps: {
          uid: '1',
          name: 'Test Name',
          description: 'Test description',
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

## Attributes

| Attribute      | Description                              | Type          | Default     |
| -------------- | ---------------------------------------- | ------------- | ----------- |
| uid            | Unique identifier                        | String/Number | -           |
| name           | File name                                | String        | -           |
| fileSize       | File size                                | String/Number | -           |
| fileType       | File type                                | String        | -           |
| description    | File description                         | String        | -           |
| url            | File URL                                 | String        | -           |
| thumbUrl       | Thumbnail URL                            | String        | -           |
| imgFile        | Image file object                        | Object        | -           |
| iconSize       | Icon size                                | String        | '42px'      |
| iconColor      | Icon color                               | String        | -           |
| showDelIcon    | Whether to show the delete icon          | Boolean       | false       |
| maxWidth       | Maximum width                            | String        | '236px'     |
| styleConfig    | Custom styles                            | Object        | -           |
| hoverStyle     | Hover styles                             | Object        | -           |
| imgVariant     | Image variant ('rectangle' or 'square')  | String        | 'rectangle' |
| imgPreview     | Whether to enable image preview          | Boolean       | true        |
| imgPreviewMask | Whether to show the image preview mask   | Boolean       | true        |
| status         | File status ('uploading','done','error') | String        | -           |
| percent        | Upload progress (0-100)                  | Number        | -           |
| errorTip       | Error tip message                        | String        | -           |

## Events

| Event Name    | Description                      | Callback Parameters |
| ------------- | -------------------------------- | ------------------- |
| delete        | Triggered on delete button click | File data object    |
| image-preview | Triggered on image preview       | File data object    |

## Slots

| Slot Name             | Description                  | Scope Parameters     |
| --------------------- | ---------------------------- | -------------------- |
| icon                  | Custom icon                  | item                 |
| content               | Custom content               | item                 |
| name-prefix           | Custom file name prefix      | item, prefix, suffix |
| name-suffix           | Custom file name suffix      | item, prefix, suffix |
| description           | Custom description           | item, prefix, suffix |
| del-icon              | Custom delete icon           | item                 |
| image-preview-actions | Custom image preview actions | item, prefix, suffix |
