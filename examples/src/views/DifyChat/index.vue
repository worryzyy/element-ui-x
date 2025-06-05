<template>
  <div class="dify-chat">
    <!-- 移动端顶部导航栏 -->
    <div class="mobile-header">
      <div class="mobile-header-left">
        <el-button
          type="text"
          @click="toggleMobileDrawer"
          class="mobile-menu-btn"
        >
          <i class="el-icon-s-unfold"></i>
        </el-button>
      </div>
      <div class="mobile-header-center">
        <span class="mobile-title">{{ currentConversationTitle || 'Dify Chat' }}</span>
      </div>
      <div class="mobile-header-right">
        <el-button
          type="text"
          @click="handleNewChat"
          class="mobile-new-chat-btn"
        >
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>

    <!-- 移动端抽屉 -->
    <el-drawer
      :visible.sync="isMobileDrawerVisible"
      direction="ltr"
      :with-header="false"
      :modal="true"
      :show-close="false"
      size="280px"
      class="mobile-drawer"
    >
      <div class="drawer-content">
        <div class="drawer-header">
          <h2>Dify chat</h2>
          <el-button
            type="text"
            @click="toggleMobileDrawer"
            class="drawer-close-btn"
          >
            <i class="el-icon-close"></i>
          </el-button>
        </div>
        <div
          class="drawer-new-chat"
          @click="handleNewChatAndCloseDrawer"
        >
          <div style="margin-right: 10px"><i class="el-icon-plus"></i></div>
          新对话
          <span class="keyboard-shortcut">Ctrl+K</span>
        </div>
        <el-x-conversations
          :styleConfig="{ width: '100%', backgroundColor: '#f9fbff', padding: 0 }"
          class="drawer-conversation-list"
          :items="conversationList"
          :active="activeConversation"
          :show-built-in-menu="true"
          :label-max-width="190"
          :menu="customMenu"
          :groupable="true"
          v-loading="isLoadingConversations"
          @menu-command="handleMenuCommand"
          @change="handleConversationChangeAndCloseDrawer"
        />
      </div>
    </el-drawer>

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
            <SvgIcon
              size="28"
              name="toggle-right"
              color="rgb(139 139 139)"
            />
          </div>
          <div
            class="collapsed-new-chat"
            @click="handleNewChat"
          >
            <SvgIcon
              size="28"
              name="plus"
              color="rgb(139 139 139)"
            />
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
                <SvgIcon
                  size="28"
                  name="toggle-left"
                  color="rgb(139 139 139)"
                />
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
          >
            <template #footer="{ item }">
              <div v-if="item.content && !item.typing">
                <div
                  class="end-action"
                  v-if="item.placement === 'end'"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="复制"
                    placement="top"
                  >
                    <SvgIcon
                      iconClass="action-btn"
                      size="20"
                      name="copy"
                      color="rgb(139 139 139)"
                      @click.native="handleCopyMessage(item)"
                    />
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="修改"
                    placement="top"
                  >
                    <SvgIcon
                      iconClass="action-btn"
                      size="20"
                      name="edit"
                      color="rgb(139 139 139)"
                      @click.native="handleEditMessage(item)"
                    />
                  </el-tooltip>
                </div>

                <!-- 只在AI消息中显示点赞和踩按钮 -->
                <template v-if="item.placement === 'start'">
                  <div class="start-action">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="复制"
                      placement="top"
                    >
                      <SvgIcon
                        iconClass="action-btn"
                        size="20"
                        name="copy"
                        color="rgb(139 139 139)"
                        @click.native="handleCopyMessage(item)"
                      />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="重试"
                      placement="top"
                    >
                      <SvgIcon
                        iconClass="action-btn"
                        size="20"
                        name="refresh"
                        color="rgb(139 139 139)"
                        @click.native="handleRetryMessage(item)"
                      />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="喜欢"
                      placement="top"
                    >
                      <SvgIcon
                        iconClass="action-btn"
                        size="20"
                        name="like"
                        :color="
                          item.feedback != null && item.feedback.rating === 'like'
                            ? '#626aef'
                            : 'rgb(139 139 139)'
                        "
                        @click.native="handleLikeMessage(item)"
                      />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="不喜欢"
                      placement="top"
                    >
                      <SvgIcon
                        iconClass="action-btn"
                        size="20"
                        name="dislike"
                        :color="
                          item.feedback != null && item.feedback.rating === 'dislike'
                            ? '#f56c6c'
                            : 'rgb(139 139 139)'
                        "
                        @click.native="handleDislikeMessage(item)"
                      />
                    </el-tooltip>
                  </div>
                </template>
              </div>
            </template>
          </el-x-bubble-list>
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
  import { sendMixin,streamMixin } from 'vue-element-ui-x';
  // import { sendMixin, streamMixin } from '../../../../packages/element-ui-x/src/mixins';

  import {
    buildChatMessageRequest,
    createDifyRequestConfig,
    createDifyTransformer,
  } from '@/utils/difyAdapter';

  import { addTimeGroupToItems } from '@/utils/timeUtils';

  export default {
    name: 'DifyChat',
    mixins: [sendMixin, streamMixin],
  
    data() {
      return {
        // 侧边栏状态
        isSideCollapsed: false,
        // 移动端抽屉状态
        isMobileDrawerVisible: false,
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
    watch: {
      messages: {
        handler(newMessages) {
          // 监听messages数组变化，动态设置最后一条消息的footer样式
          this.$nextTick(() => {
            this.updateLastMessageFooterStyle();
          });
        },
        deep: true,
        immediate: true,
      },
    },

    async mounted() {
      await this.loadConversations();
      this.initializeDifyRequest();
      // 添加全局键盘事件监听
      document.addEventListener('keydown', this.handleKeyDown);
      // 添加窗口大小变化监听
      window.addEventListener('resize', this.handleResize);
      // 从localStorage恢复侧边栏状态
      const savedState = localStorage.getItem('dify-side-collapsed');
      if (savedState !== null) {
        this.isSideCollapsed = savedState === 'true';
      }
      // 初始化时检查屏幕大小
      this.handleResize();
    },
    beforeDestroy() {
      // 移除全局键盘事件监听
      document.removeEventListener('keydown', this.handleKeyDown);
      // 移除窗口大小变化监听
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      // 动态设置最后一条消息的footer样式
      updateLastMessageFooterStyle() {
        if (this.messages.length === 0) return;

        // 获取所有bubble元素
        const bubbleElements = document.querySelectorAll('.el-x-bubble');

        // 重置所有bubble的footer样式
        bubbleElements.forEach(bubble => {
          const footerElements = bubble.querySelectorAll('.end-action, .start-action');
          footerElements.forEach(footer => {
            footer.style.opacity = '';
          });
        });

        // 设置最后一个bubble的footer样式
        if (bubbleElements.length > 0) {
          const lastBubble = bubbleElements[bubbleElements.length - 1];
          const lastFooterElements = lastBubble.querySelectorAll('.end-action, .start-action');
          lastFooterElements.forEach(footer => {
            footer.style.opacity = '1';
          });
        }
      },
      // 切换侧边栏展开/收起状态
      toggleSideMenu() {
        this.isSideCollapsed = !this.isSideCollapsed;
        // 保存状态到localStorage
        localStorage.setItem('dify-side-collapsed', this.isSideCollapsed);
      },
      // 切换移动端抽屉
      toggleMobileDrawer() {
        this.isMobileDrawerVisible = !this.isMobileDrawerVisible;
      },
      // 新建对话并关闭抽屉
      handleNewChatAndCloseDrawer() {
        this.handleNewChat();
        this.isMobileDrawerVisible = false;
      },
      // 切换会话并关闭抽屉
      handleConversationChangeAndCloseDrawer(conversation) {
        this.handleConversationChange(conversation);
        this.isMobileDrawerVisible = false;
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
      // 处理窗口大小变化
      handleResize() {
        const windowWidth = window.innerWidth;
        // 当屏幕宽度小于1024px时，如果侧边栏是展开的，则自动收缩
        if (windowWidth < 1024 && !this.isSideCollapsed) {
          this.isSideCollapsed = true;
          localStorage.setItem('dify-side-collapsed', 'true');
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

        // 捕获task_id用于停止请求
        if (data.data.task_id && !this.currentTaskId) {
          this.currentTaskId = data.data.task_id;
        }
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
            // console.log(data);
            // 增量消息
            if (this.messages[messageIndex].loading) {
              this.messages[messageIndex].loading = false;
            }
            // 更新消息ID为服务器返回的真实message_id
            if (data.data.id) {
              const oldId = this.messages[messageIndex].id;
              this.messages[messageIndex].id = data.data.id;
              // 更新currentMessageId以便后续操作使用正确的ID
              if (this.currentMessageId === oldId) {
                this.currentMessageId = this.messages[messageIndex].id;
              }
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
        this.currentTaskId = null; // 清理task_id
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
        this.currentTaskId = null; // 清理task_id
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
                id: item.id,
                content: item.answer,
                placement: 'start',
                avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                created_at: item.created_at,
                typing: false,
                feedback: item.feedback,
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
      async handleStopMessage() {
        try {
          // 如果有task_id，调用后端停止接口
          if (this.currentTaskId) {
            await messageApi.stopMessage(this.currentTaskId, this.difyConfig.user);
          }
          this.handleAbort();
        } catch (error) {
          console.error('停止消息失败:', error);
          this.$message.error('停止消息失败: ' + error.message);
        } finally {
          // 清理task_id
          this.currentTaskId = null;
        }
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

      // Footer按钮事件处理方法
      // 复制消息内容
      async handleCopyMessage(item) {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(item.content);
            this.$message.success('内容已复制到剪贴板');
          } else {
            // 兼容旧浏览器
            const textArea = document.createElement('textarea');
            textArea.value = item.content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.$message.success('内容已复制到剪贴板');
          }
        } catch (error) {
          console.error('复制失败:', error);
          this.$message.error('复制失败，请手动复制');
        }
      },

      // 编辑用户消息
      handleEditMessage(item) {
        if (item.placement !== 'end') return;

        this.$prompt('请修改您的消息', '编辑消息', {
          confirmButtonText: '重新发送',
          cancelButtonText: '取消',
          inputValue: item.content,
          inputType: 'textarea',
        })
          .then(({ value }) => {
            if (value && value.trim()) {
              // 更新消息内容并重新发送
              this.senderValue = value.trim();
              this.handleSendMessage();
            }
          })
          .catch(() => {});
      },

      // 重试AI消息
      async handleRetryMessage(item) {
        if (item.placement !== 'start') return;

        try {
          // 找到对应的用户消息
          const messageIndex = this.messages.findIndex(msg => msg.id === item.id);
          if (messageIndex === -1) return;

          // 找到前一条用户消息
          let userMessage = null;
          for (let i = messageIndex - 1; i >= 0; i--) {
            if (this.messages[i].placement === 'end') {
              userMessage = this.messages[i];
              break;
            }
          }

          if (!userMessage) {
            this.$message.error('未找到对应的用户消息');
            return;
          }

          // 直接重新发送用户消息，不删除AI消息
          this.handleSend(userMessage.content);

          this.$nextTick(() => {
            this.$refs.bubbleListRef.scrollToBottom();
          });
        } catch (error) {
          console.error('重试失败:', error);
          this.$message.error('重试失败: ' + error.message);
        }
      },

      // 点赞消息
      async handleLikeMessage(item) {
        if (item.placement !== 'start') return;

        try {
          // 直接使用message_id
          const messageId = item.id;

          // 切换点赞状态
          let newRating;
          if (item.feedback != null && item.feedback.rating === 'like') {
            // 如果已经点赞，则取消点赞
            newRating = null;
          } else {
            // 否则点赞
            newRating = 'like';
          }

          await messageApi.feedbackMessage(messageId, newRating, '', this.difyConfig.user);

          // 更新本地状态
          const messageIndex = this.messages.findIndex(msg => msg.id === item.id);
          if (messageIndex !== -1) {
            if (newRating) {
              this.$set(this.messages[messageIndex], 'feedback', {
                rating: newRating,
              });
            } else {
              this.$set(this.messages[messageIndex], 'feedback', null);
            }
          }

          this.$message.success(newRating === 'like' ? '已点赞' : '已取消点赞');
        } catch (error) {
          console.error('点赞失败:', error);
          this.$message.error('操作失败: ' + error.message);
        }
      },

      // 踩消息
      async handleDislikeMessage(item) {
        if (item.placement !== 'start') return;

        try {
          // 直接使用message_id
          const messageId = item.id;

          let newRating;
          let content = '';

          if (item.feedback != null && item.feedback.rating === 'dislike') {
            // 如果已经踩过，则取消踩
            newRating = null;
          } else {
            // 否则踩，需要弹出对话框填写content
            const { value } = await this.$prompt('请填写反馈内容（可选）', '反馈', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputType: 'textarea',
              inputPlaceholder: '请输入您的反馈意见...',
              inputValidator: null, // 允许空内容
            }).catch(() => {
              // 用户取消了对话框
              return {
                value: null,
              };
            });

            if (value === null) {
              // 用户取消了操作
              return;
            }

            newRating = 'dislike';
            content = value || '';
          }

          await messageApi.feedbackMessage(messageId, newRating, content, this.difyConfig.user);

          // 更新本地状态
          const messageIndex = this.messages.findIndex(msg => msg.id === item.id);
          if (messageIndex !== -1) {
            if (newRating) {
              this.$set(this.messages[messageIndex], 'feedback', {
                rating: newRating,
                content,
              });
            } else {
              this.$set(this.messages[messageIndex], 'feedback', null);
            }
          }

          this.$message.success(newRating === 'dislike' ? '已标记为不喜欢' : '已取消标记');
        } catch (error) {
          console.error('操作失败:', error);
          this.$message.error('操作失败: ' + error.message);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
