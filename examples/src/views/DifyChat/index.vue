<template>
  <div class="dify-chat">
    <!-- 移动端头部导航栏 -->
    <MobileHeader
      :title="currentConversationTitle"
      @toggle-drawer="toggleMobileDrawer"
      @new-chat="handleNewChat"
    />

    <!-- 移动端抽屉 -->
    <MobileDrawer
      :visible="isMobileDrawerVisible"
      :conversation-list="conversationList"
      :active-conversation="activeConversation"
      :custom-menu="customMenu"
      :is-loading-conversations="isLoadingConversations"
      @close="toggleMobileDrawer"
      @new-chat="handleNewChat"
      @conversation-change="handleConversationChange"
      @menu-command="handleMenuCommand"
    />

    <div class="dify-main">
      <!-- 桌面端侧边栏 -->
      <Sidebar
        :is-side-collapsed="isSideCollapsed"
        :conversation-list="conversationList"
        :active-conversation="activeConversation"
        :custom-menu="customMenu"
        :is-loading-conversations="isLoadingConversations"
        @toggle="toggleSideMenu"
        @new-chat="handleNewChat"
        @conversation-change="handleConversationChange"
        @menu-command="handleMenuCommand"
      />

      <!-- 聊天容器 -->
      <ChatContainer
        :title="messages.length === 0 ? '' : currentConversationTitle"
        :messages="messages"
        :is-loading-messages="isLoadingMessages"
        :loading="loading"
        :is-select="isSelect"
        :sender-value="senderValue"
        :uploaded-files="uploadedFiles"
        :map-file-type="mapFileType"
        :dify-config="difyConfig"
        :suggested-questions="suggestedQuestions"
        :show-suggested-questions="showSuggestedQuestions"
        :is-loading-suggestions="isLoadingSuggestions"
        :class="{ collapsed: isSideCollapsed }"
        @edit-title="handleEditTitle"
        @edit-message="handleEditMessage"
        @retry-message="handleRetryMessage"
        @update-feedback="handleUpdateFeedback"
        @prompt-click="handlePromptItemClick"
        @suggested-question-click="handleSuggestedQuestionClick"
        @send="handleSendMessage"
        @stop="handleStopMessage"
        @file-upload="handleFileUpload"
        @delete-file="handleDeleteUploadedFile"
        @update:is-select="value => (isSelect = value)"
        @update:sender-value="value => (senderValue = value)"
      />
    </div>

    <!-- 隐藏的文件上传输入框 -->
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      @change="handleFileInputChange"
    />
  </div>
</template>

<script>
  import { sendMixin, streamMixin } from 'vue-element-ui-x';

  // 导入新组件
  import ChatContainer from './components/ChatContainer.vue';
  import MobileDrawer from './components/MobileDrawer.vue';
  import MobileHeader from './components/MobileHeader.vue';
  import Sidebar from './components/Sidebar.vue';

  // 导入mixins
  import conversationMixin from './mixins/conversationMixin';
  import fileMixin from './mixins/fileMixin';
  import messageMixin from './mixins/messageMixin';
  import responsiveMixin from './mixins/responsiveMixin';

  export default {
    name: 'DifyChat',
    components: {
      MobileHeader,
      MobileDrawer,
      Sidebar,
      ChatContainer,
    },
    mixins: [sendMixin, streamMixin, responsiveMixin, conversationMixin, messageMixin, fileMixin],

    data() {
      return {
        // 主组件特有的数据
        loading: false,
        // Dify 配置保留在主组件，但其他数据应该在mixins中
      };
    },

    async mounted() {
      await this.loadConversations();
    },

    methods: {
      // 触发文件上传选择
      handleFileUpload() {
        this.$refs.fileInput.click();
      },

      // 处理文件输入框变化
      handleFileInputChange(event) {
        const file = event.target.files[0];
        if (file) {
          // 调用fileMixin的handleFileChange方法
          this.handleFileChange(file);
        }
        // 清空文件输入
        event.target.value = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';

  .dify-chat {
    height: 100vh;
    overflow: hidden;

    .dify-main {
      display: flex;
      height: 100vh;
    }
  }
</style>
