<template>
  <div>
    <!-- <el-card class="demo-card">
      <div slot="header">
        <h2>Thinking 思考状态</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-thinking
          status="start"
          content="开始思考状态示例"
        />
        <el-x-thinking
          status="thinking"
          content="思考中状态示例"
          class="mt-10"
        />
        <el-x-thinking
          status="end"
          content="思考完成状态示例"
          class="mt-10"
        />
        <el-x-thinking
          status="error"
          content="思考错误状态示例"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>状态控制</h3>
        <div class="control-row">
          <h4>当前状态：</h4>
          <el-radio-group v-model="currentStatus">
            <el-radio-button label="start">开始</el-radio-button>
            <el-radio-button label="thinking">思考中</el-radio-button>
            <el-radio-button label="end">完成</el-radio-button>
            <el-radio-button label="error">错误</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <el-switch
            v-model="autoCollapseValue"
            active-text="自动折叠"
          />
        </div>
        <div class="control-row">
          <el-switch
            v-model="disabledValue"
            active-text="禁用状态"
          />
        </div>
        <el-x-thinking
          :status="currentStatus"
          :auto-collapse="autoCollapseValue"
          :disabled="disabledValue"
          content="这是一个状态控制的Thinking组件示例"
        />
      </div>

      <div class="demo-block">
        <h3>样式定制</h3>
        <div class="control-row">
          <h4>按钮宽度：</h4>
          <el-slider
            style="width: 200px"
            v-model="buttonWidthValue"
            :min="100"
            :max="300"
            :step="10"
          />
        </div>
        <div class="control-row">
          <h4>动画时长：</h4>
          <el-slider
            style="width: 200px"
            v-model="durationValue"
            :min="0.1"
            :max="1"
            :step="0.1"
          />
        </div>
        <div class="control-row">
          <h4>内容区宽度：</h4>
          <el-slider
            style="width: 200px"
            v-model="maxWidthValue"
            :min="200"
            :max="800"
            :step="50"
          />
        </div>
        <div class="control-row">
          <h4>背景颜色：</h4>
          <el-color-picker v-model="backgroundColorValue" />
        </div>
        <div class="control-row">
          <h4>文字颜色：</h4>
          <el-color-picker v-model="colorValue" />
        </div>
        <el-x-thinking
          :button-width="buttonWidthValue + 'px'"
          :duration="durationValue + 's'"
          :max-width="maxWidthValue + 'px'"
          :background-color="backgroundColorValue"
          :color="colorValue"
          content="这是一个样式定制的Thinking组件示例"
        />
      </div>

      <div class="demo-block">
        <h3>自定义插槽</h3>
        <el-x-thinking status="thinking">
          <template #status-icon="{ status }">
            <i
              v-if="status === 'thinking'"
              class="is-loading el-icon-center el-icon-loading"
            ></i>
            <i
              v-if="status === 'start'"
              class="el-icon-center el-icon-opportunity"
            ></i>
            <i
              v-if="status === 'end'"
              class="el-icon-center el-icon-success"
            ></i>
            <i
              v-if="status === 'error'"
              class="el-icon-center el-icon-circle-close"
            ></i>
          </template>
          <template #label="{ status }">
            {{
              status === 'thinking'
                ? '自定义思考中...'
                : status === 'error'
                ? '自定义错误状态'
                : status === 'end'
                ? '自定义完成'
                : '自定义开始'
            }}
          </template>
          <template #content>
            <div style="color: #67c23a">自定义内容区域</div>
          </template>
        </el-x-thinking>
      </div>
    </el-card> -->

    <el-card class="demo-card">
      <div
        slot="header"
        class="header-with-settings"
      >
        <div class="header-title">
          <h2>Thinking 思考动画</h2>
        </div>
        <div class="header-actions">
          <el-tooltip
            content="清空消息"
            placement="top"
          >
            <el-button
              type="text"
              @click="clearMessages"
              :disabled="!bubbleItems.length"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="配置API Key"
            placement="top"
          >
            <el-button
              type="text"
              @click="showSettings = true"
            >
              <i class="el-icon-setting"></i>
            </el-button>
          </el-tooltip>
        </div>
      </div>

      <el-dialog
        title="API 配置 (请使用硅基流动的API KEY)"
        :visible.sync="showSettings"
        width="500px"
        custom-class="settings-dialog"
      >
        <el-form
          :model="settings"
          label-width="100px"
        >
          <el-form-item label="API Key">
            <el-input
              v-model="settings.apiKey"
              placeholder="请输入您的 API Key"
              show-password
            >
              <template #append>
                <el-button @click="resetApiKey">重置</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="模型">
            <el-select
              v-model="settings.model"
              placeholder="请选择模型"
            >
              <el-option
                label="DeepSeek-R1"
                value="deepseek-ai/DeepSeek-R1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="showSettings = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveSettings"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>

      <div class="chat-wrap">
        <div
          v-if="chatError"
          class="error"
        >
          {{ chatError.message }}
        </div>

        <!-- 添加提示词组件 -->
        <el-x-prompts
          v-if="bubbleItems.length <= 1"
          :items="promptItems"
          :wrap="true"
          :title="'✨ 来试试这些有趣的话题吧'"
          :styles="promptStyles"
          @on-item-click="handlePromptClick"
        >
          <template #icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>

        <el-x-bubble-list
          ref="bubbleListRef"
          :list="bubbleItems"
          :default-is-markdown="true"
          :default-avatar-size="40"
          :max-height="'500px'"
          :btnLoading="isLoading"
        >
          <template #header="{ item }">
            <el-x-thinking
              v-if="item.reasoning_content"
              :content="item.reasoning_content"
              :status="item.thinkingStatus"
              class="thinking-chain-wrap"
              @change="handleThinkingChange"
            />
          </template>

          <template #content="{ item }">
            <el-x-thinking
              v-if="item.reasoning_content"
              :content="item.reasoning_content"
              :status="item.thinkingStatus"
              duration=".3s"
              max-width="350px"
              button-width="100%"
              background-color="linear-gradient(to right, #ffd3d8e0, #ff6969e7)"
              color="black"
              class="thinking-chain-wrap"
            >
              <template #status-icon="{ status }">
                <span v-if="status === 'start'">💡</span>
                <span v-if="status === 'thinking'">💖</span>
                <span v-if="status === 'end'">✅</span>
                <span v-if="status === 'error'">❌</span>
              </template>

              <template #label="{ status }">
                <span v-if="status === 'start'">开始思考 😄</span>
                <span v-if="status === 'thinking'">让我想想 🤔</span>
                <span v-if="status === 'end'">想出来啦 😆</span>
                <span v-if="status === 'error'">想不出来 🥵</span>
              </template>

              <template #arrow>👇</template>

              <template #error>
                <span class="error-color">思考报错</span>
              </template>

              <template #content="{ content }">这里是自定义内容 + 返回：{{ content }}</template>
            </el-x-thinking>

            <el-x-typewriter
              :content="item.content"
              :loading="item.loading"
              :typing="item.typing"
              :is-markdown="item.isMarkdown"
              :is-fog="item.isFog"
            />
          </template>
        </el-x-bubble-list>

        <el-x-sender
          ref="senderRef"
          v-model="inputValue"
          :loading="isLoading"
          :submit-btn-disabled="submitBtnDisabled"
          clearable
          @submit="startSSE"
          @cancel="handleCancel"
        >
          <template #action-list>
            <div class="footer-container">
              <el-button
                v-if="!isLoading"
                type="primary"
                circle
                @click="$refs.senderRef.submit()"
              >
                <i class="el-icon-position"></i>
              </el-button>
              <el-button
                v-if="isLoading"
                circle
                type="danger"
                @click="$refs.senderRef.cancel()"
              >
                <i class="el-icon-loading"></i>
              </el-button>
            </div>
          </template>
        </el-x-sender>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { customMixins } from 'vue-element-ui-x';

  const DEFAULT_API_KEY = 'sk-pgwnpnjiredqnosawllqfihokzmchdtswbrghveeuaryzqsj';
  const DEFAULT_MODEL = 'deepseek-ai/DeepSeek-R1';

  export default {
    name: 'ThinkingDemo',
    mixins: [customMixins.streamMixin],
    data() {
      return {
        // 基础配置
        BASE_URL: 'https://api.siliconflow.cn/v1/chat/completions',
        API_KEY: DEFAULT_API_KEY,
        MODEL: DEFAULT_MODEL,

        // 设置相关
        showSettings: false,
        settings: {
          apiKey: DEFAULT_API_KEY,
          model: DEFAULT_MODEL,
        },

        // 状态数据
        inputValue: '王者荣耀的李信连招是什么',
        bubbleItems: [],
        processedIndex: 0,
        chatError: null,
        submitBtnDisabled: false,

        // 提示词配置
        promptItems: [
          {
            key: '1',
            icon: 'el-icon-trophy',
            iconStyle: {
              color: '#FFD700',
            },
            label: '王者荣耀',
            description: '王者荣耀的李信连招是什么？',
          },
          {
            key: '2',
            icon: 'el-icon-mobile-phone',
            iconStyle: {
              color: '#1890FF',
            },
            label: '手机介绍',
            description: '帮我写一篇小米手机介绍。',
          },
          {
            key: '3',
            icon: 'el-icon-reading',
            iconStyle: {
              color: '#722ED1',
            },
            label: '写一首诗',
            description: '写一首关于春天的诗。',
          },
          {
            key: '4',
            icon: 'el-icon-coffee-cup',
            iconStyle: {
              color: '#52C41A',
            },
            label: '咖啡知识',
            description: '介绍一下不同种类的咖啡。',
          },
          {
            key: '5',
            icon: 'el-icon-basketball',
            iconStyle: {
              color: '#FF4D4F',
            },
            label: '篮球技巧',
            description: '如何提高篮球投篮命中率？',
          },
        ],
        promptStyles: {
          item: {
            flex: 'none',
            width: 'calc(33.33% - 8px)',
            backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
            border: '1px solid #e8e8e8',
            marginBottom: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          },
        },
      };
    },
    computed: {
      isLoading() {
        return this.streamLoading;
      },
    },
    watch: {
      // 监听流数据变化
      streamData: {
        handler(newData) {
          for (let i = this.processedIndex; i < newData.length; i++) {
            const chunk = newData[i].data;
            this.handleDataChunk(chunk);
            this.processedIndex++;
          }
        },
        deep: true,
      },
    },
    methods: {
      // 处理数据块
      handleDataChunk(chunk) {
        if (chunk === ' [DONE]') {
          console.log('数据接收完毕');
          if (this.bubbleItems.length) {
            this.$set(this.bubbleItems[this.bubbleItems.length - 1], 'typing', false);
          }
          return;
        }

        try {
          const parsedChunk = JSON.parse(chunk);
          const reasoningChunk = parsedChunk.choices[0].delta.reasoning_content;
          const contentChunk = parsedChunk.choices[0].delta.content;

          if (reasoningChunk) {
            const lastItem = this.bubbleItems[this.bubbleItems.length - 1];
            if (lastItem) {
              this.$set(lastItem, 'thinkingStatus', 'thinking');
              this.$set(lastItem, 'loading', true);
              this.$set(
                lastItem,
                'reasoning_content',
                (lastItem.reasoning_content || '') + reasoningChunk,
              );
            }
          }

          if (contentChunk) {
            const lastItem = this.bubbleItems[this.bubbleItems.length - 1];
            if (lastItem) {
              this.$set(lastItem, 'thinkingStatus', 'end');
              this.$set(lastItem, 'loading', false);
              this.$set(lastItem, 'content', (lastItem.content || '') + contentChunk);
            }
          }
        } catch (err) {
          console.error('解析数据时出错:', err);
        }
      },

      // 添加消息方法
      addMessage(message, isUser) {
        const i = this.bubbleItems.length;
        const obj = {
          key: i,
          role: isUser ? 'user' : 'assistant',
          content: message || '',
          thinkingStatus: isUser ? 'end' : 'start',
          loading: !isUser,
          typing: !isUser,
          avatar: isUser
            ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg'
            : '	https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
          placement: isUser ? 'end' : 'start',
          isMarkdown: !isUser,
          variant: 'shadow',
          shape: 'corner',
          reasoning_content: '',
        };
        this.bubbleItems.push(obj);
      },

      // 修改 startSSE 方法
      async startSSE() {
        if (this.streamLoading || !this.inputValue.trim()) return;

        try {
          const userMessage = this.inputValue;
          // 清空输入框
          this.inputValue = '';

          // 添加消息
          this.addMessage(userMessage, true);
          this.addMessage('', false);

          // 手动触发滚动到底部
          this.$nextTick(() => {
            if (this.$refs.bubbleListRef) {
              this.$refs.bubbleListRef.scrollToBottom();
            }
          });

          const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.API_KEY}`,
              'Content-Type': 'application/json',
              Accept: 'text/event-stream',
            },
            body: JSON.stringify({
              model: this.MODEL,
              messages: this.bubbleItems
                .filter(item => item.role === 'user')
                .map(item => ({
                  role: item.role,
                  content: item.content,
                })),
              stream: true,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const readableStream = response.body;
          this.processedIndex = 0;

          // 使用 streamMixin 的方法处理流
          await this.startStream({
            readableStream,
          });
        } catch (err) {
          this.handleError(err);
        }
      },

      // 优化错误处理
      handleError(err) {
        console.error('Fetch error:', err);
        this.chatError = err;

        // 更新最后一条消息的状态
        const lastMessage = this.bubbleItems[this.bubbleItems.length - 1];
        if (lastMessage) {
          this.$set(lastMessage, 'thinkingStatus', 'error');
          this.$set(lastMessage, 'loading', false);
          this.$set(lastMessage, 'typing', false);
          this.$set(lastMessage, 'content', '出错了，请重试');
        }
        console.log(lastMessage);
        this.$message.error(err.message || '请求出现错误');
      },

      // 优化取消处理
      handleCancel() {
        this.cancelStream();
        const lastMessage = this.bubbleItems[this.bubbleItems.length - 1];
        if (lastMessage) {
          this.$set(lastMessage, 'typing', false);
        }
      },

      // 处理状态变化
      handleThinkingChange({ value, status }) {
        console.log('value', value, 'status', status);
      },

      // 重置 API Key
      resetApiKey() {
        this.settings.apiKey = DEFAULT_API_KEY;
        this.settings.model = DEFAULT_MODEL;
      },

      // 保存设置
      saveSettings() {
        this.API_KEY = this.settings.apiKey;
        this.MODEL = this.settings.model;
        this.showSettings = false;
        this.$message.success('配置已保存');
      },

      // 处理提示词点击
      handlePromptClick(info) {
        this.inputValue = info.data.description;
        this.$nextTick(() => {
          this.startSSE();
        });
      },

      // 清空消息
      clearMessages() {
        this.$confirm('确定要清空所有消息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.bubbleItems = [];
            this.$message({
              type: 'success',
              message: '消息已清空',
            });
          })
          .catch(() => {});
      },
    },
    beforeDestroy() {
      this.cancelStream();
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

  .chat-wrap {
    height: calc(100vh - 300px);
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ::v-deep .el-x-bubble-list {
      padding-bottom: 24px;
    }

    ::v-deep .el-x-prompts {
      margin-bottom: 20px;

      .el-x-prompts-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .error {
      color: #f56c6c;
      margin-bottom: 10px;
    }

    .thinking-chain-wrap {
      margin-bottom: 10px;
    }

    .footer-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  }

  .error-color {
    color: #f56c6c;
  }

  .header-with-settings {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-title {
      display: flex;
      align-items: center;
      gap: 12px;

      .logo {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }

      h2 {
        margin: 0;
      }
    }

    .header-actions {
      display: flex;
      gap: 8px;

      .el-button {
        padding: 0 8px;

        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
      }
    }
  }

  .settings-dialog {
    ::v-deep .el-dialog__body {
      padding: 20px;
    }
  }
</style>
