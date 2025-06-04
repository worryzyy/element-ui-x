<template>
  <div class="dify-chat">
    <div class="dify-main">
      <transition name="sidebar">
        <!-- 收起状态的独立侧边栏 -->
        <div
          class="side-menu-collapsed"
          v-if="isSideCollapsed"
        >
          <div class="collapsed-header">
            <div
              class="toggle-side"
              @click="toggleSideMenu"
            >
              <img src="../../assets/images/dify-logo.svg" />
            </div>
          </div>
          <div
            class="toggle-side collapsed-new-chat"
            @click="toggleSideMenu"
          >
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div
            class="collapsed-new-chat"
            @click="handleNewChat"
          >
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div
          class="side-menu"
          v-if="!isSideCollapsed"
        >
          <div class="side-header">
            <div class="side-action">
              <h2>Dify chat</h2>
              <div
                class="toggle-side"
                @click="toggleSideMenu"
              >
                <i class="el-icon-d-arrow-left"></i>
              </div>
            </div>

            <div
              class="new-chat"
              @click="handleNewChat"
            >
              <div style="margin-right: 10px"><i class="el-icon-plus"></i></div>
              新对话
              <span class="keyboard-shortcut">Ctrl+K</span>
            </div>
          </div>
          <el-x-conversations
            :styleConfig="{ width: '260px', backgroundColor: '#f9fbff', padding: 0 }"
            class="conversation-list"
            :items="conversationList"
            :active="activeConversation"
            :show-built-in-menu="true"
            :label-max-width="190"
            :menu="customMenu"
            :groupable="true"
            v-loading="isLoadingConversations"
            @menu-command="handleMenuCommand"
            @change="handleConversationChange"
          />
        </div>
      </transition>
      <div class="chat-container">
        <div class="chat-header">
          <div
            class="chat-title"
            @click="handleEditTitle"
          >
            {{ messages.length === 0 ? '' : currentConversationTitle }}
          </div>
        </div>
        <div class="chat-content">
          <div
            class="chat-content-welcome"
            v-if="messages.length === 0"
          >
            <el-x-welcome
              variant="borderless"
              title="我是 Dify 的智能助手，很高兴见到你！"
              description="我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~"
            >
              <template #image>
                <img
                  :src="require('@/assets/images/dify-logo.svg')"
                  alt="Dify"
                />
              </template>
            </el-x-welcome>
            <br />
            <el-x-prompts
              v-if="messages.length === 0"
              :items="promptItems"
              :wrap="true"
              :styles="promptStyles"
              @on-item-click="handlePromptItemClick"
            >
              <template v-slot:icon="{ item }">
                <i
                  :class="item.icon"
                  :style="item.iconStyle"
                ></i>
              </template>
            </el-x-prompts>
          </div>

          <el-x-bubble-list
            ref="bubbleListRef"
            :list="messages"
            :max-height="`calc(100vh - 160px)`"
            :defaultMaxWidth="'100%'"
            defaultShape="corner"
            v-loading="isLoadingMessages"
          />
        </div>
        <div class="chat-input">
          <div class="chat-input-container">
            <el-x-sender
              v-model="senderValue"
              variant="updown"
              @submit="handleSendMessage"
              :loading="loading"
            >
              <template #prefix>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
                  <el-button
                    round
                    plain
                    color="#626aef"
                    size="small"
                    @click="handleFileUpload"
                  >
                    <i class="el-icon-paperclip"></i>
                  </el-button>

                  <template>
                    <div
                      :class="['thinking', { 'thinking--active': isSelect }]"
                      @click="isSelect = !isSelect"
                    >
                      <i class="el-icon-plus"></i>
                      <span>深度思考</span>
                    </div>
                  </template>
                </div>
              </template>

              <template #action-list>
                <div style="display: flex; align-items: center; gap: 8px">
                  <el-button
                    v-if="loading"
                    round
                    class="stop-btn"
                    style="background: #f56c6c; color: #fff"
                    size="small"
                    @click="handleStopMessage"
                  >
                    <i class="el-icon-close"></i>
                  </el-button>
                  <el-button
                    v-else
                    round
                    class="send-btn"
                    style="background: #626aef; color: #fff"
                    size="small"
                    @click="handleSendMessage"
                    :disabled="!senderValue.trim()"
                  >
                    <i class="el-icon-position"></i>
                  </el-button>
                </div>
              </template>
            </el-x-sender>
          </div>

          <div class="chat-input-footer">内容由 AI 生成，请仔细甄别</div>
        </div>
      </div>
    </div>

    <!-- 隐藏的文件上传输入框 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
  import { conversationApi, fileApi, messageApi } from '@/api/dify';
  import ElXConversations from '../../../../packages/element-ui-x/src/components/Conversations/index';
  // import { sendMixin,streamMixin } from 'vue-element-ui-x';
  import { sendMixin, streamMixin } from '../../../../packages/element-ui-x/src/mixins';

  import {
    buildChatMessageRequest,
    createDifyRequestConfig,
    createDifyTransformer,
  } from '@/utils/difyAdapter';

  import { addTimeGroupToItems } from '@/utils/timeUtils';

  export default {
    name: 'DifyChat',
    mixins: [sendMixin, streamMixin],
    components: {
      ElXConversations,
    },
    data() {
      return {
        // 侧边栏状态
        isSideCollapsed: false,
        // 会话相关
        conversationList: [],
        activeConversation: null,
        isLoadingConversations: false,
        isCreatingChat: false,
        customMenu: [
          {
            label: '修改名称',
            key: 'rename',
            icon: 'el-icon-edit',
            command: 'rename',
          },
          {
            label: '删除',
            key: 'delete',
            icon: 'el-icon-delete',
            command: 'delete',
            menuItemHoverStyle: {
              color: '#F56C6C',
              backgroundColor: 'rgba(245, 108, 108, 0.1)',
            },
          },
        ],
        // 消息相关
        messages: [],
        isLoadingMessages: false,
        currentTaskId: null,
        currentMessageId: null,
        currentStreamContent: '',

        // 输入相关
        senderValue: '',
        isSelect: false,
        uploadedFiles: [],

        // Dify 配置
        difyConfig: {
          baseURL: 'https://api.dify.ai/v1',
          apiKey: 'app-xNtq4zmi29hQkFgX2vDnkPKW',
          user: 'default-user',
        },

        // UI相关数据
        promptItems: [
          {
            key: '1',
            label: '热门话题',
            icon: 'el-icon-star-off',
            iconStyle: {
              color: '#FF4D4F',
            },
            description: '你对什么感兴趣？',
            children: [
              {
                key: '1-1',
                description: 'X的最新动态是什么？',
              },
              {
                key: '1-2',
                description: '什么是AGI？',
              },
              {
                key: '1-3',
                description: '文档在哪里？',
              },
            ],
          },
          {
            key: '2',
            label: '设计指南',
            icon: 'el-icon-reading',
            iconStyle: {
              color: '#1890FF',
            },
            description: '如何设计一个好产品？',
            children: [
              {
                key: '2-1',
                icon: 'el-icon-star-on',
                description: '了解用户需求',
              },
              {
                key: '2-2',
                icon: 'el-icon-ice-cream-round',
                description: '设定AI角色',
              },
              {
                key: '2-3',
                icon: 'el-icon-chat-dot-round',
                description: '表达情感',
              },
            ],
          },
        ],
        promptStyles: {
          item: {
            flex: 'none',
            backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
            border: '0',
            width: 'calc(50% - 6px)',
          },
          subItem: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
      };
    },
    computed: {
      currentConversationTitle() {
        const conversation = this.conversationList.find(
          item => item.id === this.activeConversation,
        );
        return conversation ? conversation.label : '对话';
      },
    },

    async mounted() {
      await this.loadConversations();
      this.initializeDifyRequest();
      // 添加全局键盘事件监听
      document.addEventListener('keydown', this.handleKeyDown);
      // 从localStorage恢复侧边栏状态
      const savedState = localStorage.getItem('dify-side-collapsed');
      if (savedState !== null) {
        this.isSideCollapsed = savedState === 'true';
      }
    },
    beforeDestroy() {
      // 移除全局键盘事件监听
      document.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
      // 切换侧边栏展开/收起状态
      toggleSideMenu() {
        this.isSideCollapsed = !this.isSideCollapsed;
        // 保存状态到localStorage
        localStorage.setItem('dify-side-collapsed', this.isSideCollapsed);
      },
      // 处理键盘快捷键
      handleKeyDown(event) {
        // 检测Ctrl+K组合键
        if (event.ctrlKey && event.key === 'k') {
          // 阻止默认行为（如浏览器的搜索功能）
          event.preventDefault();
          // 触发新建对话
          this.handleNewChat();
        }
      },
      // 初始化 Dify 请求配置
      initializeDifyRequest() {
        const requestConfig = createDifyRequestConfig(this.difyConfig);

        this.initSend({
          sendHandler: this.sendDifyMessage,
          abortHandler: this.abortDifyMessage,
          finishHandler: this.finishDifyMessage,
          onAbort: () => {
            this.currentStreamContent = '';
            this.currentMessageId = null;
          },
        });
      },

      // 发送 Dify 消息
      async sendDifyMessage(message) {
        try {
          // 添加用户消息到界面
          const userMessage = {
            id: Date.now().toString(),
            content: message,
            placement: 'end',
            created_at: Date.now(),
          };
          this.messages.push(userMessage);

          // 创建AI消息占位符
          const aiMessage = {
            id: (Date.now() + 1).toString(),
            content: '',
            placement: 'start',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            created_at: Date.now(),
            isMarkdown: true,
            loading: true,
            typing: {
              interval: 80,
              step: 5,
            },
          };
          this.messages.push(aiMessage);
          this.currentMessageId = aiMessage.id;
          this.currentStreamContent = '';

          // 构建请求参数
          const requestBody = buildChatMessageRequest({
            query: message,
            conversation_id: this.activeConversation,
            files: this.uploadedFiles,
            user: this.difyConfig.user,
            response_mode: 'streaming',
          });

          // 创建 XRequest 实例
          const xRequest = this.createXRequest({
            baseURL: this.difyConfig.baseURL,
            baseOptions: {
              headers: {
                Authorization: `Bearer ${this.difyConfig.apiKey}`,
                'Content-Type': 'application/json',
              },
            },
            transformer: createDifyTransformer(),
            type: 'fetch',
            onMessage: this.handleStreamMessage,
            onError: this.handleStreamError,
          });

          // 发送请求
          await xRequest.send('/chat-messages', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              Authorization: `Bearer ${this.difyConfig.apiKey}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('发送消息失败:', error);
          this.$message.error('发送消息失败: ' + error.message);
          this.handleFinish();
        }
      },

      // 处理流式消息
      handleStreamMessage(data) {
        if (!data || !this.currentMessageId) return;

        const messageIndex = this.messages.findIndex(msg => msg.id === this.currentMessageId);
        if (messageIndex === -1) return;

        switch (data.type) {
          case 'message':
            // 完整消息
            this.currentStreamContent = data.data.content;
            this.messages[messageIndex].content = this.currentStreamContent;
            if (data.data.conversation_id && !this.activeConversation) {
              this.activeConversation = data.data.conversation_id;
            }
            break;

          case 'delta':
            // 增量消息
            if (this.messages[messageIndex].loading) {
              this.messages[messageIndex].loading = false;
            }
            this.currentStreamContent += data.data.delta;
            this.messages[messageIndex].content = this.currentStreamContent;
            break;

          case 'end':
            // 消息结束
            this.messages[messageIndex].typing = false;
            if (data.data.conversation_id && !this.activeConversation) {
              this.activeConversation = data.data.conversation_id;
              this.loadConversations(); // 刷新会话列表
            }
            break;

          case 'done':
            // 流结束
            if (messageIndex !== -1) {
              this.messages[messageIndex].typing = false;
            }
            break;
        }

        // 强制更新视图
        // this.$forceUpdate();
      },

      // 处理流式错误
      handleStreamError(error) {
        console.error('流式响应错误:', error);
        this.$message.error('接收消息时发生错误');

        if (this.currentMessageId) {
          const messageIndex = this.messages.findIndex(msg => msg.id === this.currentMessageId);
          if (messageIndex !== -1) {
            this.messages[messageIndex].typing = false;
            this.messages[messageIndex].content = this.currentStreamContent || '消息接收失败';
          }
        }
      },

      // 中止 Dify 消息
      abortDifyMessage() {
        if (this.currentMessageId) {
          const messageIndex = this.messages.findIndex(msg => msg.id === this.currentMessageId);
          if (messageIndex !== -1) {
            this.messages[messageIndex].typing = false;
            this.messages[messageIndex].content = this.currentStreamContent || '消息已取消';
          }
        }
      },

      // 完成 Dify 消息
      finishDifyMessage() {
        if (this.currentMessageId) {
          const messageIndex = this.messages.findIndex(msg => msg.id === this.currentMessageId);
          if (messageIndex !== -1) {
            this.messages[messageIndex].typing = false;
          }
        }
        this.currentStreamContent = '';
        this.currentMessageId = null;
        this.senderValue = '';
        this.uploadedFiles = [];
      },

      // 加载会话列表
      // 加载会话列表
      async loadConversations() {
        try {
          this.isLoadingConversations = true;
          const response = await conversationApi.getConversations();

          // 转换数据格式以适配UI组件
          const formattedData = response.data.map(item => ({
            id: item.id,
            label: item.name || '新对话',
            prefixIcon: 'el-icon-chat-dot-round',
            created_at: item.created_at,
          }));

          // 使用工具函数添加时间分组
          this.conversationList = addTimeGroupToItems(formattedData).sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          ); // 按创建时间倒序排列

          // 如果有会话，默认选中第一个
          // if (this.conversationList.length > 0 && !this.activeConversation) {
          //   this.activeConversation = this.conversationList[0].id;
          //   await this.loadMessages(this.activeConversation);
          // }
        } catch (error) {
          this.$message.error('加载会话列表失败: ' + error.message);
        } finally {
          this.isLoadingConversations = false;
        }
      },

      // 加载消息历史
      async loadMessages(conversationId) {
        if (!conversationId) return;

        try {
          this.isLoadingMessages = true;
          const response = await messageApi.getMessages({
            conversation_id: conversationId,
          });

          // 转换消息格式 - 修复消息内容处理逻辑
          const messages = [];
          response.data.forEach(item => {
            // 添加用户消息
            if (item.query) {
              messages.push({
                id: `${item.id}_user`,
                content: item.query,
                placement: 'end',
                created_at: item.created_at,
                typing: false,
              });
            }

            // 添加AI回答消息
            if (item.answer) {
              messages.push({
                id: `${item.id}_assistant`,
                content: item.answer,
                placement: 'start',
                avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                created_at: item.created_at,
                typing: false,
              });
            }
          });

          // 按时间排序消息
          this.messages = messages.sort((a, b) => a.created_at - b.created_at);
        } catch (error) {
          this.$message.error('加载消息历史失败: ' + error.message);
        } finally {
          this.isLoadingMessages = false;
        }
      },

      // 处理会话切换
      async handleConversationChange(conversation) {
        this.activeConversation = conversation.id;
        await this.loadMessages(conversation.id);
        this.$emit('conversation-change', conversation);
      },

      // 新建对话
      async handleNewChat() {
        try {
          this.isCreatingChat = true;
          // 重置当前状态
          this.activeConversation = null;
          this.messages = [];
          this.senderValue = '';
          this.uploadedFiles = [];
          this.$emit('new-chat');
        } catch (error) {
          this.$message.error('创建新对话失败: ' + error.message);
        } finally {
          this.isCreatingChat = false;
        }
      },
      handleMenuCommand(command, item) {
        console.log(command, item);
        if (command == 'delete') {
          this.handleDeleteConversation(item);
        } else if (command == 'rename') {
          this.$prompt('请输入新的对话标题', '重命名对话', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: item.label,
          })
            .then(({ value }) => {
              if (value && value.trim()) {
                const conversation = this.conversationList.find(
                  item => item.id === this.activeConversation,
                );
                this.handleRenameConversation(item, value.trim());
              }
            })
            .catch(() => {});
        }
      },
      // 删除会话
      async handleDeleteConversation(conversation) {
        try {
          await this.$confirm('确定要删除这个对话吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          });

          await conversationApi.deleteConversation(conversation.id);

          // 从列表中移除
          this.conversationList = this.conversationList.filter(item => item.id !== conversation.id);

          // 如果删除的是当前激活的会话
          if (this.activeConversation === conversation.id) {
            if (this.conversationList.length > 0) {
              this.activeConversation = this.conversationList[0].id;
              await this.loadMessages(this.activeConversation);
            } else {
              this.activeConversation = null;
              this.messages = [];
            }
          }

          this.$message.success('对话已删除');
        } catch (error) {
          if (error !== 'cancel') {
            this.$message.error('删除对话失败: ' + error.message);
          }
        }
      },

      // 重命名会话
      async handleRenameConversation(conversation, newName) {
        try {
          await conversationApi.renameConversation(conversation.id, newName);

          // 更新本地数据
          const index = this.conversationList.findIndex(item => item.id === conversation.id);
          if (index !== -1) {
            this.conversationList[index].label = newName;
          }

          this.$message.success('重命名成功');
        } catch (error) {
          this.$message.error('重命名失败: ' + error.message);
        }
      },

      // 编辑标题
      handleEditTitle() {
        if (!this.activeConversation) return;

        this.$prompt('请输入新的对话标题', '重命名对话', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.currentConversationTitle,
        })
          .then(({ value }) => {
            if (value && value.trim()) {
              const conversation = this.conversationList.find(
                item => item.id === this.activeConversation,
              );
              this.handleRenameConversation(conversation, value.trim());
            }
          })
          .catch(() => {});
      },

      // 发送消息
      async handleSendMessage() {
        if (!this.senderValue.trim() || this.loading) return;

        const message = this.senderValue.trim();
        this.handleSend(message);
        this.$nextTick(() => {
          this.$refs.bubbleListRef.scrollToBottom();
          this.senderValue = '';
        });
      },

      // 停止消息
      handleStopMessage() {
        this.handleAbort();
      },

      // 处理提示项点击
      handlePromptItemClick({ data }) {
        console.log(data);
        this.senderValue = data.description;
        this.handleSendMessage();
      },

      // 文件上传相关方法
      handleFileUpload() {
        this.$refs.fileInput.click();
      },

      async handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
          const response = await fileApi.uploadFile(file);
          this.uploadedFiles.push({
            id: response.id,
            name: response.name,
            url: response.url,
          });
          this.$message.success('文件上传成功');
        } catch (error) {
          this.$message.error('文件上传失败: ' + error.message);
        }

        // 清空文件输入
        event.target.value = '';
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '~element-ui/packages/theme-chalk/src/common/var';

  .dify-chat {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .dify-main {
      display: flex;
      flex: 1;
      overflow: hidden;
      height: 100%;
      .sidebar-enter-active,
      .sidebar-leave-active {
        transition: all 0.3s ease;
      }
      .sidebar-enter,
      .sidebar-leave-to {
        opacity: 0;
        transform: translateX(-20px);
      }

      // 为新对话按钮添加专门的动画
      .sidebar-enter-active .new-chat,
      .sidebar-leave-active .new-chat {
        transition: all 0.3s ease 0.1s; /* 延迟0.1s开始动画 */
      }
      .sidebar-enter .new-chat,
      .sidebar-leave-to .new-chat {
        opacity: 0;
        transform: translateY(-10px);
      }

      // 为键盘快捷键添加动画
      .sidebar-enter-active .keyboard-shortcut,
      .sidebar-leave-active .keyboard-shortcut {
        transition: all 0.3s ease 0.15s; /* 延迟0.15s开始动画 */
      }
      .sidebar-enter .keyboard-shortcut,
      .sidebar-leave-to .keyboard-shortcut {
        opacity: 0;
        transform: scale(0.8);
      }
      .side-menu-collapsed {
        width: 68px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #f9fbff;
        border-right: 1px solid $--border-color-lighter;
        transition: all 0.3s ease;

        .collapsed-header {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 0;
          border-bottom: 1px solid $--border-color-lighter;
        }

        .collapsed-new-chat {
          width: 40px;
          height: 40px;
          margin: 16px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $--color-white;
          border: 1px solid $--border-color-lighter;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: $--color-primary-light-9;
            border-color: $--color-primary;
          }

          i {
            font-size: 16px;
            color: $--color-text-regular;
          }
        }
      }
      .side-menu {
        width: 260px;
        height: 100%;
        // background-color: $--color-primary-light-9;
        // border-right: 1px solid $--border-color-lighter;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #f9fbff;
        border-right: 1px solid $--border-color-lighter;
        transition: all 0.3s ease;

        .side-header {
          flex-shrink: 0;
          padding: 16px;
          text-align: center;
          .side-action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;

            h2 {
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: $--color-text-primary;
            }
          }
          .new-chat {
            --local-button: #dbeafe;
            --local-button-text: rgb(77 107 254);
            --local-button-hover: #c6dcf8;
            color: #4d6bfe;
            background-color: rgb(219 234 254);
            cursor: pointer;
            height: 44px;
            border-radius: 14px;
            flex-shrink: 0;
            align-items: center;
            width: 100%;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            display: flex;
            overflow: hidden;
            padding: 0 10px;
            white-space: nowrap; /* 防止文字换行 */
            opacity: 1;
            transition: opacity 0.3s ease, width 0.3s ease, padding 0.3s ease;
            .keyboard-shortcut {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-left: 8px;
              padding: 0 6px;
              height: 20px;
              font-size: 12px;
              color: #909399;
              background-color: #f5f7fa;
              border-radius: 4px;
              border: 1px solid #e4e7ed;
              transition: opacity 0.3s ease;
            }
          }
          .new-chat-btn {
            width: 100%;
          }
        }

        .conversation-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
      }
      // 通用的切换按钮样式
      .toggle-side {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        i {
          font-size: 14px;
          color: $--color-text-regular;
        }
      }
      .chat-container {
        width: 100%;
        max-width: 800px;
        height: 100%;
        margin: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: $--color-white;

        .chat-header {
          height: 56px;
          min-width: 0px;
          display: flex;
          align-items: center;
          place-content: center;
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
          h3 {
            margin: 0;
            font-size: 16px;
            color: $--color-text-primary;
          }
        }

        .chat-content {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          padding: 0 0 15px 0;
          .chat-content-welcome {
            width: 100%;
            margin: auto;
          }
        }

        .chat-input {
          flex-shrink: 0;
          flex-direction: column;
          align-items: center;
          margin-top: auto;
          display: flex;
          position: -webkit-sticky;
          position: sticky;
          bottom: 0;
          .chat-input-container {
            max-width: 800px;
            flex-grow: 1;
            width: 100%;
            position: relative;
          }
          .chat-input-footer {
            font-size: 12px;
            color: #a3a3a3;
            margin: 6px 0;
            line-height: 14px;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .dify-chat .dify-main {
      .side-menu {
        width: 220px;
      }
      .side-menu-collapsed {
        width: 56px;
      }
    }
  }

  @media (max-width: 576px) {
    .dify-chat .dify-main {
      flex-direction: column;

      .side-menu,
      .side-menu-collapsed {
        width: 100%;
        height: 200px;
      }
    }
  }

  .thinking {
    display: flex;
    height: 32px;
    box-sizing: border-box;
    align-items: center;
    gap: 4px;
    padding: 2px 12px;
    border-width: 1px;
    border-style: solid;
    border-color: #0000001f;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    color: black;
    transition: background-color 0.3s ease;
    // 未激活时的hover效果
    &:hover {
      background-color: #e0e4ed;
    }
    // 激活状态
    &--active {
      background-color: #dbeafe;
      color: #4d6bfe;
      border-color: #007aff26;
      padding: 3px 12px;
      font-weight: 700;
      // 激活时的hover效果
      &:hover {
        background-color: #c3daf8;
      }
    }
  }
</style>
