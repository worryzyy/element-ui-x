<template>
  <div class="chat-input">
    <div class="chat-input-container">
      <el-x-sender
        ref="senderRef"
        :value="value"
        @input="$emit('input', $event)"
        variant="updown"
        @submit="$emit('send', $event)"
        :loading="loading"
      >
        <template #header>
          <SenderHeader
            :file-list="uploadedFiles"
            @delete-file="$emit('delete-file', $event)"
          />
        </template>

        <template #prefix>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
            <el-button
              round
              plain
              color="#626aef"
              size="small"
              @click="$emit('file-upload')"
            >
              <i class="el-icon-paperclip"></i>
            </el-button>

            <template>
              <div
                :class="['thinking', { 'thinking--active': isSelect }]"
                @click="$emit('update:is-select', !isSelect)"
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
              @click="$emit('stop')"
            >
              <i class="el-icon-close"></i>
            </el-button>
            <el-button
              v-else
              round
              class="send-btn"
              style="background: #626aef; color: #fff"
              size="small"
              @click="$emit('send', value)"
              :disabled="!value || !value.trim()"
            >
              <i class="el-icon-position"></i>
            </el-button>
          </div>
        </template>
      </el-x-sender>
    </div>

    <div class="chat-input-footer">内容由 AI 生成，请仔细甄别</div>
  </div>
</template>

<script>
  import SenderHeader from './SenderHeader.vue';

  export default {
    name: 'ChatInput',
    components: {
      SenderHeader,
    },
    props: {
      value: {
        type: String,
        default: '',
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
    },
    emits: ['input', 'send', 'stop', 'file-upload', 'delete-file', 'update:is-select'],
    watch: {
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
  };
</script>

<style lang="scss" scoped>
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

  @media (max-width: 767px) {
    .chat-input {
      padding: 0 16px 16px;

      .chat-input-container {
        max-width: none;
      }
    }
  }
</style>
