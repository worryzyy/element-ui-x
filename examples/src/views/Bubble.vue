<template>
    <div>
        <el-card class="demo-card">
            <div slot="header">
                <h2>Bubble 气泡对话框</h2>
            </div>

            <div class="demo-block">
                <h3>基础用法</h3>
                <el-x-bubble content="右侧气泡示例" placement="end" :avatarSize="avatarSizeValue" avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="mt-10" />
                <el-x-bubble 
                    ref="basicBubble" 
                    content="这是一个基本的Bubble组件示例" 
                    placement="start" 
                    :avatarSize="avatarSizeValue" 
                    avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" 
                    :typing="true"
                    :is-fog="true"
                />
                <div class="demo-controls">
                    <el-button-group>
                        <el-button size="small" type="primary" @click="$refs.basicBubble.restart()">重置</el-button>
                    </el-button-group>
                </div>
            </div>

            <div class="demo-block">
                <h3>打字机效果与控制</h3>
                <div class="control-row">
                    <h4>打字速度：</h4>
                    <el-slider style="width: 200px;" v-model="typingInterval" :min="10" :max="200" :step="10" />
                </div>
                <div class="control-row">
                    <h4>步进长度：</h4>
                    <el-slider style="width: 200px;" v-model="typingStep" :min="1" :max="5" :step="1" />
                </div>
                <div class="control-row">
                    <h4>光标符号：</h4>
                    <el-select v-model="typingSuffix" style="width: 120px;" placeholder="选择表情">
                        <el-option label="😂" value="😂" />
                        <el-option label="🤣" value="🤣" />
                        <el-option label="😜" value="😜" />
                        <el-option label="🤪" value="🤪" />
                        <el-option label="😝" value="😝" />
                        <el-option label="🤓" value="🤓" />
                        <el-option label="🤡" value="🤡" />
                        <el-option label="👻" value="👻" />
                        <el-option label="💩" value="💩" />
                        <el-option label="|" value="|" />
                    </el-select>
                </div>
                <el-x-bubble 
                    ref="typingBubble" 
                    :typing="{
                        interval: typingInterval,
                        step: typingStep,
                        suffix: typingSuffix
                    }" 
                    content="这是一个展示打字机效果的Bubble组件，文字会逐个显示出来" 
                    placement="start" 
                    @start="onTypingStart" 
                    @finish="onTypingFinish" 
                    @writing="onTypingStart" 
                />
                <div class="demo-controls">
                    <el-button-group>
                        <el-button size="small" type="primary" @click="startTyping" :disabled="!isPaused">继续</el-button>
                        <el-button size="small" type="warning" @click="interruptTyping" :disabled="!isTyping || isPaused">暂停</el-button>
                        <el-button size="small" type="info" @click="restartTyping">重置</el-button>
                    </el-button-group>
                </div>
            </div>

            <div class="demo-block">
                <h3>样式与变体</h3>
                <div class="control-row">
                    <h4>变体样式：</h4>
                    <el-radio-group v-model="currentVariant">
                        <el-radio-button label="filled">filled</el-radio-button>
                        <el-radio-button label="outlined">outlined</el-radio-button>
                        <el-radio-button label="borderless">borderless</el-radio-button>
                        <el-radio-button label="shadow">shadow</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="control-row">
                    <h4>形状：</h4>
                    <el-radio-group v-model="currentShape">
                        <el-radio-button label="">默认</el-radio-button>
                        <el-radio-button label="round">圆角</el-radio-button>
                        <el-radio-button label="corner">直角</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="control-row">
                    <h4>最大宽度：</h4>
                    <el-slider style="width: 200px;" v-model="maxWidthValue" :min="200" :max="800" :step="50" />
                </div>
                <div class="control-row">
                    <el-switch v-model="noStyleValue" active-text="无样式模式" />
                </div>
                <el-x-bubble 
                    content="样式变体与形状示例" 
                    :variant="currentVariant" 
                    :shape="currentShape" 
                    :max-width="maxWidthValue + 'px'" 
                    :no-style="noStyleValue"
                    placement="start" 
                />
            </div>

            <div class="demo-block">
                <h3>头像与加载状态</h3>
                <div class="control-row">
                    <h4>头像大小：</h4>
                    <el-slider style="width: 200px;" v-model="avatarSizeValue" :min="20" :max="60" :step="5" />
                </div>
                <div class="control-row">
                    <h4>头像间距：</h4>
                    <el-slider style="width: 200px;" v-model="avatarGapValue" :min="0" :max="30" :step="2" />
                </div>
                <div class="control-row">
                    <h4>头像形状：</h4>
                    <el-radio-group v-model="avatarShapeValue">
                        <el-radio-button label="circle">圆形</el-radio-button>
                        <el-radio-button label="square">方形</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="control-row">
                    <el-switch v-model="loadingValue" active-text="显示加载状态" />
                </div>
                <el-x-bubble 
                    :loading="loadingValue" 
                    content="头像与加载状态示例" 
                    placement="start" 
                    avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" 
                    :avatar-size="avatarSizeValue" 
                    :avatar-gap="avatarGapValue" 
                    :avatar-shape="avatarShapeValue" 
                    avatar-icon="el-icon-user-solid"
                />
            </div>

            <div class="demo-block">
                <h3>Markdown与高级功能</h3>
                <div class="control-row">
                    <el-switch v-model="isMarkdownValue" active-text="启用Markdown" />
                </div>
                <div class="control-row">
                    <el-switch v-model="isFogValue" active-text="启用雾化效果" />
                </div>
                <el-x-bubble 
                    ref="markdownBubble" 
                    :typing="true" 
                    :is-fog="isFogValue" 
                    :is-markdown="isMarkdownValue" 
                    :content="markdownContent" 
                    placement="start" 
                />
                <div class="demo-controls">
                    <el-button size="small" type="primary" @click="restartmdTyping">预览</el-button>
                </div>
            </div>

            <div class="demo-block">
                <h3>自定义插槽</h3>
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
                <el-x-bubble placement="end" class="mt-10">
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
            </div>
        </el-card>

        <el-card class="demo-card">
            <div slot="header">
                <h2>实际应用场景</h2>
            </div>

            <div class="demo-block">
                <h3>模拟聊天</h3>
                <div class="chat-container">
                    <el-x-bubble content="你好，有什么可以帮您的吗？" placement="start" :avatarSize="avatarSizeValue" avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <el-x-bubble content="我想了解这个组件如何使用" placement="end" :avatarSize="avatarSizeValue" avatar="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="mt-10" />
                    <el-x-bubble content="这个组件支持打字机效果、Markdown渲染等功能"  placement="start" :avatarSize="avatarSizeValue" avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="mt-10" />
                </div>
                <div class="demo-controls">
                    <el-input v-model="newMessage" placeholder="输入消息..." @keyup.enter="sendMessage">
                        <el-button slot="append" icon="el-icon-s-promotion" @click="sendMessage" />
                    </el-input>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'BubbleDemo',
    data() {
        return {
            isTyping: false,
            isPaused: false,
            typingInterval: 50,
            typingStep: 2,
            typingSuffix: '|',
            currentVariant: 'filled',
            currentShape: '',
            maxWidthValue: 500,
            noStyleValue: false,
            avatarSizeValue: 40,
            avatarGapValue: 12,
            avatarShapeValue: 'circle',
            loadingValue: false,
            isMarkdownValue: true,
            isFogValue: true,
            newMessage: '',
            chatMessages: [
                {
                    content: '你好，有什么可以帮您的吗？',
                    placement: 'start',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
                {
                    content: '我想了解这个组件如何使用',
                    placement: 'end',
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                },
                {
                    content: '这个组件支持打字机效果、Markdown渲染等功能',
                    placement: 'start',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
            ],
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
        sendMessage() {
            if (!this.newMessage.trim()) return

            // 用户消息
            this.chatMessages.push({
                content: this.newMessage,
                placement: 'end',
                avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            })

            // AI回复
            setTimeout(() => {
                this.chatMessages.push({
                    content: `这是对"${this.newMessage}"的回复`,
                    placement: 'start',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                })
            }, 1000)

            this.newMessage = ''
        },
    },
}
</script>

<style lang="scss" scoped>
h3 {
    font-weight: bold !important;
    font-size: 20px !important;
}

.demo-card {
    margin-bottom: 20px;
}

.demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;

    h3 {
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 500;
    }
}

.demo-controls {
    margin-top: 20px;
}

.control-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    h4 {
        margin: 0 10px 0 0;
        font-size: 14px;
        font-weight: normal;
        width: 80px;
    }
}

.mt-10 {
    margin-top: 10px;
}

.chat-container {
    max-height: 300px;
    overflow-y: auto;
}

.footer-container {
    padding: 4px 0 0;
    display: flex;
    gap: 8px;
    
    ::v-deep .el-button + .el-button {
        margin-left: 8px;
    }

    ::v-deep .el-button:last-child {
        background: #626aef;
        color: #fff;
    }
}
</style>

