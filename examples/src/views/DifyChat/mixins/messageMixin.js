import { messageApi } from '@/api/dify';
import {
  buildChatMessageRequest,
  createDifyRequestConfig,
  createDifyTransformer,
} from '@/utils/difyAdapter';
import { sendMixin, streamMixin } from 'vue-element-ui-x';

// 生成基于浏览器的唯一用户ID
function generateBrowserUserId() {
  const key = 'dify_chat_user_id';
  let userId = localStorage.getItem(key);

  if (!userId) {
    // 生成唯一ID：时间戳 + 随机数 + 浏览器指纹
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
    ].join('|');

    // 创建简单的hash
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 转换为32位整数
    }

    userId = `user_${timestamp}_${random}_${Math.abs(hash).toString(36)}`;
    localStorage.setItem(key, userId);
  }

  return userId;
}

export default {
  mixins: [sendMixin, streamMixin],
  data() {
    return {
      // 消息相关
      messages: [],
      isLoadingMessages: false,
      currentTaskId: null,
      currentMessageId: null,
      currentStreamContent: '',

      // 输入相关
      senderValue: '',
      isSelect: false,

      // 建议问题相关
      suggestedQuestions: [],
      isLoadingSuggestions: false,
      showSuggestedQuestions: false,

      // Dify 配置
      difyConfig: {
        baseURL: 'https://api.dify.ai/v1',
        apiKey: process.env.VUE_APP_DIFY_API_KEY,
        user: generateBrowserUserId(),
      },
    };
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
  mounted() {
    this.initializeDifyRequest();
    // 添加全局键盘事件监听
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    // 移除全局键盘事件监听
    document.removeEventListener('keydown', this.handleKeyDown);
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

    // 处理键盘快捷键
    handleKeyDown(event) {
      // 检测Ctrl+K组合键
      if (event.ctrlKey && event.key === 'k') {
        // 阻止默认行为（如浏览器的搜索功能）
        event.preventDefault();
        // 调用新建对话方法
        if (this.handleNewChat && typeof this.handleNewChat === 'function') {
          this.handleNewChat();
        }
      }
    },

    // 滚动到底部的通用方法
    scrollToBottom() {
      this.$nextTick(() => {
        // 通过组件引用链访问滚动方法
        const chatContainer = this.$refs.chatContainer;
        const chatContent = chatContainer && chatContainer.$refs.chatContent;
        const bubbleList = chatContent && chatContent.$refs.bubbleListRef;

        if (bubbleList && typeof bubbleList.scrollToBottom === 'function') {
          bubbleList.scrollToBottom();
        }
      });
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

    // 加载消息历史
    async loadMessages(conversationId) {
      if (!conversationId) {
        this.messages = [];
        this.scrollToBottom();
        return;
      }

      try {
        this.isLoadingMessages = true;
        const response = await messageApi.getMessages({
          conversation_id: conversationId,
          user: this.difyConfig.user,
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
            // 处理思考内容
            let content = item.answer;
            let reasoning_content = '';
            let thinkingStatus = 'end';

            // 检查是否包含完整的思考内容（有开始和结束标签）
            const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
            if (thinkMatch) {
              reasoning_content = thinkMatch[1].trim();
              content = content.replace(/<think>[\s\S]*?<\/think>/g, '');
              thinkingStatus = 'end';
            } else if (content.includes('<think>')) {
              // 只有开始标签，没有结束标签的情况
              const thinkStartIndex = content.indexOf('<think>');
              const beforeThink = content.substring(0, thinkStartIndex);
              const thinkContent = content.substring(thinkStartIndex + 7); // 7是'<think>'的长度

              content = beforeThink;
              reasoning_content = thinkContent.trim();
              thinkingStatus = 'thinking'; // 标记为思考中状态
            }

            messages.push({
              id: item.id,
              content: content,
              reasoning_content: reasoning_content,
              thinkingStatus: thinkingStatus,
              loading: thinkingStatus == 'thinking' ? true : false,
              placement: 'start',
              isMarkdown: true,
              avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              avatarSize: 40,
              created_at: item.created_at,
              typing: false,
              feedback: item.feedback,
            });
          }
        });

        // 按时间排序消息
        this.messages = messages.sort((a, b) => a.created_at - b.created_at);

        // 加载完成后滚动到底部
        this.scrollToBottom();
      } catch (error) {
        this.$message.error('加载消息历史失败: ' + error.message);
      } finally {
        this.isLoadingMessages = false;
      }
    },

    // 发送 Dify 消息
    async sendDifyMessage(message) {
      try {
        // 在新对话时，立即生成临时会话并添加到列表
        if (!this.activeConversation) {
          const tempConversationId = 'temp_' + Date.now();
          const tempConversation = {
            id: tempConversationId,
            label: '新对话',
            group: '今天',
            prefixIcon: 'el-icon-chat-dot-round',
            created_at: new Date().getTime() / 1000,
          };

          // 添加临时会话到列表顶部
          this.conversationList.unshift(tempConversation);
          this.activeConversation = tempConversationId;
        }

        // 立即清空输入框和文件列表
        this.senderValue = '';
        const filesToSend = [...this.uploadedFiles];
        this.uploadedFiles = [];

        // 添加用户消息到界面
        const userMessage = {
          id: Date.now().toString(),
          content: message,
          placement: 'end',
          created_at: Date.now(),
          message_files:
            filesToSend.length > 0
              ? filesToSend.map(file => ({
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
        };
        this.messages.push(userMessage);

        // 创建AI消息占位符
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: '',
          placement: 'start',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          avatarSize: 40,
          created_at: Date.now(),
          isMarkdown: true,
          loading: true,
          typing: {
            interval: 80,
            step: 5,
          },
          reasoning_content: '',
          thinkingStatus: 'start',
        };
        this.messages.push(aiMessage);
        this.currentMessageId = aiMessage.id;
        this.currentStreamContent = '';

        // 构建请求参数
        const requestBody = buildChatMessageRequest({
          query: message,
          conversation_id: this.activeConversation.startsWith('temp_')
            ? null
            : this.activeConversation,
          files: filesToSend,
          user: this.difyConfig.user,
          response_mode: 'streaming',
          enable_thinking: this.isSelect,
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
    async handleStreamMessage(data) {
      if (!data || !this.currentMessageId) return;
      // 根据message_id找到对应的消息
      const messageIndex = this.messages.findIndex(msg => msg.id === this.currentMessageId);
      if (messageIndex === -1) return;

      // 捕获task_id用于停止请求
      if (data.data.task_id && !this.currentTaskId) {
        this.currentTaskId = data.data.task_id;
      }

      switch (data.type) {
        case 'workflow_started':
          // 初始化工作流折叠面板数据结构
          this.$set(this.messages[messageIndex], 'workflowCollapse', {
            activeNames: ['workflow-panel'],
            nodeActiveNames: [], // 管理各个节点的展开状态，默认全部收缩
            panels: [
              {
                name: 'workflow-panel',
                title: '工作流',
                status: 'running',
                workflow_run_id: data.data.workflow_run_id,
                created_at: data.data.created_at,
                nodes: [],
              },
            ],
          });
          if (data.data.conversation_id && !this.activeConversation) {
            this.activeConversation = data.data.conversation_id;
          }
          break;

        case 'node_started':
          // 添加新节点到工作流
          if (this.messages[messageIndex].workflowCollapse) {
            const nodeData = data.data;
            const workflowPanel = this.messages[messageIndex].workflowCollapse.panels[0];

            workflowPanel.nodes.push({
              id: nodeData.data.id,
              node_id: nodeData.data.node_id,
              node_type: nodeData.data.node_type,
              title: nodeData.data.title,
              index: nodeData.data.index,
              status: 'running',
              started_at: nodeData.data.created_at,
              finished_at: null,
              duration: null,
              predecessor_node_id: nodeData.data.predecessor_node_id,
              parallel_id: nodeData.data.parallel_id,
              parent_parallel_id: nodeData.data.parent_parallel_id,
              iteration_id: nodeData.data.iteration_id,
              loop_id: nodeData.data.loop_id,
              inputs: nodeData.data.inputs,
              extras: nodeData.data.extras || {},
              content: '',
              error_message: '',
            });
          }
          break;

        case 'node_finished':
          // 更新节点状态为完成
          if (this.messages[messageIndex].workflowCollapse) {
            const nodeData = data.data;
            const workflowPanel = this.messages[messageIndex].workflowCollapse.panels[0];
            const nodeIndex = workflowPanel.nodes.findIndex(node => node.id === nodeData.data.id);

            if (nodeIndex !== -1) {
              this.$set(workflowPanel.nodes[nodeIndex], 'status', 'completed');
              this.$set(
                workflowPanel.nodes[nodeIndex],
                'finished_at',
                nodeData.data.finished_at || Date.now(),
              );

              // 计算执行时长
              const startTime = workflowPanel.nodes[nodeIndex].started_at;
              const endTime = workflowPanel.nodes[nodeIndex].finished_at;
              const duration = endTime - startTime;
              this.$set(workflowPanel.nodes[nodeIndex], 'duration', duration);

              // 更新节点输出和其他信息
              if (nodeData.data.outputs) {
                this.$set(workflowPanel.nodes[nodeIndex], 'outputs', nodeData.data.outputs);
              }
            }
          }
          break;

        case 'workflow_finished':
          // 工作流完成，更新状态
          if (this.messages[messageIndex].workflowCollapse) {
            const workflowPanel = this.messages[messageIndex].workflowCollapse.panels[0];
            this.$set(workflowPanel, 'status', 'completed');
            this.$set(workflowPanel, 'title', '工作流');
          }
          if (data.data.conversation_id && !this.activeConversation) {
            this.activeConversation = data.data.conversation_id;
          }
          break;
        case 'delta':
          // 增量消息
          if (this.messages[messageIndex].loading && this.messages[messageIndex].content) {
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

          // 处理思考内容
          if (data.data.delta) {
            const deltaContent = data.data.delta;

            // 检查是否包含思考内容开始标签
            if (deltaContent.includes('<think>')) {
              // 设置思考状态
              this.$set(this.messages[messageIndex], 'thinkingStatus', 'thinking');

              // 提取<think>前的内容（如果有）
              const beforeThink = deltaContent.split('<think>')[0];
              if (beforeThink) {
                this.currentStreamContent += beforeThink;
                this.messages[messageIndex].content = this.currentStreamContent;
              }

              // 初始化或累积思考内容
              const thinkStart = deltaContent.split('<think>')[1];

              // 检查是否在同一消息中包含结束标签
              if (thinkStart && thinkStart.includes('</think>')) {
                // 提取思考内容
                const thinkContent = thinkStart.split('</think>')[0];
                this.$set(this.messages[messageIndex], 'reasoning_content', thinkContent.trim());

                // 提取</think>后的内容（如果有）
                const afterThink = thinkStart.split('</think>')[1];
                if (afterThink) {
                  this.currentStreamContent += afterThink;
                  this.messages[messageIndex].content = this.currentStreamContent;
                }

                // 设置思考状态为结束
                this.$set(this.messages[messageIndex], 'thinkingStatus', 'end');
              } else {
                // 立即显示当前的思考内容（动态显示）
                this.$set(
                  this.messages[messageIndex],
                  'reasoning_content',
                  (thinkStart || '').trim(),
                );
              }
            }
            // 正在思考中，累积内容
            else if (this.messages[messageIndex].thinkingStatus === 'thinking') {
              // 直接累积到 reasoning_content
              const currentContent = this.messages[messageIndex].reasoning_content || '';
              // 累积内容
              const newContent = currentContent + deltaContent;

              // 检查是否包含结束标签
              if (deltaContent.includes('</think>')) {
                // 提取完整的思考内容
                const thinkContent = newContent.split('</think>')[0];
                this.$set(this.messages[messageIndex], 'reasoning_content', thinkContent.trim());

                // 提取</think>后的内容（如果有）
                const afterThink = deltaContent.split('</think>')[1];
                if (afterThink) {
                  this.currentStreamContent += afterThink;
                  this.messages[messageIndex].content = this.currentStreamContent;
                }

                // 设置思考状态为结束
                this.$set(this.messages[messageIndex], 'thinkingStatus', 'end');
              } else {
                // 动态更新思考内容显示
                this.$set(this.messages[messageIndex], 'reasoning_content', newContent.trim());
              }
            } else {
              // 普通内容，直接添加
              this.currentStreamContent += deltaContent;
              this.messages[messageIndex].content = this.currentStreamContent;
            }
          }
          break;

        case 'error':
          // 工作流错误处理
          if (this.messages[messageIndex].workflowCollapse) {
            const workflowPanel = this.messages[messageIndex].workflowCollapse.panels[0];
            this.$set(workflowPanel, 'status', 'failed');
            this.$set(workflowPanel, 'title', '工作流执行失败');

            // 如果有正在运行的节点，标记为失败
            const runningNodeIndex = workflowPanel.nodes.findIndex(
              node => node.status === 'running',
            );
            if (runningNodeIndex !== -1) {
              this.$set(workflowPanel.nodes[runningNodeIndex], 'status', 'failed');
              this.$set(
                workflowPanel.nodes[runningNodeIndex],
                'error_message',
                data.data.message || '节点执行失败',
              );
            }
          }
          this.messages[messageIndex].content = data.data.message;
          this.messages[messageIndex].loading = false;
          break;
        case 'end':
          this.messages[messageIndex].typing = false;
          // 如果有思考内容，确保思考状态为完成
          if (this.messages[messageIndex].reasoning_content) {
            this.$set(this.messages[messageIndex], 'thinkingStatus', 'end');
          }
          await this.loadConversations();

          // 获取建议问题 - 仅对AI消息获取建议
          if (this.messages[messageIndex].placement === 'start' && this.messages[messageIndex].id) {
            await this.getSuggestedQuestions(this.messages[messageIndex].id);
          }

          // 如果收到新的conversation_id，处理临时会话替换
          if (data.data.conversation_id) {
            const oldActiveConversation = this.activeConversation;
            this.activeConversation = data.data.conversation_id;

            // 如果之前是临时会话，需要替换
            if (oldActiveConversation && oldActiveConversation.startsWith('temp_')) {
              // 找到临时会话的索引
              const tempIndex = this.conversationList.findIndex(
                conv => conv.id === oldActiveConversation,
              );
              if (tempIndex !== -1) {
                // 用真实会话替换临时会话
                this.conversationList.splice(tempIndex, 1, {
                  id: data.data.conversation_id,
                  label: '新对话',
                  prefixIcon: 'el-icon-chat-dot-round',
                  created_at: new Date().toISOString(),
                });
              }

              // 触发会话切换事件，用真实的会话ID替换临时ID
              // this.$emit('conversation-change', {
              //   id: data.data.conversation_id,
              //   label: '新对话',
              // });
            }
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
      this.currentTaskId = null;
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
      this.currentTaskId = null;

      // 消息完成后滚动到底部
      this.scrollToBottom();
    },

    // 发送消息
    async handleSendMessage(message) {
      // 如果传入了消息内容，使用传入的；否则使用输入框的内容
      const messageContent = message || this.senderValue;

      if (this.loading || !messageContent || !messageContent.trim()) return;

      try {
        this.handleSend(messageContent);
        // 发送消息后滚动到底部
        this.scrollToBottom();
        // 只有当使用输入框内容时才清空
        if (!message) {
          this.senderValue = '';
        }
      } catch (error) {
        console.error('发送消息失败:', error);
        this.$message.error('发送消息失败: ' + error.message);
        this.loading = false;
      }
    },

    // 停止消息
    async handleStopMessage() {
      try {
        if (this.currentTaskId) {
          await messageApi.stopMessage(this.currentTaskId, this.difyConfig.user);
        }
        this.handleAbort();
      } catch (error) {
        console.error('停止消息失败:', error);
        this.$message.error('停止消息失败: ' + error.message);
      } finally {
        this.currentTaskId = null;
      }
    },

    // 处理编辑消息事件
    handleEditMessage(content) {
      this.senderValue = content;
      this.handleSend(content);
      this.scrollToBottom();
    },

    // 处理重试消息事件
    handleRetryMessage(content) {
      this.handleSend(content);
      this.scrollToBottom();
    },

    // 处理反馈更新事件
    handleUpdateFeedback({ messageId, feedback }) {
      const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        this.$set(this.messages[messageIndex], 'feedback', feedback);
      }
    },

    // 处理提示项点击
    handlePromptItemClick(data) {
      this.senderValue = data.description || data.label;
      this.$nextTick(() => {
        this.handleSendMessage();
      });
    },

    // 获取建议问题
    async getSuggestedQuestions(messageId) {
      if (!messageId) return;

      try {
        this.isLoadingSuggestions = true;
        const response = await messageApi.getSuggestedQuestions(messageId, this.difyConfig.user);

        if (response.result === 'success' && response.data && response.data.length > 0) {
          this.suggestedQuestions = response.data.map((question, index) => ({
            key: `suggestion_${index}`,
            icon: 'el-icon-chat-dot-round',
            iconStyle: { color: '#626aef' },
            label: question,
            description: question,
          }));
          this.showSuggestedQuestions = true;
        } else {
          this.suggestedQuestions = [];
          this.showSuggestedQuestions = false;
        }
      } catch (error) {
        console.error('获取建议问题失败:', error);
        this.suggestedQuestions = [];
        this.showSuggestedQuestions = false;
      } finally {
        this.isLoadingSuggestions = false;
      }
    },

    // 处理建议问题点击
    handleSuggestedQuestionClick(question) {
      // 隐藏建议问题
      this.showSuggestedQuestions = false;
      this.suggestedQuestions = [];

      // 发送消息
      this.senderValue = question.description;
      this.$nextTick(() => {
        this.handleSendMessage();
      });
    },

    // 处理工作流激活状态更新
    handleUpdateWorkflowActive(data) {
      const { messageId, activeNames } = data;
      const messageIndex = this.messages.findIndex(msg => msg.id === messageId);

      if (messageIndex !== -1 && this.messages[messageIndex].workflowCollapse) {
        this.$set(this.messages[messageIndex].workflowCollapse, 'activeNames', activeNames);
      }
    },

    // 处理节点激活状态更新
    handleUpdateNodeActive(data) {
      const { messageId, nodeActiveNames } = data;
      const messageIndex = this.messages.findIndex(msg => msg.id === messageId);

      if (messageIndex !== -1 && this.messages[messageIndex].workflowCollapse) {
        this.$set(this.messages[messageIndex].workflowCollapse, 'nodeActiveNames', nodeActiveNames);
      }
    },
  },
};
