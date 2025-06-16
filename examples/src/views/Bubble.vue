<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Bubble 气泡对话框</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>

        <el-x-bubble
          ref="basicBubble"
          content="这是一个基本的Bubble组件示例"
          placement="start"
          :avatarSize="avatarSizeValue"
          avatar="https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          :typing="true"
          :is-fog="true"
        />
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="$refs.basicBubble.restart()"
            >
              重置
            </el-button>
          </el-button-group>
        </div>
      </div>

      <div class="demo-block">
        <h3>打字器效果与控制</h3>
        <div class="control-row">
          <h4>打字速度：</h4>
          <el-slider
            style="width: 200px"
            v-model="typingInterval"
            :min="10"
            :max="200"
            :step="10"
          />
        </div>
        <div class="control-row">
          <h4>步进长度：</h4>
          <el-slider
            style="width: 200px"
            v-model="typingStep"
            :min="1"
            :max="5"
            :step="1"
          />
        </div>
        <div class="control-row">
          <h4>光标符号：</h4>
          <el-select
            v-model="typingSuffix"
            style="width: 200px"
            placeholder="选择表情"
          >
            <el-option
              label="😂"
              value="😂"
            />
            <el-option
              label="🤣"
              value="🤣"
            />
            <el-option
              label="😜"
              value="😜"
            />
            <el-option
              label="🤪"
              value="🤪"
            />
            <el-option
              label="😝"
              value="😝"
            />
            <el-option
              label="🤓"
              value="🤓"
            />
            <el-option
              label="🤡"
              value="🤡"
            />
            <el-option
              label="👻"
              value="👻"
            />
            <el-option
              label="💩"
              value="💩"
            />
            <el-option
              label="|"
              value="|"
            />
          </el-select>
        </div>
        <el-x-bubble
          ref="typingBubble"
          :typing="{
            interval: typingInterval,
            step: typingStep,
            suffix: typingSuffix,
          }"
          content="这是一个展示打字器效果的Bubble组件，文字会逐个显示出来"
          placement="start"
          @start="onTypingStart"
          @finish="onTypingFinish"
          @writing="onTypingStart"
        />
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="startTyping"
              :disabled="!isPaused"
            >
              继续
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="interruptTyping"
              :disabled="!isTyping || isPaused"
            >
              暂停
            </el-button>
            <el-button
              size="small"
              type="info"
              @click="restartTyping"
            >
              重置
            </el-button>
          </el-button-group>
        </div>
      </div>

      <div class="demo-block">
        <h3>样式与变体</h3>
        <div class="control-row">
          <h4>变体样式：</h4>
          <el-radio-group v-model="currentVariant">
            <el-radio-button label="filled">filled</el-radio-button>
            <el-radio-button label="outlined">outlined</el-radio-button>
            <el-radio-button label="borderless">borderless</el-radio-button>
            <el-radio-button label="shadow">shadow</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <h4>形状：</h4>
          <el-radio-group v-model="currentShape">
            <el-radio-button label>默认</el-radio-button>
            <el-radio-button label="round">圆角</el-radio-button>
            <el-radio-button label="corner">直角</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <h4>最大宽度：</h4>
          <el-slider
            style="width: 200px"
            v-model="maxWidthValue"
            :min="200"
            :max="800"
            :step="50"
          />
        </div>
        <div class="control-row">
          <el-switch
            v-model="noStyleValue"
            active-text="无样式模式"
          />
        </div>
        <el-x-bubble
          content="样式变体与形状示例"
          :variant="currentVariant"
          :shape="currentShape"
          :max-width="maxWidthValue + 'px'"
          :no-style="noStyleValue"
          placement="start"
        />
      </div>

      <div class="demo-block">
        <h3>头像与加载状态</h3>
        <div class="control-row">
          <h4>头像大小：</h4>
          <el-slider
            style="width: 200px"
            v-model="avatarSizeValue"
            :min="20"
            :max="60"
            :step="5"
          />
        </div>
        <div class="control-row">
          <h4>头像间距：</h4>
          <el-slider
            style="width: 200px"
            v-model="avatarGapValue"
            :min="0"
            :max="30"
            :step="2"
          />
        </div>
        <div class="control-row">
          <h4>头像形状：</h4>
          <el-radio-group v-model="avatarShapeValue">
            <el-radio-button label="circle">圆形</el-radio-button>
            <el-radio-button label="square">方形</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <el-switch
            v-model="loadingValue"
            active-text="显示加载状态"
          />
        </div>
        <el-x-bubble
          :loading="loadingValue"
          content="头像与加载状态示例"
          placement="start"
          avatar="https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
          :avatar-size="avatarSizeValue"
          :avatar-gap="avatarGapValue"
          :avatar-shape="avatarShapeValue"
          avatar-icon="el-icon-user-solid"
        />
      </div>

      <div class="demo-block">
        <h3>Markdown与高级功能</h3>
        <div class="control-row">
          <el-switch
            v-model="isMarkdownValue"
            active-text="启用Markdown"
          />
        </div>
        <div class="control-row">
          <el-switch
            v-model="isFogValue"
            active-text="启用雾化效果"
          />
        </div>
        <el-x-bubble
          ref="markdownBubble"
          :typing="true"
          :is-fog="isFogValue"
          :is-markdown="isMarkdownValue"
          :content="markdownContent"
          placement="start"
        />
        <div class="demo-controls">
          <el-button
            size="small"
            type="primary"
            @click="restartmdTyping"
          >
            预览
          </el-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>自定义插槽</h3>
        <el-x-bubble placement="start">
          <template #header>老亚瑟</template>
          <template #avatar>
            <el-avatar src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" />
          </template>
          <template #content>
            <div style="color: #67c23a">
              你好呀你好呀你好呀你好呀你好呀你好呀,你好呀你好呀你好呀你好呀你好呀你好呀,我是自定义插槽我是自定义插槽
            </div>
          </template>
          <template #footer>
            <div class="footer-container">
              <el-button
                size="mini"
                type="info"
                icon="el-icon-refresh"
                circle
              ></el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-search"
                circle
              ></el-button>
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-star-on"
                circle
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-document"
                circle
              ></el-button>
            </div>
          </template>
        </el-x-bubble>
        <el-x-bubble
          placement="end"
          class="mt-10"
        >
          <template #header>老亚瑟</template>
          <template #avatar>
            <el-avatar icon="el-icon-user-solid" />
          </template>
          <template #content>
            <div style="color: #67c23a">自定义内容插槽</div>
          </template>
          <template #footer>
            <div class="footer-container">
              <el-button
                size="mini"
                type="info"
                icon="el-icon-refresh"
                circle
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-edit"
                circle
              ></el-button>
            </div>
          </template>
        </el-x-bubble>
      </div>

      <div class="demo-block">
        <h3>应用插件</h3>
        <el-x-bubble placement="start">
          <template #avatar>
            <el-avatar src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" />
          </template>
          <template #content>
            <el-x-typewriter
              :content="markdownEmojiContent"
              :md-plugins="mdPlugins"
              :is-markdown="true"
            />
          </template>
          <template #footer>
            <div class="footer-container">
              <el-button
                size="mini"
                type="info"
                icon="el-icon-refresh"
                circle
              ></el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-search"
                circle
              ></el-button>
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-star-on"
                circle
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-document"
                circle
              ></el-button>
            </div>
          </template>
        </el-x-bubble>
        <el-x-bubble
          placement="end"
          class="mt-10"
        >
          <template #avatar>
            <el-avatar icon="el-icon-user-solid" />
          </template>
          <template #content>
            <el-x-typewriter
              :content="markdownMermaidContent"
              :md-plugins="mdPlugins"
              :is-markdown="true"
            />
          </template>
          <template #footer>
            <div class="footer-container">
              <el-button
                size="mini"
                type="info"
                icon="el-icon-refresh"
                circle
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-edit"
                circle
              ></el-button>
            </div>
          </template>
        </el-x-bubble>
      </div>
    </el-card>
  </div>
</template>

<script>
  import 'katex/dist/katex.min.css'; // 确保样式被引入
  import { full as emoji } from 'markdown-it-emoji';
  import markdownItKatex from 'markdown-it-katex';
  import markdownItMermaid from 'markdown-it-mermaid';
  export default {
    name: 'BubbleDemo',
    data() {
      return {
        isTyping: false,
        isPaused: false,
        typingInterval: 50,
        typingStep: 2,
        typingSuffix: '🤡',
        currentVariant: 'filled',
        currentShape: '',
        maxWidthValue: 500,
        noStyleValue: false,
        avatarSizeValue: 40,
        avatarGapValue: 12,
        avatarShapeValue: 'circle',
        loadingValue: false,
        isMarkdownValue: true,
        isFogValue: true,
        newMessage: '',
        markdownEmojiContent: `# 你可以使用 \`markdown-it-emoji\` 插件来显示表情

:rocket: :sparkles: :bookmark_tabs: :satellite: :heart_eyes: :heart:`,
        markdownMermaidContent: `#  你可以使用 \`markdown-it-katex\` 跟 \`markdown-it-mermaid\` 插件来显示公式和图表
$$
\\int_{a}^{b} x^2 dx
$$

$E=mc^2$

\`\`\`mermaid
graph TD
A-->B
B-->C
B-->D
\`\`\`

\`\`\`mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
\`\`\`

\`\`\`mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant A as Alpha
    participant B as Beta
    A->>B: Hello Beta
    B-->>A: Hello Alpha
    A->>B: How are you?
    B-->>A: I am good thanks!
\`\`\``,
        mdPlugins: [emoji, markdownItMermaid, markdownItKatex],
        chatMessages: [
          {
            content: '你好，有什么可以帮您的吗？',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
          },
          {
            content: '我想了解这个组件如何使用',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
          },
          {
            content: '这个组件支持打字器效果、Markdown渲染等功能',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
          },
        ],
        markdownContent: `# Markdown示例
  这是一个支持**Markdown**渲染的打字器效果演示。

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
  \`\`\`
  [这是饿了么官网](https://element.eleme.cn/)
  `,
      };
    },
    mounted() {
      this.$nextTick(() => {
        if (window.mermaid) {
          window.mermaid.init();
        }
      });
    },
    methods: {
      startTyping() {
        this.$refs.typingBubble.continueTyping();
        this.isTyping = true;
        this.isPaused = false;
      },
      interruptTyping() {
        this.$refs.typingBubble.interrupt();
        this.isTyping = false;
        this.isPaused = true;
      },
      restartTyping() {
        this.$refs.typingBubble.restart();
        this.isTyping = true;
        this.isPaused = false;
      },
      onTypingStart() {
        this.isTyping = true;
        this.isPaused = false;
      },
      onTypingFinish() {
        this.isTyping = false;
        this.isPaused = false;
      },
      onTypingPause() {
        this.isPaused = true;
      },
      restartmdTyping() {
        this.$refs.markdownBubble.restart();
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

  .mt-10 {
    margin-top: 10px;
  }

  .chat-container {
    max-height: 300px;
    overflow-y: auto;
  }

  .footer-container {
    padding: 4px 0 0;
    display: flex;
    gap: 8px;

    ::v-deep .el-button + .el-button {
      margin-left: 8px;
    }

    ::v-deep .el-button:last-child {
      background: #626aef;
      color: #fff;
    }
  }
</style>
