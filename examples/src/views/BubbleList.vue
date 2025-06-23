<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>BubbleList 气泡对话框列表</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="control-row">
          <el-switch
            v-model="isMarkdown"
            active-text="启用Markdown"
          />
          <el-switch
            v-model="isFog"
            active-text="启用雾化效果"
            style="margin-left: 20px"
          />
          <el-switch
            v-model="isTyping"
            active-text="启用打字效果"
            style="margin-left: 20px"
          />
        </div>

        <el-x-bubble-list
          :list="basicList"
          max-height="300px"
          ref="basicDemo"
          :default-is-markdown="isMarkdown"
          :default-is-fog="isFog"
          :default-typing="typingConfig"
        >
          <template
            slot="footer"
            slot-scope="{ item }"
          >
            <div
              class="bubble-footer"
              v-if="item.placement === 'start'"
            >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="replyToMessage(item)"
              >
                回复
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteMessage(item)"
              >
                删除
              </el-button>
            </div>
            <div
              class="bubble-footer text-right"
              v-else
            >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-refresh-left"
                @click="recallMessage(item)"
              >
                撤回
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteMessage(item)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-x-bubble-list>
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="addMessage('start')"
            >
              添加左侧消息
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="addMessage('end')"
            >
              添加右侧消息
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="addMarkdownMessage('start')"
            >
              添加Markdown消息
            </el-button>
            <el-button
              size="small"
              @click="clearMessages"
            >
              清空列表
            </el-button>
          </el-button-group>
        </div>
      </div>

      <div class="demo-block">
        <h3>滚动与返回按钮 & 加载状态与样式</h3>
        <div class="control-row">
          <h4>最大高度：</h4>
          <el-slider
            style="width: 200px"
            v-model="maxHeight"
            :min="200"
            :max="500"
            :step="50"
          />
        </div>
        <div class="control-row">
          <el-switch
            v-model="showBackButton"
            active-text="显示返回按钮"
          />
        </div>

        <!-- 添加按钮位置控制 -->
        <div
          class="control-row"
          v-if="showBackButton"
        >
          <h4>按钮位置：</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; width: 300px">
            <div style="display: flex; align-items: center">
              <span style="width: 80px">底部距离：</span>
              <el-slider
                v-model="backButtonPositionBottom"
                :min="0"
                :max="50"
                :step="5"
                style="flex: 1"
                @change="updateBackButtonPosition"
              />
              <span style="width: 50px; text-align: right">{{ backButtonPositionBottom }}px</span>
            </div>
            <div style="display: flex; align-items: center">
              <span style="width: 80px">水平位置：</span>
              <el-slider
                v-model="backButtonPositionLeft"
                :min="0"
                :max="100"
                :step="5"
                style="flex: 1"
                @change="updateBackButtonPosition"
              />
              <span style="width: 50px; text-align: right">{{ backButtonPositionLeft }}%</span>
            </div>
          </div>
        </div>

        <div class="control-row">
          <h4>按钮颜色：</h4>
          <el-color-picker
            v-model="btnColor"
            size="small"
          />
        </div>
        <div class="control-row">
          <h4>图标大小：</h4>
          <el-slider
            style="width: 200px"
            v-model="btnIconSize"
            :min="16"
            :max="32"
            :step="2"
          />
        </div>
        <div class="control-row">
          <el-switch
            v-model="btnLoading"
            active-text="显示加载状态"
          />
        </div>
        <el-x-bubble-list
          :list="scrollList"
          :max-height="maxHeight + 'px'"
          :show-back-button="showBackButton"
          :back-button-position="backButtonPosition"
          :btn-loading="btnLoading"
          :btn-color="btnColor"
          :btn-icon-size="btnIconSize"
          ref="scrollDemo"
        >
          <template
            slot="footer"
            slot-scope="{ item }"
          >
            <div
              class="bubble-footer"
              v-if="item.placement === 'start'"
            >
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
            <div
              class="bubble-footer text-right"
              v-else
            >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-refresh-left"
                @click="recallMessage(item)"
              >
                撤回
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteMessage(item)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-x-bubble-list>
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="scrollToTop"
            >
              滚动到顶部
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="scrollToBottom"
            >
              滚动到底部
            </el-button>
            <el-button
              size="small"
              @click="scrollToMessage(5)"
            >
              滚动到第5条
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="toggleLoading"
            >
              切换加载状态
            </el-button>
          </el-button-group>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isFog: true,
        isMarkdown: true,
        isTyping: true,
        basicList: [
          {
            content: '这是一个左侧气泡消息',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
            avatarSize: 40,
          },
          {
            content: '这是一个右侧气泡消息',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
            avatarSize: 40,
          },
          {
            content:
              '# Markdown 标题\n这是一个**Markdown**格式的消息，支持*斜体*和`代码`\n```js\nconst hello = "world";\nconsole.log(hello);\n```',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
            avatarSize: 40,
            isMarkdown: true,
          },
        ],
        scrollList: Array.from({ length: 20 }, (_, i) => ({
          content: `滚动列表消息${i + 1}`,
          placement: i % 2 === 0 ? 'start' : 'end',
          avatarSize: 40,
          avatar:
            i % 2 === 0
              ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg'
              : 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
          loading: i >= 18, // 最后两条消息显示加载状态
        })),
        chatList: [
          {
            content: '你好，我是AI助手，有什么可以帮您？',
            placement: 'start',
            avatarSize: 40,
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
          },
        ],
        maxHeight: 500,
        showBackButton: true,
        backButtonPosition: {
          bottom: '20px',
          left: 'calc(50% - 19px)',
        },
        backButtonPositionBottom: 20, // 新增：底部距离数值
        backButtonPositionLeft: 50, // 新增：水平位置百分比
        btnLoading: true,
        btnColor: '#409EFF',
        btnIconSize: 24,
        newMessage: '',
        messageCount: 0,
      };
    },
    computed: {
      typingConfig() {
        return this.isTyping
          ? {
              interval: this.typingSpeed,
              step: this.typingStep,
              suffix: '|',
            }
          : false;
      },
    },
    methods: {
      addMessage(placement) {
        this.messageCount++;
        const message = {
          content: `这是第${this.messageCount}条${placement === 'start' ? '左侧' : '右侧'}消息`,
          placement,
          avatarSize: 40,
          avatar:
            placement === 'start'
              ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg'
              : 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
        };
        this.basicList.push(message);
        this.$nextTick(() => {
          this.$refs.basicDemo.scrollToBottom();
        });
      },
      addMarkdownMessage(placement) {
        this.messageCount++;
        const markdownContent = `# 标题 ${this.messageCount}\n
这是一个**Markdown**格式的消息 ${this.messageCount}\n
- 列表项 1\n- 列表项 2\n
\`\`\`javascript\nconst count = ${this.messageCount};\nconsole.log("Hello Markdown #" + count);\n\`\`\``;

        const message = {
          content: markdownContent,
          placement,
          avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
          avatarSize: 40,
          isMarkdown: true,
          isFog: this.isFog,
          typing: this.isTyping ? this.typingConfig : false,
        };
        this.basicList.push(message);
        this.$nextTick(() => {
          this.$refs.basicDemo.scrollToBottom();
        });
      },
      clearMessages() {
        this.basicList = [];
        this.messageCount = 0;
      },
      scrollToTop() {
        this.$refs.scrollDemo.scrollToTop();
      },
      scrollToBottom() {
        this.$refs.scrollDemo.scrollToBottom();
      },
      scrollToMessage(index) {
        this.$refs.scrollDemo.scrollToBubble(index - 1);
      },
      toggleLoading() {
        // 切换最后两条消息的加载状态
        const len = this.scrollList.length;
        if (len >= 2) {
          this.scrollList[len - 1].loading = !this.scrollList[len - 1].loading;
          this.scrollList[len - 2].loading = !this.scrollList[len - 2].loading;
        }
      },
      replyToMessage(item) {
        this.$message({
          message: `回复消息: ${item.content}`,
          type: 'success',
        });
      },
      deleteMessage(item) {
        const index = this.basicList.indexOf(item);
        if (index !== -1) {
          this.basicList.splice(index, 1);
          this.$message({
            message: '消息已删除',
            type: 'warning',
          });
        }
      },
      recallMessage(item) {
        const index = this.basicList.indexOf(item);
        if (index !== -1) {
          this.basicList.splice(index, 1);
          this.$message({
            message: '消息已撤回',
            type: 'info',
          });
        }
      },
      sendMessage() {
        if (!this.newMessage.trim()) return;

        // 用户消息
        this.chatList.push({
          content: this.newMessage,
          placement: 'end',
          avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
          avatarSize: 40,
        });

        // AI回复
        setTimeout(() => {
          this.chatList.push({
            content: `这是对"${this.newMessage}"的回复`,
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
            avatarSize: 40,
          });
          this.$nextTick(() => {
            this.$refs.chatDemo.scrollToBottom();
          });
        }, 1000);

        this.newMessage = '';
        this.$nextTick(() => {
          this.$refs.chatDemo.scrollToBottom();
        });
      },
      // 新增：更新按钮位置方法
      updateBackButtonPosition() {
        this.backButtonPosition = {
          bottom: `${this.backButtonPositionBottom}px`,
          left:
            this.backButtonPositionLeft === 50
              ? 'calc(50% - 19px)'
              : `${this.backButtonPositionLeft}%`,
        };
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

  .bubble-footer {
    padding: 4px 0 0;
    display: flex;

    &.text-right {
      justify-content: flex-end;
    }

    .el-button--text {
      padding: 2px 4px;
      font-size: 12px;
      // color: $--color-text-secondary;

      // &:hover {
      //     color: $--color-primary;
      // }
    }
  }
</style>
