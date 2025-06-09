<template>
  <div class="chat-content">
    <div
      class="chat-content-welcome"
      v-if="messages.length === 0"
    >
      <welcome @click-prompt="$emit('prompt-click', $event)" />
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
      <template #content="{ item }">
        <el-x-typewriter
          :content="item.content"
          :md-plugins="mdPlugins"
          :typing="item.typing"
          :is-markdown="true"
        />
      </template>
      <template #footer="{ item }">
        <bubble-list-footer
          :item="item"
          :dify-config="difyConfig"
          :messages="messages"
          @edit-message="$emit('edit-message', $event)"
          @retry-message="$emit('retry-message', $event)"
          @update-feedback="$emit('update-feedback', $event)"
        />
      </template>
    </el-x-bubble-list>
  </div>
</template>

<script>
  import markdownItKatex from 'markdown-it-katex';
  import markdownItMermaid from 'markdown-it-mermaid';
  import BubbleListFooter from './BubbleListFooter.vue';
  import BubbleListHeader from './BubbleListHeader.vue';
  import Welcome from './Welcome.vue';
  export default {
    name: 'ChatContent',
    components: {
      BubbleListHeader,
      BubbleListFooter,
      Welcome,
    },
    props: {
      messages: {
        type: Array,
        default: () => [],
      },
      isLoadingMessages: {
        type: Boolean,
        default: false,
      },
      mapFileType: {
        type: Function,
        required: true,
      },
      difyConfig: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        mdPlugins: [markdownItMermaid, markdownItKatex],
      };
    },
    emits: ['edit-message', 'retry-message', 'update-feedback', 'prompt-click'],
  };
</script>

<style lang="scss" scoped>
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
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::v-deep .el-x-bubble-list {
      .el-x-bubble {
        .el-x-bubble-content-wrapper {
          .el-x-bubble-footer {
            .end-action,
            .start-action {
              display: flex;
              gap: 10px;
              align-items: center;
              opacity: 0;
              transition: opacity 0.2s ease;
              .action-btn {
                cursor: pointer;
              }
            }
          }
        }

        // 鼠标悬停时显示footer
        &:hover {
          .el-x-bubble-content-wrapper {
            .el-x-bubble-footer {
              .end-action,
              .start-action {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .chat-content {
      padding: 16px 0;

      .chat-content-welcome {
        padding: 0;
      }
    }
  }
</style>
