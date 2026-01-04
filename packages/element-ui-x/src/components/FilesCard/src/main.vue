<template>
  <div
    :style="{
      '--elx-files-card-icon-size': `${_iconSize}`,
      '--elx-files-card-max-width': `${maxWidth}`,
      ...styleConfig,
      ...(isHovered && hoverStyle ? hoverStyle : {}),
    }"
    class="el-x-filescard"
    :class="{
      'el-x-filescard-square': isSquareVariant && isImageFile,
      'el-x-filescard-hovered': isHovered,
      'el-x-filescard-error': status === 'error',
      'el-x-filescard-done': status === 'done',
      'el-x-filescard-uploading': status === 'uploading',
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      v-if="status === 'uploading' && !(isSquareVariant && isImageFile)"
      class="el-x-filescard-progress"
      :style="{ width: `${percent || 0}%` }"
    />

    <template v-if="$slots.icon || _fileType">
      <!-- 使用条件渲染兼容 Vue 2.5.x -->
      <slot
        v-if="$scopedSlots.icon"
        name="icon"
        :item="propsData"
      />
      <template v-else>
        <component
          :is="svgIconMap[_fileType]"
          v-if="!isImageFile"
          class="el-x-filescard-icon"
          :color="iconColor || colorMap[_fileType]"
        />

        <!-- 图片文件处理区域（新增遮罩层逻辑） -->
        <template v-if="isImageFile">
          <div
            class="image-preview-container"
            :class="{
              'image-preview-container-square': isSquareVariant && isImageFile,
            }"
            @mouseenter="imageHovered = true"
            @mouseleave="imageHovered = false"
          >
            <el-image
              v-if="_previewImgUrl"
              ref="imgRef"
              class="el-x-filescard-img"
              :src="_previewImgUrl"
              :preview-src-list="imgPreview && _previewImgUrl ? [_previewImgUrl] : []"
              fit="cover"
              @click="imgPreview ? handlePreviewAction('self') : null"
            />

            <!-- 无预览地址时显示默认图标 -->
            <component
              :is="svgIconMap[_fileType]"
              v-else
              class="el-x-filescard-img"
              :color="iconColor || colorMap[_fileType]"
            />

            <!-- 遮罩层 -->
            <!-- 悬停时才展示 -->
            <transition name="fade">
              <template v-if="imageHovered && _previewImgUrl && imgPreviewMask && imgPreview">
                <!-- 使用条件渲染兼容 Vue 2.5.x -->
                <slot
                  v-if="$scopedSlots['image-preview-actions']"
                  name="image-preview-actions"
                  :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }"
                />
                <div
                  v-else
                  class="preview-mask"
                  @click="handlePreviewAction('mask')"
                >
                  <i class="el-icon-view"></i>
                  <span>预览</span>
                </div>
              </template>
            </transition>

            <!-- 如果有状态，不悬停，也展示 -->
            <!-- 状态判断显示区域 -->
            <div
              v-if="status === 'uploading' && isSquareVariant"
              class="preview-mask-loading"
            >
              <el-progress
                color="#fff"
                type="circle"
                :percentage="percent"
                class="circle-progress"
              />
            </div>
            <div
              v-else-if="status === 'error' && isSquareVariant"
              class="preview-mask-error"
            >
              <span class="error-text">{{ errorTip || '上传失败' }}</span>
            </div>
          </div>
        </template>
      </template>
    </template>

    <template v-if="($slots.content || name || description) && !(isSquareVariant && isImageFile)">
      <!-- 使用条件渲染兼容 Vue 2.5.x -->
      <slot
        v-if="$scopedSlots.content"
        name="content"
        :item="propsData"
      />
      <div
        v-else
        class="el-x-filescard-content"
      >
        <div
          v-if="name"
          class="el-x-filescard-name"
        >
          <!-- 使用条件渲染兼容 Vue 2.5.x -->
          <slot
            v-if="$scopedSlots['name-prefix']"
            name="name-prefix"
            :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }"
          />
          <div
            v-else
            class="el-x-filescard-name-prefix"
          >
            {{ namePrefix }}
          </div>
          <!-- 使用条件渲染兼容 Vue 2.5.x -->
          <slot
            v-if="$scopedSlots['name-suffix']"
            name="name-suffix"
            :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }"
          />
          <div
            v-else
            class="el-x-filescard-name-suffix"
          >
            {{ nameSuffix }}
          </div>
        </div>

        <!-- 使用条件渲染兼容 Vue 2.5.x -->
        <slot
          v-if="$scopedSlots.description"
          name="description"
          :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }"
        />
        <div
          v-else
          class="el-x-filescard-description"
          :class="{
            'el-x-filescard-description-error': status === 'error',
            'el-x-filescard-description-done': status === 'done',
            'el-x-filescard-description-uploading': status === 'uploading',
          }"
        >
          {{ _description }}
        </div>
      </div>
    </template>

    <div
      v-if="showDelIcon && isHovered"
      class="el-x-filescard-delete-icon"
      @click="handleDelete"
    >
      <!-- 使用条件渲染兼容 Vue 2.5.x -->
      <slot
        v-if="$scopedSlots['del-icon']"
        name="del-icon"
        :item="propsData"
      />
      <i
        v-else
        class="el-icon-error"
      ></i>
    </div>
  </div>
</template>

<script>
  import { getFileType, getSize, previewImage } from '../../../utils/index.js';
  import svgIconMap from './fileSvg/index.js';
  import { colorMap } from './options.js';

  export default {
    name: 'ElXFilesCard',
    props: {
      uid: {
        type: [String, Number],
        default: undefined,
      },
      name: {
        type: String,
        default: undefined,
      },
      fileSize: {
        type: [String, Number],
        default: undefined,
      },
      fileType: {
        type: String,
        default: undefined,
      },
      description: {
        type: String,
        default: undefined,
      },
      url: {
        type: String,
        default: undefined,
      },
      thumbUrl: {
        type: String,
        default: undefined,
      },
      imgFile: {
        type: [Object, File],
        default: undefined,
      },
      iconSize: {
        type: String,
        default: '42px',
      },
      iconColor: {
        type: String,
        default: undefined,
      },
      showDelIcon: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: '236px',
      },
      styleConfig: {
        type: Object,
        default: undefined,
      },
      hoverStyle: {
        type: Object,
        default: undefined,
      },
      imgVariant: {
        type: String,
        default: 'rectangle',
      },
      imgPreview: {
        type: Boolean,
        default: true,
      },
      imgPreviewMask: {
        type: Boolean,
        default: true,
      },
      status: {
        type: String,
        default: undefined,
      },
      percent: {
        type: Number,
        default: undefined,
      },
      errorTip: {
        type: String,
        default: undefined,
      },
    },
    data() {
      return {
        namePrefix: '',
        nameSuffix: '',
        isHovered: false,
        imageHovered: false,
        svgIconMap: svgIconMap,
        colorMap: colorMap,
        previewImg: undefined,
      };
    },
    computed: {
      propsData() {
        return {
          uid: this.uid,
          name: this.name,
          fileSize: this.fileSize,
          fileType: this.fileType,
          description: this.description,
          url: this.url,
          thumbUrl: this.thumbUrl,
          imgFile: this.imgFile,
          iconSize: this.iconSize,
          iconColor: this.iconColor,
          showDelIcon: this.showDelIcon,
          maxWidth: this.maxWidth,
          styleConfig: this.styleConfig,
          hoverStyle: this.hoverStyle,
          imgVariant: this.imgVariant,
          imgPreview: this.imgPreview,
          imgPreviewMask: this.imgPreviewMask,
          status: this.status,
          percent: this.percent,
          errorTip: this.errorTip,
        };
      },
      _fileType() {
        if (this.fileType) return this.fileType;
        if (!this.name) return undefined;
        if (!this.nameSuffix) {
          return 'unknown';
        }
        return getFileType(this.nameSuffix).lowerCase;
      },
      _fileTypeUpperCase() {
        if (this.fileType) return this.fileType;
        if (!this.name) return '';
        if (!this.nameSuffix) {
          return 'Unknown';
        }
        return getFileType(this.nameSuffix).upperCase;
      },
      _description() {
        if (this.description) {
          return this.description;
        }
        const typeStr = this._fileTypeUpperCase;
        const sizeStr = this.fileSize ? `・${getSize(this.fileSize)}` : '';
        if (this.status === 'uploading') {
          return `上传中...${`・${this.percent || 0}`}%${sizeStr}`;
        }
        if (this.status === 'error') {
          return this.errorTip || '上传失败';
        }
        return `${typeStr}${sizeStr}`;
      },
      isImageFile() {
        return this._fileType === 'image';
      },
      isSquareVariant() {
        return this.imgVariant === 'square';
      },
      _previewImgUrl() {
        if (!this.isImageFile) return undefined;
        if (this.thumbUrl) return this.thumbUrl;
        if (this.url) return this.url;
        return this.previewImg;
      },
      _iconSize() {
        if (
          (this.isSquareVariant && this.isImageFile && !this.iconSize) ||
          (this.isSquareVariant && this.isImageFile && this.iconSize === '42px')
        )
          return '64px';
        return this.iconSize;
      },
    },
    watch: {
      name: {
        handler() {
          this.parseFileName();
        },
        immediate: true,
      },
      imgFile: {
        handler: async function (newFile) {
          if (newFile) {
            try {
              const url = await previewImage(newFile);
              this.previewImg = url;
              // this.$set(this, 'previewImg', url)
            } catch (error) {
              console.error('Preview failed:', error);
              this.previewImg = undefined;
            }
          } else {
            this.$set(this, 'previewImg', undefined);
            this.previewImg = undefined;
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {},
    methods: {
      handleDelete() {
        this.$emit('delete', { ...this.propsData });
      },
      handlePreviewAction(type) {
        if (!this.imgPreview) return;

        if (this.$refs.imgRef && this._previewImgUrl && type === 'mask') {
          this.$refs.imgRef.clickHandler();
        }
        if (type === 'self') {
          this.$emit('image-preview', { ...this.propsData });
        }
      },
      parseFileName() {
        if (!this.name) {
          this.namePrefix = '';
          this.nameSuffix = '';
          return;
        }

        const lastDotIndex = this.name.lastIndexOf('.');
        if (lastDotIndex === -1) {
          this.namePrefix = this.name;
          this.nameSuffix = '';
        } else {
          this.namePrefix = this.name.substring(0, lastDotIndex);
          this.nameSuffix = this.name.substring(lastDotIndex);
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../../styles/FilesCard.scss';
</style>
