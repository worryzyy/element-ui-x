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
            :placement="item.placement"
            :loading="item.loading"
            :shape="item.shape"
            :variant="item.variant"
            :is-markdown="item.isMarkdown"
            :is-fog="item.isFog"
            :typing="item.typing"
            :max-width="item.maxWidth"
            :avatar="item.avatar"
            :avatar-size="item.avatarSize"
            :avatar-gap="item.avatarGap"
            :avatar-shape="item.avatarShape"
            :avatar-icon="item.avatarIcon"
            :avatar-src-set="item.avatarSrcSet"
            :avatar-alt="item.avatarAlt"
            :avatar-fit="item.avatarFit"
            :no-style="item.noStyle"
            @finish="(instance) => handleBubbleComplete(index, instance)"
        >
            <template v-if="$scopedSlots.avatar" slot="avatar">
                <slot name="avatar" :item="item" />
            </template>
            <template v-if="$scopedSlots.header" slot="header">
                <slot name="header" :item="item" />
            </template>
            <template v-if="$scopedSlots.content" slot="content">
                <slot name="content" :item="item" />
            </template>
            <template v-if="$scopedSlots.footer" slot="footer">
                <slot name="footer" :item="item" />
            </template>
            <template v-if="$scopedSlots.loading" slot="loading">
                <slot name="loading" :item="item" />
            </template>
        </Bubble>

        <div
            v-if="showBackToBottom && hasVertical"
            class="el-x-bubble-list-default-back-button"
            :class="{
        'el-x-bubble-list-back-to-bottom-solt': $scopedSlots.backToBottom,
      }"
            :style="{
        bottom: backButtonPosition.bottom,
        left: backButtonPosition.left,
      }"
            @click="scrollToBottom"
        >
            <slot name="backToBottom">
                <i class="el-icon-edit el-x-bubble-list-back-to-bottom-icon">
                    <loadingBg v-if="btnLoading" class="back-to-bottom-loading-svg-bg" />
                </i>
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
    },
    data() {
        return {
            scrollContainer: null,
            stopAutoScrollToBottom: false,
            lastScrollTop: 0,
            accumulatedScrollUpDistance: 0,
            resizeObserver: null,
            showBackToBottom: false,
            hasVertical: false,
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
        console.log('hasVertical', this.hasVertical)
    },
    beforeDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
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
                this.showBackToBottom = this.showBackButton && distanceToBottom > this.backButtonThreshold

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
