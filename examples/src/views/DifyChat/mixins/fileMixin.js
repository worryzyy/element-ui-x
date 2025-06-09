import { fileApi } from '@/api/dify';

export default {
  data() {
    return {
      uploadedFiles: [],
    };
  },
  watch: {
    uploadedFiles: {
      handler(newFiles) {
        // 监听上传文件变化，控制header显示隐藏
        this.$nextTick(() => {
          this.$emit('files-changed', newFiles);
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 文件上传 - 这个方法将由主组件覆盖实现
    handleFileUpload() {
      // 由主组件实现具体的文件选择逻辑
      console.log('handleFileUpload should be implemented by main component');
    },

    async handleFileChange(file) {
      if (!file) return;

      try {
        const response = await fileApi.uploadFile(file, this.difyConfig.user);
        // 按照 Dify API 规范格式化文件对象
        const fileObject = {
          id: response.id,
          name: response.name,
          url: response.url || response.download_url,
          type: response.type || file.type,
          size: response.size || file.size,
          // 用于 UI 显示的额外属性
          uid: response.id,
          fileSize: response.size || file.size,
          imgFile: file,
          showDelIcon: true,
        };
        this.uploadedFiles.push(fileObject);
        this.$message.success('文件上传成功');
      } catch (error) {
        this.$message.error('文件上传失败: ' + error.message);
      }
    },

    // 处理删除上传的文件
    handleDeleteUploadedFile(item, index) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== item.id);
      this.$message.success('文件已删除');
    },

    // 清空文件列表
    clearFiles() {
      this.uploadedFiles = [];
    },
  },
};
