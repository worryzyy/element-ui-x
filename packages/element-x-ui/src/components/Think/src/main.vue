<template>
    <div
        class="el-x-think"
        :style="{
      '--el-x-think-button-width': buttonWidth,
      '--el-x-think-animation-duration': duration,
      '--el-x-think-content-wrapper-width': maxWidth,
      '--el-x-think-content-wrapper-background-color': backgroundColor,
      '--el-x-think-content-wrapper-color': color,
    }"
    >
        <!-- 触发按钮 -->
        <button class="trigger" :class="[status, { disabled: !disabled }]" :disabled="disabled" @click="changeExpand">
            <span class="status-icon">
                <slot name="status-icon" :status="status">
                    <i v-if="status === 'thinking'" class="is-loading el-icon-center el-icon-loading"></i>

                    <i v-if="status === 'start'" class="el-icon-center start-color el-icon-opportunity"></i>

                    <i v-if="status === 'end'" class="el-icon-center end-color el-icon-success"></i>

                    <i v-if="status === 'error'" class="el-icon-center error-color el-icon-circle-close"></i>
                </slot>
            </span>

            <span class="label">
                <slot name="label" :status="status">
                    {{
                    status === 'thinking' ? '思考中...'
                    : status === 'error' ? '思考遇到问题'
                    : status === 'end' ? '思考完成' : '开始思考'
                    }}
                </slot>
            </span>

            <transition name="rotate">
                <span v-if="!disabled" class="arrow el-icon-center" :class="{ expanded: isExpanded }">
                    <slot name="arrow">
                        <i class="el-icon-center el-icon-arrow-up"></i>
                    </slot>
                </span>
            </transition>
        </button>

        <!-- 内容区域 -->
        <transition name="slide">
            <div v-show="isExpanded" v-if="displayedContent" class="content-wrapper" :class="{ 'error-state': status === 'error' }">
                <div class="content">
                    <slot v-if="status !== 'error'" name="content" :content="displayedContent">
                        <pre>{{ displayedContent }}</pre>
                    </slot>

                    <slot v-else name="error" :error-content="displayedContent">
                        <div class="error-message">{{ displayedContent }}</div>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ElXThink',
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
                return ['start', 'thinking', 'end', 'error'].indexOf(value) !== -1
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
            default: 'var(--el-color-info)',
        },
    },
    data() {
        return {
            isExpanded: this.modelValue,
        }
    },
    computed: {
        displayedContent() {
            return this.status === 'error' ? '思考过程中出现错误' : this.content
        },
    },
    watch: {
        modelValue(newVal) {
            this.isExpanded = newVal
        },
        status(newVal) {
            if (newVal === 'end' && this.autoCollapse) {
                this.isExpanded = false
            }
        },
    },
    methods: {
        changeExpand() {
            if (this.disabled) return
            this.isExpanded = !this.isExpanded
            this.$emit('change', { value: this.isExpanded, status: this.status })
            this.$emit('update:expanded', this.isExpanded)
        },
    },
}
</script>

<style lang="scss">
@import '../../../styles/Think.scss';
</style>
