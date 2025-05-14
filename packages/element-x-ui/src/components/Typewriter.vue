<template>
    <div ref="typeWriterRef" class="typer-container">
        <div
            ref="markdownContentRef"
            class="typer-content"
            :class="[
        {
          'markdown-content': isMarkdown,
          'typing-cursor': typing && mergedConfig.suffix && isTyping,
          'typing-cursor-foggy': isFog && typing && mergedConfig.suffix && isTyping,
          'typing-markdown-cursor-foggy': isMarkdown && isFog && typing && isTyping,
        },
        isMarkdown ? 'markdown-body' : '',
    ]"
            :style="{
      '--cursor-char': `'${mergedConfig.suffix}'`,
      '--cursor-fog-bg-color': isFog ? (typeof isFog === 'object' ? (isFog.bgColor || 'var(--el-fill-color)') : 'var(--el-fill-color)') : '',
      '--cursor-fog-width': isFog ? (typeof isFog === 'object' ? (isFog.width || '80px') : '80px') : '',
      }"
            v-html="renderedContent"
        />
    </div>
</template>

<script>
import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

export default {
    name: 'ElXTypewriter',
    props: {
        content: {
            type: String,
            default: '',
        },
        isMarkdown: {
            type: Boolean,
            default: false,
        },
        typing: {
            type: [Boolean, Object],
            default: false,
        },
        isFog: {
            type: [Boolean, Object],
            default: false,
        },
        highlight: Function,
        mdPlugins: Array,
    },
    data() {
        return {
            isTyping: false,
            typingIndex: 0,
            contentCache: '',
            timer: null,
            md: new MarkdownIt({
                html: true,
                linkify: true,
                typographer: true,
                breaks: true,
                highlight: (code, lang) => {
                    try {
                        const grammar = Prism.languages[lang]
                        if (grammar) {
                            const highlighted = Prism.highlight(code, grammar, lang)
                            return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`
                        }
                        return `<pre class="language-${lang}"><code class="language-${lang}">${code}</code></pre>`
                    } catch {
                        return `<pre><code>${code}</code></pre>`
                    }
                },
            }),
        }
    },
    computed: {
        mergedConfig() {
            const defaultConfig = {
                step: typeof this.typing === 'object' ? (this.typing.step !== undefined ? this.typing.step : 2) : 2,
                interval: typeof this.typing === 'object' ? (this.typing.interval !== undefined ? this.typing.interval : 50) : 50,
                suffix: this.isMarkdown
                    ? ''
                    : typeof this.typing === 'object'
                    ? this.typing.suffix !== undefined
                        ? this.typing.suffix
                        : '|'
                    : '|',
            }
            return defaultConfig
        },
        processedContent() {
            if (!this.content) return ''
            if (!this.typing) return this.content
            return this.contentCache.slice(0, this.typingIndex)
        },
        typingProgress() {
            return this.contentCache ? Math.min((this.typingIndex / this.contentCache.length) * 100, 100) : 0
        },
        renderedContent() {
            if (!this.isMarkdown) return this.processedContent
            return DOMPurify.sanitize(this.md.render(this.processedContent))
        },
    },
    watch: {
        content: {
            immediate: true,
            handler(newVal, oldVal) {
                if (!this.typing) {
                    this.typingIndex = (newVal && newVal.length) || 0
                    this.isTyping = false
                    this.contentCache = newVal || ''
                    return
                }

                // 仅在内容完全不同时重置
                if (!oldVal || newVal !== oldVal) {
                    this.contentCache = newVal || ''
                    if (!this.isTyping) {
                        this.typingIndex = 0
                        this.startTyping()
                    }
                }
            },
        },
    },
    mounted() {
        this.initMarkdownPlugins()
        this.updateFogColor()
        this.$nextTick(() => {
            Prism.highlightAll()
        })
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        initMarkdownPlugins() {
            if (this.mdPlugins && this.mdPlugins.length) {
                this.mdPlugins.forEach((plugin) => {
                    this.md.use(plugin)
                })
            }
        },
        startTyping() {
            clearTimeout(this.timer)

            if (!this.typing || !this.contentCache) return

            this.isTyping = true
            this.$emit('start', this.getInstance())

            const typeNext = () => {
                this.typingIndex += this.mergedConfig.step
                this.$emit('writing', this.getInstance())

                if (this.typingIndex >= this.contentCache.length) {
                    this.finishTyping()
                    return
                }

                this.timer = setTimeout(typeNext, this.mergedConfig.interval)
            }

            this.timer = setTimeout(typeNext, this.mergedConfig.interval)
        },
        finishTyping() {
            this.isTyping = false
            this.typingIndex = this.contentCache.length
            this.$emit('finish', this.getInstance())
        },
        interrupt() {
            clearTimeout(this.timer)
            this.isTyping = false
            // 保留当前打字进度不重置
            this.$emit('interrupt', this.getInstance())
        },
        continueTyping() {
            if (this.typingIndex < this.contentCache.length) {
                this.isTyping = true
                this.$emit('continue', this.getInstance())
                this.startTyping()
            }
        },
        restart() {
            clearTimeout(this.timer)
            this.typingIndex = 0
            this.isTyping = true
            this.$emit('restart', this.getInstance())
            this.$nextTick(() => {
                this.startTyping()
            })
        },
        destroy() {
            clearTimeout(this.timer)
            this.timer = null
            this.typingIndex = 0
            this.isTyping = false
        },
        getInstance() {
            return {
                interrupt: this.interrupt,
                continue: this.continueTyping,
                restart: this.restart,
                destroy: this.destroy,
                renderedContent: this.renderedContent,
                isTyping: this.isTyping,
                progress: this.typingProgress,
            }
        },
        updateFogColor() {
            // 实现雾化颜色更新逻辑
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/Typewriter.scss';
@import 'prismjs/themes/prism.css';
// You can also use other themes from prismjs like:
// @import 'prismjs/themes/prism-coy.css';
// @import 'prismjs/themes/prism-dark.css';
// @import 'prismjs/themes/prism-okaidia.css';
// @import 'prismjs/themes/prism-tomorrow.css';
// @import 'prismjs/themes/prism-twilight.css';
</style>
