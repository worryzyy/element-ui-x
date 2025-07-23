<template>
  <div>
    <el-x-sender
      ref="customSender"
      :value="value || slotContent"
      :placeholder="placeholder || '带有头部、前缀和底部的发送器...'"
      :clearable="clearable !== undefined ? clearable : true"
      :variant="variant"
      :submit-type="submitType"
      :loading="loading"
      :disabled="disabled"
      :read-only="readOnly"
      :allow-speech="allowSpeech"
      :auto-size="autoSize"
      :input-style="inputStyle"
      :header-animation-timer="headerAnimationTimer"
      :show-updown="showUpdown"
      :submit-btn-disabled="submitBtnDisabled"
      @input="handleInput"
    >
      <template #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 欢迎使用 Element X</div>
            <div class="header-right">
              <el-button @click.stop="toggleHeader">
                <span>关闭头部</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">🦜 自定义头部内容</div>
        </div>
      </template>
      <template #prefix>
        <el-avatar
          :size="32"
          icon="el-icon-user-solid"
        ></el-avatar>
      </template>
      <template #footer>
        <div class="custom-footer">
          <span>自定义底部区域</span>
          <el-button-group>
            <el-button
              size="mini"
              icon="el-icon-picture"
              type="text"
            >
              图片
            </el-button>
            <el-button
              size="mini"
              icon="el-icon-video-camera"
              type="text"
            >
              视频
            </el-button>
            <el-button
              size="mini"
              icon="el-icon-paperclip"
              type="text"
            >
              附件
            </el-button>
          </el-button-group>
        </div>
      </template>
    </el-x-sender>
    <div class="demo-controls">
      <el-button
        size="small"
        type="primary"
        @click="toggleHeader"
      >
        {{ showHeader ? '关闭头部' : '显示头部' }}
      </el-button>
    </div>
  </div>
</template>

<script>
  import ElXSender from '@/components/Sender';

  export default {
    name: 'SlotDemo',
    components: { ElXSender },
    props: {
      value: String,
      placeholder: String,
      clearable: Boolean,
      variant: String,
      submitType: String,
      loading: Boolean,
      disabled: Boolean,
      readOnly: Boolean,
      allowSpeech: Boolean,
      autoSize: Object,
      inputStyle: Object,
      headerAnimationTimer: Number,
      showUpdown: Boolean,
      submitBtnDisabled: Boolean,
    },
    data() {
      return {
        slotContent: '',
        showHeader: true,
      };
    },
    methods: {
      handleInput(value) {
        this.slotContent = value;
      },
      toggleHeader() {
        this.showHeader = !this.showHeader;
        if (this.showHeader) {
          this.$nextTick(() => {
            if (this.$refs.customSender) {
              this.$refs.customSender.openHeader();
            }
          });
        } else {
          if (this.$refs.customSender) {
            this.$refs.customSender.closeHeader();
          }
        }
      },
    },
    mounted() {
      if (this.$refs.customSender) {
        this.$refs.customSender.openHeader();
      }
    },
  };
</script>

<style lang="scss" scoped>
  .header-self-wrap {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 200px;

    .header-self-title {
      width: 100%;
      display: flex;
      height: 30px;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
    }

    .header-self-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #626aef;
      font-weight: 600;
    }
  }

  .custom-footer {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
  }

  .demo-controls {
    margin-top: 20px;
  }
</style>
