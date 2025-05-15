<template>
    <div>
        <el-card class="demo-card">
            <div slot="header">
                <h2>BubbleList 气泡对话框列表</h2>
            </div>

            <div class="demo-block">
                <h3>基础用法</h3>
                <el-x-bubble-list :list="basicList" max-height="300px" ref="basicDemo" />
                <div class="demo-controls">
                    <el-button-group>
                        <el-button size="small" type="primary" @click="addMessage('start')">添加左侧消息</el-button>
                        <el-button size="small" type="primary" @click="addMessage('end')">添加右侧消息</el-button>
                        <el-button size="small" @click="clearMessages">清空列表</el-button>
                    </el-button-group>
                </div>
            </div>

            <div class="demo-block">
                <h3>滚动与返回按钮</h3>
                <div class="control-row">
                    <h4>最大高度：</h4>
                    <el-slider v-model="maxHeight" :min="200" :max="500" :step="50" />
                </div>
                <div class="control-row">
                    <el-switch v-model="showBackButton" active-text="显示返回按钮" />
                </div>
                <el-x-bubble-list :list="scrollList" :max-height="maxHeight + 'px'" :show-back-button="showBackButton" :back-button-position="backButtonPosition" ref="scrollDemo" />
                <div class="demo-controls">
                    <el-button-group>
                        <el-button size="small" type="primary" @click="scrollToTop">滚动到顶部</el-button>
                        <el-button size="small" type="primary" @click="scrollToBottom">滚动到底部</el-button>
                        <el-button size="small" @click="scrollToMessage(5)">滚动到第5条</el-button>
                    </el-button-group>
                </div>
            </div>

            <div class="demo-block">
                <h3>加载状态与按钮样式</h3>
                <div class="control-row">
                    <h4>按钮颜色：</h4>
                    <el-color-picker v-model="btnColor" size="small" />
                </div>
                <div class="control-row">
                    <h4>图标大小：</h4>
                    <el-slider v-model="btnIconSize" :min="16" :max="32" :step="2" />
                </div>
                <el-x-bubble-list :list="loadingList" max-height="300px" :btn-loading="btnLoading" :btn-color="btnColor" :btn-icon-size="btnIconSize" ref="loadingDemo" />
            </div>
        </el-card>

        <el-card class="demo-card">
            <div slot="header">
                <h2>实际应用场景</h2>
            </div>

            <div class="demo-block">
                <h3>AI对话模拟</h3>
                <el-x-bubble-list :list="chatList" max-height="400px" :show-back-button="true" ref="chatDemo" />
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
    data() {
        return {
            basicList: [
                {
                    content: '这是一个左侧气泡消息',
                    placement: 'start',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
                {
                    content: '这是一个右侧气泡消息',
                    placement: 'end',
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                },
            ],
            scrollList: Array.from({ length: 20 }, (_, i) => ({
                content: `滚动列表消息${i + 1}`,
                placement: i % 2 === 0 ? 'start' : 'end',
                avatar:
                    i % 2 === 0
                        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            })),
            loadingList: [
                {
                    content: '加载中消息1',
                    placement: 'start',
                    loading: true,
                },
                {
                    content: '加载中消息2',
                    placement: 'end',
                    loading: true,
                },
            ],
            chatList: [
                {
                    content: '你好，我是AI助手，有什么可以帮您？',
                    placement: 'start',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
            ],
            maxHeight: 300,
            showBackButton: true,
            backButtonPosition: {
                bottom: '20px',
                left: 'calc(50% - 19px)',
            },
            btnLoading: true,
            btnColor: '#409EFF',
            btnIconSize: 24,
            newMessage: '',
            messageCount: 0,
        }
    },
    methods: {
        addMessage(placement) {
            this.messageCount++
            const message = {
                content: `这是第${this.messageCount}条${placement === 'start' ? '左侧' : '右侧'}消息`,
                placement,
                avatar:
                    placement === 'start'
                        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            }
            this.basicList.push(message)
            this.$nextTick(() => {
                this.$refs.basicDemo.scrollToBottom()
            })
        },
        clearMessages() {
            this.basicList = []
            this.messageCount = 0
        },
        scrollToTop() {
            this.$refs.scrollDemo.scrollToTop()
        },
        scrollToBottom() {
            this.$refs.scrollDemo.scrollToBottom()
        },
        scrollToMessage(index) {
            this.$refs.scrollDemo.scrollToBubble(index - 1)
        },
        sendMessage() {
            if (!this.newMessage.trim()) return

            // 用户消息
            this.chatList.push({
                content: this.newMessage,
                placement: 'end',
                avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            })

            // AI回复
            setTimeout(() => {
                this.chatList.push({
                    content: `这是对"${this.newMessage}"的回复`,
                    placement: 'start',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                })
                this.$nextTick(() => {
                    this.$refs.chatDemo.scrollToBottom()
                })
            }, 1000)

            this.newMessage = ''
            this.$nextTick(() => {
                this.$refs.chatDemo.scrollToBottom()
            })
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
</style>
