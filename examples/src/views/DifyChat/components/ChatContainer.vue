<template>
  <div class="chat-container">
    <ChatHeader
      :title="title"
      @edit-title="$emit('edit-title')"
    />
    <ChatContent
      :messages="messages"
      :is-loading-messages="isLoadingMessages"
      :map-file-type="mapFileType"
      :dify-config="difyConfig"
      :suggested-questions="suggestedQuestions"
      :show-suggested-questions="showSuggestedQuestions"
      :is-loading-suggestions="isLoadingSuggestions"
      @edit-message="$emit('edit-message', $event)"
      @retry-message="$emit('retry-message', $event)"
      @update-feedback="$emit('update-feedback', $event)"
      @prompt-click="$emit('prompt-click', $event)"
      @suggested-question-click="$emit('suggested-question-click', $event)"
    />
    <ChatInput
      :value="senderValue"
      @input="$emit('update:sender-value', $event)"
      :loading="loading"
      :is-select="isSelect"
      :uploaded-files="uploadedFiles"
      @send="$emit('send', $event)"
      @stop="$emit('stop')"
      @file-upload="$emit('file-upload')"
      @delete-file="$emit('delete-file', $event)"
      @update:is-select="$emit('update:is-select', $event)"
    />
  </div>
</template>

<script>
  import ChatContent from './ChatContent.vue';
  import ChatHeader from './ChatHeader.vue';
  import ChatInput from './ChatInput.vue';

  export default {
    name: 'ChatContainer',
    components: {
      ChatHeader,
      ChatContent,
      ChatInput,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      messages: {
        type: Array,
        default: () => [],
      },
      isLoadingMessages: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      isSelect: {
        type: Boolean,
        default: false,
      },
      uploadedFiles: {
        type: Array,
        default: () => [],
      },
      mapFileType: {
        type: Function,
        required: true,
      },
      difyConfig: {
        type: Object,
        required: true,
      },
      senderValue: {
        type: String,
        default: '',
      },
      suggestedQuestions: {
        type: Array,
        default: () => [],
      },
      showSuggestedQuestions: {
        type: Boolean,
        default: false,
      },
      isLoadingSuggestions: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 移除inputValue，使用props中的senderValue
      };
    },
    emits: [
      'edit-title',
      'edit-message',
      'retry-message',
      'update-feedback',
      'prompt-click',
      'send',
      'stop',
      'file-upload',
      'delete-file',
      'update:is-select',
      'update:sender-value',
      'suggested-question-click',
    ],
  };
</script>

<style lang="scss" scoped>
  .chat-container {
    width: 100%;
    max-width: 800px;
    height: 100%;
    margin: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: $--color-white;
    margin-left: 0;
    transition: margin-left 0.3s ease;

    @media (min-width: 768px) {
      margin-left: 260px;

      &.collapsed {
        margin-left: 60px;
      }
    }

    @media (max-width: 767px) {
      margin-top: 60px;
      max-width: none;
      margin-left: 0;
    }
  }

  // PC端小屏幕适配 (768px - 1024px) - 优化布局
  @media (max-width: 1024px) and (min-width: 768px) {
    .chat-container {
      max-width: none;
    }
  }
</style>
