<template>
  <div
    class="el-x-thinking"
    :style="{
      '--el-x-thinking-button-width': buttonWidth,
      '--el-x-thinking-animation-duration': duration,
      '--el-x-thinking-content-wrapper-width': maxWidth,
      '--el-x-thinking-content-wrapper-background-color': backgroundColor,
      '--el-x-thinking-content-wrapper-color': color,
    }"
  >
    <button
      class="trigger"
      :class="[localStatus, { disabled: !disabled }]"
      :disabled="disabled"
      @click="changeExpand"
    >
      <span class="status-icon">
        <slot
          name="status-icon"
          :status="localStatus"
        >
          <i
            v-if="localStatus === 'thinking'"
            class="is-loading el-icon-center el-icon-loading"
          ></i>
          <i
            v-if="localStatus === 'start'"
            class="el-icon-center start-color el-icon-opportunity"
          ></i>
          <i
            v-if="localStatus === 'end'"
            class="el-icon-center end-color el-icon-success"
          ></i>
          <i
            v-if="localStatus === 'error'"
            class="el-icon-center error-color el-icon-circle-close"
          ></i>
        </slot>
      </span>

      <span class="label">
        <slot
          name="label"
          :status="localStatus"
        >
          {{
            localStatus === 'thinking'
              ? elXt('el_x.thinking.processing')
              : localStatus === 'error'
              ? elXt('el_x.thinking.error')
              : localStatus === 'end'
              ? elXt('el_x.thinking.completed')
              : elXt('el_x.thinking.start')
          }}
        </slot>
      </span>

      <transition name="rotate">
        <span
          v-if="!disabled"
          class="thinking-arrow el-icon-center"
          :class="{ expanded: isExpanded }"
        >
          <slot name="arrow">
            <i class="el-icon-center el-icon-arrow-up"></i>
          </slot>
        </span>
      </transition>
    </button>

    <Transition name="slide">
      <div
        v-show="isExpanded"
        v-if="displayedContent"
        class="content-wrapper"
        :class="{ 'error-state': localStatus === 'error' }"
      >
        <div class="content">
          <slot
            v-if="localStatus !== 'error'"
            name="content"
            :content="displayedContent"
          >
            <pre>{{ displayedContent }}</pre>
          </slot>

          <slot
            v-else
            name="error"
            :error-content="displayedContent"
          >
            <div class="error-message">{{ displayedContent }}</div>
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
  import Locale from '../../../locale/mixin';

  export default {
    name: 'ElXThinking',
    mixins: [Locale],
    props: {
      content: {
        type: String,
        default: '',
      },
      modelValue: {
        type: Boolean,
        default: true,
      },
      status: {
        type: String,
        default: 'start',
        validator: function (value) {
          return ['start', 'thinking', 'end', 'error'].indexOf(value) !== -1;
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      autoCollapse: {
        type: Boolean,
        default: false,
      },
      buttonWidth: {
        type: String,
        default: '160px',
      },
      duration: {
        type: String,
        default: '0.2s',
      },
      maxWidth: {
        type: String,
        default: '500px',
      },
      backgroundColor: {
        type: String,
        default: '#fcfcfc',
      },
      color: {
        type: String,
        default: '#909399',
      },
    },
    data() {
      return {
        isExpanded: this.modelValue,
        localStatus: this.status,
      };
    },
    computed: {
      displayedContent() {
        return this.localStatus === 'error'
          ? this.elXt('el_x.thinking.errorContent')
          : this.content;
      },
    },
    watch: {
      modelValue(newVal) {
        this.isExpanded = newVal;
      },
      status(newVal) {
        this.localStatus = newVal;
        if (newVal === 'end' && this.autoCollapse) {
          this.isExpanded = false;
        }
      },
      $attrs: {
        handler(newVal) {
          if (newVal['onUpdate:status']) {
            this.$emit('update:status', this.localStatus);
          }
        },
        immediate: true,
      },
    },
    methods: {
      changeExpand() {
        if (this.disabled) return;
        this.isExpanded = !this.isExpanded;
        this.$emit('change', {
          value: this.isExpanded,
          status: this.localStatus,
        });
        this.$emit('update:expanded', this.isExpanded);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/Thinking.scss';
</style>
