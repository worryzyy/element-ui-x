<template>
    <div>
        <el-card class="demo-card">
            <div slot="header">
                <h2>FilesCard 文件卡片</h2>
            </div>

            <div class="demo-block">
                <h3>基本用法</h3>
                <span>设置 name 属性, 且 name 没有后缀。name="测试文件"</span>
                <el-x-files-card ref="filesCardRef" name="测试文件" />
                <span>设置 name 属性，有文件后缀。name="测试文件.pdf"</span>
                <el-x-files-card name="测试文件.pdf" />
                <span>支持更据 name 后缀匹配内置图标 </span>
                <div class="files-card-container">
                    <el-x-files-card name="测试doc后缀.doc" />
                    <el-x-files-card name="测试xls后缀.xls" />
                    <el-x-files-card name="测试ppt后缀.ppt" />
                    <el-x-files-card name="测试txt后缀.txt" />
                    <el-x-files-card name="测试pdf后缀.pdf" />
                    <el-x-files-card name="测试png后缀.png" />
                    <el-x-files-card name="测试jpg后缀.jpg" />
                    <el-x-files-card name="测试gif后缀.gif" />
                    <el-x-files-card name="测试mp4后缀.mp4" />
                    <el-x-files-card name="测试mp3后缀.mp3" />
                    <el-x-files-card name="测试zip后缀.zip" />
                    <el-x-files-card name="测试rar后缀.rar" />
                    <el-x-files-card name="测试7z后缀.7z" />
                    <el-x-files-card name="测试lnk后缀.lnk" />
                    <el-x-files-card name="测试obj后缀.obj" />
                    <el-x-files-card name="测试fbx后缀.fbx" />
                    <el-x-files-card name="测试glb后缀.glb" />
                    <el-x-files-card name="测试sql后缀.sql" />
                    <el-x-files-card name="测试db后缀.db" />
                    <el-x-files-card name="测试md后缀.md" />
                    <el-x-files-card name="测试js后缀.js" />
                    <el-x-files-card name="测试py后缀.py" />
                    <el-x-files-card name="测试java后缀.java" />
                    <el-x-files-card name="测试php后缀.php" />
                    <el-x-files-card name="测试json后缀.json" />
                </div>
                <span>如果有后缀，但是匹配不到常用的图标，则默认为 File 文件</span>
                <el-x-files-card name="https://dd.com多个特殊字符.后缀.self" />
            </div>

            <div class="demo-block">
                <h3>状态设置</h3>
                <span>设置 status 属性，控制文件加载状态 "uploading","done","error"</span>
                <div class="files-card-container">
                    <el-x-files-card name="uploading 测试文件.pdf" status="uploading" />
                    <el-x-files-card name="done 测试文件.pdf" status="done" />
                    <el-x-files-card name="error 测试文件.pdf" status="error" />
                </div>
                <span>"uploading"+"percent" 控制上传进度，"error"+"errorTip"控制自定义失败提示 </span>
                <div class="files-card-container">
                    <el-x-files-card name="uploading 测试文件.doc" status="uploading" :percent="50" />
                    <el-x-files-card name="error 测试文件.doc" status="error" error-tip="自定义失败提示" />
                </div>
            </div>


            <div class="demo-block">
                <h3>展示删除图标</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <el-x-files-card name="删除测试文件.md" show-del-icon @delete="handleDelete" />
                </div>
            </div>

            <div class="demo-block">
                <h3>图片文件展示</h3>
                <div class="files-card-container-wrapper">
                    <span>图片文件 <span style="color: red;">可预览</span> 和 <span style="color: red;">不可预览</span></span>
                    <div class="files-card-container">
                        <el-x-files-card name="可预览的图片.jpeg" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="无法预览的图片.jpeg" show-del-icon />
                    </div>
                    <span>图片文件 <span style="color: red;">正方形变体</span> 其他格式不受变体属性影响</span>
                    <div class="files-card-container">
                        <el-x-files-card name="可预览的图片.jpeg" url="https://avatars.githubusercontent.com/u/76239030?v=4"
                            img-variant="square" show-del-icon />
                        <el-x-files-card name="无法预览的图片.jpeg" img-variant="square" show-del-icon />
                        <el-x-files-card name="其他文件不受变体影响.txt" img-variant="square" show-del-icon :file-size="30000" />
                    </div>
                    <span>图片文件 默认长方形变体 <span style="color: red;">支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span></span>
                    <div class="files-card-container">
                        <el-x-files-card name="上传进度.jpeg" :percent="50" status="uploading" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="上传失败.jpeg" status="error" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="关闭预览悬停遮罩.jpeg" :img-preview-mask="false" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="关闭预览功能.jpeg" :img-preview="false" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                    </div>

                    <span>图片文件 正方形变体 <span style="color: red;">支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span></span>
                    <div class="files-card-container">
                        <el-x-files-card name="上传进度.jpeg" img-variant="square" :percent="50" status="uploading"
                            show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="上传失败.jpeg" img-variant="square" status="error" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="上传完成.jpeg" img-variant="square" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="关闭预览悬停遮罩.jpeg" img-variant="square" :img-preview-mask="false"
                            show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                        <el-x-files-card name="关闭预览功能.jpeg" img-variant="square" :img-preview="false" show-del-icon
                            url="https://avatars.githubusercontent.com/u/76239030?v=4" />
                    </div>
                </div>
            </div>
            
            <div class="demo-block">
                <h3>自定义颜色</h3>
                <div class="files-card-container-wrapper">
                    <p>自定义颜色1</p>
                    <div class="files-card-container">
                        <el-x-files-card
                            v-for="items in colorKeys" 
                            :key="items" 
                            v-bind="filesCardProps" 
                            :icon-color="colorMap1[items]"
                            :file-type="items"
                        />
                    </div>
                    <p>自定义颜色2</p>
                    <div class="files-card-container">
                        <el-x-files-card
                            v-for="items in colorKeys" 
                            :key="items" 
                            v-bind="filesCardProps" 
                            :icon-color="colorMap2[items]"
                            :file-type="items"
                        />
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'FilesCard',
    data() {
        return {
            colorMap: {},
            // 自己定义文件颜色1
            colorMap1: {
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
                unknown: '#888888'
            },
            // 自己定义文件颜色2
            colorMap2: {
                word: '#0078D4',
                excel: '#4CB050',
                ppt: '#FF9933',
                pdf: '#E81123',
                txt: '#666666',
                mark: '#FFA500',
                image: '#B490F3',
                audio: '#00B2EE',
                video: '#2EC4B6',
                three: '#00C8FF',
                code: '#00589F',
                database: '#F5A623',
                link: '#007BFF',
                zip: '#888888',
                file: '#F0D9B5',
                unknown: '#D8D8D8'
            },
            filesCardProps: {
                uid: '1',
                name: '测试名称',
                description: '测试description'
            }
        }
    },
    computed: {
        colorKeys() {
            return Object.keys(this.colorMap1);
        }
    },
    mounted() {
        // 获取内置颜色
        if (this.$refs.filesCardRef && this.$refs.filesCardRef.colorMap) {
            this.colorMap = this.$refs.filesCardRef.colorMap
            console.log(this.colorMap)
        }
    },
    methods: {
        handleDelete() {
            this.$message.success('删除成功')
        }
    }
}
</script>

<style scoped lang="scss">
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

.files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.files-card-container-wrapper {
    display: flex;
    gap: 12px;
    flex-direction: column;
}
</style>
