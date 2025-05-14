<template>
    <div class="typewriter-demo">
        <h3>基础打字机示例</h3>

        <div class="demo-section">
            <el-card class="demo-card">
                <div slot="header">
                    <span>文本内容</span>
                </div>
                <el-x-typewriter
                    :text="demoText"
                    :type-speed="typeSpeed"
                    :show-cursor="showCursor"
                    :has-blur="hasBlur"
                    :auto-start="autoStart"
                    :start-delay="startDelay"
                    @typing-start="onTypingStart"
                    @typing-progress="onTypingProgress"
                    @typing-complete="onTypingComplete"
                    @typing-erased="onTypingErased"
                    ref="typewriter"
                />
            </el-card>
        </div>

        <div class="demo-controls">
            <el-card class="demo-card">
                <div slot="header">
                    <span>控制面板</span>
                </div>

                <el-form label-width="100px" size="small">
                    <el-form-item label="文本内容">
                        <el-input v-model="demoText" type="textarea" :rows="3" placeholder="输入要显示的文本"></el-input>
                    </el-form-item>

                    <el-form-item label="打字速度">
                        <el-slider v-model="typeSpeed" :min="10" :max="100" :step="5" :marks="{10: '快', 50: '中', 100: '慢'}" style="width: 100%;"></el-slider>
                    </el-form-item>

                    <el-form-item label="延迟时间">
                        <el-input-number v-model="startDelay" :min="0" :max="3000" :step="100" controls-position="right"></el-input-number>
                        <span class="unit-label">毫秒</span>
                    </el-form-item>

                    <el-form-item label="功能选项">
                        <el-switch v-model="showCursor" active-text="显示光标"></el-switch>
                        <el-switch v-model="hasBlur" active-text="模糊效果" class="ml-20"></el-switch>
                        <el-switch v-model="autoStart" active-text="自动开始" class="ml-20"></el-switch>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="startTyping">开始打字</el-button>
                        <el-button @click="typeAll">立即完成</el-button>
                        <el-button @click="eraseAll">清空</el-button>
                        <el-button @click="resetTypewriter">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>

        <div class="demo-events">
            <el-card class="demo-card">
                <div slot="header">
                    <span>事件日志</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="clearLogs">清空日志</el-button>
                </div>
                <div class="events-log">
                    <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                        <span class="log-time">{{ log.time }}</span>
                        <span class="log-type" :class="'log-type-' + log.type">{{ log.type }}</span>
                        <span class="log-message">{{ log.message }}</span>
                    </div>
                    <div v-if="eventLogs.length === 0" class="no-logs">暂无事件日志</div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TypewriterBasicDemo',
    data() {
        return {
            demoText: '欢迎使用 Element-X 打字机组件！这是一个用于模拟 AI 回复内容逐字显示的组件，可以提升用户交互体验。',
            typeSpeed: 30,
            showCursor: true,
            hasBlur: false,
            autoStart: true,
            startDelay: 0,
            eventLogs: [],
            progressPercent: 0,
        }
    },
    methods: {
        startTyping() {
            this.$refs.typewriter.startTyping()
        },
        typeAll() {
            this.$refs.typewriter.typeAll()
        },
        eraseAll() {
            this.$refs.typewriter.eraseAll()
        },
        resetTypewriter() {
            this.$refs.typewriter.resetTypewriter()
            this.addLog('manual', '手动重置打字机状态')
        },
        onTypingStart() {
            this.progressPercent = 0
            this.addLog('typing-start', '打字开始')
        },
        onTypingProgress(data) {
            // 只记录整数百分比变化，避免日志过多
            const newPercent = Math.floor(data.progress * 100)
            if (newPercent > this.progressPercent) {
                this.progressPercent = newPercent
                this.addLog('typing-progress', `进度 ${this.progressPercent}%`)
            }
        },
        onTypingComplete(text) {
            this.addLog('typing-complete', `打字完成，文本长度: ${text.length}字符`)
        },
        onTypingErased() {
            this.addLog('typing-erased', '文本已清空')
        },
        addLog(type, message) {
            const now = new Date()
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
                .getSeconds()
                .toString()
                .padStart(2, '0')}`

            this.eventLogs.unshift({
                time: timeString,
                type: type,
                message: message,
            })

            // 限制日志数量
            if (this.eventLogs.length > 50) {
                this.eventLogs.pop()
            }
        },
        clearLogs() {
            this.eventLogs = []
        },
    },
}
</script>

<style lang="scss" scoped>
.typewriter-demo {
    padding: 20px;

    h3 {
        margin-top: 0;
        margin-bottom: 20px;
        font-weight: 500;
    }

    .demo-section,
    .demo-controls,
    .demo-events {
        margin-bottom: 20px;
    }

    .demo-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .unit-label {
        margin-left: 10px;
        color: #909399;
    }

    .ml-20 {
        margin-left: 20px;
    }

    .events-log {
        height: 200px;
        overflow-y: auto;
        padding: 10px;
        background-color: #f5f7fa;
        border-radius: 4px;
    }

    .log-item {
        font-family: monospace;
        line-height: 1.5;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #ebeef5;
    }

    .log-time {
        color: #909399;
        margin-right: 10px;
    }

    .log-type {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 3px;
        margin-right: 10px;
        font-size: 12px;

        &.log-type-typing-start {
            background-color: #e6f1fc;
            color: #409eff;
        }

        &.log-type-typing-progress {
            background-color: #f0f9eb;
            color: #67c23a;
        }

        &.log-type-typing-complete {
            background-color: #f0f9eb;
            color: #67c23a;
            font-weight: bold;
        }

        &.log-type-typing-erased {
            background-color: #fdf6ec;
            color: #e6a23c;
        }

        &.log-type-manual {
            background-color: #f4f4f5;
            color: #909399;
        }
    }

    .log-message {
        word-break: break-all;
    }

    .no-logs {
        color: #909399;
        text-align: center;
        padding: 30px 0;
    }
}
</style> 