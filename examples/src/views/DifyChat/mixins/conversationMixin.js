import { conversationApi } from '@/api/dify';
import { addTimeGroupToItems } from '@/utils/timeUtils';

export default {
  data() {
    return {
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
    };
  },
  computed: {
    currentConversationTitle() {
      const conversation = this.conversationList.find(item => item.id === this.activeConversation);
      return conversation ? conversation.label : '对话';
    },
  },
  methods: {
    // 加载会话列表
    async loadConversations() {
      try {
        this.isLoadingConversations = true;
        const response = await conversationApi.getConversations({
          user: this.difyConfig.user,
        });

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
      } catch (error) {
        this.$message.error('加载会话列表失败: ' + error.message);
      } finally {
        this.isLoadingConversations = false;
      }
    },

    // 处理会话切换
    async handleConversationChange(conversation) {
      this.activeConversation = conversation.id;
      // 调用loadMessages加载历史消息
      await this.loadMessages(conversation.id);
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
      } catch (error) {
        this.$message.error('创建新对话失败: ' + error.message);
      } finally {
        this.isCreatingChat = false;
      }
    },

    // 处理菜单命令
    handleMenuCommand(command, item) {
      if (command === 'delete') {
        this.handleDeleteConversation(item);
      } else if (command === 'rename') {
        this.$prompt('请输入新的对话标题', '重命名对话', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.label,
        })
          .then(({ value }) => {
            if (value && value.trim()) {
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

        await conversationApi.deleteConversation(conversation.id, this.difyConfig.user);

        // 从列表中移除
        this.conversationList = this.conversationList.filter(item => item.id !== conversation.id);

        // 如果删除的是当前激活的会话
        if (this.activeConversation === conversation.id) {
          if (this.conversationList.length > 0) {
            this.activeConversation = this.conversationList[0].id;
            this.$emit('conversation-change', {
              id: this.activeConversation,
            });
          } else {
            this.activeConversation = null;
            this.$emit('conversation-change', null);
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
        await conversationApi.renameConversation(conversation.id, newName, this.difyConfig.user);

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
  },
};
