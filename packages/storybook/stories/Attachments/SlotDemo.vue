<template>
  <div class="slot-demo">
    <h3>插槽用法</h3>
    <p>展示 Attachments 组件的各种插槽自定义功能</p>

    <div class="demo-section">
      <h4>自定义文件列表插槽</h4>
      <el-x-attachments
        :items="customListItems"
        :overflow="overflow || 'wrap'"
        :list-style="listStyle"
        :upload-icon-size="uploadIconSize"
        :hide-upload="hideUpload"
        :limit="limit"
        :drag="drag"
        :multiple="multiple"
        :disabled="disabled"
        :accept="accept"
        :http-request="handleCustomListHttpRequest"
        @upload-change="handleCustomListUploadChange"
        @upload-drop="handleCustomListUploadDrop"
        @delete-card="handleCustomListDeleteCard"
      >
        <template #file-list="{ items }">
          <div class="custom-file-list">
            <div
              v-for="(item, index) in items"
              :key="item.uid"
              class="custom-file-item"
            >
              <div class="file-info">
                <div class="file-icon">
                  <i :class="getFileIcon(item.fileType)"></i>
                </div>
                <div class="file-details">
                  <div class="file-name">{{ item.name }}</div>
                  <div class="file-meta">
                    <span class="file-type">{{ item.fileType?.toUpperCase() }}</span>
                    <span class="file-size">{{ formatFileSize(item.fileSize) }}</span>
                  </div>
                </div>
              </div>
              <div class="file-actions">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-download"
                  circle
                  @click="handleDownload(item)"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="handleCustomListDeleteCard(item, index)"
                ></el-button>
              </div>
            </div>
          </div>
        </template>
      </el-x-attachments>
    </div>

    <div class="demo-section">
      <h4>自定义导航按钮插槽</h4>
      <el-x-attachments
        :items="customNavItems"
        overflow="scrollX"
        :list-style="{ ...listStyle, position: 'relative' }"
        :upload-icon-size="uploadIconSize"
        :hide-upload="hideUpload"
        :limit="limit"
        :drag="drag"
        :multiple="multiple"
        :disabled="disabled"
        :accept="accept"
        :http-request="handleCustomNavHttpRequest"
        @upload-change="handleCustomNavUploadChange"
        @upload-drop="handleCustomNavUploadDrop"
        @delete-card="handleCustomNavDeleteCard"
      >
        <template #prev-button="{ show, onScrollLeft }">
          <el-button
            v-if="show"
            type="info"
            size="small"
            icon="el-icon-back"
            class="custom-prev-btn"
            @click="onScrollLeft"
          >
            上一页
          </el-button>
        </template>

        <template #next-button="{ show, onScrollRight }">
          <el-button
            v-if="show"
            type="info"
            size="small"
            class="custom-next-btn"
            @click="onScrollRight"
          >
            下一页
            <i class="el-icon-right"></i>
          </el-button>
        </template>
      </el-x-attachments>
    </div>
  </div>
</template>

<script>
  import ElXAttachments from '@/components/Attachments';

  export default {
    name: 'SlotDemo',
    components: { ElXAttachments },
    props: {
      items: Array,
      overflow: String,
      listStyle: Object,
      uploadIconSize: String,
      dragTarget: [String, Object, HTMLElement],
      hideUpload: Boolean,
      limit: Number,
      uploadAction: String,
      accept: String,
      multiple: Boolean,
      disabled: Boolean,
      drag: Boolean,
    },
    data() {
      return {
        customListItems: [
          {
            uid: 'cl1',
            name: '自定义列表文件1.pdf',
            fileSize: 1024000,
            fileType: 'pdf',
            showDelIcon: true,
          },
          {
            uid: 'cl2',
            name: '自定义列表文件2.docx',
            fileSize: 512000,
            fileType: 'word',
            showDelIcon: true,
          },
        ],
        customNavItems: [],
        customDragItems: [
          {
            uid: 'cd1',
            name: '拖拽区域文件1.jpg',
            fileSize: 2048000,
            fileType: 'image',
            url: 'https://avatars.githubusercontent.com/u/76239030?v=4',
            showDelIcon: true,
            imgVariant: 'square',
          },
        ],
      };
    },
    mounted() {
      this.generateNavItems();
    },
    methods: {
      getFileIcon(fileType) {
        const iconMap = {
          pdf: 'el-icon-document',
          word: 'el-icon-document',
          excel: 'el-icon-s-grid',
          ppt: 'el-icon-present',
          image: 'el-icon-picture',
          video: 'el-icon-video-camera',
          audio: 'el-icon-headset',
          zip: 'el-icon-folder-opened',
          code: 'el-icon-document-copy',
          txt: 'el-icon-document',
        };
        return iconMap[fileType] || 'el-icon-document';
      },
      formatFileSize(size) {
        if (!size) return '';
        const units = ['B', 'KB', 'MB', 'GB'];
        let index = 0;
        let fileSize = size;

        while (fileSize >= 1024 && index < units.length - 1) {
          fileSize /= 1024;
          index++;
        }

        return `${fileSize.toFixed(1)} ${units[index]}`;
      },
      generateNavItems() {
        this.customNavItems = [];
        for (let i = 1; i <= 10; i++) {
          this.customNavItems.push({
            uid: `cn${i}`,
            name: `导航文件${i}.txt`,
            fileSize: 1024 * i,
            fileType: 'txt',
            showDelIcon: true,
          });
        }
      },
      handleDownload(item) {
        console.log('下载文件:', item);
        this.$message?.success(`开始下载: ${item.name}`);
      },
      // 自定义列表相关方法
      async handleCustomListHttpRequest(options) {
        console.log('自定义列表上传请求:', options);
        this.$message?.info('自定义列表 - 文件上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const newItem = {
              uid: `cl_${Date.now()}`,
              name: options.file.name,
              fileSize: options.file.size,
              fileType: this.getFileTypeFromName(options.file.name),
              showDelIcon: true,
            };

            this.customListItems.push(newItem);
            this.$message?.success(`自定义列表上传成功: ${options.file.name}`);
            resolve({ uid: newItem.uid });
          }, 1000);
        });
      },
      handleCustomListUploadChange(file, fileList) {
        console.log('自定义列表上传变化:', file);
      },
      async handleCustomListUploadDrop(files, props) {
        console.log('自定义列表拖拽上传:', files, props);
        for (let file of files) {
          await this.handleCustomListHttpRequest({ file });
        }
      },
      handleCustomListDeleteCard(item, index) {
        console.log('自定义列表删除:', item, index);
        this.customListItems = this.customListItems.filter(f => f.uid !== item.uid);
        this.$message?.success(`删除自定义列表文件: ${item.name}`);
      },
      // 自定义导航相关方法
      async handleCustomNavHttpRequest(options) {
        console.log('自定义导航上传请求:', options);
        this.$message?.info('自定义导航 - 文件上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const newItem = {
              uid: `cn_${Date.now()}`,
              name: options.file.name,
              fileSize: options.file.size,
              fileType: this.getFileTypeFromName(options.file.name),
              showDelIcon: true,
            };

            this.customNavItems.push(newItem);
            this.$message?.success(`自定义导航上传成功: ${options.file.name}`);
            resolve({ uid: newItem.uid });
          }, 1000);
        });
      },
      handleCustomNavUploadChange(file, fileList) {
        console.log('自定义导航上传变化:', file);
      },
      async handleCustomNavUploadDrop(files, props) {
        console.log('自定义导航拖拽上传:', files, props);
        for (let file of files) {
          await this.handleCustomNavHttpRequest({ file });
        }
      },
      handleCustomNavDeleteCard(item, index) {
        console.log('自定义导航删除:', item, index);
        this.customNavItems = this.customNavItems.filter(f => f.uid !== item.uid);
        this.$message?.success(`删除自定义导航文件: ${item.name}`);
      },

      // 自定义拖拽相关方法
      async handleCustomDragHttpRequest(options) {
        console.log('自定义拖拽上传请求:', options);
        this.$message?.info('自定义拖拽 - 文件上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const newItem = {
              uid: `cd_${Date.now()}_${Math.random()}`,
              name: options.file.name,
              fileSize: options.file.size,
              fileType: this.getFileTypeFromName(options.file.name),
              showDelIcon: true,
            };

            if (newItem.fileType === 'image') {
              newItem.url = URL.createObjectURL(options.file);
              newItem.imgVariant = 'square';
            }

            this.customDragItems.push(newItem);
            this.$message?.success(`自定义拖拽上传成功: ${options.file.name}`);
            resolve({ uid: newItem.uid });
          }, 1000);
        });
      },
      async handleCustomDragUploadDrop(files, props) {
        console.log('自定义拖拽上传:', files, props);
        this.$message?.info(`开始处理 ${files.length} 个拖拽文件`);

        for (let file of files) {
          await this.handleCustomDragHttpRequest({ file });
        }
      },
      handleCustomDragDeleteCard(item, index) {
        console.log('自定义拖拽删除:', item, index);
        this.customDragItems = this.customDragItems.filter(f => f.uid !== item.uid);
        this.$message?.success(`删除自定义拖拽文件: ${item.name}`);
      },
      getFileTypeFromName(fileName) {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const typeMap = {
          pdf: 'pdf',
          doc: 'word',
          docx: 'word',
          xls: 'excel',
          xlsx: 'excel',
          ppt: 'ppt',
          pptx: 'ppt',
          jpg: 'image',
          jpeg: 'image',
          png: 'image',
          gif: 'image',
          mp4: 'video',
          avi: 'video',
          mp3: 'audio',
          wav: 'audio',
          zip: 'zip',
          rar: 'zip',
          js: 'code',
          html: 'code',
          css: 'code',
          txt: 'txt',
        };
        return typeMap[ext] || 'file';
      },
    },
  };
</script>

<style scoped>
  .slot-demo {
    padding: 20px;
  }

  .demo-section {
    margin-bottom: 30px;
  }

  .demo-section h4 {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }

  .slot-demo p {
    margin-bottom: 20px;
    color: #606266;
    font-size: 14px;
  }

  /* 自定义文件列表样式 */
  .custom-file-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .custom-file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    background-color: #fafafa;
    transition: all 0.3s ease;
  }

  .custom-file-item:hover {
    border-color: #409eff;
    background-color: #ecf5ff;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .file-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #409eff;
    color: white;
    border-radius: 4px;
    font-size: 16px;
  }

  .file-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .file-name {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
  }

  .file-meta {
    display: flex;
    gap: 8px;
    font-size: 12px;
    color: #909399;
  }

  .file-type {
    background-color: #f0f0f0;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  }

  .file-actions {
    display: flex;
    gap: 8px;
  }

  /* 自定义导航按钮样式 */
  .custom-prev-btn {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .custom-next-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  /* 自定义拖拽区域样式 */
  .custom-drop-area {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(103, 194, 58, 0.1));
    border: 2px dashed #409eff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .drop-area-content {
    text-align: center;
  }

  .drop-icon {
    font-size: 48px;
    color: #409eff;
    margin-bottom: 12px;
  }

  .drop-title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 4px;
  }

  .drop-hint {
    font-size: 12px;
    color: #909399;
  }
</style>
