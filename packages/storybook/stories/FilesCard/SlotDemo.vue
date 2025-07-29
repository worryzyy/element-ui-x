<template>
  <div class="slot-demo">
    <h3>插槽用法</h3>
    <p>展示 FilesCard 组件的各种插槽自定义功能</p>

    <div class="demo-section">
      <h4>自定义图标插槽</h4>
      <div class="files-container">
        <el-x-files-card
          :name="name || '自定义图标.pdf'"
          :file-type="fileType || 'pdf'"
          :file-size="fileSize || 1024000"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :max-width="maxWidth"
          @delete="handleDelete"
        >
          <template>
            <div class="custom-icon">
              <i
                class="el-icon-star-on"
                style="font-size: 42px; color: #f56c6c"
              ></i>
            </div>
          </template>
        </el-x-files-card>

        <el-x-files-card
          name="自定义图标2.txt"
          file-type="txt"
          :file-size="512000"
          :show-del-icon="showDelIcon"
          @delete="handleDelete"
        >
          <template>
            <div class="custom-icon">
              <i
                class="el-icon-medal"
                style="font-size: 42px; color: #67c23a"
              ></i>
            </div>
          </template>
        </el-x-files-card>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义内容插槽</h4>
      <div class="files-container">
        <el-x-files-card
          name="自定义内容.doc"
          file-type="word"
          :file-size="2048000"
          :show-del-icon="showDelIcon"
          @delete="handleDelete"
        >
          <template #content="{ item }">
            <div class="custom-content">
              <div class="file-title">{{ item.name }}</div>
              <div class="file-meta">
                <span class="file-type">
                  {{ item.fileType && item.fileType.toUpperCase() }}
                </span>
                <span class="file-size">{{ formatFileSize(item.fileSize) }}</span>
              </div>
              <div class="file-tags">
                <el-tag
                  size="mini"
                  type="success"
                >
                  重要
                </el-tag>
                <el-tag
                  size="mini"
                  type="warning"
                >
                  草稿
                </el-tag>
              </div>
            </div>
          </template>
        </el-x-files-card>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义删除图标插槽</h4>
      <div class="files-container">
        <el-x-files-card
          name="自定义删除.xlsx"
          file-type="excel"
          :file-size="1536000"
          :show-del-icon="true"
          @delete="handleDelete"
        >
          <template>
            <div class="custom-delete-icon">
              <i
                class="el-icon-close"
                style="color: #f56c6c; font-size: 16px"
              ></i>
            </div>
          </template>
        </el-x-files-card>
      </div>
    </div>

    <div class="demo-section">
      <h4>图片预览动作插槽</h4>
      <div class="files-container">
        <el-x-files-card
          :name="name || '自定义预览.jpg'"
          file-type="image"
          :file-size="fileSize || 3072000"
          :url="url || 'https://avatars.githubusercontent.com/u/76239030?v=4'"
          :img-variant="imgVariant || 'square'"
          :img-preview="imgPreview"
          :img-preview-mask="imgPreviewMask"
          :show-del-icon="showDelIcon"
          :icon-size="iconSize"
          :max-width="maxWidth"
          @delete="handleDelete"
          @image-preview="handleImagePreview"
        >
          <template #image-preview-actions="{ item }">
            <div class="custom-preview-mask">
              <div class="preview-actions">
                <el-button
                  type="primary"
                  icon="el-icon-view"
                  size="mini"
                  circle
                  @click.stop="handleImagePreview(item)"
                ></el-button>
                <el-button
                  type="success"
                  icon="el-icon-download"
                  size="mini"
                  circle
                  @click.stop="handleDownload(item)"
                ></el-button>
              </div>
            </div>
          </template>
        </el-x-files-card>
      </div>
    </div>

    <div class="demo-section">
      <h4>文件名前缀后缀插槽</h4>
      <div class="files-container">
        <el-x-files-card
          name="重要文档.pdf"
          file-type="pdf"
          :file-size="1024000"
          :show-del-icon="showDelIcon"
          @delete="handleDelete"
        >
          <template #name-prefix="{ item }">
            <span class="name-prefix">
              <i
                class="el-icon-star-on"
                style="color: #f56c6c; margin-right: 4px"
              ></i>
              {{ item.prefix }}
            </span>
          </template>
          <template #name-suffix="{ item }">
            <span
              class="name-suffix"
              style="color: #909399"
            >
              {{ item.suffix }}
              <i
                class="el-icon-lock"
                style="margin-left: 4px"
              ></i>
            </span>
          </template>
        </el-x-files-card>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义描述插槽</h4>
      <div class="files-container">
        <el-x-files-card
          name="项目报告.ppt"
          file-type="ppt"
          :file-size="5120000"
          :show-del-icon="showDelIcon"
          @delete="handleDelete"
        >
          <template #description="{ item }">
            <div class="custom-description">
              <div class="desc-row">
                <span class="desc-label">类型:</span>
                <span class="desc-value">
                  {{ item.fileType && item.fileType.toUpperCase() }}
                </span>
              </div>
              <div class="desc-row">
                <span class="desc-label">大小:</span>
                <span class="desc-value">{{ formatFileSize(item.fileSize) }}</span>
              </div>
              <div class="desc-row">
                <span class="desc-label">状态:</span>
                <el-tag
                  size="mini"
                  type="success"
                >
                  已审核
                </el-tag>
              </div>
            </div>
          </template>
        </el-x-files-card>
      </div>
    </div>
  </div>
</template>

<script>
  import ElXFilesCard from '@/components/FilesCard';

  export default {
    name: 'SlotDemo',
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
        customStyle: {
          backgroundColor: '#f0f9eb',
          border: '2px solid #67c23a',
          borderRadius: '12px',
          padding: '8px',
        },
        customHoverStyle: {
          'box-shadow': '0 4px 20px 0 rgba(103, 194, 58, 0.3)',
          'border-color': '#409EFF',
          'background-color': 'rgba(64, 158, 255, 0.05)',
          transform: 'translateY(-2px)',
        },
      };
    },
    methods: {
      handleDelete(data) {
        console.log('删除文件:', data);
        this.$message?.success(`已删除文件: ${data.name}`);
      },
      handleImagePreview(data) {
        console.log('预览图片:', data);
        this.$message?.info(`预览图片: ${data.name}`);
      },
      handleDownload(data) {
        console.log('下载文件:', data);
        this.$message?.success(`开始下载: ${data.name}`);
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

  .files-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .slot-demo p {
    margin-bottom: 20px;
    color: #606266;
    font-size: 14px;
  }

  /* 自定义样式 */
  .custom-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
  }

  .custom-content {
    padding: 8px 0;
  }

  .file-title {
    font-weight: 500;
    color: #303133;
    margin-bottom: 6px;
    font-size: 14px;
  }

  .file-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 12px;
    color: #909399;
  }

  .file-type {
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  }

  .file-tags {
    display: flex;
    gap: 4px;
  }

  .custom-delete-icon {
    background: rgba(245, 108, 108, 0.1);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .custom-delete-icon:hover {
    background: rgba(245, 108, 108, 0.2);
    transform: scale(1.1);
  }

  .custom-preview-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .preview-actions {
    display: flex;
    gap: 8px;
  }

  .name-prefix,
  .name-suffix {
    display: inline-flex;
    align-items: center;
  }

  .custom-description {
    font-size: 12px;
    line-height: 1.4;
  }

  .desc-row {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  .desc-row:last-child {
    margin-bottom: 0;
  }

  .desc-label {
    color: #909399;
    margin-right: 6px;
    min-width: 32px;
  }

  .desc-value {
    color: #606266;
    font-weight: 500;
  }

  .comprehensive-preview-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 12px;
    text-align: center;
  }

  .mask-content {
    color: white;
  }

  .mask-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    word-break: break-all;
  }

  .mask-actions {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  .comprehensive-delete {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 2px;
  }
</style>
