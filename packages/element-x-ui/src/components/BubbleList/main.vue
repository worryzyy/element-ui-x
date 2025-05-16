<template>
    <div
        ref="scrollContainer"
        class="el-x-bubble-list"
        :class="{ 'always-scrollbar': alwaysShowScrollbar }"
        :style="{
      '--el-x-bubble-list-max-height': `${maxHeight}`,
      '--el-x-bubble-list-btn-size': `${btnIconSize}px`,
    }"
        @scroll="handleScroll"
    >
        <Bubble
            v-for="(item, index) in list"
            :key="index"
            :content="item.content"
            :placement="defaultPlacement || item.placement"
            :loading="defaultLoading !== undefined ? defaultLoading : item.loading"
            :shape="defaultShape || item.shape"
            :variant="defaultVariant || item.variant"
            :is-markdown="defaultIsMarkdown !== undefined ? defaultIsMarkdown : item.isMarkdown"
            :is-fog="(defaultPlacement === 'start' || item.placement === 'start') ? (defaultIsFog !== undefined ? defaultIsFog : item.isFog) : false"
            :typing="(defaultPlacement === 'start' || item.placement === 'start') ? (defaultTyping !== undefined ? defaultTyping : item.typing) : false"
            :max-width="defaultMaxWidth || item.maxWidth"
            :avatar="defaultAvatar || item.avatar"
            :avatar-size="defaultAvatarSize || item.avatarSize"
            :avatar-gap="defaultAvatarGap || item.avatarGap"
            :avatar-shape="defaultAvatarShape || item.avatarShape"
            :avatar-icon="defaultAvatarIcon || item.avatarIcon"
            :avatar-src-set="defaultAvatarSrcSet || item.avatarSrcSet"
            :avatar-alt="defaultAvatarAlt || item.avatarAlt"
            :avatar-fit="defaultAvatarFit || item.avatarFit"
            :no-style="defaultNoStyle !== undefined ? defaultNoStyle : item.noStyle"
            @finish="(instance) => handleBubbleComplete(index, instance)"
        >
            <template slot="avatar">
                <slot name="avatar" :item="item">
                    <template v-if="defaultAvatar || item.avatar">
                        <el-avatar
                            :size="defaultAvatarSize || item.avatarSize || 40"
                            :src="defaultAvatar || item.avatar"
                            :shape="defaultAvatarShape || item.avatarShape || 'circle'"
                            :icon="defaultAvatarIcon || item.avatarIcon"
                            :src-set="defaultAvatarSrcSet || item.avatarSrcSet"
                            :alt="defaultAvatarAlt || item.avatarAlt"
                            :fit="defaultAvatarFit || item.avatarFit || 'cover'"
                        />
                    </template>
                </slot>
            </template>
            <template v-if="$scopedSlots.header || $slots.header" slot="header">
                <slot name="header" :item="item" />
            </template>
            <template v-if="$scopedSlots.content || $slots.content" slot="content">
                <slot name="content" :item="item" />
            </template>
            <template v-if="$scopedSlots.footer || $slots.footer" slot="footer">
                <slot name="footer" :item="item" />
            </template>
            <template v-if="$scopedSlots.loading || $slots.loading" slot="loading">
                <slot name="loading" :item="item" />
            </template>
        </Bubble>

        <!-- 保持原有的返回底部按钮代码不变 -->
        <div
            v-if="showBackToBottom && hasVertical"
            class="el-x-bubble-list-default-back-button"
            :class="{
        'el-x-bubble-list-back-to-bottom-solt': $scopedSlots.backToBottom || $slots.backToBottom,
      }"
            :style="{
        bottom: backButtonPosition.bottom,
        left: backButtonPosition.left,
      }"
            @click="scrollToBottom"
        >
            <slot name="backToBottom">
                <i class="el-icon-bottom el-x-bubble-list-back-to-bottom-icon" :style="{ color: btnColor }"></i>
                <loadingBg v-if="btnLoading" class="back-to-bottom-loading-svg-bg" :style="{ color: btnColor }" />
            </slot>
        </div>
    </div>
</template>

<script>
import Bubble from '../Bubble/main.vue'
import loadingBg from './loading.vue'
import createScrollDetector from '../../utils/scrollDetector'

export default {
    name: 'ElXBubbleList',
    components: {
        Bubble,
        loadingBg,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        maxHeight: {
            type: String,
            default: '500px',
        },
        triggerIndices: {
            type: [String, Array],
            default: 'only-last',
        },
        alwaysShowScrollbar: {
            type: Boolean,
            default: false,
        },
        backButtonThreshold: {
            type: Number,
            default: 80,
        },
        showBackButton: {
            type: Boolean,
            default: true,
        },
        backButtonPosition: {
            type: Object,
            default: () => ({ bottom: '20px', left: 'calc(50% - 19px)' }),
        },
        btnLoading: {
            type: Boolean,
            default: true,
        },
        btnColor: {
            type: String,
            default: '#409EFF',
        },
        btnIconSize: {
            type: Number,
            default: 24,
        },
        // 新增全局默认属性
        defaultPlacement: {
            type: String,
            default: '',
        },
        defaultLoading: {
            type: Boolean,
            default: undefined,
        },
        defaultShape: {
            type: String,
            default: '',
        },
        defaultVariant: {
            type: String,
            default: '',
        },
        defaultIsMarkdown: {
            type: Boolean,
            default: true,
        },
        defaultIsFog: {
            type: Boolean,
            default: false,
        },
        defaultTyping: {
            type: [Boolean, Object],
            default: undefined,
        },
        defaultMaxWidth: {
            type: String,
            default: '',
        },
        defaultAvatar: {
            type: String,
            default: '',
        },
        defaultAvatarSize: {
            type: Number,
            default: undefined,
        },
        defaultAvatarGap: {
            type: Number,
            default: undefined,
        },
        defaultAvatarShape: {
            type: String,
            default: '',
        },
        defaultAvatarIcon: {
            type: String,
            default: '',
        },
        defaultAvatarSrcSet: {
            type: String,
            default: '',
        },
        defaultAvatarAlt: {
            type: String,
            default: '',
        },
        defaultAvatarFit: {
            type: String,
            default: '',
        },
        defaultNoStyle: {
            type: Boolean,
            default: undefined,
        },
    },
    data() {
        return {
            scrollContainer: null,
            stopAutoScrollToBottom: false,
            lastScrollTop: 0,
            accumulatedScrollUpDistance: 0,
            resizeObserver: null,
            containerResizeObserver: null, // 新增容器尺寸监听器引用
            showBackToBottom: false,
            hasVertical: false,
            backButtonTimer: null, // 新增计时器变量
        }
    },
    computed: {
        effectiveTriggerIndices() {
            if (this.triggerIndices === 'only-last') {
                const triggerIndices = this.list.filter((item) => item.typing).map((_, index) => index)
                return triggerIndices.length > 0 ? [triggerIndices[triggerIndices.length - 1]] : []
            } else if (this.triggerIndices === 'all') {
                return this.list.map((_, index) => index)
            } else if (Array.isArray(this.triggerIndices)) {
                const validIndices = this.getValidIndices(this.list, this.triggerIndices)
                return validIndices.length > 0 ? [validIndices[validIndices.length - 1]] : []
            }
            return []
        },
    },
    watch: {
        list: {
            handler() {
                if (this.list && this.list.length > 0) {
                    this.$nextTick(() => {
                        this.autoScroll()
                    })
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.scrollDetector = createScrollDetector(this.$refs.scrollContainer)
        this.scrollDetector.init()
        this.hasVertical = this.scrollDetector.state.hasVertical

        // 添加容器尺寸变化监听
        const containerResizeObserver = new ResizeObserver(() => {
            this.hasVertical = this.$refs.scrollContainer.scrollHeight > this.$refs.scrollContainer.clientHeight
        })
        containerResizeObserver.observe(this.$refs.scrollContainer)
        this.containerResizeObserver = containerResizeObserver
    },
    beforeDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
        }
        if (this.containerResizeObserver) {
            this.containerResizeObserver.disconnect()
        }
        if (this.scrollDetector) {
            this.scrollDetector.destroy()
        }
    },
    beforeDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
        }
    },
    methods: {
        getValidIndices(list, indices) {
            const validIndices = []
            const invalidIndices = []
            for (let i = 0; i < indices.length; i++) {
                const index = indices[i]
                if (index < 0 || index >= list.length || !list[index].typing) {
                    invalidIndices.push(index)
                } else {
                    validIndices.push(index)
                }
            }
            if (invalidIndices.length > 0) {
                console.warn(`无效索引 ${invalidIndices}`)
            }
            return validIndices
        },
        scrollToTop() {
            this.stopAutoScrollToBottom = true
            this.$nextTick(() => {
                this.$refs.scrollContainer.scrollTop = 0
            })
        },
        scrollToBottom() {
            try {
                if (this.$refs.scrollContainer && this.$refs.scrollContainer.scrollHeight) {
                    this.$nextTick(() => {
                        this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight
                        this.stopAutoScrollToBottom = false
                    })
                }
            } catch (error) {
                console.warn('[BubbleList error]: ', error)
            }
        },
        scrollToBubble(index) {
            const container = this.$refs.scrollContainer
            if (!container) return

            const bubbles = container.querySelectorAll('.el-x-bubble')
            if (index >= bubbles.length) return

            this.stopAutoScrollToBottom = true
            const targetBubble = bubbles[index]

            const containerRect = container.getBoundingClientRect()
            const bubbleRect = targetBubble.getBoundingClientRect()

            const scrollPosition = bubbleRect.top - containerRect.top + container.scrollTop

            container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            })
        },
        autoScroll() {
            if (this.$refs.scrollContainer) {
                const listBubbles = this.$refs.scrollContainer.querySelectorAll('.el-x-bubble-content-wrapper')
                if (this.resizeObserver) {
                    this.resizeObserver.disconnect()
                }
                const lastItem = listBubbles[listBubbles.length - 1]
                if (lastItem) {
                    this.resizeObserver = new ResizeObserver(() => {
                        if (!this.stopAutoScrollToBottom) {
                            this.scrollToBottom()
                        }
                    })
                    this.resizeObserver.observe(lastItem)
                }
            }
        },
        handleBubbleComplete(index, instance) {
            if (this.effectiveTriggerIndices.includes(index)) {
                this.$emit('complete', instance, index)
            }
        },
        handleScroll() {
            if (this.$refs.scrollContainer) {
                const { scrollTop, scrollHeight, clientHeight } = this.$refs.scrollContainer

                const distanceToBottom = scrollHeight - (scrollTop + clientHeight)

                // 更新 hasVertical 状态
                this.hasVertical = scrollHeight > clientHeight

                // 使用延迟逻辑处理按钮显示
                if (this.showBackButton && distanceToBottom > this.backButtonThreshold) {
                    // 如果应该显示按钮，但还没有设置计时器
                    if (!this.backButtonTimer) {
                        this.backButtonTimer = setTimeout(() => {
                            // 再次检查条件，确保 500ms 后仍然需要显示按钮
                            const { scrollTop, scrollHeight, clientHeight } = this.$refs.scrollContainer
                            const newDistanceToBottom = scrollHeight - (scrollTop + clientHeight)
                            if (newDistanceToBottom > this.backButtonThreshold) {
                                this.showBackToBottom = true
                            }
                            this.backButtonTimer = null
                        }, 200) // 200ms 延迟
                    }
                } else {
                    // 如果不应该显示按钮
                    if (this.backButtonTimer) {
                        clearTimeout(this.backButtonTimer)
                        this.backButtonTimer = null
                    }
                    this.showBackToBottom = false
                }

                const isCloseToBottom = scrollTop + clientHeight >= scrollHeight - 30
                const isScrollingUp = this.lastScrollTop > scrollTop
                const isScrollingDown = this.lastScrollTop < scrollTop
                const scrollDelta = this.lastScrollTop - scrollTop
                this.lastScrollTop = scrollTop

                if (isScrollingUp) {
                    this.accumulatedScrollUpDistance += scrollDelta
                    if (this.accumulatedScrollUpDistance >= 20) {
                        if (!this.stopAutoScrollToBottom) {
                            this.stopAutoScrollToBottom = true
                        }
                        this.accumulatedScrollUpDistance = 0
                    }
                } else {
                    this.accumulatedScrollUpDistance = 0
                }

                if (isScrollingDown && isCloseToBottom) {
                    if (this.stopAutoScrollToBottom) {
                        this.stopAutoScrollToBottom = false
                    }
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../styles/BubbleList.scss';
</style>
