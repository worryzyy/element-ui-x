<template>
  <div>
    <el-x-sender
      :value="value || basicContent"
      :placeholder="placeholder || '💌 欢迎使用 Element-UI-X'"
      :clearable="clearable !== undefined ? clearable : true"
      :input-width="inputWidth || '480px'"
      :variant="variant"
      :submit-type="submitType"
      :loading="loading"
      :disabled="disabled"
      :read-only="readOnly"
      :allow-speech="allowSpeech"
      :auto-size="autoSize"
      :input-style="inputStyle"
      :trigger-strings="triggerStrings"
      :trigger-popover-visible="triggerPopoverVisible"
      :trigger-popover-width="triggerPopoverWidth"
      :trigger-popover-left="triggerPopoverLeft"
      :trigger-popover-offset="triggerPopoverOffset"
      :trigger-popover-placement="triggerPopoverPlacement"
      :header-animation-timer="headerAnimationTimer"
      :show-updown="showUpdown"
      :submit-btn-disabled="submitBtnDisabled"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @input="handleInput"
      @trigger="handleTrigger"
    >
      <template
        v-if="$slots.header"
        #header
      >
        <slot name="header"></slot>
      </template>
      <template
        v-if="$slots.prefix"
        #prefix
      >
        <slot name="prefix"></slot>
      </template>
      <template
        v-if="$slots.footer"
        #footer
      >
        <slot name="footer"></slot>
      </template>
      <template
        v-if="$slots['action-list']"
        #action-list
      >
        <slot name="action-list"></slot>
      </template>
      <template
        v-if="$slots['trigger-popover']"
        #trigger-popover="{ triggerString, readonly }"
      >
        <slot
          name="trigger-popover"
          :trigger-string="triggerString"
          :readonly="readonly"
        ></slot>
      </template>
      <template
        v-else
        #trigger-popover="{ triggerString }"
      >
        <div class="default-trigger-popover">
          <p>
            触发字符:
            <strong>{{ triggerString }}</strong>
          </p>
          <p>这是默认的触发弹窗内容</p>
          <ul>
            <li v-if="triggerString === '@'">@张三</li>
            <li v-if="triggerString === '@'">@李四</li>
            <li v-if="triggerString === '#'">#前端</li>
            <li v-if="triggerString === '#'">#后端</li>
            <li v-if="triggerString === '/'">/help</li>
            <li v-if="triggerString === '/'">/clear</li>
          </ul>
        </div>
      </template>
    </el-x-sender>
    <div class="demo-controls">
      <p>输入内容：{{ currentValue }}</p>
      <p v-if="submitted">已提交内容：{{ submitted }}</p>
    </div>
  </div>
</template>

<script>
  import ElXSender from '@/components/Sender';

  export default {
    name: 'BasicDemo',
    components: { ElXSender },
    props: {
      value: String,
      placeholder: String,
      clearable: Boolean,
      inputWidth: String,
      variant: String,
      submitType: String,
      loading: Boolean,
      disabled: Boolean,
      readOnly: Boolean,
      allowSpeech: Boolean,
      autoSize: Object,
      inputStyle: Object,
      triggerStrings: Array,
      triggerPopoverVisible: Boolean,
      triggerPopoverWidth: String,
      triggerPopoverLeft: String,
      triggerPopoverOffset: Number,
      triggerPopoverPlacement: String,
      headerAnimationTimer: Number,
      showUpdown: Boolean,
      submitBtnDisabled: Boolean,
    },
    data() {
      return {
        basicContent: '',
        currentValue: '',
        submitted: '',
      };
    },
    methods: {
      handleSubmit(content) {
        this.submitted = content;
        this.basicContent = '';
        this.currentValue = '';
        this.$message.success('提交成功：' + content);
      },
      handleCancel() {
        this.$message.info('已取消提交');
      },
      handleInput(value) {
        this.currentValue = value;
        this.basicContent = value;
      },
      handleTrigger(event) {
        console.log('触发器事件：', event);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo-controls {
    margin-top: 20px;
  }

  .default-trigger-popover {
    padding: 12px;
    max-width: 200px;

    p {
      margin: 0 0 8px 0;
      font-size: 14px;
    }

    ul {
      margin: 8px 0 0 0;
      padding-left: 16px;

      li {
        margin: 4px 0;
        font-size: 13px;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }
  }
</style>
