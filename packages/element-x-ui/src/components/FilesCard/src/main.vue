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
        <div v-if="status === 'uploading' && !(isSquareVariant && isImageFile)" class="el-x-filescard-progress" :style="{ width: `${percent || 0}%` }" />

        <slot v-if="$slots.icon || _fileType" name="icon" :item="propsData">
            <component :is="svgIconMap[_fileType]" v-if="!isImageFile" class="el-x-filescard-icon" :color="iconColor || colorMap[_fileType]" />

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
                        :preview-src-list="imgPreview ? [_previewImgUrl] : []"
                        fit="cover"
                        :show-progress="false"
                        hide-on-click-modal
                        @show="handlePreviewAction('self')"
                    />

                    <!-- 无预览地址时显示默认图标 -->
                    <component :is="svgIconMap[_fileType]" v-else class="el-x-filescard-img" :color="iconColor || colorMap[_fileType]" />

                    <!-- 遮罩层 -->
                    <!-- 悬停时才展示 -->
                    <transition name="fade">
                        <slot v-if="imageHovered && _previewImgUrl && imgPreviewMask && imgPreview" name="image-preview-actions" :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }">
                            <div class="preview-mask" @click="handlePreviewAction('mask')">
                                <i class="el-icon-view"></i>
                                <span>预览</span>
                            </div>
                        </slot>
                    </transition>

                    <!-- 如果有状态，不悬停，也展示 -->
                    <!-- 状态判断显示区域 -->
                    <div v-if="status === 'uploading' && isSquareVariant" class="preview-mask-loading">
                        <el-progress color="#fff" type="circle" :percentage="percent" class="circle-progress" />
                    </div>
                    <div v-else-if="status === 'error' && isSquareVariant" class="preview-mask-error">
                        <span class="error-text">{{ errorTip || '上传失败' }}</span>
                    </div>
                </div>
            </template>
        </slot>

        <slot v-if="($slots.content || name || description) && !(isSquareVariant && isImageFile)" name="content" :item="propsData">
            <div class="el-x-filescard-content">
                <div v-if="name" class="el-x-filescard-name">
                    <slot name="name-prefix" :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }">
                        <div class="el-x-filescard-name-prefix">{{ namePrefix }}</div>
                    </slot>
                    <slot name="name-suffix" :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }">
                        <div class="el-x-filescard-name-suffix">{{ nameSuffix }}</div>
                    </slot>
                </div>

                <slot name="description" :item="{ ...propsData, prefix: namePrefix, suffix: nameSuffix }">
                    <div
                        class="el-x-filescard-description"
                        :class="{
              'el-x-filescard-description-error': status === 'error',
              'el-x-filescard-description-done': status === 'done',
              'el-x-filescard-description-uploading': status === 'uploading',
            }"
                    >{{ _description }}</div>
                </slot>
            </div>
        </slot>

        <div v-if="showDelIcon && isHovered" class="el-x-filescard-delete-icon" @click="handleDelete">
            <slot name="del-icon" :item="propsData">
                <i class="el-icon-error"></i>
            </slot>
        </div>
    </div>
</template>

<script>
import svgIconMap from './fileSvg/index.js'
import { colorMap } from './options.js'

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
            type: Object,
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
            localPreviewUrl: undefined,
            svgIconMap: svgIconMap,
            colorMap: colorMap,
        }
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
            }
        },
        _fileType() {
            if (this.fileType) return this.fileType
            if (!this.name) return undefined
            if (!this.nameSuffix) {
                return 'unknown'
            }
            return this.getFileType(this.nameSuffix).lowerCase
        },
        _fileTypeUpperCase() {
            if (this.fileType) return this.fileType
            if (!this.name) return ''
            if (!this.nameSuffix) {
                return 'Unknown'
            }
            return this.getFileType(this.nameSuffix).upperCase
        },
        _description() {
            if (this.description) {
                return this.description
            }
            const typeStr = this._fileTypeUpperCase
            const sizeStr = this.fileSize ? `・${this.getSize(this.fileSize)}` : ''
            if (this.status === 'uploading') {
                return `上传中...${`・${this.percent || 0}`}%${sizeStr}`
            }
            if (this.status === 'error') {
                return this.errorTip || '上传失败'
            }
            return `${typeStr}${sizeStr}`
        },
        isImageFile() {
            return this._fileType === 'image'
        },
        isSquareVariant() {
            return this.imgVariant === 'square'
        },
        _previewImgUrl() {
            if (!this.isImageFile) return undefined
            if (this.thumbUrl) return this.thumbUrl
            if (this.url) return this.url
            return this._previewImg
        },
        _iconSize() {
            if (
                (this.isSquareVariant && this.isImageFile && !this.iconSize) ||
                (this.isSquareVariant && this.isImageFile && this.iconSize === '42px')
            )
                return '64px'
            return this.iconSize
        },
    },
    watch: {
        imgFile: {
            handler: async function (newFile) {
                if (newFile) {
                    try {
                        const url = await this.previewImage(newFile)
                        this._previewImg = url
                    } catch (error) {
                        console.error('Preview failed:', error)
                    }
                } else {
                    this._previewImg = undefined
                }
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        this.parseFileName()
    },
    methods: {
        handleDelete() {
            this.$emit('delete', { ...this.propsData })
        },
        handlePreviewAction(type) {
            if (this.imgPreview && this.$refs.imgRef && this._previewImgUrl && type === 'mask') {
                console.log(this.$refs.imgRef)
                this.$refs.imgRef.clickHandler()
                // this.$refs.imgRef.showPreview()
            }
            if (type === 'self') {
                this.$emit('imagePreview', { ...this.propsData })
            }
        },
        parseFileName() {
            if (!this.name) {
                this.namePrefix = ''
                this.nameSuffix = ''
                return
            }

            const lastDotIndex = this.name.lastIndexOf('.')
            if (lastDotIndex === -1) {
                this.namePrefix = this.name
                this.nameSuffix = ''
            } else {
                this.namePrefix = this.name.substring(0, lastDotIndex)
                this.nameSuffix = this.name.substring(lastDotIndex)
            }
        },
        getFileType(suffix) {
            if (!suffix) return { lowerCase: 'unknown', upperCase: 'Unknown' }

            const fileType = suffix.toLowerCase()

            // 文档类
            if (fileType.includes('.doc') || fileType.includes('.docx')) return { lowerCase: 'word', upperCase: 'Word' }
            if (fileType.includes('.xls') || fileType.includes('.xlsx')) return { lowerCase: 'excel', upperCase: 'Excel' }
            if (fileType.includes('.ppt') || fileType.includes('.pptx')) return { lowerCase: 'ppt', upperCase: 'PPT' }
            if (fileType.includes('.pdf')) return { lowerCase: 'pdf', upperCase: 'PDF' }
            if (fileType.includes('.txt')) return { lowerCase: 'txt', upperCase: 'TXT' }
            if (fileType.includes('.md')) return { lowerCase: 'mark', upperCase: 'Markdown' }

            // 图片类
            if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'image', upperCase: 'Image' }
            }

            // 音频类
            if (['.mp3', '.wav', '.ogg', '.flac', '.aac'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'audio', upperCase: 'Audio' }
            }

            // 视频类
            if (['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'video', upperCase: 'Video' }
            }

            // 3D模型类
            if (['.obj', '.fbx', '.stl', '.gltf', '.glb'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'three', upperCase: '3D Model' }
            }

            // 代码类
            if (['.js', '.ts', '.html', '.css', '.java', '.py', '.c', '.cpp', '.php', '.go', '.rb'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'code', upperCase: 'Code' }
            }

            // 数据库类
            if (['.sql', '.db', '.sqlite', '.mdb'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'database', upperCase: 'Database' }
            }

            // 链接类
            if (['.url', '.lnk', '.webloc'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'link', upperCase: 'Link' }
            }

            // 压缩包类
            if (['.zip', '.rar', '.7z', '.tar', '.gz'].some((ext) => fileType.includes(ext))) {
                return { lowerCase: 'zip', upperCase: 'Archive' }
            }

            return { lowerCase: 'unknown', upperCase: 'Unknown' }
        },
        getSize(size) {
            if (typeof size === 'string') {
                return size
            }

            const units = ['B', 'KB', 'MB', 'GB', 'TB']
            let fileSize = size
            let unitIndex = 0

            while (fileSize >= 1024 && unitIndex < units.length - 1) {
                fileSize /= 1024
                unitIndex++
            }

            return `${fileSize.toFixed(2)} ${units[unitIndex]}`
        },
        async previewImage(file) {
            return new Promise((resolve, reject) => {
                try {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        resolve(e.target.result)
                    }
                    reader.onerror = (e) => {
                        reject(e)
                    }
                    reader.readAsDataURL(file)
                } catch (error) {
                    reject(error)
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../../../styles/FilesCard.scss';
</style>
