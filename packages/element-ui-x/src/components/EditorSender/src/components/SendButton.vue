<template>
  <div class="el-x-send-button">
    <el-button
      circle
      :disabled="disabled"
      @click="$emit('submit')"
      size="small"
    >
      <i class="el-icon-top"></i>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'SendButton',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped lang="scss"></style>
