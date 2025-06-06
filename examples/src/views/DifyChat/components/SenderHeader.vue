<template>
  <div class="sender-header">
    <div
      v-if="fileList.length > 0"
      class="file-list-container"
    >
      <el-x-attachments
        :file-list="mappedFileList"
        :items="mappedFileList"
        :http-request="handleHttpRequest"
        :before-upload="handleBeforeUpload"
        :hide-upload="true"
        @delete-card="handleDeleteFile"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SenderHeader',
    props: {
      fileList: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      mappedFileList() {
        return this.fileList.map(file => ({
          ...file,
          fileType: this.mapFileType(file.type),
        }));
      },
    },
    methods: {
      // 将MIME类型映射到el-x-files-card组件类型
      mapFileType(mimeType) {
        if (!mimeType) return 'unknown';

        const type = mimeType.toLowerCase();

        // 图片类型
        // if (type.startsWith('image/')) {
        //   return 'image';
        // }

        // 音频类型
        if (type.startsWith('audio/')) {
          return 'audio';
        }

        // 视频类型
        if (type.startsWith('video/')) {
          return 'video';
        }

        // 文档类型
        const documentMimes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain',
          'text/csv',
          'application/json',
          'text/html',
          'text/css',
          'application/javascript',
        ];

        if (documentMimes.includes(type)) {
          return 'file';
        }

        // 压缩文件等其他类型
        const otherMimes = [
          'application/zip',
          'application/x-rar-compressed',
          'application/octet-stream',
        ];

        if (otherMimes.includes(type)) {
          return 'file';
        }

        return 'unknown';
      },

      // 处理文件删除
      handleDeleteFile(item, index) {
        this.$emit('delete-file', item, index);
      },

      // 处理文件上传（这里不会被调用，因为hide-upload为true）
      handleHttpRequest(options) {
        return Promise.resolve();
      },

      // 上传前验证（这里不会被调用，因为hide-upload为true）
      handleBeforeUpload(file) {
        return true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .sender-header {
    .file-list-container {
      padding: 8px 0;
      border-bottom: 1px solid #ebeef5;
    }
  }
</style>
