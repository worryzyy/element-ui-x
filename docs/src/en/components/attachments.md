# Attachments

## Features

Attachment upload component for file uploading and attachment management, supporting the following features:

- Drag and drop file upload
- File preview and progress display
- Support for multiple file types
- Custom upload behavior and restrictions
- Multiple layout modes (horizontal scroll, vertical scroll, wrap mode)
- Custom drag area
- Custom file list and navigation buttons

## Usage Examples

### Basic Usage

:::demo

```html
<template>
  <div>
    <el-x-attachments
      :file-list="files"
      :http-request="handleHttpRequest"
      :items="files"
      drag
      :before-upload="handleBeforUpload"
      :hide-upload="false"
      @upload-drop="handleUploadDrop"
      @delete-card="handleDeleteCard"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: [],
      };
    },
    methods: {
      handleBeforUpload(file) {
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('File size cannot exceed 2MB!');
          return false;
        }
        return true;
      },
      async handleUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('Folder upload is not allowed!');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleHttpRequest({ file });
          }
        }
      },
      async handleHttpRequest(options) {
        const formData = new FormData();
        formData.append('file', options.file);
        this.$message.info('Uploading...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: 'File uploaded successfully',
              fileName: options.file.name,
              uid: options.file.uid,
              fileSize: options.file.size,
              imgFile: options.file,
            };
            this.files.push({
              id: this.files.length,
              uid: res.uid,
              name: res.fileName,
              fileSize: res.fileSize,
              imgFile: res.imgFile,
              showDelIcon: true,
              imgVariant: 'square',
            });
            this.$message.success('Upload successful');
            resolve(res);
          }, 1000);
        });
      },
      handleDeleteCard(item, index) {
        this.files = this.files.filter(items => items.id !== item.id);
        this.$message.success('Delete successful');
      },
    },
  };
</script>
```

:::

### Different Scroll Modes

:::demo The component supports three scroll modes: horizontal scroll (scrollX), vertical scroll (scrollY), and wrap

```html
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div>Horizontal Scroll (scrollX)</div>
      <el-x-attachments
        :file-list="demoFiles"
        :http-request="handleDemoHttpRequest"
        :items="demoFiles"
        drag
        overflow="scrollX"
        :before-upload="handleBeforUpload"
        :hide-upload="false"
        @upload-drop="handleDemoUploadDrop"
        @delete-card="handleDemoDeleteCard"
      />
      <div>Vertical Scroll (scrollY)</div>
      <el-x-attachments
        :file-list="demoFiles"
        :http-request="handleDemoHttpRequest"
        :items="demoFiles"
        drag
        overflow="scrollY"
        :list-style="{ height: '200px' }"
        :before-upload="handleBeforUpload"
        :hide-upload="false"
        @upload-drop="handleDemoUploadDrop"
        @delete-card="handleDemoDeleteCard"
      />
      <div>Wrap Mode</div>
      <el-x-attachments
        :file-list="demoFiles"
        :http-request="handleDemoHttpRequest"
        :items="demoFiles"
        drag
        overflow="wrap"
        :before-upload="handleBeforUpload"
        :hide-upload="false"
        @upload-drop="handleDemoUploadDrop"
        @delete-card="handleDemoDeleteCard"
      />
    </div>
    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        @click="()=>{generateDemoFiles();$message.success('Generated 30 demo files')} "
      >
        Generate Demo Files
      </el-button>
      <el-button
        type="danger"
        @click="resetDemoFiles"
      >
        Clear Demo Files
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        demoFiles: [],
        colorMap: {
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
      };
    },
    mounted() {
      this.generateDemoFiles();
    },
    methods: {
      handleBeforUpload(file) {
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('File size cannot exceed 2MB!');
          return false;
        }
        return true;
      },
      async handleDemoUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('Folder upload is not allowed!');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleDemoHttpRequest({ file });
          }
        }
      },
      async handleDemoHttpRequest(options) {
        this.$message.info('Uploading...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: 'File uploaded successfully',
              fileName: options.file.name,
              uid: options.file.uid,
              fileSize: options.file.size,
              imgFile: options.file,
            };
            this.demoFiles.push({
              id: this.demoFiles.length,
              uid: res.uid,
              name: res.fileName,
              fileSize: res.fileSize,
              imgFile: res.imgFile,
              showDelIcon: true,
              imgVariant: 'square',
            });
            this.$message.success('Upload successful');
            resolve(res);
          }, 1000);
        });
      },
      handleDemoDeleteCard(item) {
        this.demoFiles = this.demoFiles.filter(items => items.id !== item.id);
        this.$message.success('Delete successful');
      },
      resetDemoFiles() {
        this.demoFiles = [];
      },
      generateDemoFiles() {
        const typeList = Object.keys(this.colorMap);
        this.demoFiles = [];

        for (let index = 0; index < 30; index++) {
          this.demoFiles.push({
            id: index,
            uid: index,
            name: `File${index}`,
            fileSize: 1024 * 2,
            fileType: typeList[Math.floor(Math.random() * typeList.length)],
            url: 'https://www.baidu.com',
            thumbUrl: 'https://www.baidu.com',
            imgFile: new File([], 'test.txt'),
            showDelIcon: true,
          });
        }
      },
    },
  };
</script>
```

:::

### Custom File List

:::demo Use the `file-list` slot to customize file list display

```html
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <el-x-attachments
        :file-list="customFiles"
        :http-request="handleCustomHttpRequest"
        :items="customFiles"
        :before-upload="handleBeforUpload"
        :hide-upload="false"
        @upload-change="handleDragUploadChange"
        @upload-success="handleDragUploadSuccess"
        @upload-error="handleDragUploadError"
        @upload-drop="handleCustomUploadDrop"
        @delete-card="handleCustomDeleteCard"
      >
        <template
          slot="file-list"
          slot-scope="{ items }"
        >
          <div
            class="file-lists"
            style="display: flex; flex-wrap: wrap; gap: 16px; padding: 8px;"
          >
            <div
              v-for="(item, index) in items"
              :key="index"
              class="custom-item"
              style="
                padding: 16px;
                border: 1px solid #e4e7ed;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                min-width: 180px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
              "
              @mouseenter="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.25)'"
              @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)'"
            >
              <!-- 装饰性背景点 -->
              <div
                style="
                position: absolute;
                top: -10px;
                right: -10px;
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
              "
              ></div>
              <div
                style="
                position: absolute;
                bottom: -5px;
                left: -5px;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.08);
                border-radius: 50%;
              "
              ></div>

              <div
                class="custom-item-name"
                style="
                  font-weight: 600;
                  color: #ffffff;
                  font-size: 14px;
                  line-height: 1.4;
                  margin-bottom: 4px;
                  word-break: break-all;
                "
              >
                📄 {{ item.name }}
              </div>
              <div
                v-if="item.fileSize"
                class="custom-item-size"
                style="
                  color: rgba(255, 255, 255, 0.8);
                  font-size: 12px;
                  background: rgba(255, 255, 255, 0.1);
                  padding: 4px 8px;
                  border-radius: 20px;
                  display: inline-block;
                  width: fit-content;
                "
              >
                📊 {{ (item.fileSize / 1024).toFixed(2) }} KB
              </div>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                style="
                  background: rgba(255, 255, 255, 0.15);
                  border: 1px solid rgba(255, 255, 255, 0.3);
                  color: white;
                  border-radius: 20px;
                  font-size: 12px;
                  padding: 6px 12px;
                  margin-top: auto;
                "
                @click="handleCustomDeleteCard(item, index)"
                @mouseenter="$event.target.style.background = 'rgba(245, 101, 101, 0.8)'"
                @mouseleave="$event.target.style.background = 'rgba(255, 255, 255, 0.15)'"
              >
                🗑️ Delete
              </el-button>
            </div>
          </div>
        </template>
      </el-x-attachments>
    </div>
    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        @click="()=>{generateCustomFiles();$message.success('Generated 5 custom demo files')} "
      >
        Generate Custom Files
      </el-button>
      <el-button
        type="danger"
        @click="resetCustomFiles"
      >
        Clear Custom Files
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customFiles: [],
      };
    },
    methods: {
      handleBeforUpload(file) {
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('File size cannot exceed 2MB!');
          return false;
        }
        return true;
      },
      handleDragUploadChange(file, fileList) {
        console.log('change1', file, fileList);
      },
      handleDragUploadSuccess(response, file, fileList) {
        console.log('Success1', response, file, fileList);
      },
      handleDragUploadError(error, file, fileList) {
        console.log('error', error, file, fileList);
      },
      async handleCustomUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('Folder upload is not allowed!');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleCustomHttpRequest({ file });
          }
        }
      },
      async handleCustomHttpRequest(options) {
        this.$message.info('Uploading...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: 'File uploaded successfully',
              fileName: options.file.name,
              uid: options.file.uid,
              fileSize: options.file.size,
              imgFile: options.file,
            };
            this.customFiles.push({
              id: this.customFiles.length,
              uid: res.uid,
              name: res.fileName,
              fileSize: res.fileSize,
              imgFile: res.imgFile,
              showDelIcon: true,
              imgVariant: 'square',
            });
            this.$message.success('Upload successful');
            resolve(res);
          }, 1000);
        });
      },
      handleCustomDeleteCard(item, index) {
        console.log('delete', item);
        this.customFiles = this.customFiles.filter(items => items.id !== item.id);
        this.$message.success('Delete successful');
      },
      handleDragUploadRemove(file, filelist) {
        console.log('delete');
      },
      resetCustomFiles() {
        this.customFiles = [];
      },
      generateCustomFiles() {
        this.customFiles = [];

        for (let index = 0; index < 5; index++) {
          this.customFiles.push({
            id: index,
            uid: index,
            name: `自定义文件${index}`,
            fileSize: 1024 * (index + 1),
            fileType: 'file',
            url: 'https://www.baidu.com',
            thumbUrl: 'https://www.baidu.com',
            imgFile: new File([], 'test.txt'),
            showDelIcon: true,
          });
        }
      },
    },
  };
</script>
```

:::

### Custom Drag Area

:::demo Use the `dragTarget` property to specify the target area for drag upload

```html
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <p>
        Enable fullscreen drag upload:
        <el-switch v-model="isFull" />
      </p>
      <el-x-attachments
        :file-list="dragFiles"
        :http-request="handleDragHttpRequest"
        :items="dragFiles"
        drag
        :drag-target="dragArea"
        :before-upload="handleBeforUpload"
        :hide-upload="false"
        @upload-drop="handleDragUploadDrop"
        @delete-card="handleDragDeleteCard"
      />

      <div
        id="drag-area"
        style="border: 2px dashed #ccc; padding: 20px; height: 250px; text-align: center; display: flex; align-items: center; justify-content: center;"
      >
        Drag files here to upload
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-button
        type="danger"
        @click="resetDragFiles"
      >
        Clear Files
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dragFiles: [],
        isFull: false,
        dragArea: 'drag-area',
      };
    },
    watch: {
      isFull: {
        handler(newVal) {
          if (newVal) {
            this.dragArea = document.body;
          } else {
            this.dragArea = 'drag-area';
          }
        },
        immediate: true,
      },
    },
    methods: {
      handleBeforUpload(file) {
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('File size cannot exceed 2MB!');
          return false;
        }
        return true;
      },

      async handleDragUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('Folder upload is not allowed!');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleDragHttpRequest({ file });
          }
        }
      },
      async handleDragHttpRequest(options) {
        this.$message.info('Uploading...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: 'File uploaded successfully',
              fileName: options.file.name,
              uid: options.file.uid,
              fileSize: options.file.size,
              imgFile: options.file,
            };
            this.dragFiles.push({
              id: this.dragFiles.length,
              uid: res.uid,
              name: res.fileName,
              fileSize: res.fileSize,
              imgFile: res.imgFile,
              showDelIcon: true,
              imgVariant: 'square',
            });
            this.$message.success('Upload successful');
            resolve(res);
          }, 1000);
        });
      },
      handleDragDeleteCard(item, index) {
        this.dragFiles = this.dragFiles.filter(items => items.id !== item.id);
        this.$message.success('Delete successful');
      },
      resetDragFiles() {
        this.dragFiles = [];
      },
    },
  };
</script>
```

:::

### Custom Navigation Buttons

:::demo Use `prev-button` and `next-button` slots to customize navigation buttons

```html
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="position: relative;">
        <el-x-attachments
          :file-list="navFiles"
          :http-request="handleNavHttpRequest"
          :items="navFiles"
          drag
          overflow="scrollX"
          :before-upload="handleBeforUpload"
          :hide-upload="false"
          @upload-drop="handleNavUploadDrop"
          @delete-card="handleNavDeleteCard"
        >
          <template
            slot="prev-button"
            slot-scope="{ show, onScrollLeft }"
          >
            <button
              v-if="show"
              class="custom-prev"
              @click="onScrollLeft"
            >
              👈
            </button>
          </template>
          <template
            slot="next-button"
            slot-scope="{ show, onScrollRight }"
          >
            <button
              v-if="show"
              class="custom-next"
              @click="onScrollRight"
            >
              👉
            </button>
          </template>
        </el-x-attachments>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        @click="()=>{generateNavFiles();$message.success('Generated 15 navigation demo files')}"
      >
        Generate Demo Files
      </el-button>
      <el-button
        type="danger"
        @click="resetNavFiles"
      >
        Clear Files
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navFiles: [],
      };
    },
    mounted() {
      this.generateNavFiles();
    },
    methods: {
      handleBeforUpload(file) {
        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('File size cannot exceed 2MB!');
          return false;
        }
        return true;
      },
      async handleNavUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('Folder upload is not allowed!');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleNavHttpRequest({ file });
          }
        }
      },
      async handleNavHttpRequest(options) {
        this.$message.info('Uploading...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: 'File uploaded successfully',
              fileName: options.file.name,
              uid: options.file.uid,
              fileSize: options.file.size,
              imgFile: options.file,
            };
            this.navFiles.push({
              id: this.navFiles.length,
              uid: res.uid,
              name: res.fileName,
              fileSize: res.fileSize,
              imgFile: res.imgFile,
              showDelIcon: true,
              imgVariant: 'square',
            });
            this.$message.success('Upload successful');
            resolve(res);
          }, 1000);
        });
      },
      handleNavDeleteCard(item, index) {
        this.navFiles = this.navFiles.filter(items => items.id !== item.id);
        this.$message.success('Delete successful');
      },
      resetNavFiles() {
        this.navFiles = [];
      },
      generateNavFiles() {
        this.navFiles = [];

        for (let index = 0; index < 15; index++) {
          this.navFiles.push({
            id: index,
            uid: index,
            name: `Navigation File ${index}`,
            fileSize: 1024 * (index + 1),
            fileType: 'file',
            url: 'https://www.baidu.com',
            thumbUrl: 'https://www.baidu.com',
            imgFile: new File([], 'test.txt'),
            showDelIcon: true,
          });
        }
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .custom-prev,
  .custom-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .custom-prev {
    left: 8px;
  }

  .custom-next {
    right: 8px;
  }

  .custom-prev:hover,
  .custom-next:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-color: rgba(255, 255, 255, 0.8);
  }
</style>
```

:::

## Attributes

| Parameter      | Description                                                              | Type                      | Default   |
| -------------- | ------------------------------------------------------------------------ | ------------------------- | --------- |
| items          | Attachment list data                                                     | Array                     | []        |
| overflow       | Layout overflow handling mode, options: `scrollX`, `scrollY`, `wrap`     | String                    | scrollX   |
| listStyle      | List container style                                                     | Object                    | {}        |
| uploadIconSize | Upload icon size                                                         | String                    | 64px      |
| dragTarget     | Drag upload target area, can be element ID, DOM element or Vue component | String/Object/HTMLElement | undefined |
| hideUpload     | Whether to hide upload button                                            | Boolean                   | false     |
| limit          | Maximum upload quantity limit                                            | Number                    | undefined |
| uploadAction   | Upload URL                                                               | String                    | #         |

## Events

| Event Name     | Description                         | Callback Parameters      |
| -------------- | ----------------------------------- | ------------------------ |
| upload-change  | Triggered when file status changes  | file, fileList           |
| upload-success | Triggered when file upload succeeds | response, file, fileList |
| upload-error   | Triggered when file upload fails    | error, file, fileList    |
| upload-drop    | Triggered when drag uploading files | files, props             |
| delete-card    | Triggered when deleting files       | item, index              |

## Slots

| Slot Name       | Description                      | Scope Parameters    |
| --------------- | -------------------------------- | ------------------- |
| empty-upload    | Upload button in empty state     | -                   |
| no-empty-upload | Upload button in non-empty state | -                   |
| file-list       | Custom file list                 | items               |
| prev-button     | Custom left navigation button    | show, onScrollLeft  |
| next-button     | Custom right navigation button   | show, onScrollRight |
| drop-area       | Custom drag area                 | -                   |
