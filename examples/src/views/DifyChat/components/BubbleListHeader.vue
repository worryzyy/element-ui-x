<template>
  <div>
    <el-x-thought-chain
      v-if="item.placement == 'start' && item.thoughtChains"
      :thinking-items="item.thoughtChains"
      :status-enum="customStatusEnum"
    />
    <el-x-thinking
      v-if="item.placement == 'start' && item.reasoning_content"
      :content="item.reasoning_content"
      :status="item.thinkingStatus"
      maxWidth="100%"
      class="thinking-chain-wrap"
      auto-collapse
    >
      <template #status-icon="{ status }">
        <i
          v-if="status === 'thinking'"
          class="el-icon-loading"
          style="color: #409eff"
        ></i>
        <i
          v-if="status === 'end'"
          class="el-icon-success"
          style="color: #67c23a"
        ></i>
        <i
          v-if="status === 'error'"
          class="el-icon-error"
          style="color: #f56c6c"
        ></i>
        <!--   <i
                    v-if="status === 'start'"
                    class="el-icon-error"
                  ></i>-->
      </template>
      <template #label="{ status }">
        <!-- <span v-if="status === 'start'">开始思考</span> -->
        <span v-if="status === 'thinking'">思考中</span>
        <span v-if="status === 'end'">思考完成</span>
        <span v-if="status === 'error'">出错啦</span>
      </template>
    </el-x-thinking>
    <div v-if="item.placement === 'end'">
      <!-- 显示附件 -->
      <div
        v-if="item.message_files && item.message_files.length > 0"
        class="message-files"
        style="display: flex; flex-wrap: wrap; gap: 8px"
      >
        <el-x-files-card
          v-for="file in item.message_files"
          :key="file.id"
          :name="file.filename"
          :url="file.url || ''"
          :file-size="file.size"
          :file-type="mapFileType(file.type)"
          style="margin-bottom: 8px"
        />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BubbleListHeader',
    props: {
      item: {
        type: Object,
        required: true,
      },
      mapFileType: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        customStatusEnum: {
          loading: {
            value: 'processing',
            type: 'primary',
          },
          error: {
            value: 'failed',
            type: 'danger',
          },
          success: {
            value: 'completed',
            type: 'success',
          },
        },
      };
    },
  };
</script>
<style lang="scss" scoped>
  ::v-deep .el-x-thinking {
    .content-wrapper {
      margin-bottom: 4px;
    }
  }
</style>
