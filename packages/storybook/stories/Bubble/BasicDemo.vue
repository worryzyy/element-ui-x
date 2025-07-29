<template>
  <div class="bubble-demo">
    <div class="demo-section">
      <h3>Bubble 对话泡泡</h3>
      <div class="bubble-container">
        <el-x-bubble
          v-bind="$props"
          :avatar="avatar || defaultAvatar"
          @start="onStart"
          @writing="onWriting"
          @finish="onFinish"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ElXBubble from '@/components/Bubble';

  export default {
    name: 'BubbleBasicDemo',
    components: { ElXBubble },
    props: {
      content: {
        type: String,
        default: '',
      },
      avatar: {
        type: String,
        default: '',
      },
      placement: {
        type: String,
        default: 'start',
      },
      variant: {
        type: String,
        default: 'filled',
      },
      maxWidth: {
        type: String,
        default: '500px',
      },
      avatarSize: {
        type: Number,
        default: 48,
      },
      avatarGap: {
        type: Number,
        default: 12,
      },
      avatarShape: {
        type: String,
        default: 'circle',
      },
      noStyle: {
        type: Boolean,
        default: false,
      },
      typing: {
        type: [Boolean, Object],
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      shape: {
        type: String,
        default: '',
      },
      isMarkdown: {
        type: Boolean,
        default: true,
      },
      isFog: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        defaultAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      };
    },
    methods: {
      onStart(instance) {
        console.log('打字开始:', instance);
      },
      onWriting(instance) {
        console.log('正在打字:', instance);
      },
      onFinish(instance) {
        console.log('打字完成:', instance);
      },
    },
  };
</script>

<style scoped>
  .bubble-demo {
    padding: 20px;
    max-width: 800px;
  }

  .demo-section {
    margin-bottom: 30px;
  }

  .demo-section h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
</style>
