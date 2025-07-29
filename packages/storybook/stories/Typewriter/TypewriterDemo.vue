<template>
  <div>
    <el-x-typewriter
      ref="typewriter"
      :content="content"
      :typing="typing"
      :isMarkdown="isMarkdown"
      :isFog="isFog"
      @start="onStart"
      @writing="onWriting"
      @finish="onFinish"
      @interrupt="onInterrupt"
      @continue="onContinue"
      @restart="onRestart"
    />
    <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap">
      <el-button
        size="small"
        @click="interrupt"
        type="warning"
        :disabled="!typewriterInstance || !typewriterInstance.isTyping"
      >
        暂停
      </el-button>
      <el-button
        size="small"
        @click="continueTyping"
        type="success"
        :disabled="!typewriterInstance || typewriterInstance.isTyping"
      >
        继续
      </el-button>
      <el-button
        size="small"
        @click="restart"
        type="primary"
      >
        重新开始
      </el-button>
      <el-button
        size="small"
        type="danger"
        @click="destroy"
      >
        销毁
      </el-button>
    </div>
    <div
      style="margin-top: 15px; font-size: 12px; color: #666"
      v-if="typewriterInstance"
    >
      <p>进度: {{ typewriterInstance.progress.toFixed(1) }}%</p>
      <p>状态: {{ typewriterInstance.isTyping ? '打字中' : '已停止' }}</p>
    </div>
  </div>
</template>

<script>
  import ElXTypewriter from '@/components/Typewriter';

  export default {
    name: 'TypewriterDemo',
    components: { ElXTypewriter },
    props: {
      content: {
        type: String,
        default: '',
      },
      typing: {
        type: [Boolean, Object],
        default: false,
      },
      isMarkdown: {
        type: Boolean,
        default: false,
      },
      isFog: {
        type: [Boolean, Object],
        default: false,
      },
    },
    data() {
      return { typewriterInstance: null };
    },
    methods: {
      onStart(instance) {
        this.typewriterInstance = instance;
        console.log('开始打字');
      },
      onWriting(instance) {
        this.typewriterInstance = instance;
      },
      onFinish(instance) {
        this.typewriterInstance = instance;
        console.log('打字完成');
      },
      onInterrupt(instance) {
        this.typewriterInstance = instance;
        console.log('打字被中断');
      },
      onContinue(instance) {
        this.typewriterInstance = instance;
        console.log('继续打字');
      },
      onRestart(instance) {
        this.typewriterInstance = instance;
        console.log('重新开始打字');
      },
      interrupt() {
        if (this.typewriterInstance) {
          this.typewriterInstance.interrupt();
        }
      },
      continueTyping() {
        if (this.typewriterInstance) {
          this.typewriterInstance.continue();
        }
      },
      restart() {
        if (this.typewriterInstance) {
          this.typewriterInstance.restart();
        }
      },
      destroy() {
        if (this.typewriterInstance) {
          this.typewriterInstance.destroy();
          this.typewriterInstance = null;
        }
      },
    },
  };
</script>
