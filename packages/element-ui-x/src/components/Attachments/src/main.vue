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
          :on-change="handleUploadChange"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <i class="el-icon-plus uploader-icon"></i>
        </el-upload>
      </slot>
    </div>

    <div class="el-x-attachments-background">
      <div
        v-if="overflow === 'scrollX' && pingStart"
        class="el-x-attachments-background-start"
      />
      <div
        v-if="overflow === 'scrollX' && pingEnd"
        class="el-x-attachments-background-end"
      />
    </div>

    <div
      ref="containerRef"
      class="el-x-attachments"
      :class="{
        [`el-x-attachments-overflow-${overflow}`]: overflow,
      }"
      :style="{
        ...(overflow === 'scrollX'
          ? { whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden' }
          : {}),
        ...(overflow === 'scrollY' ? { overflowX: 'hidden', overflowY: 'auto' } : {}),
        ...(overflow === 'wrap' ? { display: 'flex', flexWrap: 'wrap' } : {}),
      }"
      @scroll="debouncedCheckPing"
    >
      <div
        v-if="items.length"
        :class="{
          'el-x-attachments-file-card-wrap': overflow === 'scrollX',
        }"
      >
        <slot
          name="file-list"
          :items="items"
        >
          <div
            v-for="(item, index) in items"
            :key="item.uid"
            class="el-x-attachments-card"
          >
            <transition name="card-motion">
              <el-x-files-card
                v-if="item.uid"
                v-bind="item"
                class="el-x-attachments-card-item"
                @delete="handleDelete(item, index)"
              />
            </transition>
          </div>
        </slot>

        <div
          v-if="items.length && !isOverLimit && !hideUpload"
          class="el-x-attachments-upload-placeholder"
        >
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
              :on-change="handleUploadChange"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
            >
              <i class="el-icon-plus uploader-icon"></i>
            </el-upload>
          </slot>
        </div>
      </div>
    </div>

    <slot
      name="prev-button"
      :show="overflow === 'scrollX' && pingStart"
      :on-scroll-left="onScrollLeft"
    >
      <el-button
        v-if="overflow === 'scrollX' && pingStart"
        size="small"
        class="el-x-attachments-prev-btn"
        @click="onScrollLeft"
      >
        <i class="el-icon-arrow-left"></i>
      </el-button>
    </slot>

    <slot
      name="next-button"
      :show="overflow === 'scrollX' && pingEnd"
      :on-scroll-right="onScrollRight"
    >
      <el-button
        v-if="overflow === 'scrollX' && pingEnd"
        size="small"
        class="el-x-attachments-next-btn"
        @click="onScrollRight"
      >
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </slot>

    <!-- 使用传统 DOM 放置方式代替 Teleport -->
    <div
      v-if="isTargetDrag"
      ref="dropAreaContainer"
      style="display: none"
    >
      <slot name="drop-area">
        <div
          ref="dropAreaRef"
          class="el-x-attachments-drop-area"
        >
          <i class="el-icon-upload el-x-attachments-drop-area-icon"></i>
          <div class="el-x-attachments-drop-area-text">在此处拖放文件上传</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import ElXFilesCard from '../../FilesCard';

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
      };
    },
    computed: {
      isOverLimit() {
        if (this.limit && this.items.length >= this.limit) {
          return true;
        }
        return false;
      },
    },
    mounted() {
      this.firstMount = true;
      this.$nextTick(() => this.debouncedCheckPing());
      window.addEventListener('resize', this.debouncedCheckPing);

      // 如果有拖拽目标元素，则监听拖拽事件
      if (this.$refs.wrapperRef) {
        this.targetElement = this.getTargetElement() || this.$refs.wrapperRef;

        // 监听拖拽事件
        this.targetElement.addEventListener('dragenter', this.targetDragEnter, false);
        this.targetElement.addEventListener('dragleave', this.targetDropLeave, false);
        this.targetElement.addEventListener('drop', this.targetDrop, false);
        this.targetElement.addEventListener('dragover', this.targetDragOver, false);
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.debouncedCheckPing);
      if (this.targetElement) {
        this.targetElement.removeEventListener('dragenter', this.targetDragEnter, false);
        this.targetElement.removeEventListener('dragleave', this.targetDropLeave, false);
        this.targetElement.removeEventListener('drop', this.targetDrop, false);
        this.targetElement.removeEventListener('dragover', this.targetDragOver, false);
      }

      // 清理可能存在的 dropArea 元素
      this.removeDragArea();
    },
    watch: {
      'items.length': function () {
        this.$nextTick(() => this.debouncedCheckPing());
      },
      overflow: function () {
        this.$nextTick(() => this.debouncedCheckPing());
      },
      dragTarget: function () {
        this.$nextTick(() => {
          // 如果有拖拽目标元素，则监听拖拽事件
          if (this.$refs.wrapperRef) {
            if (this.targetElement) {
              this.targetElement.removeEventListener('dragenter', this.targetDragEnter, false);
              this.targetElement.removeEventListener('dragleave', this.targetDropLeave, false);
              this.targetElement.removeEventListener('drop', this.targetDrop, false);
              this.targetElement.removeEventListener('dragover', this.targetDragOver, false);
            }

            this.targetElement = this.getTargetElement() || this.$refs.wrapperRef;

            // 监听拖拽事件
            this.targetElement.addEventListener('dragenter', this.targetDragEnter, false);
            this.targetElement.addEventListener('dragleave', this.targetDropLeave, false);
            this.targetElement.addEventListener('drop', this.targetDrop, false);
            this.targetElement.addEventListener('dragover', this.targetDragOver, false);
          }
        });
      },
      isTargetDrag: function (newVal) {
        if (newVal) {
          this.appendDragArea();
        } else {
          this.removeDragArea();
        }
      },
    },
    methods: {
      // 列表相关方法
      checkPing() {
        const containerEle = this.$refs.containerRef;
        if (!containerEle) return;

        if (this.overflow === 'scrollX') {
          this.pingStart = Math.abs(containerEle.scrollLeft) >= this.TOLERANCE;
          this.pingEnd =
            containerEle.scrollWidth -
              containerEle.clientWidth -
              Math.abs(containerEle.scrollLeft) >=
            this.TOLERANCE;
        } else if (this.overflow === 'scrollY') {
          this.pingStart = containerEle.scrollTop !== 0;
          this.pingEnd =
            containerEle.scrollHeight - containerEle.clientHeight !== containerEle.scrollTop;
        } else {
          this.pingStart = false;
          this.pingEnd = false;
        }
      },
      onScrollOffset(offset) {
        const containerEle = this.$refs.containerRef;
        if (containerEle) {
          containerEle.scrollTo({
            left:
              this.overflow === 'scrollX'
                ? containerEle.scrollLeft + offset * containerEle.clientWidth
                : containerEle.scrollLeft,
            top:
              this.overflow === 'scrollY'
                ? containerEle.scrollTop + offset * containerEle.clientHeight
                : containerEle.scrollTop,
            behavior: 'smooth',
          });
        }
      },
      onScrollLeft() {
        this.onScrollOffset(-1);
      },
      onScrollRight() {
        this.onScrollOffset(1);
      },
      // 防抖函数
      debounce(func, wait) {
        let timeout;
        return function () {
          const context = this;
          const args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            func.apply(context, args);
          }, wait);
        };
      },

      customUpload(options) {
        // 自定义上传方法，如果父组件提供了http-request，则使用父组件的
        if (this.$attrs['http-request']) {
          return this.$attrs['http-request'](options);
        }

        // 默认实现：发出事件，让父组件处理
        const { file } = options;
        this.$emit(
          'upload-change',
          {
            file,
          },
          [file],
        );

        // 如果需要模拟上传进度和成功/失败状态，可以在此实现
        // 例如：options.onProgress({ percent: 50 })
        // options.onSuccess({ url: 'https://example.com/file.jpg' })
        // 或者 options.onError(new Error('Upload failed'))

        // 由于我们只是返回事件，不实际上传，所以直接返回一个空Promise
        return Promise.resolve();
      },
      handleUploadChange(file, fileList) {
        this.$emit('upload-change', file, fileList);
      },
      handleUploadSuccess(response, file, fileList) {
        this.$emit('upload-success', response, file, fileList);
      },
      handleUploadError(error, file, fileList) {
        this.$emit('upload-error', error, file, fileList);
      },

      getTargetElement() {
        if (!this.dragTarget) return this.$refs.wrapperRef;

        // 处理原生 DOM 元素（如 document.body）
        if (this.dragTarget instanceof HTMLElement) {
          return this.dragTarget;
        }

        if (typeof this.dragTarget === 'string') {
          return document.getElementById(this.dragTarget);
        }

        // Vue2 中获取引用
        if (this.dragTarget && this.dragTarget.$el) {
          return this.dragTarget.$el;
        }

        // 兜底返回 wrapperRef
        return this.$refs.wrapperRef;
      },
      // 修改拖拽样式切换方法
      toggleDragStyle(isDrag) {
        console.log('toggleDragStyle called:', isDrag); // 调试用，可以删除

        this.isTargetDrag = isDrag;

        if (this.targetElement) {
          const isBodyTarget = this.targetElement === document.body;

          if (isDrag) {
            // 立即显示拖拽区域
            this.$nextTick(() => {
              this.appendDragArea();
            });

            if (isBodyTarget && this.$refs.dropAreaRef) {
              this.$refs.dropAreaRef.style.position = 'fixed';
              this.$refs.dropAreaRef.style.width = '100vw';
              this.$refs.dropAreaRef.style.height = '100vh';
              this.$refs.dropAreaRef.style.left = '0';
              this.$refs.dropAreaRef.style.top = '0';
              this.$refs.dropAreaRef.style.zIndex = '9999';
            } else {
              this.targetElement.style.position = 'relative';
            }
          } else {
            // 延迟移除拖拽区域，避免闪烁
            setTimeout(() => {
              this.removeDragArea();
            }, 100);

            if (!isBodyTarget) {
              this.targetElement.style.position = '';
            }
          }
        }
      },
      // 修改事件处理方法
      targetDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();

        // 移除防抖，直接执行
        this.toggleDragStyle(true);
      },
      targetDropLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        const relatedTarget = event.relatedTarget;

        // 如果离开后进入的元素仍在目标元素内部，或者进入了拖拽区域本身，不执行样式移除
        if (
          this.targetElement &&
          (this.targetElement.contains(relatedTarget) ||
            (this.$refs.dropAreaRef && this.$refs.dropAreaRef.contains(relatedTarget)))
        ) {
          return;
        }

        // 移除防抖，直接执行
        this.toggleDragStyle(false);
      },
      targetDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        // 立即移除拖拽样式
        this.toggleDragStyle(false);

        if (event.dataTransfer) {
          const files = event.dataTransfer.files;
          if (files.length) {
            const filesArray = [];
            for (let i = 0; i < files.length; i++) {
              filesArray.push(files[i]);
            }
            this.$emit('upload-drop', filesArray, Object.assign({}, this.$props));
          }
        }
      },
      targetDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
      },
      // 卡片相关方法
      handleDelete(item, index) {
        this.$emit('delete-card', item, index);
        this.$nextTick(() => this.debouncedCheckPing());
      },
      // 修改 DOM 操作方法
      appendDragArea() {
        if (!this.$refs.dropAreaRef || !this.targetElement) {
          return;
        }

        // 确保元素已经渲染
        this.$nextTick(() => {
          const dragAreaNode = this.$refs.dropAreaRef;

          // 检查是否已经添加过了
          if (dragAreaNode.parentNode !== this.targetElement) {
            // 显示容器
            if (this.$refs.dropAreaContainer) {
              this.$refs.dropAreaContainer.style.display = 'block';
            }

            // 添加到目标元素
            this.targetElement.appendChild(dragAreaNode);

            // 强制重绘
            dragAreaNode.offsetHeight;
          }
        });
      },
      removeDragArea() {
        if (!this.$refs.dropAreaRef || !this.targetElement) {
          return;
        }

        const dragAreaNode = this.$refs.dropAreaRef;

        if (dragAreaNode.parentNode === this.targetElement) {
          this.targetElement.removeChild(dragAreaNode);
        }

        // 隐藏容器
        if (this.$refs.dropAreaContainer) {
          this.$refs.dropAreaContainer.style.display = 'none';
        }
      },
    },
    created() {
      this.debouncedCheckPing = this.debounce(this.checkPing, 100);
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/Attachments.scss';
</style>
