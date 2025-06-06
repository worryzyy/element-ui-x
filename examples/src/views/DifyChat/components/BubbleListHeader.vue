<template>
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
  };
</script>
