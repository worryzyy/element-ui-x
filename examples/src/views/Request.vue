<template>
  <div class="request-demo">
    <el-card class="main-card">
      <div
        slot="header"
        class="card-header"
      >
        <h2>AI API 统一测试平台</h2>
        <span class="subtitle">{{ currentProviderName || '请选择AI提供商' }}</span>
      </div>

      <!-- 提供商选择 -->
      <el-form
        :model="form"
        label-width="120px"
        class="provider-form"
      >
        <el-form-item label="AI提供商:">
          <el-select
            v-model="selectedProviderId"
            @change="onProviderChange"
            placeholder="请选择提供商"
            style="width: 100%"
          >
            <el-option
              v-for="provider in availableProviders"
              :key="provider.id"
              :value="provider.id"
              :label="`${provider.icon} ${provider.name}`"
            >
              <span>{{ provider.icon }} {{ provider.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 动态认证字段 -->
        <template v-if="selectedProviderId">
          <el-form-item
            v-for="field in authFields"
            :key="field.key"
            :label="field.label + ':'"
          >
            <el-input
              v-model="authConfig[field.key]"
              :placeholder="field.placeholder"
              :type="field.type === 'password' ? 'password' : 'text'"
              :show-password="field.type === 'password'"
              @input="updateAuthField(field.key, $event)"
              clearable
            />
          </el-form-item>

          <el-form-item label="问题:">
            <el-input
              v-model="question"
              type="textarea"
              :rows="3"
              placeholder="请输入你的问题..."
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="sendRequest"
              :loading="loading"
              :disabled="!isConfigValid || !selectedProviderId"
              icon="el-icon-s-promotion"
            >
              {{ loading ? '发送中...' : '发送请求' }}
            </el-button>

            <el-button
              type="warning"
              @click="abortRequest"
              :disabled="!loading"
              icon="el-icon-close"
            >
              中止请求
            </el-button>

            <el-button
              type="info"
              @click="clearMessages"
              icon="el-icon-delete"
            >
              清空消息
            </el-button>
          </el-form-item>
        </template>
      </el-form>
    </el-card>

    <!-- 响应区域 -->
    <el-card
      class="response-card"
      v-if="selectedProviderId"
    >
      <div
        slot="header"
        class="card-header"
      >
        <span>实时响应</span>
        <el-tag type="info">{{ messages.length }} 条消息</el-tag>
      </div>

      <div
        class="messages-container"
        v-loading="loading && messages.length === 0"
      >
        <el-x-bubble-list
          ref="bubbleListRef"
          :list="messages"
          :default-is-markdown="true"
          :max-height="'500px'"
          :btnLoading="loading"
        >
          <template #content="{ item }">
            <!-- 思考内容组件 -->
            <el-x-thinking
              v-if="item.reasoning_content"
              :content="item.reasoning_content"
              :status="item.thinkingStatus"
              button-width="100%"
              max-width="100%"
              class="thinking-component"
            >
              <template #label="{ status }">
                <span v-if="status === 'thinking'">{{ currentProviderName }} 正在思考...</span>
                <span v-else>{{ currentProviderName }} 的思考过程</span>
              </template>
            </el-x-thinking>

            <!-- 内容打字机效果 -->
            <el-x-typewriter
              :content="item.content"
              :loading="item.loading"
              :typing="item.typing"
              :is-markdown="item.isMarkdown"
              :is-fog="item.isFog"
            />
          </template>
        </el-x-bubble-list>

        <el-empty
          v-if="messages.length === 0 && !loading"
          description="开始对话吧..."
          :image-size="120"
        />
      </div>
    </el-card>

    <!-- 状态信息 -->
    <el-card
      class="status-card"
      v-if="selectedProviderId"
    >
      <div slot="header">
        <span>请求状态</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-statistic
            title="提供商"
            :value="currentProviderName"
          >
            <template slot="suffix">
              <el-tag
                :type="selectedProviderId ? 'success' : 'danger'"
                size="mini"
              >
                {{ selectedProviderId ? '已选择' : '未选择' }}
              </el-tag>
            </template>
          </el-statistic>
        </el-col>

        <el-col :span="8">
          <el-statistic
            title="配置状态"
            :value="isConfigValid ? '已配置' : '待配置'"
          >
            <template slot="suffix">
              <el-tag
                :type="isConfigValid ? 'success' : 'warning'"
                size="mini"
              >
                {{ isConfigValid ? '✓' : '×' }}
              </el-tag>
            </template>
          </el-statistic>
        </el-col>

        <el-col :span="8">
          <el-statistic
            title="连接状态"
            :value="loading ? '请求中' : '空闲'"
          >
            <template slot="suffix">
              <el-tag
                :type="loading ? 'warning' : 'success'"
                size="mini"
              >
                <i :class="loading ? 'el-icon-loading' : 'el-icon-check'"></i>
              </el-tag>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { ElXBubbleList, ElXThinking, ElXTypewriter } from 'vue-element-ui-x';
  import { aiAPIManager } from '../api/ai-providers/manager.js';

  export default {
    name: 'RequestDemo',
    components: {
      ElXBubbleList,
      ElXThinking,
      ElXTypewriter,
    },
    data() {
      return {
        loading: false,
        messages: [],
        question: '你是谁？请简单介绍一下自己。',
        selectedProviderId: '',
        authConfig: {},
        availableProviders: [],
        authFields: [],
        form: {}, // Element UI表单需要的对象
      };
    },

    mounted() {
      this.initializeProviders();
      this.loadSavedConfig();
    },

    computed: {
      isConfigValid() {
        if (!this.selectedProviderId || this.authFields.length === 0) {
          return false;
        }

        return this.authFields
          .filter(field => field.required)
          .every(field => {
            const value = this.authConfig[field.key];
            return value && value.trim();
          });
      },

      currentProviderName() {
        const provider = this.availableProviders.find(p => p.id === this.selectedProviderId);
        return provider ? provider.name : '';
      },
    },

    methods: {
      initializeProviders() {
        try {
          this.availableProviders = aiAPIManager.getAvailableProviders();
        } catch (error) {
          console.error('初始化提供商失败:', error);
          alert('初始化AI提供商失败: ' + error.message);
        }
      },

      onProviderChange() {
        if (!this.selectedProviderId) {
          this.authFields = [];
          this.authConfig = {};
          this.saveConfig();
          return;
        }

        try {
          const authConfig = aiAPIManager.getProviderAuthConfig(this.selectedProviderId);
          this.authFields = authConfig ? authConfig.fields : [];

          // 重置认证配置 - 使用$set确保响应式
          this.authConfig = {};
          this.authFields.forEach(field => {
            this.$set(this.authConfig, field.key, '');
          });

          // 尝试加载该提供商之前保存的配置
          this.loadProviderConfig();

          this.saveConfig();
        } catch (error) {
          console.error('获取提供商配置失败:', error);
          alert('获取提供商配置失败: ' + error.message);
        }
      },

      loadProviderConfig() {
        try {
          const allConfigs = localStorage.getItem('aiapi_all_configs');
          if (allConfigs) {
            const configs = JSON.parse(allConfigs);
            const providerConfig = configs[this.selectedProviderId];

            if (providerConfig) {
              // 恢复该提供商的配置
              Object.keys(providerConfig).forEach(key => {
                this.$set(this.authConfig, key, providerConfig[key]);
              });
            }
          }
        } catch (error) {
          console.error('加载提供商配置失败:', error);
        }
      },

      updateAuthField(key, value) {
        this.$set(this.authConfig, key, value);
        this.saveConfig();
      },

      loadSavedConfig() {
        try {
          // 加载所有提供商的配置
          const allConfigs = localStorage.getItem('aiapi_all_configs');
          const lastProvider = localStorage.getItem('aiapi_last_provider');

          if (allConfigs && lastProvider) {
            const configs = JSON.parse(allConfigs);

            // 恢复最后使用的提供商
            this.selectedProviderId = lastProvider;
            this.onProviderChange();

            // 等待认证字段初始化后恢复对应的认证配置
            this.$nextTick(() => {
              if (configs[lastProvider]) {
                Object.keys(configs[lastProvider]).forEach(key => {
                  this.$set(this.authConfig, key, configs[lastProvider][key]);
                });
              }
            });
          }
        } catch (error) {
          console.error('加载保存的配置失败:', error);
        }
      },

      saveConfig() {
        try {
          // 获取所有已保存的配置
          let allConfigs = {};
          const existingConfigs = localStorage.getItem('aiapi_all_configs');
          if (existingConfigs) {
            allConfigs = JSON.parse(existingConfigs);
          }

          // 更新当前提供商的配置
          if (this.selectedProviderId) {
            allConfigs[this.selectedProviderId] = { ...this.authConfig };

            // 保存所有配置和最后使用的提供商
            localStorage.setItem('aiapi_all_configs', JSON.stringify(allConfigs));
            localStorage.setItem('aiapi_last_provider', this.selectedProviderId);
          }
        } catch (error) {
          console.error('保存配置失败:', error);
        }
      },
      async sendRequest() {
        if (!this.selectedProviderId) {
          alert('请先选择AI提供商');
          return;
        }

        if (!this.isConfigValid) {
          alert('请先完成认证配置');
          return;
        }

        if (!this.question.trim()) {
          alert('请输入问题');
          return;
        }

        this.messages = [];
        this.loading = true;

        // 添加用户消息
        this.addMessage(this.question, true);

        try {
          // 设置当前提供商
          aiAPIManager.setProvider(this.selectedProviderId);

          // 发送请求
          await aiAPIManager.sendRequest(this.question, this.authConfig, {
            onMessage: message => {
              this.handleStreamMessage(message);
            },
            onError: error => {
              console.error('请求错误:', error);
              alert('请求失败: ' + (error.message || '未知错误'));
              this.loading = false;
            },
            onAbort: messages => {
              this.loading = false;
              this.finishMessage();
            },
            onFinish: messages => {
              this.loading = false;
              this.finishMessage();
            },
            onOpen: () => {
              // 连接已建立
            },
          });
        } catch (error) {
          console.error('发送请求失败:', error);
          alert('发送请求失败: ' + error.message);
          this.loading = false;
        }
      },

      abortRequest() {
        aiAPIManager.abort();
      },

      clearMessages() {
        this.messages = [];
      },

      getProviderAvatar() {
        const provider = this.availableProviders.find(p => p.id === this.selectedProviderId);
        if (provider) {
          return provider.icon;
        }
        return '🤖';
      },

      // 添加新消息到列表
      addMessage(content, isUser = false) {
        const message = {
          key: this.messages.length,
          role: isUser ? 'user' : 'assistant',
          content: content || '',
          avatar: isUser ? '👤' : this.getProviderAvatar(),
          placement: isUser ? 'end' : 'start',
          isMarkdown: !isUser,
          variant: 'shadow',
          shape: 'corner',
          loading: !isUser,
          typing: !isUser,
          reasoning_content: '',
          thinkingStatus: 'start',
        };

        this.messages.push(message);
        return this.messages.length - 1; // 返回消息索引
      },

      // 处理流式消息 - 增量更新
      handleStreamMessage(rawMessage) {
        // 过滤掉结束标记
        if (rawMessage.includes('[DONE]')) {
          return;
        }

        // 检查是否需要创建AI消息（第一次收到消息时）
        let lastMessage = this.messages[this.messages.length - 1];
        if (!lastMessage || lastMessage.role === 'user') {
          // 第一次收到AI消息，创建AI消息对象
          this.addMessage('', false);
          lastMessage = this.messages[this.messages.length - 1];
        }

        // 一旦开始接收内容，就停止loading状态
        if (lastMessage.loading) {
          this.$set(lastMessage, 'loading', false);
        }

        // 检查是否是思考内容
        if (rawMessage.startsWith('[思考]')) {
          const thinkingContent = rawMessage.replace('[思考]', '').trim();

          // 增量更新思考内容
          this.$set(lastMessage, 'thinkingStatus', 'thinking');
          this.$set(
            lastMessage,
            'reasoning_content',
            (lastMessage.reasoning_content || '') + thinkingContent,
          );
        } else if (rawMessage.trim()) {
          // 普通内容 - 增量追加
          // 只有在没有更多思考内容时才设置为end状态
          if (lastMessage.reasoning_content) {
            this.$set(lastMessage, 'thinkingStatus', 'end');
          }
          this.$set(lastMessage, 'content', (lastMessage.content || '') + rawMessage);
        }

        // 滚动到底部
        this.$nextTick(() => {
          if (this.$refs.bubbleListRef) {
            this.$refs.bubbleListRef.scrollToBottom();
          }
        });
      },

      // 完成消息接收
      finishMessage() {
        const lastMessageIndex = this.messages.length - 1;
        const lastMessage = this.messages[lastMessageIndex];

        if (lastMessage && lastMessage.role === 'assistant') {
          // loading已经在handleStreamMessage中设置为false了
          this.$set(lastMessage, 'typing', false);
          this.$set(lastMessage, 'thinkingStatus', 'end');
        }
      },
    },

    beforeDestroy() {
      // 组件销毁时清理资源
      aiAPIManager.abort();
    },
  };
</script>

<style scoped>
  .request-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .main-card {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h2 {
    margin: 0;
    color: #303133;
  }

  .subtitle {
    color: #909399;
    font-size: 14px;
  }

  .provider-form {
    margin-top: 20px;
  }

  .response-card {
    margin-bottom: 20px;
  }

  .messages-container {
    min-height: 200px;
    max-height: 600px;
    overflow-y: auto;
    padding: 16px;
  }

  .messages-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message-wrapper {
    width: 100%;
  }

  .thinking-message {
    margin-bottom: 8px;
  }

  .ai-message {
    margin-bottom: 8px;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .provider-name {
    font-weight: 600;
    color: #409eff;
    font-size: 12px;
  }

  .message-time {
    font-size: 11px;
    color: #909399;
  }

  /* 思考组件样式覆盖 */
  .thinking-message ::v-deep .trigger {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    transition: all 0.3s ease;
  }

  .thinking-message ::v-deep .trigger:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .thinking-message ::v-deep .content-wrapper {
    background: #f8f9ff;
    border: 1px solid #e1e6ff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }

  /* Bubble组件样式覆盖 */
  .ai-message ::v-deep .el-x-bubble-content {
    background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
    border: 1px solid #e1e8ed;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .ai-message ::v-deep .el-x-bubble-avatar {
    background: #409eff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    width: 32px;
    height: 32px;
  }

  .status-card {
    margin-bottom: 20px;
  }

  .el-timeline {
    padding-left: 0;
  }

  .el-timeline-item__timestamp {
    color: #409eff;
    font-weight: bold;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .request-demo {
      padding: 10px;
    }

    .el-col {
      margin-bottom: 10px;
    }
  }
</style>
