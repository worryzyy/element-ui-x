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
        // 修改拖拽样式切换方法
        toggleDragStyle(isDrag) {
            console.log('toggleDragStyle called:', isDrag) // 调试用，可以删除

            this.isTargetDrag = isDrag

            if (this.targetElement) {
                const isBodyTarget = this.targetElement === document.body

                if (isDrag) {
                    // 立即显示拖拽区域
                    this.$nextTick(() => {
                        this.appendDragArea()
                    })

                    if (isBodyTarget && this.$refs.dropAreaRef) {
                        this.$refs.dropAreaRef.style.position = 'fixed'
                        this.$refs.dropAreaRef.style.width = '100vw'
                        this.$refs.dropAreaRef.style.height = '100vh'
                        this.$refs.dropAreaRef.style.left = '0'
                        this.$refs.dropAreaRef.style.top = '0'
                        this.$refs.dropAreaRef.style.zIndex = '9999'
                    } else {
                        this.targetElement.style.position = 'relative'
                    }
                } else {
                    // 延迟移除拖拽区域，避免闪烁
                    setTimeout(() => {
                        this.removeDragArea()
                    }, 100)

                    if (!isBodyTarget) {
                        this.targetElement.style.position = ''
                    }
                }
            }
        },
        // 修改事件处理方法
        targetDragEnter(event) {
            event.preventDefault()
            event.stopPropagation()

            // 移除防抖，直接执行
            this.toggleDragStyle(true)
        },
        targetDropLeave(event) {
            event.preventDefault()
            event.stopPropagation()

            const relatedTarget = event.relatedTarget

            // 如果离开后进入的元素仍在目标元素内部，或者进入了拖拽区域本身，不执行样式移除
            if (
                this.targetElement &&
                (this.targetElement.contains(relatedTarget) || (this.$refs.dropAreaRef && this.$refs.dropAreaRef.contains(relatedTarget)))
            ) {
                return
            }

            // 移除防抖，直接执行
            this.toggleDragStyle(false)
        },
        targetDrop(event) {
            event.preventDefault()
            event.stopPropagation()

            // 立即移除拖拽样式
            this.toggleDragStyle(false)

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
            event.stopPropagation()
        },
        // 卡片相关方法
        handleDelete(item, index) {
            this.$emit('delete-card', item, index)
            this.$nextTick(() => this.debouncedCheckPing())
        },
        // 修改 DOM 操作方法
        appendDragArea() {
            if (!this.$refs.dropAreaRef || !this.targetElement) {
                return
            }

            // 确保元素已经渲染
            this.$nextTick(() => {
                const dragAreaNode = this.$refs.dropAreaRef

                // 检查是否已经添加过了
                if (dragAreaNode.parentNode !== this.targetElement) {
                    // 显示容器
                    if (this.$refs.dropAreaContainer) {
                        this.$refs.dropAreaContainer.style.display = 'block'
                    }

                    // 添加到目标元素
                    this.targetElement.appendChild(dragAreaNode)

                    // 强制重绘
                    dragAreaNode.offsetHeight
                }
            })
        },
        removeDragArea() {
            if (!this.$refs.dropAreaRef || !this.targetElement) {
                return
            }

            const dragAreaNode = this.$refs.dropAreaRef

            if (dragAreaNode.parentNode === this.targetElement) {
                this.targetElement.removeChild(dragAreaNode)
            }

            // 隐藏容器
            if (this.$refs.dropAreaContainer) {
                this.$refs.dropAreaContainer.style.display = 'none'
            }
        },
    },
    created() {
        this.debouncedCheckPing = this.debounce(this.checkPing, 100)
        // this.debouncedToggleStyle = this.debounce(this.toggleDragStyle, 100)
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
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: calc(100% - 4px) !important;
        height: calc(100% - 4px) !important;
        border-radius: 15px !important;
        border: 2px dashed $--color-primary !important;
        z-index: 9999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-direction: column !important;
        background: rgba(225, 225, 225, 0.8) !important; // 增加透明度
        backdrop-filter: blur(4px) !important; // 增加模糊效果
        animation: dragAreaShow 0.3s ease-in-out !important; // 添加显示动画
        pointer-events: none !important; // 防止拖拽区域本身阻止事件

        &-icon {
            font-size: 50px !important;
            color: $--color-primary !important;
            animation: bounce 1s infinite alternate !important; // 添加跳动动画
        }

        &-text {
            font-size: 16px !important;
            color: $--color-primary !important;
            margin-top: 10px !important;
            text-align: center !important;
            width: 100% !important;
            max-width: 300px !important;
            font-weight: bold !important;
        }
    }

    // 添加动画关键帧
    @keyframes dragAreaShow {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes bounce {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-10px);
        }
    }
}
</style>
