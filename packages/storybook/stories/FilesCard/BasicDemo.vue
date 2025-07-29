<template>
  <div class="basic-demo">
    <h3>基础用法</h3>
    <p>展示不同文件类型的基础样式</p>

    <div class="demo-section">
      <h4>单个文件展示</h4>
      <el-x-files-card
        v-bind="$props"
        @delete="handleDelete"
        @image-preview="handleImagePreview"
      />
    </div>

    <div class="demo-section">
      <h4>不同文件类型</h4>
      <div class="files-container">
        <el-x-files-card
          v-for="type in fileTypes"
          :key="type.type"
          :name="type.name"
          :file-type="type.type"
          :file-size="fileSize"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
        />
      </div>
    </div>

    <div class="demo-section">
      <h4>不同状态</h4>
      <div class="files-container">
        <el-x-files-card
          name="正常状态.pdf"
          :file-type="fileType"
          :file-size="fileSize"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
        />
        <el-x-files-card
          name="上传中.pdf"
          :file-type="fileType"
          :file-size="fileSize"
          status="uploading"
          :percent="percent || 65"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
        />
        <el-x-files-card
          name="上传完成.pdf"
          :file-type="fileType"
          :file-size="fileSize"
          status="done"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
        />
        <el-x-files-card
          name="上传失败.pdf"
          :file-type="fileType"
          :file-size="fileSize"
          :status="status === 'error' ? 'error' : undefined"
          :error-tip="errorTip || '网络错误，上传失败'"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
        />
      </div>
    </div>

    <div class="demo-section">
      <h4>图片文件</h4>
      <div class="files-container">
        <el-x-files-card
          name="有预览图.jpg"
          file-type="image"
          :file-size="fileSize"
          :url="url || 'https://avatars.githubusercontent.com/u/76239030?v=4'"
          :img-variant="imgVariant"
          :img-preview="imgPreview"
          :img-preview-mask="imgPreviewMask"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
          @image-preview="handleImagePreview"
        />
        <el-x-files-card
          name="方形预览图.jpg"
          file-type="image"
          :file-size="fileSize"
          :url="url || 'https://avatars.githubusercontent.com/u/76239030?v=4'"
          img-variant="square"
          :img-preview="imgPreview"
          :img-preview-mask="imgPreviewMask"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
          @image-preview="handleImagePreview"
        />
        <el-x-files-card
          name="无预览图.jpg"
          file-type="image"
          :file-size="fileSize"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :icon-color="iconColor"
          :max-width="maxWidth"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ElXFilesCard from '@/components/FilesCard';

  export default {
    name: 'BasicDemo',
    components: { ElXFilesCard },
    props: {
      uid: [String, Number],
      name: String,
      fileSize: [String, Number],
      fileType: String,
      description: String,
      url: String,
      thumbUrl: String,
      iconSize: String,
      iconColor: String,
      showDelIcon: Boolean,
      maxWidth: String,
      styleConfig: Object,
      hoverStyle: Object,
      imgVariant: String,
      imgPreview: Boolean,
      imgPreviewMask: Boolean,
      status: String,
      percent: Number,
      errorTip: String,
    },
    data() {
      return {
        fileTypes: [
          { name: '文档文件.doc', type: 'word' },
          { name: '表格文件.xlsx', type: 'excel' },
          { name: '演示文件.ppt', type: 'ppt' },
          { name: 'PDF文件.pdf', type: 'pdf' },
          { name: '文本文件.txt', type: 'txt' },
          { name: '图片文件.png', type: 'image' },
          { name: '音频文件.mp3', type: 'audio' },
          { name: '视频文件.mp4', type: 'video' },
          { name: '代码文件.js', type: 'code' },
          { name: '压缩文件.zip', type: 'zip' },
        ],
      };
    },
    methods: {
      handleDelete(data) {
        console.log('删除文件:', data);
        this.$message?.success('文件删除成功');
      },
      handleImagePreview(data) {
        console.log('预览图片:', data);
        this.$message?.info('图片预览功能');
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

  .files-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .basic-demo p {
    margin-bottom: 20px;
    color: #606266;
    font-size: 14px;
  }
</style>
