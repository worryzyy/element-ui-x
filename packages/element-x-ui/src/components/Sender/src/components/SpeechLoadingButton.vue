<template>
  <div class="el-x-send-button">
    <el-button
      circle
      size="small"
      @click="onClick"
    >
      <speech-loading class="loading-svg" />
    </el-button>
  </div>
</template>

<script>
  import SpeechLoading from './SpeechLoading.vue';

  export default {
    name: 'SpeechLoadingButton',
    components: {
      SpeechLoading,
    },
    methods: {
      onClick() {
        this.$emit('click');
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '~element-ui/packages/theme-chalk/src/common/var';

  .el-x-send-button {
    .el-button {
      padding: 0;
      width: 32px;
      height: 32px;
    }
    .loading-svg {
      color: $--color-primary;
      width: 16px;
    }
  }
</style>
