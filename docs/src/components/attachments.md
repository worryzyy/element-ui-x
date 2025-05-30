# Attachments 附件上传组件

## 功能说明

附件上传组件，用于文件上传和附件管理，支持以下特性：

- 拖拽上传文件
- 文件预览和进度显示
- 支持多种文件类型
- 自定义上传行为和限制
- 多种布局模式（横向滚动、纵向滚动、换行模式）
- 自定义拖拽区域
- 自定义文件列表和导航按钮

## 使用示例

### 基础用法

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
          this.$message.error('文件大小不能超过 2MB!');
          return false;
        }
        return true;
      },
      async handleUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('禁止上传文件夹！');
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
        this.$message.info('上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: '文件上传成功',
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
            this.$message.success('上传成功');
            resolve(res);
          }, 1000);
        });
      },
      handleDeleteCard(item, index) {
        this.files = this.files.filter(items => items.id !== item.id);
        this.$message.success('删除成功');
      },
    },
  };
</script>
```

:::

### 不同滚动方式

:::demo 组件支持三种滚动方式：横向滚动（scrollX）、纵向滚动（scrollY）和换行（wrap）

```html
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div>横向滚动(scrollX)</div>
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
      <div>纵向滚动(scrollY)</div>
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
      <div>换行(wrap)</div>
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
        @click="()=>{generateDemoFiles();$message.success('已生成30个演示文件')} "
      >
        生成演示文件
      </el-button>
      <el-button
        type="danger"
        @click="resetDemoFiles"
      >
        清空演示文件
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
          this.$message.error('文件大小不能超过 2MB!');
          return false;
        }
        return true;
      },
      async handleDemoUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('禁止上传文件夹！');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleDemoHttpRequest({ file });
          }
        }
      },
      async handleDemoHttpRequest(options) {
        this.$message.info('上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: '文件上传成功',
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
            this.$message.success('上传成功');
            resolve(res);
          }, 1000);
        });
      },
      handleDemoDeleteCard(item) {
        this.demoFiles = this.demoFiles.filter(items => items.id !== item.id);
        this.$message.success('删除成功');
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
            name: `文件${index}`,
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

### 自定义文件列表

:::demo 使用 `file-list` 插槽自定义文件列表显示

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
                🗑️ 删除
              </el-button>
            </div>
          </div>
        </template>
      </el-x-attachments>
    </div>
    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        @click="()=>{generateCustomFiles();$message.success('已生成5个自定义演示文件')} "
      >
        生成自定义文件
      </el-button>
      <el-button
        type="danger"
        @click="resetCustomFiles"
      >
        清空自定义文件
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
          this.$message.error('文件大小不能超过 2MB!');
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
            this.$message.error('禁止上传文件夹！');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleCustomHttpRequest({ file });
          }
        }
      },
      async handleCustomHttpRequest(options) {
        this.$message.info('上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: '文件上传成功',
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
            this.$message.success('上传成功');
            resolve(res);
          }, 1000);
        });
      },
      handleCustomDeleteCard(item, index) {
        console.log('delete', item);
        this.customFiles = this.customFiles.filter(items => items.id !== item.id);
        this.$message.success('删除成功');
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

### 自定义拖拽区域

:::demo 通过 `dragTarget` 属性指定拖拽上传的目标区域

```html
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <p>
        设置全屏拖拽上传：
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
        在此处拖拽文件上传
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-button
        type="danger"
        @click="resetDragFiles"
      >
        清空文件
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
          this.$message.error('文件大小不能超过 2MB!');
          return false;
        }
        return true;
      },

      async handleDragUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('禁止上传文件夹！');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleDragHttpRequest({ file });
          }
        }
      },
      async handleDragHttpRequest(options) {
        this.$message.info('上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: '文件上传成功',
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
            this.$message.success('上传成功');
            resolve(res);
          }, 1000);
        });
      },
      handleDragDeleteCard(item, index) {
        this.dragFiles = this.dragFiles.filter(items => items.id !== item.id);
        this.$message.success('删除成功');
      },
      resetDragFiles() {
        this.dragFiles = [];
      },
    },
  };
</script>
```

:::

### 自定义导航按钮

:::demo 使用 `prev-button` 和 `next-button` 插槽自定义导航按钮

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
        @click="()=>{generateNavFiles();$message.success('已生成15个导航演示文件')}"
      >
        生成演示文件
      </el-button>
      <el-button
        type="danger"
        @click="resetNavFiles"
      >
        清空文件
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
          this.$message.error('文件大小不能超过 2MB!');
          return false;
        }
        return true;
      },
      async handleNavUploadDrop(files, props) {
        if (files && files.length > 0) {
          if (files[0].type === '') {
            this.$message.error('禁止上传文件夹！');
            return false;
          }

          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            await this.handleNavHttpRequest({ file });
          }
        }
      },
      async handleNavHttpRequest(options) {
        this.$message.info('上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const res = {
              message: '文件上传成功',
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
            this.$message.success('上传成功');
            resolve(res);
          }, 1000);
        });
      },
      handleNavDeleteCard(item, index) {
        this.navFiles = this.navFiles.filter(items => items.id !== item.id);
        this.$message.success('删除成功');
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
            name: `导航文件${index}`,
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

## 属性

| 参数           | 说明                                                   | 类型                      | 默认值    |
| -------------- | ------------------------------------------------------ | ------------------------- | --------- |
| items          | 附件列表数据                                           | Array                     | []        |
| overflow       | 布局溢出处理模式，可选值：`scrollX`、`scrollY`、`wrap` | String                    | scrollX   |
| listStyle      | 列表容器样式                                           | Object                    | {}        |
| uploadIconSize | 上传图标大小                                           | String                    | 64px      |
| dragTarget     | 拖拽上传目标区域，可以是元素 ID、DOM 元素或 Vue 组件   | String/Object/HTMLElement | undefined |
| hideUpload     | 是否隐藏上传按钮                                       | Boolean                   | false     |
| limit          | 最大上传数量限制                                       | Number                    | undefined |
| uploadAction   | 上传 URL                                               | String                    | #         |

## 事件

| 事件名         | 说明               | 回调参数                 |
| -------------- | ------------------ | ------------------------ |
| upload-change  | 文件状态改变时触发 | file, fileList           |
| upload-success | 文件上传成功时触发 | response, file, fileList |
| upload-error   | 文件上传失败时触发 | error, file, fileList    |
| upload-drop    | 拖拽上传文件时触发 | files, props             |
| delete-card    | 删除文件时触发     | item, index              |

## 插槽

| 插槽名          | 说明                 | 作用域参数          |
| --------------- | -------------------- | ------------------- |
| empty-upload    | 空状态下的上传按钮   | -                   |
| no-empty-upload | 非空状态下的上传按钮 | -                   |
| file-list       | 自定义文件列表       | items               |
| prev-button     | 自定义左侧导航按钮   | show, onScrollLeft  |
| next-button     | 自定义右侧导航按钮   | show, onScrollRight |
| drop-area       | 自定义拖拽区域       | -                   |
