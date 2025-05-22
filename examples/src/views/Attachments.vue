<template>
    <div>
        <el-card class="demo-card">
            <div slot="header">
                <h2>Attachments 文件附件</h2>
            </div>

            <div class="demo-block">
                <h3>基础用法</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <el-x-attachments
                        :file-list="files"
                        :http-request="handleHttpRequest"
                        :items="files"
                        drag
                        :before-upload="handleBeforUpload"
                        :hide-upload="false"
                        @upload-drop="handleUploadDrop"
                        @delete-card="handleDeleteCard"
                    />
                </div>
            </div>

            <div class="demo-block">
                <h3>不同滚动方式</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div>横向滚动(scrollX)</div>
                    <el-x-attachments
                        :file-list="demoFiles"
                        :http-request="handleDemoHttpRequest"
                        :items="demoFiles"
                        drag
                        overflow="scrollX"
                        :before-upload="handleBeforUpload"
                        :hide-upload="false"
                        @upload-drop="handleDemoUploadDrop"
                        @delete-card="handleDemoDeleteCard"
                    />
                    <div>纵向滚动(scrollY)</div>
                    <el-x-attachments
                        :file-list="demoFiles"
                        :http-request="handleDemoHttpRequest"
                        :items="demoFiles"
                        drag
                        overflow="scrollY"
                        :list-style="{ height: '200px' }"
                        :before-upload="handleBeforUpload"
                        :hide-upload="false"
                        @upload-drop="handleDemoUploadDrop"
                        @delete-card="handleDemoDeleteCard"
                    />
                    <div>换行(wrap)</div>
                    <el-x-attachments
                        :file-list="demoFiles"
                        :http-request="handleDemoHttpRequest"
                        :items="demoFiles"
                        drag
                        overflow="wrap"
                        :before-upload="handleBeforUpload"
                        :hide-upload="false"
                        @upload-drop="handleDemoUploadDrop"
                        @delete-card="handleDemoDeleteCard"
                    />
                </div>
                <div style="margin-top: 10px;">
                    <el-button type="primary" @click="generateDemoFiles">生成演示文件</el-button>
                    <el-button type="danger" @click="resetDemoFiles">清空演示文件</el-button>
                </div>
            </div>

            <div class="demo-block">
                <h3>自定义文件列表</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <el-x-attachments
                        :file-list="customFiles"
                        :http-request="handleCustomHttpRequest"
                        :items="customFiles"
                        drag
                        :before-upload="handleBeforUpload"
                        :hide-upload="false"
                        @upload-drop="handleCustomUploadDrop"
                        @delete-card="handleCustomDeleteCard"
                    >
                        <template slot="file-list" slot-scope="{ items }">
                            <div class="custom-list">
                                <div v-for="(item, index) in items" :key="index" class="custom-item">
                                    <div class="custom-item-name">{{ item.name }}</div>
                                    <div v-if="item.fileSize" class="custom-item-size">{{ (item.fileSize / 1024).toFixed(2) }} KB</div>
                                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleCustomDeleteCard(item, index)">删除</el-button>
                                </div>
                            </div>
                        </template>
                    </el-x-attachments>
                </div>
                <div style="margin-top: 10px;">
                    <el-button type="primary" @click="generateCustomFiles">生成自定义文件</el-button>
                    <el-button type="danger" @click="resetCustomFiles">清空自定义文件</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'AttachmentsDemo',
    data() {
        return {
            files: [],
            demoFiles: [],
            customFiles: [],
            limit: 5,
            hideUpload: false,
            drag: true,
            colorMap: {
                word: '#5E74A8',
                excel: '#4A6B4A',
                ppt: '#C27C40',
                pdf: '#5A6976',
                txt: '#D4C58C',
                mark: '#FFA500',
                image: '#8E7CC3',
                audio: '#A67B5B',
                video: '#4A5568',
                three: '#5F9E86',
                code: '#4B636E',
                database: '#4A5A6B',
                link: '#5D7CBA',
                zip: '#8B5E3C',
                file: '#AAB2BF',
                unknown: '#888888',
            },
        }
    },
    mounted() {
        this.generateDemoFiles()
    },
    methods: {
        handleBeforUpload(file) {
            console.log('before upload', file)
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('文件大小不能超过 2MB!')
                return false
            }
            return true
        },
        async handleUploadDrop(files, props) {
            console.log('drop', files)
            console.log('props', props)

            if (files && files.length > 0) {
                if (files[0].type === '') {
                    this.$message.error('禁止上传文件夹！')
                    return false
                }

                for (let index = 0; index < files.length; index++) {
                    const file = files[index]
                    await this.handleHttpRequest({ file })
                }
            }
        },
        async handleDemoUploadDrop(files, props) {
            if (files && files.length > 0) {
                if (files[0].type === '') {
                    this.$message.error('禁止上传文件夹！')
                    return false
                }

                for (let index = 0; index < files.length; index++) {
                    const file = files[index]
                    await this.handleDemoHttpRequest({ file })
                }
            }
        },
        async handleHttpRequest(options) {
            const formData = new FormData()
            formData.append('file', options.file)
            this.$message.info('上传中...')

            return new Promise((resolve) => {
                setTimeout(() => {
                    const res = {
                        message: '文件上传成功',
                        fileName: options.file.name,
                        uid: options.file.uid,
                        fileSize: options.file.size,
                        imgFile: options.file,
                    }
                    this.files.push({
                        id: this.files.length,
                        uid: res.uid,
                        name: res.fileName,
                        fileSize: res.fileSize,
                        imgFile: res.imgFile,
                        showDelIcon: true,
                        imgVariant: 'square',
                    })
                    this.$message.success('上传成功')
                    resolve(res)
                }, 1000)
            })
        },
        async handleDemoHttpRequest(options) {
            this.$message.info('上传中...')

            return new Promise((resolve) => {
                setTimeout(() => {
                    const res = {
                        message: '文件上传成功',
                        fileName: options.file.name,
                        uid: options.file.uid,
                        fileSize: options.file.size,
                        imgFile: options.file,
                    }
                    this.demoFiles.push({
                        id: this.demoFiles.length,
                        uid: res.uid,
                        name: res.fileName,
                        fileSize: res.fileSize,
                        imgFile: res.imgFile,
                        showDelIcon: true,
                        imgVariant: 'square',
                    })
                    this.$message.success('上传成功')
                    resolve(res)
                }, 1000)
            })
        },
        handleDeleteCard(item, index) {
            console.log('删除卡片', item, index)
            this.files = this.files.filter((items) => items.id !== item.id)
            this.$message.success('删除成功')
        },
        handleDemoDeleteCard(item) {
            this.demoFiles = this.demoFiles.filter((items) => items.id !== item.id)
            this.$message.success('删除成功')
        },
        resetDemoFiles() {
            this.demoFiles = []
        },
        generateDemoFiles() {
            const typeList = Object.keys(this.colorMap)
            this.demoFiles = []

            for (let index = 0; index < 30; index++) {
                this.demoFiles.push({
                    id: index,
                    uid: index,
                    name: `文件${index}`,
                    fileSize: 1024 * 2,
                    fileType: typeList[Math.floor(Math.random() * typeList.length)],
                    url: 'https://www.baidu.com',
                    thumbUrl: 'https://www.baidu.com',
                    imgFile: new File([], 'test.txt'),
                    showDelIcon: true,
                })
            }

            this.$message.success('已生成30个演示文件')
        },
        async handleCustomUploadDrop(files, props) {
            if (files && files.length > 0) {
                if (files[0].type === '') {
                    this.$message.error('禁止上传文件夹！')
                    return false
                }

                for (let index = 0; index < files.length; index++) {
                    const file = files[index]
                    await this.handleCustomHttpRequest({ file })
                }
            }
        },
        async handleCustomHttpRequest(options) {
            this.$message.info('上传中...')

            return new Promise((resolve) => {
                setTimeout(() => {
                    const res = {
                        message: '文件上传成功',
                        fileName: options.file.name,
                        uid: options.file.uid,
                        fileSize: options.file.size,
                        imgFile: options.file,
                    }
                    this.customFiles.push({
                        id: this.customFiles.length,
                        uid: res.uid,
                        name: res.fileName,
                        fileSize: res.fileSize,
                        imgFile: res.imgFile,
                        showDelIcon: true,
                        imgVariant: 'square',
                    })
                    this.$message.success('上传成功')
                    resolve(res)
                }, 1000)
            })
        },
        handleCustomDeleteCard(item, index) {
            console.log('删除自定义卡片', item, index)
            this.customFiles = this.customFiles.filter((items) => items.id !== item.id)
            this.$message.success('删除成功')
        },
        resetCustomFiles() {
            this.customFiles = []
        },
        generateCustomFiles() {
            const typeList = Object.keys(this.colorMap)
            this.customFiles = []

            for (let index = 0; index < 5; index++) {
                this.customFiles.push({
                    id: index,
                    uid: index,
                    name: `自定义文件${index}`,
                    fileSize: 1024 * (index + 1),
                    fileType: typeList[Math.floor(Math.random() * typeList.length)],
                    url: 'https://www.baidu.com',
                    thumbUrl: 'https://www.baidu.com',
                    imgFile: new File([], 'test.txt'),
                    showDelIcon: true,
                })
            }

            this.$message.success('已生成5个自定义演示文件')
        },
    },
}
</script>

<style lang="scss" scoped>
h3 {
    font-weight: bold !important;
    font-size: 20px !important;
}

h4 {
    font-size: 16px !important;
    margin-top: 10px;
    margin-bottom: 10px;
}

.demo-card {
    margin-bottom: 20px;
}

.demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 500;
    }
}

.custom-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.custom-item {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 150px;
}

.custom-item-name {
    font-weight: bold;
}

.custom-item-size {
    color: #909399;
    font-size: 12px;
}
</style>
