<template>
  <div
    class="el-x-sender-wrap"
    :style="{
      display: 'block',
      cursor: disabled ? 'not-allowed' : 'default',
      '--el-x-sender-trigger-popover-width': triggerPopoverWidth,
      '--el-x-sender-trigger-popover-left': triggerPopoverLeft,
    }"
  >
    <div
      ref="senderRef"
      class="el-x-sender"
      :style="{
        '--el-x-sender-box-shadow-tertiary':
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        '--el-x-sender-input-font-size': '14px',
        '--el-x-sender-header-animation-duration': `${headerAnimationTimer}ms`,
      }"
      :class="{
        'el-x-sender-disabled': disabled,
      }"
    >
      <!-- 头部容器 -->
      <transition name="slide">
        <div
          v-if="visiableHeader"
          class="el-x-sender-header-wrap"
        >
          <div
            v-if="$slots.header"
            class="el-x-sender-header"
          >
            <slot name="header"></slot>
          </div>
        </div>
      </transition>
      <!-- 内容容器 内置变体逻辑 -->
      <div
        class="el-x-sender-content"
        :class="{ 'content-variant-updown': variant === 'updown' }"
        @mousedown="onContentMouseDown"
      >
        <!-- Prefix 前缀 -->
        <div
          v-if="$slots.prefix && variant === 'default'"
          class="el-x-sender-prefix"
        >
          <slot name="prefix"></slot>
        </div>
        <!-- 输入框 -->
        <el-input
          ref="inputRef"
          v-model="internalValue"
          class="el-x-sender-input"
          :rows="1"
          :autosize="computedAutoSize"
          type="textarea"
          :validate-event="false"
          :placeholder="computedPlaceholder"
          :readonly="readOnly || disabled"
          :disabled="disabled"
          @keydown.native="handleKeyDown"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
        />
        <!-- 操作列表 -->
        <div
          v-if="variant === 'default'"
          class="el-x-sender-action-list"
        >
          <!-- 使用条件渲染兼容 Vue 2.5.x -->
          <slot
            v-if="$slots['action-list']"
            name="action-list"
          />
          <div
            v-else
            class="el-x-sender-action-list-presets"
          >
            <send-button
              v-if="!loading"
              :disabled="isSubmitDisabled"
              @submit="submit"
            ></send-button>

            <loading-button
              v-if="loading"
              @cancel="cancel"
            ></loading-button>

            <speech-button
              v-if="!speechLoading && allowSpeech"
              @click="startRecognition"
            ></speech-button>

            <speech-loading-button
              v-if="speechLoading && allowSpeech"
              @click="stopRecognition"
            ></speech-loading-button>

            <clear-button
              v-if="clearable"
              @clear="clear"
            ></clear-button>
          </div>
        </div>

        <!-- 变体样式 -->
        <div
          v-if="variant === 'updown' && showUpdown"
          class="el-x-sender-updown-wrap"
        >
          <!-- 变体 updown： Prefix 前缀 -->
          <div
            v-if="$slots.prefix"
            class="el-x-sender-prefix"
          >
            <slot name="prefix"></slot>
          </div>

          <!-- 变体 updown：操作列表 -->
          <div class="el-x-sender-action-list">
            <!-- 使用条件渲染兼容 Vue 2.5.x -->
            <slot
              v-if="$slots['action-list']"
              name="action-list"
            />
            <div
              v-else
              class="el-x-sender-action-list-presets"
            >
              <send-button
                v-if="!loading"
                :disabled="isSubmitDisabled"
                @submit="submit"
              ></send-button>

              <loading-button
                v-if="loading"
                @cancel="cancel"
              ></loading-button>

              <speech-button
                v-if="!speechLoading && allowSpeech"
                @click="startRecognition"
              ></speech-button>

              <speech-loading-button
                v-if="speechLoading && allowSpeech"
                @click="stopRecognition"
              ></speech-loading-button>

              <clear-button
                v-if="clearable"
                @clear="clear"
              ></clear-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部容器 -->
      <transition name="slide">
        <div
          v-if="$slots.footer"
          class="el-x-sender-footer"
        >
          <slot name="footer"></slot>
        </div>
      </transition>

      <!-- popover 直接附加到发送器 -->
      <el-popover
        ref="popoverRef"
        v-model="popoverVisible"
        :disabled="disabled"
        :visible-arrow="false"
        :appendToBody="false"
        :placement="triggerPopoverPlacement"
        :offset="triggerPopoverOffset"
        popper-class="el-x-sender-trigger-popover"
        trigger="manual"
        @show="onPopoverShow"
      >
        <template slot="default">
          <!-- 使用条件渲染兼容 Vue 2.5.x -->
          <slot
            v-if="$scopedSlots['trigger-popover']"
            name="trigger-popover"
            :trigger-string="triggerString"
            :readonly="readOnly"
          />
          <template v-else>
            当前触发的字符为：{{ `${triggerString}` }} 在这里定义的内容，但注意这里的回车事件将会被
            输入框 覆盖
          </template>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
  import Locale from '../../../locale/mixin';
  import ClearButton from './components/ClearButton.vue';
  import LoadingButton from './components/LoadingButton.vue';
  import SendButton from './components/SendButton.vue';
  import SpeechButton from './components/SpeechButton.vue';
  import SpeechLoadingButton from './components/SpeechLoadingButton.vue';

  export default {
    name: 'ElXSender',
    mixins: [Locale],

    components: {
      ClearButton,
      LoadingButton,
      SendButton,
      SpeechButton,
      SpeechLoadingButton,
    },

    props: {
      value: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      autoSize: {
        type: Object,
        default: () => ({
          minRows: 1,
          maxRows: 6,
        }),
      },
      readOnly: Boolean,
      disabled: Boolean,
      loading: Boolean,
      clearable: Boolean,
      allowSpeech: Boolean,
      submitType: {
        type: String,
        default: 'enter',
        validator: value => ['enter', 'shiftEnter'].includes(value),
      },
      headerAnimationTimer: {
        type: Number,
        default: 300,
      },
      inputWidth: {
        type: String,
        default: '100%',
      },

      // 变体属性
      variant: {
        type: String,
        default: 'default',
        validator: value => ['default', 'updown'].includes(value),
      },
      showUpdown: {
        type: Boolean,
        default: true,
      },
      submitBtnDisabled: Boolean,

      inputStyle: {
        type: Object,
        default: () => ({}),
      },

      // 新增 el-popover 样式透传
      triggerStrings: {
        type: Array,
        default: () => [],
      },
      triggerPopoverVisible: {
        type: Boolean,
        default: false,
      },
      triggerPopoverWidth: {
        type: String,
        default: 'fit-content',
      },
      triggerPopoverLeft: {
        type: String,
        default: '0px',
      },
      triggerPopoverOffset: {
        type: Number,
        default: 0,
      },
      triggerPopoverPlacement: {
        type: String,
        default: 'top-start',
        validator: value =>
          [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end',
          ].includes(value),
      },
    },

    data() {
      return {
        senderRef: null,
        inputRef: null,
        popoverVisible: this.triggerPopoverVisible,
        internalValue: this.value,
        isComposing: false,
        popoverRef: null,
        triggerString: '',
        visiableHeader: false,
        recognition: null,
        speechLoading: false,
        triggerDebounce: false,
      };
    },

    computed: {
      // 判断是否存在 recordingChange 监听器
      hasOnRecordingChangeListener() {
        return !!(this.$listeners && this.$listeners.recordingChange);
      },

      // 判断是否存在 trigger 监听器
      hasOnTriggerListener() {
        return !!(this.$listeners && this.$listeners.trigger);
      },

      // 计算提交按钮禁用状态
      isSubmitDisabled() {
        // 用户显式设置了 submitBtnDisabled 时优先使用
        if (typeof this.submitBtnDisabled === 'boolean') {
          return this.submitBtnDisabled;
        }
        // 否则保持默认逻辑：无内容时禁用
        return !this.internalValue;
      },

      // 根据字体大小动态计算 autoSize
      computedAutoSize() {
        // 如果用户提供了autoSize，则优先使用
        if (this.autoSize) return this.autoSize;

        // 否则返回默认值
        return {
          minRows: 1,
          maxRows: 6,
        };
      },

      // 计算 placeholder
      computedPlaceholder() {
        return this.placeholder || this.elXt('el_x.sender.placeholder');
      },
    },

    watch: {
      value(val) {
        this.internalValue = val;
      },
      // 监听样式变化
      inputStyle: {
        handler() {
          this.$nextTick(() => {
            this.applyInputStyles();
          });
        },
        deep: true,
      },
      inputWidth() {
        this.$nextTick(() => {
          this.applyInputStyles();
        });
      },
      // 监听外部传入的 triggerPopoverVisible 变化
      triggerPopoverVisible(val) {
        // 仅在值不同时更新，避免循环触发
        if (this.popoverVisible !== val) {
          this.popoverVisible = val;
        }
      },
      // 监听内部 popoverVisible 变化，向外同步
      popoverVisible(val) {
        if (val !== this.triggerPopoverVisible) {
          this.$emit('update:triggerPopoverVisible', val);
        }

        // 新增：当弹窗关闭时，设置短时间内的防抖状态
        if (val === false) {
          this.triggerDebounce = true;
          setTimeout(() => {
            this.triggerDebounce = false;
          }, 300); // 300ms 防抖时间，防止频繁触发
        }
      },
      internalValue(newVal, oldVal) {
        this.$emit('input', newVal);

        if (this.isComposing) return;
        if (this.triggerDebounce) return;

        const triggerStrings = this.triggerStrings || []; // 如果为 undefined，就使用空数组

        if (this.inputRef && triggerStrings.length > 0) {
          const textArea = this.inputRef.$el.querySelector('textarea');
          if (textArea) {
            const cursorPosition = textArea.selectionStart;
            if (cursorPosition > 0 && newVal.length > oldVal.length) {
              const lastChar = newVal.charAt(cursorPosition - 1);
              if (triggerStrings.includes(lastChar)) {
                this.triggerString = lastChar;
                if (this.hasOnTriggerListener) {
                  this.$emit('trigger', {
                    oldValue: oldVal,
                    newValue: newVal,
                    triggerString: lastChar,
                    isOpen: true,
                    cursorPosition: cursorPosition,
                  });
                }
                this.popoverVisible = true;
                return;
              }
            }
          }
        }
        // V2.7X 兼容问题
        // 原有的处理逻辑，用于向后兼容
        const validOldVal = typeof oldVal === 'string' ? oldVal : '';
        const wasOldValTrigger = triggerStrings.includes(validOldVal);
        const isNewValTrigger = triggerStrings.includes(newVal);

        // 触发显示：从空变为触发字符
        if (oldVal === '' && isNewValTrigger) {
          this.triggerString = newVal;
          if (this.hasOnTriggerListener) {
            this.$emit('trigger', {
              oldValue: oldVal,
              newValue: newVal,
              triggerString: newVal,
              isOpen: true,
            });
          }
          this.popoverVisible = true;
        }
        // 关闭：从触发字符变为非触发字符
        else if (!isNewValTrigger && wasOldValTrigger) {
          if (this.hasOnTriggerListener) {
            this.$emit('trigger', {
              oldValue: oldVal,
              newValue: newVal,
              triggerString: undefined,
              isOpen: false,
            });
          }
          this.popoverVisible = false;
        }
        // 触发显示：从非空且非触发字符变为触发字符
        else if (oldVal !== '' && isNewValTrigger && !wasOldValTrigger) {
          this.triggerString = newVal;
          if (this.hasOnTriggerListener) {
            this.$emit('trigger', {
              oldValue: oldVal,
              newValue: newVal,
              triggerString: newVal,
              isOpen: true,
            });
          }
          this.popoverVisible = true;
        }
      },
    },

    methods: {
      /* 确保光标在可视区域内 */
      ensureCursorVisible() {
        if (!this.inputRef) return;

        const textareaEl = this.inputRef.$el.querySelector('textarea');
        if (!textareaEl) return;

        this.$nextTick(() => {
          // 获取光标位置信息
          const cursorPosition = textareaEl.selectionStart;
          const textBeforeCursor = this.internalValue.substring(0, cursorPosition);
          const linesBeforeCursor = textBeforeCursor.split('\n').length;

          const lineHeight = parseInt(window.getComputedStyle(textareaEl).lineHeight) || 20;
          const maxVisibleHeight = textareaEl.offsetHeight;
          const maxVisibleLines = Math.floor(maxVisibleHeight / lineHeight);

          // 如果光标超出可视范围，滚动到光标位置
          if (linesBeforeCursor > maxVisibleLines) {
            const targetScrollTop = (linesBeforeCursor - maxVisibleLines) * lineHeight;
            textareaEl.scrollTop = targetScrollTop;
          }
        });
      },

      /* 直接应用输入框样式 */
      applyInputStyles() {
        if (!this.inputRef) return;

        const textareaEl = this.inputRef.$el.querySelector('textarea');
        if (!textareaEl) return;

        // 设置默认基础样式（当启用autosize时，不设置固定高度）
        const defaultStyles = {
          width: this.inputWidth || '100%',
          maxHeight: '176px',
          boxSizing: 'border-box',
        };

        // 只有在未启用autosize时才设置固定高度
        if (!this.computedAutoSize) {
          defaultStyles.height = '24px';
        }

        // 应用默认样式
        Object.keys(defaultStyles).forEach(key => {
          textareaEl.style[key] = defaultStyles[key];
        });

        // 如果用户传入了样式对象，则应用覆盖默认样式
        if (this.inputStyle && typeof this.inputStyle === 'object') {
          Object.keys(this.inputStyle).forEach(key => {
            // 当启用autosize时，避免覆盖height相关属性
            if (this.computedAutoSize && (key === 'height' || key === 'minHeight')) {
              return;
            }
            textareaEl.style[key] = this.inputStyle[key];
          });

          // 如果用户设置了字体大小，需要调整高度（仅在未启用autosize时）
          if (this.inputStyle.fontSize && !this.computedAutoSize) {
            // 确保高度能完全容纳当前字体大小
            const computedFontSize = window.getComputedStyle(textareaEl).fontSize;
            const fontSize = parseInt(computedFontSize);
            const minHeight = Math.max(fontSize * 1.5, 24) + 'px';
            textareaEl.style.minHeight = minHeight;

            // 重新触发 autosize
            this.$nextTick(() => {
              // 在某些情况下需要手动触发Element UI的autosize更新
              const event = document.createEvent('Event');
              event.initEvent('autosize:update', true, false);
              textareaEl.dispatchEvent(event);
            });
          }
        }
      },

      /* 手动更新 popover 位置 */
      onPopoverShow() {
        if (this.$refs.popoverRef) {
          this.$nextTick(() => {
            this.$refs.popoverRef.referenceElm = this.$refs.senderRef;
            this.$refs.popoverRef.doDestroy();
            this.$refs.popoverRef.updatePopper();
          });
        }
      },
      /* 内容容器聚焦 开始 */
      onContentMouseDown(e) {
        // 点击容器后设置输入框的聚焦，会触发 &:focus-within 样式
        if (e.target !== this.$el.querySelector(`.el-textarea__inner`)) {
          e.preventDefault();
        }
        this.inputRef.focus();
      },
      /* 内容容器聚焦 结束 */

      /* 头部显示隐藏 开始 */
      openHeader() {
        if (!this.$slots.header) return false;
        if (this.readOnly) return false;
        this.visiableHeader = true;
      },

      closeHeader() {
        if (!this.$slots.header) return;
        if (this.readOnly) return;
        this.visiableHeader = false;
      },
      /* 头部显示隐藏 结束 */

      /* 使用浏览器自带的语音转文字功能 开始 */
      startRecognition() {
        if (this.readOnly || this.disabled) return; // 直接返回，不执行后续逻辑

        if (this.hasOnRecordingChangeListener) {
          this.speechLoading = true;
          this.$emit('recording-change', true);
          return;
        }

        // 检查浏览器支持的 SpeechRecognition API
        const SpeechRecognition =
          window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition;

        if (SpeechRecognition) {
          try {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'zh-CN';
            this.recognition.onresult = event => {
              let results = '';
              for (let i = 0; i <= event.resultIndex; i++) {
                results += event.results[i][0].transcript;
              }
              if (!this.readOnly) {
                this.internalValue = results;
              }
            };
            this.recognition.onstart = () => {
              this.speechLoading = true;
              console.log('语音识别已启动');
            };
            this.recognition.onend = () => {
              this.speechLoading = false;
              console.log('语音识别已结束');
            };
            this.recognition.onerror = event => {
              console.error('语音识别出错:', event.error);
              this.speechLoading = false;
              // 可以添加用户友好提示
              if (event.error === 'not-allowed') {
                console.error('用户拒绝了麦克风访问权限');
                // 这里可以显示提示
              }
            };
            this.recognition.start();
          } catch (error) {
            console.error('启动语音识别失败:', error);
            this.speechLoading = false;
          }
        } else {
          console.error('浏览器不支持 Web Speech API');
          this.speechLoading = false;
        }
      },

      stopRecognition() {
        // 如果有自定义处理函数
        if (this.hasOnRecordingChangeListener) {
          this.speechLoading = false;
          this.$emit('recordingChange', false);
          return;
        }

        if (this.recognition) {
          this.recognition.stop();
          this.speechLoading = false;
        }
      },
      /* 使用浏览器自带的语音转文字功能 结束 */

      /* 输入框事件 开始 */
      submit() {
        if (this.readOnly || this.loading || this.disabled || this.isSubmitDisabled) return;
        this.$emit('submit', this.internalValue);
      },

      // 取消按钮
      cancel() {
        if (this.readOnly) return;
        this.$emit('cancel', this.internalValue);
      },

      clear() {
        if (this.readOnly) return; // 直接返回，不执行后续逻辑
        this.inputRef.clear();
        this.internalValue = '';
      },

      // 在这判断组合键的回车键 (目前支持两种模式)
      handleKeyDown(e) {
        if (this.readOnly) return; // 直接返回，不执行后续逻辑

        if (this.submitType === 'enter') {
          // 判断是否按下了 Shift + 回车键
          if (e.shiftKey && e.keyCode === 13) {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart; // 获取光标位置
            const textBeforeCursor = this.internalValue.slice(0, cursorPosition); // 光标前的文本
            const textAfterCursor = this.internalValue.slice(cursorPosition); // 光标后的文本
            this.internalValue = `${textBeforeCursor}\n${textAfterCursor}`; // 插入换行符
            this.$nextTick(() => {
              e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1); // 更新光标位置
              // 确保光标在可视区域内
              this.ensureCursorVisible();
            });
          } else if (e.keyCode === 13 && !e.shiftKey) {
            // 阻止掉 Enter 的默认换行行为
            e.preventDefault();
            // 触发提交功能
            this.submit();
          }
        } else if (this.submitType === 'shiftEnter') {
          // 判断是否按下了 Shift + 回车键
          if (e.shiftKey && e.keyCode === 13) {
            // 阻止掉 Enter 的默认换行行为
            e.preventDefault();
            // 触发提交功能
            this.submit();
          } else if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart; // 获取光标位置
            const textBeforeCursor = this.internalValue.slice(0, cursorPosition); // 光标前的文本
            const textAfterCursor = this.internalValue.slice(cursorPosition); // 光标后的文本
            this.internalValue = `${textBeforeCursor}\n${textAfterCursor}`; // 插入换行符
            this.$nextTick(() => {
              e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1); // 更新光标位置
              // 确保光标在可视区域内
              this.ensureCursorVisible();
            });
          }
        }
      },
      /* 输入框事件 结束 */

      /* 焦点 事件 开始 */
      blur() {
        if (this.readOnly) return false;
        this.inputRef.blur();
      },

      focus(type = 'all') {
        if (this.readOnly) return false;

        if (type === 'all') {
          this.inputRef.select();
        } else if (type === 'start') {
          this.focusToStart();
        } else if (type === 'end') {
          this.focusToEnd();
        }
      },

      // 聚焦到文本最前方
      focusToStart() {
        if (this.inputRef) {
          // 获取底层的 textarea DOM 元素
          const textarea = this.inputRef.$el.querySelector('textarea');
          if (textarea) {
            textarea.focus(); // 聚焦到输入框
            textarea.setSelectionRange(0, 0); // 设置光标到最前方
          }
        }
      },

      // 聚焦到文本最后方
      focusToEnd() {
        if (this.inputRef) {
          // 获取底层的 textarea DOM 元素
          const textarea = this.inputRef.$el.querySelector('textarea');
          if (textarea) {
            textarea.focus(); // 聚焦到输入框
            textarea.setSelectionRange(this.internalValue.length, this.internalValue.length); // 设置光标到最后方
          }
        }
      },
      /* 焦点 事件 结束 */

      // 处理输入法开始/结束 (此方法是拼音输入法的时候用)
      handleCompositionStart() {
        this.isComposing = true;
      },

      handleCompositionEnd() {
        this.isComposing = false;
      },
    },

    mounted() {
      // 应用样式
      this.$nextTick(() => {
        // 获取组件引用
        this.senderRef = this.$refs.senderRef;
        this.inputRef = this.$refs.inputRef;
        this.popoverRef = this.$refs.popoverRef;
        this.applyInputStyles();
      });
    },

    updated() {
      // 只在特定条件下重新应用样式，避免干扰autosize功能
      // 当启用autosize时，减少样式重新应用的频率
      if (!this.computedAutoSize) {
        this.applyInputStyles();
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/Sender.scss';
</style>
