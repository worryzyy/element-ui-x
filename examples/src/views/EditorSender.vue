<template>
  <el-card class="demo-card">
    <div slot="header">
      <h2>EditorSender - 编辑器发送框</h2>
    </div>

    <div class="demo-block">
      <h3>基础用法</h3>
      <BasicDemo />
    </div>

    <div class="demo-block">
      <h3>自定义用法</h3>
      <CustomDemo />
    </div>
  </el-card>
</template>

<script>
  import BasicDemo from './EditorSender/BasicDemo.vue';
  import CustomDemo from './EditorSender/CustomDemo.vue';
  export default {
    components: {
      BasicDemo,
      CustomDemo,
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    font-weight: bold !important;
    font-size: 20px !important;
  }

  h4 {
    font-size: 16px !important;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .demo-card {
    margin-bottom: 20px;
  }

  .demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .custom-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .custom-item {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 150px;
  }

  .custom-item-name {
    font-weight: bold;
  }

  .custom-item-size {
    color: #909399;
    font-size: 12px;
  }

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
