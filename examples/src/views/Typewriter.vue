<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Typewriter 打字机效果</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法（控制文字打印）</h3>
        <el-x-typewriter
          :content="basicContent"
          :typing="basicTyping"
          ref="basicDemo"
          @start="onStart"
          @writing="onWriting"
          @finish="onFinish"
          @interrupt="onTerrupt"
        />
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="startBasic"
            >
              预览
            </el-button>
            <el-button
              size="small"
              v-if="isBasicTyping && progress < 100"
              @click="pauseBasic"
            >
              暂停
            </el-button>
            <el-button
              size="small"
              v-if="!isBasicTyping && progress < 100"
              @click="continueBasic"
            >
              继续
            </el-button>
            <el-button
              size="small"
              @click="resetBasic"
            >
              重置
            </el-button>
          </el-button-group>
        </div>
      </div>

      <div class="demo-block">
        <h3>速度控制</h3>
        <div class="control-row">
          <h4>打字速度：</h4>
          <el-slider
            style="width: 200px"
            v-model="typingConfig.interval"
            :min="10"
            :max="100"
            :step="5"
            :marks="{ 10: '快', 50: '中', 100: '慢' }"
          />
        </div>
        <el-x-typewriter
          :content="speedContent"
          :typing="{ interval: typingConfig.interval, step: 1 }"
          ref="speedDemo"
        />
        <div class="demo-controls">
          <el-button
            size="small"
            type="primary"
            @click="startSpeedDemo"
          >
            预览
          </el-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>雾化效果</h3>
        <el-x-typewriter
          :content="fogContent"
          :typing="true"
          :is-fog="fogConfig"
          ref="fogDemo"
        />
        <div class="control-row">
          <h4>雾化宽度：</h4>
          <el-slider
            style="width: 200px"
            v-model="fogWidth"
            :min="50"
            :max="200"
            @change="updateFogConfig"
          />
        </div>
        <div class="control-row">
          <h4>背景颜色：</h4>
          <el-color-picker
            v-model="fogConfig.bgColor"
            @change="updateFogConfig"
            size="small"
          />
        </div>
        <div class="demo-controls">
          <el-button
            size="small"
            type="primary"
            @click="startfogDemo"
          >
            预览
          </el-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>Markdown渲染</h3>
        <el-x-typewriter
          :content="markdownContent"
          :is-fog="fogConfig"
          :is-markdown="true"
          :typing="{ interval: 30, step: 1 }"
          ref="markdownDemo"
        />
        <div class="demo-controls">
          <el-button
            size="small"
            type="primary"
            @click="startMarkdownDemo"
          >
            预览
          </el-button>
        </div>
      </div>
    </el-card>

    <el-card class="demo-card">
      <div slot="header">
        <h2>实际应用场景</h2>
      </div>

      <div class="demo-block">
        <h3>AI对话模拟</h3>
        <div class="chat-container">
          <div class="message user">
            <div class="avatar">用户</div>
            <div class="content">请介绍一下Typewriter组件的功能</div>
          </div>
          <div class="message bot">
            <div class="avatar">AI</div>
            <div class="content">
              <el-x-typewriter
                :content="aiResponse"
                :is-fog="fogConfig"
                :typing="{ interval: 30, step: 1, suffix: '' }"
                ref="aiDemo"
              />
            </div>
          </div>
        </div>
        <div class="demo-controls">
          <el-button
            type="primary"
            @click="regenerateAIResponse"
          >
            重新生成回答
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isBasicTyping: false,
        progress: 0,
        basicContent: '这是一个基础打字效果演示，展示Typewriter组件的基本功能。',
        speedContent: '通过滑块可以实时调整打字速度，体验不同的打字效果。',
        fogContent: '这个示例展示光标雾化效果，可以自定义雾化区域宽度。',
        aiResponse:
          'Typewriter组件是一个模拟打字效果的UI组件，支持自定义打字速度、步长和光标样式。它可以用于展示AI生成内容、代码示例或任何需要逐步显示的场景。',
        basicTyping: true,
        typingConfig: {
          interval: 40,
          step: 1,
        },
        fogConfig: {
          bgColor: '#FFFFFF',
          width: '80px',
        },
        fogWidth: 80,
        markdownContent: `# Markdown示例
这是一个支持**Markdown**渲染的打字机效果演示。

## 功能特点
- 支持标题
- 支持**粗体**和*斜体*
- 支持代码块
- 支持列表

\`\`\`javascript
// 示例代码
function greet(name) {
    return 'Hello, ' + name + '!';
}
console.log(greet('World'));
\`\`\``,
      };
    },
    methods: {
      startBasic() {
        this.basicTyping = true;
        this.$refs.basicDemo.restart();
      },
      pauseBasic() {
        this.$refs.basicDemo.interrupt();
      },
      continueBasic() {
        this.$refs.basicDemo.continueTyping();
      },
      resetBasic() {
        this.$refs.basicDemo.restart();
      },
      onStart(Instance) {
        console.log('开始', Instance);
      },
      onWriting(Instance) {
        console.log('onWriting', Instance);
        this.$nextTick(() => {
          this.isBasicTyping = Instance.isTyping;
          this.progress = Instance.progress;
        });
      },
      onFinish(Instance) {
        this.$nextTick(() => {
          this.isBasicTyping = Instance.isTyping;
        });
      },
      onTerrupt(Instance) {
        this.$nextTick(() => {
          this.isBasicTyping = Instance.isTyping;
        });
      },

      updateFogConfig() {
        this.fogConfig.width = `${this.fogWidth}px`;
      },
      regenerateAIResponse() {
        this.$refs.aiDemo.restart();
      },
      startSpeedDemo() {
        this.$refs.speedDemo.restart();
      },
      startfogDemo() {
        this.$refs.fogDemo.restart();
      },
      startMarkdownDemo() {
        this.$refs.markdownDemo.restart();
      },
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    font-weight: bold !important;
    font-size: 20px !important;
  }

  .demo-card {
    margin-bottom: 20px;
  }

  .demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .demo-controls {
    margin-top: 20px;
  }

  .control-row {
    width: 50%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    h4 {
      margin: 0 10px 0 0;
      font-size: 14px;
      font-weight: normal;
      width: 80px;
    }
  }

  .chat-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 15px;
    background-color: #f8f8f8;
    height: 300px;
    overflow-y: auto;
    max-width: 800px;
  }

  .message {
    display: flex;
    margin-bottom: 15px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #409eff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .content {
      margin: 0 10px;
      padding: 10px;
      border-radius: 4px;
      max-width: 80%;
    }

    &.user {
      flex-direction: row-reverse;

      .avatar {
        background-color: #67c23a;
      }

      .content {
        background-color: #f0f9eb;
      }
    }

    &.bot {
      .content {
        background-color: #ecf5ff;
        white-space: pre-wrap;
      }
    }
  }
</style>
