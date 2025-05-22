<template>
    <div
        ref="wrapperRef"
        class="el-x-attachments-wrapper"
        :class="{
      'el-x-attachments-overflow-ping-start': overflow === 'scrollX' && pingStart,
      'el-x-attachments-overflow-ping-end': overflow === 'scrollX' && pingEnd,
    }"
        :style="{
      ...listStyle,
      '--el-x-attachments-upload-icon-size': uploadIconSize,
    }"
    >
        <div v-if="!items.length && !hideUpload">
            <slot name="empty-upload">
                <el-upload
                    class="el-x-attachments-upload-btn"
                    v-bind="$attrs"
                    :action="uploadAction"
                    :http-request="customUpload"
                    :show-file-list="false"
                    @change="handleUploadChange"
                    @success="handleUploadSuccess"
                    @error="handleUploadError"
                >
                    <i class="el-icon-plus uploader-icon"></i>
                </el-upload>
            </slot>
        </div>

        <div class="el-x-attachments-background">
            <div v-if="overflow === 'scrollX' && pingStart" class="el-x-attachments-background-start" />
            <div v-if="overflow === 'scrollX' && pingEnd" class="el-x-attachments-background-end" />
        </div>

        <div
            ref="containerRef"
            class="el-x-attachments"
            :class="{
        [`el-x-attachments-overflow-${overflow}`]: overflow,
      }"
            :style="{
        ...(overflow === 'scrollX' ? { whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden' } : {}),
        ...(overflow === 'scrollY' ? { overflowX: 'hidden', overflowY: 'auto' } : {}),
        ...(overflow === 'wrap' ? { display: 'flex', flexWrap: 'wrap' } : {}),
      }"
            @scroll="debouncedCheckPing"
        >
            <div v-if="items.length" :class="{
        'el-x-attachments-file-card-wrap': overflow === 'scrollX',
      }">
                <slot name="file-list" :items="items">
                    <div v-for="(item, index) in items" :key="item.uid" class="el-x-attachments-card">
                        <transition name="card-motion">
                            <el-x-files-card v-if="item.uid" v-bind="item" class="el-x-attachments-card-item" @delete="handleDelete(item, index)" />
                        </transition>
                    </div>
                </slot>

                <div v-if="items.length && !isOverLimit && !hideUpload" class="el-x-attachments-upload-placeholder">
                    <slot name="no-empty-upload">
                        <el-upload
                            v-bind="$attrs"
                            :action="uploadAction"
                            :http-request="customUpload"
                            :show-file-list="false"
                            :style="{
                height: overflow === 'scrollY' && '',
              }"
                            class="el-x-attachments-upload-btn"
                            @change="handleUploadChange"
                            @success="handleUploadSuccess"
                            @error="handleUploadError"
                        >
                            <i class="el-icon-plus uploader-icon"></i>
                        </el-upload>
                    </slot>
                </div>
            </div>
        </div>

        <slot name="prev-button" :show="overflow === 'scrollX' && pingStart" :on-scroll-left="onScrollLeft">
            <el-button v-if="overflow === 'scrollX' && pingStart" size="small" class="el-x-attachments-prev-btn" @click="onScrollLeft">
                <i class="el-icon-arrow-left"></i>
            </el-button>
        </slot>

        <slot name="next-button" :show="overflow === 'scrollX' && pingEnd" :on-scroll-right="onScrollRight">
            <el-button v-if="overflow === 'scrollX' && pingEnd" size="small" class="el-x-attachments-next-btn" @click="onScrollRight">
                <i class="el-icon-arrow-right"></i>
            </el-button>
        </slot>

        <!-- 使用传统 DOM 放置方式代替 Teleport -->
        <div v-if="isTargetDrag" ref="dropAreaContainer" style="display: none;">
            <slot name="drop-area">
                <div ref="dropAreaRef" class="el-x-attachments-drop-area">
                    <i class="el-icon-upload el-x-attachments-drop-area-icon"></i>
                    <div class="el-x-attachments-drop-area-text">在此处拖放文件上传</div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import ElXFilesCard from '../../FilesCard'

export default {
    name: 'ElXAttachments',
    components: {
        ElXFilesCard,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        overflow: {
            type: String,
            default: 'scrollX',
        },
        listStyle: {
            type: Object,
            default: () => ({}),
        },
        uploadIconSize: {
            type: String,
            default: '64px',
        },
        dragTarget: {
            type: [String, Object, HTMLElement],
            default: undefined,
        },
        hideUpload: {
            type: Boolean,
            default: false,
        },
        limit: {
            type: Number,
            default: undefined,
        },
        uploadAction: {
            type: String,
            default: '#',
        },
    },
    data() {
        return {
            containerRef: null,
            wrapperRef: null,
            firstMount: false,
            pingStart: false,
            pingEnd: false,
            TOLERANCE: 1,
            // 上传相关
            targetElement: null,
            isTargetDrag: false,
            dropAreaRef: null,
            dropAreaContainer: null,
        }
    },
    computed: {
        isOverLimit() {
            if (this.limit && this.items.length >= this.limit) {
                return true
            }
            return false
        },
    },
    mounted() {
        this.firstMount = true
        this.$nextTick(() => this.debouncedCheckPing())
        window.addEventListener('resize', this.debouncedCheckPing)

        // 如果有拖拽目标元素，则监听拖拽事件
        if (this.$refs.wrapperRef) {
            this.targetElement = this.getTargetElement() || this.$refs.wrapperRef

            // 监听拖拽事件
            this.targetElement.addEventListener('dragenter', this.targetDragEnter, false)
            this.targetElement.addEventListener('dragleave', this.targetDropLeave, false)
            this.targetElement.addEventListener('drop', this.targetDrop, false)
            this.targetElement.addEventListener('dragover', this.targetDragOver, false)
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.debouncedCheckPing)
        if (this.targetElement) {
            this.targetElement.removeEventListener('dragenter', this.targetDragEnter, false)
            this.targetElement.removeEventListener('dragleave', this.targetDropLeave, false)
            this.targetElement.removeEventListener('drop', this.targetDrop, false)
            this.targetElement.removeEventListener('dragover', this.targetDragOver, false)
        }

        // 清理可能存在的 dropArea 元素
        this.removeDragArea()
    },
    watch: {
        'items.length': function () {
            this.$nextTick(() => this.debouncedCheckPing())
        },
        overflow: function () {
            this.$nextTick(() => this.debouncedCheckPing())
        },
        dragTarget: function () {
            this.$nextTick(() => {
                // 如果有拖拽目标元素，则监听拖拽事件
                if (this.$refs.wrapperRef) {
                    if (this.targetElement) {
                        this.targetElement.removeEventListener('dragenter', this.targetDragEnter, false)
                        this.targetElement.removeEventListener('dragleave', this.targetDropLeave, false)
                        this.targetElement.removeEventListener('drop', this.targetDrop, false)
                        this.targetElement.removeEventListener('dragover', this.targetDragOver, false)
                    }

                    this.targetElement = this.getTargetElement() || this.$refs.wrapperRef

                    // 监听拖拽事件
                    this.targetElement.addEventListener('dragenter', this.targetDragEnter, false)
                    this.targetElement.addEventListener('dragleave', this.targetDropLeave, false)
                    this.targetElement.addEventListener('drop', this.targetDrop, false)
                    this.targetElement.addEventListener('dragover', this.targetDragOver, false)
                }
            })
        },
        isTargetDrag: function (newVal) {
            if (newVal) {
                this.appendDragArea()
            } else {
                this.removeDragArea()
            }
        },
    },
    methods: {
        // 列表相关方法
        checkPing() {
            const containerEle = this.$refs.containerRef
            if (!containerEle) return

            if (this.overflow === 'scrollX') {
                this.pingStart = Math.abs(containerEle.scrollLeft) >= this.TOLERANCE
                this.pingEnd = containerEle.scrollWidth - containerEle.clientWidth - Math.abs(containerEle.scrollLeft) >= this.TOLERANCE
            } else if (this.overflow === 'scrollY') {
                this.pingStart = containerEle.scrollTop !== 0
                this.pingEnd = containerEle.scrollHeight - containerEle.clientHeight !== containerEle.scrollTop
            } else {
                this.pingStart = false
                this.pingEnd = false
            }
        },
        onScrollOffset(offset) {
            const containerEle = this.$refs.containerRef
            if (containerEle) {
                containerEle.scrollTo({
                    left:
                        this.overflow === 'scrollX' ? containerEle.scrollLeft + offset * containerEle.clientWidth : containerEle.scrollLeft,
                    top: this.overflow === 'scrollY' ? containerEle.scrollTop + offset * containerEle.clientHeight : containerEle.scrollTop,
                    behavior: 'smooth',
                })
            }
        },
        onScrollLeft() {
            this.onScrollOffset(-1)
        },
        onScrollRight() {
            this.onScrollOffset(1)
        },
        // 防抖函数
        debounce(func, wait) {
            let timeout
            return function () {
                const context = this
                const args = arguments
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    func.apply(context, args)
                }, wait)
            }
        },
        // 上传相关方法
        toggleDragStyle(isDrag) {
            this.isTargetDrag = isDrag
            if (this.targetElement) {
                const isBodyTarget = this.targetElement === document.body // 判断是否为body

                if (isDrag) {
                    // 针对body特殊处理
                    if (isBodyTarget && this.$refs.dropAreaRef) {
                        this.$refs.dropAreaRef.style.position = 'fixed'
                        this.$refs.dropAreaRef.style.width = '100vw'
                        this.$refs.dropAreaRef.style.height = '100vh'
                        this.$refs.dropAreaRef.style.left = '0'
                        this.$refs.dropAreaRef.style.top = '0'
                    } else {
                        // 其他元素保持原逻辑
                        this.targetElement.style.position = 'relative'
                    }
                } else {
                    this.targetElement.style.position = ''
                }
            }
        },
        customUpload(options) {
            // 自定义上传方法，如果父组件提供了http-request，则使用父组件的
            if (this.$attrs['http-request']) {
                return this.$attrs['http-request'](options)
            }

            // 默认实现：发出事件，让父组件处理
            const { file } = options
            this.$emit('uploadChange', { file }, [file])

            // 如果需要模拟上传进度和成功/失败状态，可以在此实现
            // 例如：options.onProgress({ percent: 50 })
            // options.onSuccess({ url: 'https://example.com/file.jpg' })
            // 或者 options.onError(new Error('Upload failed'))

            // 由于我们只是返回事件，不实际上传，所以直接返回一个空Promise
            return Promise.resolve()
        },
        handleUploadChange(file, fileList) {
            this.$emit('uploadChange', file, fileList)
        },
        handleUploadSuccess(response, file, fileList) {
            this.$emit('uploadSuccess', response, file, fileList)
        },
        handleUploadError(error, file, fileList) {
            this.$emit('uploadError', error, file, fileList)
        },
        getTargetElement() {
            if (!this.dragTarget) return this.$refs.wrapperRef

            // 处理原生 DOM 元素（如 document.body）
            if (this.dragTarget instanceof HTMLElement) {
                return this.dragTarget
            }

            if (typeof this.dragTarget === 'string') {
                return document.getElementById(this.dragTarget)
            }

            // Vue2 中获取引用
            if (this.dragTarget && this.dragTarget.$el) {
                return this.dragTarget.$el
            }

            // 兜底返回 wrapperRef
            return this.$refs.wrapperRef
        },
        targetDragEnter(event) {
            event.preventDefault()
            this.debouncedToggleStyle(true)
        },
        targetDropLeave(event) {
            event.preventDefault()
            // 新增逻辑：若离开后进入的元素仍在目标元素内部，不执行样式移除
            const relatedTarget = event.relatedTarget
            if (this.targetElement && this.targetElement.contains(relatedTarget)) {
                return
            }
            this.debouncedToggleStyle(false)
        },
        targetDrop(event) {
            event.preventDefault()
            this.debouncedToggleStyle(false)
            if (event.dataTransfer) {
                const files = event.dataTransfer.files
                if (files.length) {
                    const filesArray = []
                    for (let i = 0; i < files.length; i++) {
                        filesArray.push(files[i])
                    }
                    this.$emit('upload-drop', filesArray, Object.assign({}, this.$props))
                }
            }
        },
        targetDragOver(event) {
            event.preventDefault()
        },
        // 卡片相关方法
        handleDelete(item, index) {
            this.$emit('delete-card', item, index)
            this.$nextTick(() => this.debouncedCheckPing())
        },
        // Vue2 中实现类似 teleport 的功能
        appendDragArea() {
            if (this.$refs.dropAreaRef && this.targetElement) {
                // 确保 dropAreaContainer 已渲染
                this.$nextTick(() => {
                    if (this.$refs.dropAreaContainer) {
                        const dragAreaNode = this.$refs.dropAreaRef
                        this.targetElement.appendChild(dragAreaNode)
                    }
                })
            }
        },
        removeDragArea() {
            if (this.$refs.dropAreaRef && this.targetElement && this.$refs.dropAreaRef.parentNode === this.targetElement) {
                this.targetElement.removeChild(this.$refs.dropAreaRef)
            }
        },
    },
    created() {
        this.debouncedCheckPing = this.debounce(this.checkPing, 100)
        this.debouncedToggleStyle = this.debounce(this.toggleDragStyle, 100)
    },
}
</script>

<style lang="scss" scoped>
@import '~element-ui/packages/theme-chalk/src/common/var';

/* CSS 动画样式调整 */
.card-motion {
    &-enter-active,
    &-move,
    &-leave-active {
        transition: all 0.3s ease;
        opacity: 1;
        transform: translateX(0);
    }

    &-enter,
    &-leave-to {
        opacity: 0;
        /* 从左侧外进入（进场）/ 移动到右侧外（退场） */
        transform: translateX(-100%);
        /* 进场初始位置在左侧外 */
    }

    &-leave-active {
        /* 退场时从当前位置移动到右侧外 */
        transform: translateX(100%);
        opacity: 0;
    }
}

.el-x-attachments {
    &-file-card-wrap {
        display: flex;
        height: 100%;
        align-items: center;
    }

    &-upload-placeholder {
        display: inline-block;
        width: fit-content;
        align-self: center;
        margin: 6px;
    }

    &-card {
        display: inline-block;
        vertical-align: top;

        &-item {
            margin: 6px;
        }
    }

    &-prev-btn,
    &-next-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        border: none;
        padding: 4px 0px;
        border-radius: 3px;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: rgba(0, 0, 0, 0.5);
        }

        &:active {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }

    &-prev-btn {
        left: 8px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }

    &-next-btn {
        right: 8px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    &-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        pointer-events: none;

        &-start {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 50px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
            z-index: 5;
        }

        &-end {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 50px;
            background: linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
            z-index: 5;
        }
    }

    &-overflow-scrollX {
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        scrollbar-width: none;
    }

    &-overflow-scrollY {
        width: 100%;
        height: 100%;
    }

    &-wrapper {
        position: relative;
        display: block;
    }

    &-upload-btn {
        display: flex;

        ::v-deep .el-upload {
            border: 1px dashed $--border-color-base;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: $--all-transition;
            box-sizing: border-box;
            text-align: center;

            &:hover {
                border-color: $--color-primary;

                .uploader-icon {
                    color: $--color-primary;
                }
            }
        }

        .uploader-icon {
            font-size: 28px;
            color: #8c939d;
            text-align: center;
            width: var(--el-x-attachments-upload-icon-size);
            height: var(--el-x-attachments-upload-icon-size);
            line-height: var(--el-x-attachments-upload-icon-size);
        }

        ::v-deep .el-upload-dragger {
            padding: 0;
            width: auto !important;
            height: auto !important;
            background-color: transparent;

            &:hover .el-icon {
                color: $--color-primary;
            }
        }
    }

    /* 设置拖放区域的样式 */
    &-drop-area {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        border-radius: 15px;
        border: 2px dashed $--color-primary;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(225, 225, 225, 0.3);
        backdrop-filter: blur(2px);

        &-icon {
            font-size: 50px;
            color: $--color-primary;
        }

        &-text {
            font-size: 16px;
            color: $--color-primary;
            margin-top: 10px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }
    }
}
</style>
