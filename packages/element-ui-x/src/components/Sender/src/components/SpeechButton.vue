<template>
  <div class="el-x-send-button">
    <el-button
      circle
      size="small"
      @click="onClick"
    >
      <i class="el-icon-microphone"></i>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'SpeechButton',
    methods: {
      onClick() {
        this.$emit('click');
      },
    },
  };
</script>

<style scoped lang="scss"></style>
