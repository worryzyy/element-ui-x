<template>
  <div class="chat-header">
    <div
      class="chat-title"
      @click="$emit('edit-title')"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChatHeader',
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    emits: ['edit-title'],
  };
</script>

<style lang="scss" scoped>
  .chat-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    background: white;
    justify-content: center;
    flex-shrink: 0;

    .chat-title:hover {
      box-shadow: inset 0 0 0 1px #0000001f;
    }
    .chat-title {
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #262626;
      box-sizing: border-box;
      max-width: 100%;
      height: 40px;
      transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
      overflow: hidden;
    }
  }
</style>
