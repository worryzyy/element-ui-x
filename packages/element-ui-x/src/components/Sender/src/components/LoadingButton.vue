<template>
  <div class="el-x-send-button">
    <el-button
      circle
      @click="$emit('cancel')"
      size="small"
    >
      <loading class="loading-svg" />
    </el-button>
  </div>
</template>

<script>
  import Loading from './Loading.vue';

  export default {
    name: 'LoadingButton',
    components: { Loading },
  };
</script>

<style scoped lang="scss">
  @import '../../../../theme/var.scss';

  .el-x-send-button {
    height: 32px;
    .el-button {
      padding: 0;
      width: 32px;
      height: 32px;
    }
    .loading-svg {
      color: $--color-primary;
      width: 100%;
    }
  }
</style>
