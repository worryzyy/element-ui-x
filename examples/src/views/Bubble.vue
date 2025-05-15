<template>
    <div class="bubble-demo">
        <h2>Bubble 组件示例</h2>

        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>基本用法</span>
                    </div>
                    <el-x-bubble ref="basicBubble" content="这是一个基本的Bubble组件示例" placement="start" avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>打字机效果</span>
                        <div class="card-actions">
                            <el-button size="mini" @click="startTyping" :disabled="!isPaused">继续</el-button>
                            <el-button size="mini" @click="interruptTyping" :disabled="!isTyping || isPaused">暂停</el-button>
                            <el-button size="mini" @click="restartTyping">重置</el-button>
                        </div>
                    </div>
                    <el-x-bubble ref="typingBubble" :typing="true" content="这是一个展示打字机效果的Bubble组件，文字会逐个显示出来" placement="start" @start="onTypingStart" @finish="onTypingFinish" @writing="onTypingStart" />
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>不同样式变体</span>
                    </div>
                    <el-x-bubble content="filled样式(默认)" variant="filled" placement="start" />
                    <el-x-bubble content="outlined样式" variant="outlined" placement="start" class="mt-10" />
                    <el-x-bubble content="borderless样式" variant="borderless" placement="start" class="mt-10" />
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>加载状态</span>
                    </div>
                    <el-x-bubble :loading="true" placement="start" />
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-20">
            <el-col :span="24">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>自定义插槽</span>
                    </div>
                    <el-x-bubble placement="start">
                        <template #header>Elementuix</template>
                        <template #avatar>
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        </template>
                        <template #content>
                            <div style="color: #67C23A">你好呀你好呀你好呀你好呀你好呀你好呀,你好呀你好呀你好呀你好呀你好呀你好呀,我是自定义插槽我是自定义插槽</div>
                        </template>
                        <template #footer>
                            <div class="footer-container">
                                <el-button size="mini" type="info" icon="el-icon-refresh" circle></el-button>
                                <el-button size="mini" type="success" icon="el-icon-search" circle></el-button>
                                <el-button size="mini" type="warning" icon="el-icon-star-on" circle></el-button>
                                <el-button size="mini" icon="el-icon-document" circle></el-button>
                            </div>
                        </template>
                    </el-x-bubble>
                    <el-x-bubble placement="end">
                        <template #header>Elementuix</template>
                        <template #avatar>
                            <el-avatar icon="el-icon-user-solid" />
                        </template>
                        <template #content>
                            <div style="color: #67C23A">自定义内容插槽</div>
                        </template>
                        <template #footer>
                            <div class="footer-container">
                                <el-button size="mini" type="info" icon="el-icon-refresh" circle></el-button>
                                <el-button size="mini" icon="el-icon-edit" circle></el-button>
                            </div>
                        </template>
                    </el-x-bubble>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>Markdown展示</span>
                        <div class="card-actions">
                            <el-button size="mini" @click="restartmdTyping">预览</el-button>
                        </div>
                    </div>
                    <el-x-bubble ref="markdownBubble" :typing="true" :is-fog="true" :is-markdown="true" :content="markdownContent" placement="start" />
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card class="demo-card">
                    <div slot="header">
                        <span>模拟聊天</span>
                    </div>
                    <div class="chat-container">
                        <el-x-bubble content="你好，有什么可以帮您的吗？" placement="start" avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        <el-x-bubble content="我想了解这个组件如何使用" placement="end" class="mt-10" />
                        <el-x-bubble content="这个组件支持打字机效果、Markdown渲染等功能" placement="start" avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="mt-10" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'BubbleDemo',
    data() {
        return {
            isTyping: false,
            isPaused: false,
            markdownContent: `# Markdown示例
这是一个支持**Markdown**渲染的打字机效果演示。

## 功能特点
- 支持标题
- 支持**粗体**和*斜体*
- 支持代码块
- 支持列表

\`\`\`javascript
// 示例代码
function greet(name) {
    return 'Hello, ' + name + '!';
}
console.log(greet('World'));
\`\`\`
[这是饿了么官网](https://element.eleme.cn/)
`,
        }
    },
    methods: {
        startTyping() {
            this.$refs.typingBubble.continueTyping()
            this.isTyping = true
            this.isPaused = false
        },
        interruptTyping() {
            this.$refs.typingBubble.interrupt()
            this.isTyping = false
            this.isPaused = true
        },
        restartTyping() {
            this.$refs.typingBubble.restart()
            this.isTyping = true
            this.isPaused = false
        },
        onTypingStart() {
            this.isTyping = true
            this.isPaused = false
        },
        onTypingFinish() {
            this.isTyping = false
            this.isPaused = false
        },
        onTypingPause() {
            this.isPaused = true
        },
        restartmdTyping() {
            this.$refs.markdownBubble.restart()
        },
    },
}
</script>

<style scoped  lang="scss">
.bubble-demo {
    padding: 20px;
}
.demo-card {
    margin-bottom: 20px;
}
.card-actions {
    float: right;
}
.mt-10 {
    margin-top: 10px;
}
.mt-20 {
    margin-top: 20px;
}
.footer-container {
    ::v-deep .el-button + .el-button {
        margin-left: 8px;
    }

    ::v-deep .el-button:last-child {
        background: #626aef;
        color: #fff;
    }
}
</style>
