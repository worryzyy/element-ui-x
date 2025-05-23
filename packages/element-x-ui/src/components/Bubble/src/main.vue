<template>
    <div
        v-if="!internalDestroyed"
        class="el-x-bubble"
        :class="{
      'el-x-bubble-start': placement === 'start',
      'el-x-bubble-end': placement === 'end',
      'el-x-bubble-no-style': noStyle,
      'el-x-bubble-is-typing': isTypingClass,
    }"
        :style="{
      '--el-box-shadow-tertiary': `0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)`,
      '--bubble-content-max-width': `${maxWidth}`,
      '--el-x-bubble-avatar-placeholder-width': `${$scopedSlots.avatar || $slots.avatar ? '' : avatarSize + 'px'}`,
      '--el-x-bubble-avatar-placeholder-height': `${$scopedSlots.avatar || $slots.avatar ? '' : avatarSize + 'px'}`,
      '--el-x-bubble-avatar-placeholder-gap': `${avatarGap}px`,
    }"
    >
        <!-- 头像 -->
        <div v-if="!($scopedSlots.avatar || $slots.avatar) && avatar" class="el-x-bubble-avatar el-x-bubble-avatar-size">
            <el-avatar :size="avatarSize" :src="avatar" :shape="avatarShape" :icon="avatarIcon" :src-set="avatarSrcSet" :alt="avatarAlt" @error="avatarError" />
        </div>

        <!-- 头像属性进行占位 -->
        <div v-if="!($scopedSlots.avatar || $slots.avatar) && !avatar && avatarSize" class="el-x-bubble-avatar-placeholder" />

        <div v-if="$scopedSlots.avatar || $slots.avatar" class="el-x-bubble-avatar">
            <slot name="avatar" />
        </div>

        <!-- 内容 -->
        <div class="el-x-bubble-content-wrapper">
            <!-- 头部内容 -->
            <div v-if="$scopedSlots.header || $slots.header" class="el-x-bubble-header">
                <slot name="header" />
            </div>

            <div
                class="el-x-bubble-content"
                :class="{
          'el-x-bubble-content-loading': loading,
          'el-x-bubble-content-round': shape === 'round',
          'el-x-bubble-content-corner': shape === 'corner',
          'el-x-bubble-content-filled': variant === 'filled',
          'el-x-bubble-content-borderless': variant === 'borderless',
          'el-x-bubble-content-outlined': variant === 'outlined',
          'el-x-bubble-content-shadow': variant === 'shadow',
        }"
            >
                <div v-if="!loading" class="el-typewriter" :class="{
            'no-content': !content,
          }">
                    <el-x-typewriter
                        v-if="!($scopedSlots.content || $slots.content) && content"
                        ref="typewriterRef"
                        :typing="_typing"
                        :content="content"
                        :is-markdown="isMarkdown"
                        :is-fog="isFog"
                        @start="onStart"
                        @writing="onWriting"
                        @finish="onFinish"
                    />
                </div>

                <!-- 内容-自定义 -->
                <slot v-if="!internalDestroyed && ($scopedSlots.content || $slots.content) && !loading" name="content" />

                <!-- 加载中-默认 -->
                <div v-if="loading && !($scopedSlots.loading || $slots.loading)" class="el-x-bubble-loading-wrap">
                    <div v-for="(_, index) in dots" :key="index" class="dot" :style="{ animationDelay: `${index * 0.2}s` }" />
                </div>

                <!-- 加载中-自定义 -->
                <div v-if="loading && ($scopedSlots.loading || $slots.loading)" class="el-x-bubble-loading-wrap">
                    <slot name="loading" />
                </div>
            </div>

            <div v-if="$scopedSlots.footer || $slots.footer" class="el-x-bubble-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>
<script>
import ElXTypewriter from '../../Typewriter/index'

export default {
    name: 'ElXBubble',
    components: {
        ElXTypewriter,
    },
    props: {
        content: {
            type: String,
            default: '',
        },
        reasoning_content: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        placement: {
            type: String,
            default: 'start',
        },
        variant: {
            type: String,
            default: 'filled',
        },
        maxWidth: {
            type: String,
            default: '500px',
        },
        avatarSize: {
            type: Number,
            default: 0,
        },
        avatarGap: {
            type: Number,
            default: 12,
        },
        avatarShape: {
            type: String,
            default: 'circle',
        },
        avatarIcon: {
            type: String,
            default: '',
        },
        avatarSrcSet: {
            type: String,
            default: '',
        },
        avatarAlt: {
            type: String,
            default: '',
        },
        avatarFit: {
            type: String,
            default: 'cover',
        },
        noStyle: {
            type: Boolean,
            default: false,
        },
        typing: {
            type: [Boolean, Object],
            default: undefined,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        shape: {
            type: String,
            default: '',
        },
        isMarkdown: {
            type: Boolean,
            default: false,
        },
        isFog: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            internalDestroyed: false,
            isTypingClass: false,
        }
    },
    computed: {
        _step() {
            if (typeof this.typing === 'object' && this.typing.step) return this.typing.step
            return 2
        },
        _suffix() {
            if (typeof this.typing === 'object' && this.typing.suffix) return this.typing.suffix
            return '|'
        },
        _interval() {
            if (typeof this.typing === 'object' && this.typing.interval) return this.typing.interval
            return 50
        },
        _typing() {
            if (typeof this.typing === 'undefined') {
                return false
            } else if (typeof this.typing === 'boolean') {
                return this.typing
            } else {
                return {
                    suffix: this._suffix,
                    step: this._step,
                    interval: this._interval,
                }
            }
        },
        dots() {
            return [1, 2, 3]
        },
    },
    watch: {
        content(newVal, oldVal) {
            if (newVal !== oldVal && this.internalDestroyed) {
                this.restart()
            }
        },
    },
    methods: {
        onStart(instance) {
            this.$emit('start', instance)
        },
        onFinish(instance) {
            this.isTypingClass = false
            this.$emit('finish', instance)
        },
        onWriting(instance) {
            this.isTypingClass = true
            this.$emit('writing', instance)
        },
        avatarError(e) {
            this.$emit('avatarError', e)
        },
        interrupt() {
            this.$refs.typewriterRef && this.$refs.typewriterRef.interrupt()
        },
        continueTyping() {
            this.$refs.typewriterRef && this.$refs.typewriterRef.continueTyping()
        },
        restart() {
            this.internalDestroyed = false
            this.$refs.typewriterRef && this.$refs.typewriterRef.restart()
        },
        destroy() {
            this.$refs.typewriterRef && this.$refs.typewriterRef.destroy()
            this.internalDestroyed = true
        },
    },
    beforeDestroy() {
        this.destroy()
    },
}
</script>




<style lang="scss" scoped>
@import '../../../styles/Bubble.scss';
</style>
