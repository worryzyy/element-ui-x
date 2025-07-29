<template>
  <div class="basic-demo">
    <h3>基础用法</h3>
    <p>展示文件附件组件的基础功能，支持上传、删除和不同的溢出处理方式</p>

    <div class="demo-section">
      <el-x-attachments
        :items="mainItems"
        :overflow="overflow"
        :list-style="listStyle"
        :upload-icon-size="uploadIconSize"
        :drag-target="dragTarget"
        :hide-upload="hideUpload"
        :limit="limit"
        :upload-action="uploadAction"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        :drag="drag"
        :http-request="handleHttpRequest"
        @upload-change="handleUploadChange"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
        @upload-drop="handleUploadDrop"
        @delete-card="handleDeleteCard"
      />
    </div>

    <div class="demo-section">
      <h4>横向滚动 (scrollX) 演示</h4>
      <el-x-attachments
        :items="scrollXItems"
        overflow="scrollX"
        :list-style="listStyle"
        :upload-icon-size="uploadIconSize"
        :hide-upload="hideUpload"
        :limit="limit"
        :drag="drag"
        :multiple="multiple"
        :disabled="disabled"
        :accept="accept"
        :http-request="handleScrollXHttpRequest"
        @upload-change="handleScrollXUploadChange"
        @upload-drop="handleScrollXUploadDrop"
        @delete-card="handleScrollXDeleteCard"
      />
    </div>
  </div>
</template>

<script>
  import ElXAttachments from '@/components/Attachments';

  export default {
    name: 'BasicDemo',
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
        mainItems: [], // 主演示区域的文件列表
        scrollXItems: [
          {
            uid: 'sx1',
            name: '横向滚动文件1.pdf',
            fileSize: 1024000,
            fileType: 'pdf',
            showDelIcon: true,
          },
          {
            uid: 'sx2',
            name: '横向滚动文件2.jpg',
            fileSize: 2048000,
            fileType: 'image',
            url: 'https://avatars.githubusercontent.com/u/76239030?v=4',
            showDelIcon: true,
            imgVariant: 'square',
          },
          {
            uid: 'sx3',
            name: '横向滚动文件3.docx',
            fileSize: 512000,
            fileType: 'word',
            showDelIcon: true,
          },
          {
            uid: 'sx4',
            name: '横向滚动文件4.xlsx',
            fileSize: 768000,
            fileType: 'excel',
            showDelIcon: true,
          },
          {
            uid: 'sx5',
            name: '横向滚动文件5.pptx',
            fileSize: 1536000,
            fileType: 'ppt',
            showDelIcon: true,
          },
        ],
      };
    },
    watch: {
      // 监听props中items的变化，同步到mainItems
      items: {
        handler(newItems) {
          if (newItems && newItems.length > 0) {
            // 简单替换：将props中的items设置为初始items
            this.mainItems = [...newItems];
          } else if (newItems && newItems.length === 0) {
            // 如果props items为空数组，清空mainItems中的初始数据，但保留上传的文件
            this.mainItems = this.mainItems.filter(item => item.uid.startsWith('main_'));
          }
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      // 主要的http-request处理函数
      async handleHttpRequest(options) {
        console.log('主上传请求:', options);
        this.$message?.info('文件上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const newItem = {
              uid: `main_${Date.now()}`,
              name: options.file.name,
              fileSize: options.file.size,
              fileType: this.getFileTypeFromName(options.file.name),
              showDelIcon: true,
              imgVariant: 'rectangle',
            };

            // 如果是图片文件，创建预览URL
            if (newItem.fileType === 'image') {
              newItem.url = URL.createObjectURL(options.file);
              newItem.imgVariant = 'square';
            }

            // 将新文件添加到本地mainItems数组
            this.mainItems.push(newItem);

            this.$message?.success(`上传成功: ${options.file.name}`);
            resolve({
              message: '文件上传成功',
              fileName: options.file.name,
              uid: newItem.uid,
            });
          }, 1000);
        });
      },

      handleUploadChange(file, fileList) {
        console.log('主上传变化:', file, fileList);
      },
      handleUploadSuccess(response, file, fileList) {
        console.log('主上传成功:', response, file, fileList);
      },
      handleUploadError(error, file, fileList) {
        console.log('主上传失败:', error, file, fileList);
        this.$message?.error('文件上传失败');
      },
      async handleUploadDrop(files, props) {
        console.log('主拖拽上传:', files, props);
        this.$message?.info(`开始处理 ${files.length} 个拖拽文件`);

        for (let file of files) {
          await this.handleHttpRequest({ file });
        }
      },
      handleDeleteCard(item, index) {
        console.log('主删除文件:', item, index);
        // 从本地mainItems中删除，如果不存在则从props的items中删除的话需要通过emit
        const mainItemIndex = this.mainItems.findIndex(f => f.uid === item.uid);
        if (mainItemIndex !== -1) {
          this.mainItems.splice(mainItemIndex, 1);
        } else {
          // 如果是props中的项目，通过emit通知父组件
          const updatedItems = (this.items || []).filter(f => f.uid !== item.uid);
          this.$emit('update-items', updatedItems);
        }
        this.$message?.success(`删除文件: ${item.name}`);
      },
      // 横向滚动相关方法
      async handleScrollXHttpRequest(options) {
        console.log('横向滚动上传请求:', options);
        this.$message?.info('横向滚动 - 文件上传中...');

        return new Promise(resolve => {
          setTimeout(() => {
            const newItem = {
              uid: `sx_${Date.now()}`,
              name: options.file.name,
              fileSize: options.file.size,
              fileType: this.getFileTypeFromName(options.file.name),
              showDelIcon: true,
            };

            if (newItem.fileType === 'image') {
              newItem.url = URL.createObjectURL(options.file);
              newItem.imgVariant = 'square';
            }

            this.scrollXItems.push(newItem);
            this.$message?.success(`横向滚动上传成功: ${options.file.name}`);
            resolve({ uid: newItem.uid });
          }, 1000);
        });
      },
      handleScrollXUploadChange(file, fileList) {
        console.log('横向滚动上传变化:', file);
      },
      async handleScrollXUploadDrop(files, props) {
        console.log('横向滚动拖拽上传:', files, props);
        for (let file of files) {
          await this.handleScrollXHttpRequest({ file });
        }
      },
      handleScrollXDeleteCard(item, index) {
        console.log('横向滚动删除:', item, index);
        this.scrollXItems = this.scrollXItems.filter(f => f.uid !== item.uid);
        this.$message?.success(`删除横向滚动文件: ${item.name}`);
      },

      // 辅助函数
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
  .basic-demo {
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

  .basic-demo p {
    margin-bottom: 20px;
    color: #606266;
    font-size: 14px;
  }
</style>
