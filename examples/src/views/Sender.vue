<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Sender 消息发送器</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-sender
          v-model="basicContent"
          clearable
          @submit="handleBasicSubmit"
        ></el-x-sender>
        <br />
        <el-x-sender
          style="width: fit-content"
          inputWidth="480px"
          placeholder="欢迎使用 Element-UI-X"
        />
        <div class="demo-controls">
          <p>输入内容：{{ basicContent }}</p>
          <p v-if="basicSubmitted">已提交内容：{{ basicSubmitted }}</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>不同变体</h3>
        <h4>默认变体</h4>
        <el-x-sender
          v-model="variantContent.default"
          placeholder="默认变体..."
          variant="default"
          clearable
        ></el-x-sender>
        <h4 style="margin-top: 20px">上下变体</h4>
        <el-x-sender
          v-model="variantContent.updown"
          placeholder="上下变体..."
          variant="updown"
          clearable
        ></el-x-sender>
      </div>

      <div class="demo-block">
        <h3>提交方式</h3>
        <div class="control-row">
          <h4>提交方式：</h4>
          <el-radio-group v-model="submitType">
            <el-radio label="enter">Enter 提交</el-radio>
            <el-radio label="shiftEnter">Shift+Enter 提交</el-radio>
          </el-radio-group>
        </div>
        <el-x-sender
          v-model="submitContent"
          :submit-type="submitType"
          :loading="enterLoading"
          placeholder="尝试不同提交方式..."
          clearable
          @submit="enterSubmit"
        ></el-x-sender>
        <div class="demo-controls">
          <p>
            当前提交方式：{{
              submitType === 'enter'
                ? 'Enter 提交，Shift+Enter 换行'
                : 'Shift+Enter 提交，Enter 换行'
            }}
          </p>
        </div>
      </div>

      <div class="demo-block">
        <h3>禁用状态</h3>
        <div class="control-row">
          <h4>状态控制：</h4>
          <el-checkbox v-model="disabledState">禁用</el-checkbox>
          <el-checkbox
            v-model="readOnlyState"
            style="margin-left: 20px"
          >
            只读
          </el-checkbox>
        </div>
        <el-x-sender
          v-model="stateContent"
          :disabled="disabledState"
          :read-only="readOnlyState"
          placeholder="禁用/只读状态..."
          clearable
        ></el-x-sender>
      </div>

      <div class="demo-block">
        <h3>加载状态</h3>
        <el-x-sender
          v-model="loadingContent"
          :loading="isLoading"
          placeholder="模拟提交中..."
          clearable
          @submit="handleLoadingSubmit"
          @cancel="handleLoadingCancel"
        ></el-x-sender>
        <div class="demo-controls">
          <p v-if="isLoading">正在处理请求，可以点击取消按钮终止...</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>语音输入</h3>
        <el-x-sender
          v-model="speechContent"
          placeholder="点击麦克风图标开始语音输入..."
          clearable
          allow-speech
        ></el-x-sender>
        <div class="demo-controls">
          <p>支持语音输入功能（需浏览器支持Web Speech API）</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>自定义高度</h3>
        <div class="control-row">
          <h4>行数限制：</h4>
          <el-slider
            style="width: 200px"
            v-model="autoSizeConfig.maxRows"
            :min="1"
            :max="10"
            :step="1"
            :marks="{ 1: '1', 5: '5', 10: '10' }"
          />
        </div>
        <el-x-sender
          v-model="sizeContent"
          :auto-size="autoSizeConfig"
          placeholder="尝试输入多行内容..."
          clearable
        ></el-x-sender>
      </div>

      <div class="demo-block">
        <h3>触发器功能</h3>
        <el-x-sender
          :value.sync="triggerContent"
          placeholder="输入 @ 或 # 触发提示..."
          :trigger-strings="['@', '#']"
          :trigger-popover-visible.sync="showTriggerPopover"
          clearable
          @trigger="handleTrigger"
          @input="handleInput"
        >
          <template #trigger-popover="{ triggerString }">
            <div class="trigger-popover-content">
              <template v-if="triggerString === '@'">
                <div
                  class="trigger-item"
                  v-for="user in userList"
                  :key="user.id"
                  @click="selectUser(user)"
                >
                  <span>@{{ user.name }}</span>
                </div>
              </template>
              <template v-else-if="triggerString === '#'">
                <div
                  class="trigger-item"
                  v-for="tag in tagList"
                  :key="tag.id"
                  @click="selectTag(tag)"
                >
                  <span>#{{ tag.name }}</span>
                </div>
              </template>
            </div>
          </template>
        </el-x-sender>
      </div>

      <div class="demo-block">
        <h3>插槽用法</h3>
        <el-x-sender
          ref="customSender"
          v-model="slotContent"
          placeholder="带有头部、前缀和底部的发送器..."
          clearable
        >
          <template #header>
            <div class="header-self-wrap">
              <div class="header-self-title">
                <div class="header-left">💯 欢迎使用 Element X</div>
                <div class="header-right">
                  <el-button @click.stop="toggleHeader">
                    <el-icon>
                      <CircleClose />
                    </el-icon>
                    <span>关闭头部</span>
                  </el-button>
                </div>
              </div>
              <div class="header-self-content">🦜 自定义头部内容</div>
            </div>
          </template>
          <template #prefix>
            <el-avatar
              :size="32"
              icon="el-icon-user-solid"
            ></el-avatar>
          </template>
          <template #footer>
            <div class="custom-footer">
              <span>自定义底部区域</span>
              <el-button-group>
                <el-button
                  size="mini"
                  icon="el-icon-picture"
                  type="text"
                >
                  图片
                </el-button>
                <el-button
                  size="mini"
                  icon="el-icon-video-camera"
                  type="text"
                >
                  视频
                </el-button>
                <el-button
                  size="mini"
                  icon="el-icon-paperclip"
                  type="text"
                >
                  附件
                </el-button>
              </el-button-group>
            </div>
          </template>
        </el-x-sender>
        <div class="demo-controls">
          <el-button
            size="small"
            type="primary"
            @click="toggleHeader"
          >
            {{ showHeader ? '关闭头部' : '显示头部' }}
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
        // 基础用法
        basicContent: '',
        basicSubmitted: '',

        // 变体
        variantContent: {
          default: '',
          updown: '',
        },

        // 提交方式
        submitType: 'enter',
        enterLoading: false,
        submitContent: '',

        // 状态
        disabledState: false,
        readOnlyState: false,
        stateContent: '',

        // 加载状态
        isLoading: true,
        loadingContent: '',

        // 语音输入
        speechContent: '',

        // 自定义高度
        autoSizeConfig: {
          minRows: 1,
          maxRows: 5,
        },
        sizeContent: '',

        // 触发器功能
        triggerContent: '',
        showTriggerPopover: false,
        currentTrigger: '',
        userList: [
          {
            id: 1,
            name: '张三',
          },
          {
            id: 2,
            name: '李四',
          },
          {
            id: 3,
            name: '王五',
          },
        ],
        tagList: [
          {
            id: 1,
            name: '前端',
          },
          {
            id: 2,
            name: '后端',
          },
          {
            id: 3,
            name: '设计',
          },
        ],

        // 插槽用法
        slotContent: '',
        showHeader: true,

        // AI对话模拟
        chatMessages: [
          {
            type: 'bot',
            content: '你好！我是AI助手，有什么可以帮助你的？',
          },
        ],
        chatInput: '',
        chatLoading: false,
      };
    },

    methods: {
      // 基础用法
      handleBasicSubmit(content) {
        this.basicSubmitted = content;
        this.basicContent = '';
      },
      // 键盘提交
      enterSubmit(content) {
        this.enterLoading = true;
        setTimeout(() => {
          this.enterLoading = false;
          this.submitContent = '';
          this.$message.success('提交成功：' + content);
        }, 2000);
      },
      // 加载状态
      handleLoadingSubmit(content) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.loadingContent = '';
          this.$message.success('提交成功：' + content);
        }, 2000);
      },
      handleLoadingCancel() {
        this.isLoading = false;
        this.$message.info('已取消提交');
      },

      // 触发器功能
      handleTrigger(event) {
        console.log('触发器事件：', event);
        this.currentTrigger = event.triggerString;
      },
      handleInput(event) {
        console.log('输入事件：', event);
        this.triggerContent = event;
      },

      selectUser(user) {
        // 先关闭弹窗，避免替换过程中再次触发
        this.showTriggerPopover = false;

        // 特殊处理：延迟执行替换，避免与触发逻辑冲突
        this.$nextTick(() => {
          if (this.triggerContent.includes('@')) {
            this.triggerContent = this.triggerContent.replace('@', `@${user.name} `);
          } else {
            this.triggerContent = `@${user.name} `;
          }
        });
      },
      selectTag(tag) {
        // 先关闭弹窗，避免替换过程中再次触发
        this.showTriggerPopover = false;

        // 特殊处理：延迟执行替换，避免与触发逻辑冲突
        this.$nextTick(() => {
          if (this.triggerContent.includes('#')) {
            this.triggerContent = this.triggerContent.replace('#', `#${tag.name} `);
          } else {
            this.triggerContent = `#${tag.name} `;
          }
        });
      },

      // 插槽用法
      toggleHeader() {
        this.showHeader = !this.showHeader;
        if (this.showHeader) {
          this.$nextTick(() => {
            if (this.$refs.customSender) {
              this.$refs.customSender.openHeader();
            }
          });
        } else {
          if (this.$refs.customSender) {
            this.$refs.customSender.closeHeader();
          }
        }
      },

      // AI对话模拟
      sendChatMessage(content) {
        // 添加用户消息
        this.chatMessages.push({
          type: 'user',
          content: content,
        });

        // 清空输入框
        this.chatInput = '';

        // 模拟AI回复
        this.chatLoading = true;
        setTimeout(() => {
          const responses = [
            '我理解你的问题，这是一个很好的观点。',
            '感谢你的提问，我需要更多信息来回答这个问题。',
            '这是一个复杂的话题，我可以从多个角度为你解析。',
            '根据我的理解，这个问题的答案取决于具体场景。',
            '我可以提供一些相关的建议和参考资料。',
          ];

          const randomResponse = responses[Math.floor(Math.random() * responses.length)];

          this.chatMessages.push({
            type: 'bot',
            content: randomResponse,
          });

          this.chatLoading = false;

          // 滚动到底部
          this.$nextTick(() => {
            const chatContainer = document.querySelector('.chat-container');
            if (chatContainer) {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }
          });
        }, 1500);
      },
      cancelChatMessage() {
        this.chatLoading = false;
      },
    },
    mounted() {
      this.$refs.customSender.openHeader();
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    font-weight: bold !important;
    font-size: 20px !important;
  }

  h4 {
    font-size: 16px !important;
    margin-top: 10px;
    margin-bottom: 10px;
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
    width: 100%;
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
  .header-self-wrap {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 200px;
    .header-self-title {
      width: 100%;
      display: flex;
      height: 30px;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
    }
    .header-self-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #626aef;
      font-weight: 600;
    }
  }
  .custom-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
  }

  .custom-footer {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
  }

  .trigger-popover-content {
    max-height: 200px;
    overflow-y: auto;
  }

  .trigger-item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background-color: #f5f7fa;
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
    margin-bottom: 20px;
  }

  .chat-input {
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
