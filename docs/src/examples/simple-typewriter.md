# 简单的打字机演示

这是一个非常基础的打字机组件演示，不使用复杂的插件。

<ClientOnly>
  <div class="demo-box">
    <el-x-typewriter
      text="这是一个简单的打字机组件演示文本，会自动开始打字效果。"
      :type-speed="50"
      :show-cursor="true"
      auto-start
      ref="demoTypewriter"
    />
    <div style="margin-top: 15px;">
      <el-button size="small" @click="restart">重新开始</el-button>
      <el-button size="small" @click="showAll">立即显示全部</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
  </div>
</ClientOnly>

<script>
export default {
  methods: {
    restart() {
      if (this.$refs.demoTypewriter) {
        this.$refs.demoTypewriter.eraseAll();
        setTimeout(() => {
          this.$refs.demoTypewriter.startTyping();
        }, 300);
      }
    },
    showAll() {
      if (this.$refs.demoTypewriter) {
        this.$refs.demoTypewriter.typeAll();
      }
    },
    clear() {
      if (this.$refs.demoTypewriter) {
        this.$refs.demoTypewriter.eraseAll();
      }
    }
  }
}
</script>

<style>
.demo-box {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>

## 核心代码

```html
<template>
  <div>
    <el-x-typewriter
      text="这是一个简单的打字机组件演示文本"
      :type-speed="50"
      :show-cursor="true"
      auto-start
      ref="typewriter"
    />
    <div style="margin-top: 15px;">
      <el-button size="small" @click="restart">重新开始</el-button>
      <el-button size="small" @click="showAll">立即显示全部</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      restart() {
        this.$refs.typewriter.eraseAll();
        setTimeout(() => {
          this.$refs.typewriter.startTyping();
        }, 300);
      },
      showAll() {
        this.$refs.typewriter.typeAll();
      },
      clear() {
        this.$refs.typewriter.eraseAll();
      },
    },
  };
</script>
```
