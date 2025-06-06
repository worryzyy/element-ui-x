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
          <SvgIcon
            size="28"
            name="menu-right"
            color="rgb(139 139 139)"
          />
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
          <SvgIcon
            size="28"
            name="plus"
            color="rgb(139 139 139)"
          />
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
            <SvgIcon
              size="28"
              name="menu-left"
              color="rgb(139 139 139)"
            />
          </el-button>
        </div>
        <div
          class="drawer-new-chat"
          @click="handleNewChatAndCloseDrawer"
        >
          <div style="margin-right: 10px">
            <SvgIcon
              size="28"
              name="plus"
              color="rgb(139 139 139)"
            />
          </div>
          新对话
          <span class="keyboard-shortcut">Ctrl+K</span>
        </div>
        <el-x-conversations
          v-if="conversationList.length"
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
        <el-empty
          v-else
          description="请开始今天的聊天吧"
        ></el-empty>
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
            v-if="conversationList.length"
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
          <el-empty
            v-else
            description="请开始今天的聊天吧"
          ></el-empty>
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
            <welcome @click-prompt="handlePromptItemClick" />
          </div>

          <el-x-bubble-list
            ref="bubbleListRef"
            :list="messages"
            :max-height="`calc(100vh - 160px)`"
            :defaultMaxWidth="'100%'"
            defaultShape="corner"
            v-loading="isLoadingMessages"
          >
            <template #header="{ item }">
              <bubble-list-header
                :item="item"
                :map-file-type="mapFileType"
              />
            </template>
            <template #footer="{ item }">
              <bubble-list-footer
                :item="item"
                :dify-config="difyConfig"
                :messages="messages"
                @edit-message="handleEditMessage"
                @retry-message="handleRetryMessage"
                @update-feedback="handleUpdateFeedback"
              />
            </template>
          </el-x-bubble-list>
        </div>
        <div class="chat-input">
          <div class="chat-input-container">
            <el-x-sender
              ref="senderRef"
              v-model="senderValue"
              variant="updown"
              @submit="handleSendMessage"
              :loading="loading"
            >
              <template #header>
                <SenderHeader
                  :file-list="uploadedFiles"
                  @delete-file="handleDeleteUploadedFile"
                />
              </template>

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
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
  import { conversationApi, fileApi, messageApi } from '@/api/dify';
  import { sendMixin, streamMixin } from 'vue-element-ui-x';
  // import { sendMixin, streamMixin } from '../../../../packages/element-ui-x/src/mixins';
  import {
    buildChatMessageRequest,
    createDifyRequestConfig,
    createDifyTransformer,
  } from '@/utils/difyAdapter';

  import { addTimeGroupToItems } from '@/utils/timeUtils';
  import BubbleListFooter from './components/BubbleListFooter.vue';
  import BubbleListHeader from './components/BubbleListHeader.vue';
  import SenderHeader from './components/SenderHeader.vue';
  import Welcome from './components/Welcome.vue';

  export default {
    name: 'DifyChat',
    components: {
      BubbleListHeader,
      BubbleListFooter,
      SenderHeader,
      Welcome,
    },
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
          apiKey: 'app-LF6qPHsIQFgAkqoD2Dui1SUo',
          user: 'default-user',
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
      uploadedFiles: {
        handler(newFiles) {
          // 监听上传文件变化，控制header显示隐藏
          this.$nextTick(() => {
            const senderRef = this.$refs.senderRef;
            if (senderRef) {
              if (newFiles.length > 0) {
                senderRef.openHeader();
              } else {
                senderRef.closeHeader();
              }
            }
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
      // 将Dify API文件类型或MIME类型映射到el-x-files-card组件类型
      mapFileType(typeOrMime) {
        // 如果是Dify API的文件类型
        if (['document', 'image', 'audio', 'video', 'custom'].includes(typeOrMime)) {
          switch (typeOrMime) {
            case 'document':
              return 'file';
            case 'image':
              return 'image';
            case 'audio':
              return 'audio';
            case 'video':
              return 'video';
            case 'custom':
            default:
              return 'unknown';
          }
        }

        // 如果是MIME类型，进行映射
        const mimeType = typeOrMime.toLowerCase();

        // 图片类型
        if (mimeType.startsWith('image/')) {
          return 'image';
        }

        // 音频类型
        if (mimeType.startsWith('audio/')) {
          return 'audio';
        }

        // 视频类型
        if (mimeType.startsWith('video/')) {
          return 'video';
        }

        // 文档类型
        const documentMimes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'text/plain',
          'text/csv',
          'application/json',
          'text/html',
          'text/css',
          'application/javascript',
        ];

        if (documentMimes.includes(mimeType)) {
          return 'file';
        }

        // 压缩文件等其他类型
        const otherMimes = [
          'application/zip',
          'application/x-rar-compressed',
          'application/octet-stream',
        ];

        if (otherMimes.includes(mimeType)) {
          return 'file';
        }

        // 默认返回unknown
        return 'unknown';
      },
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
            // 添加message_files字段用于显示附件
            message_files:
              this.uploadedFiles.length > 0
                ? this.uploadedFiles.map(file => ({
                    id: file.id,
                    filename: file.name,
                    url: file.url,
                    type: file.type,
                    size: file.fileSize,
                    mime_type: file.type,
                    transfer_method: 'local_file',
                    belongs_to: 'user',
                    upload_file_id: file.id,
                  }))
                : [],
            // 如果有附件，添加附件信息
            ...(this.uploadedFiles.length > 0 && {
              attachments: this.uploadedFiles.map(file => ({
                id: file.id,
                name: file.name,
                url: file.url,
                type: file.type,
                size: file.fileSize,
              })),
            }),
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
                message_files: item.message_files || [],
                // 如果消息包含文件信息，添加附件
                ...(item.files &&
                  item.files.length > 0 && {
                    attachments: item.files.map(file => ({
                      id: file.id,
                      name: file.name,
                      url: file.url,
                      type: file.type,
                      size: file.size,
                    })),
                  }),
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
      handlePromptItemClick(data) {
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
          // 按照 Dify API 规范格式化文件对象
          const fileObject = {
            id: response.id,
            name: response.name,
            url: response.url || response.download_url,
            type: response.type || file.type,
            size: response.size || file.size,
            // 用于 UI 显示的额外属性
            uid: response.id,
            fileSize: response.size || file.size,
            imgFile: file,
            showDelIcon: true,
          };
          this.uploadedFiles.push(fileObject);
          this.$message.success('文件上传成功');
        } catch (error) {
          this.$message.error('文件上传失败: ' + error.message);
        }

        // 清空文件输入
        event.target.value = '';
      },

      // 处理删除上传的文件
      handleDeleteUploadedFile(item, index) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== item.id);
        this.$message.success('文件已删除');
      },

      // 处理编辑消息事件
      handleEditMessage(content) {
        // 更新消息内容并重新发送
        this.senderValue = content;
        this.handleSendMessage();
      },

      // 处理重试消息事件
      handleRetryMessage(content) {
        // 直接重新发送用户消息
        this.handleSend(content);

        this.$nextTick(() => {
          this.$refs.bubbleListRef.scrollToBottom();
        });
      },

      // 处理反馈更新事件
      handleUpdateFeedback({ messageId, feedback }) {
        // 更新本地状态
        const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          this.$set(this.messages[messageIndex], 'feedback', feedback);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
