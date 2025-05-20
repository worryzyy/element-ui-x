<template>
    <svg :class="className" color="currentColor" :viewBox="`0 0 ${SIZE} ${SIZE}`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Speech Recording</title>

        <rect v-for="(item, index) in rects" :key="index" fill="currentColor" :rx="RECT_RADIUS" :ry="RECT_RADIUS" :height="RECT_HEIGHT_MIN" :width="RECT_WIDTH" :x="item.x" :y="item.yMin">
            <animate
                attributeName="height"
                :values="`${RECT_HEIGHT_MIN}; ${RECT_HEIGHT_MAX}; ${RECT_HEIGHT_MIN}`"
                keyTimes="0; 0.5; 1"
                :dur="`${DURATION}s`"
                :begin="`${(DURATION / COUNT) * index}s`"
                repeatCount="indefinite"
            />
            <animate
                attributeName="y"
                :values="`${item.yMin}; ${item.yMax}; ${item.yMin}`"
                keyTimes="0; 0.5; 1"
                :dur="`${DURATION}s`"
                :begin="`${(DURATION / COUNT) * index}s`"
                repeatCount="indefinite"
            />
        </rect>
    </svg>
</template>

<script>
export default {
    name: 'SpeechLoading',

    props: {
        className: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            // 定义常量
            SIZE: 1000,
            COUNT: 4,
            RECT_WIDTH: 140,
            RECT_RADIUS: 70, // RECT_WIDTH / 2
            RECT_HEIGHT_MIN: 250,
            RECT_HEIGHT_MAX: 500,
            DURATION: 0.8,
        }
    },

    computed: {
        // 计算矩形的位置和高度范围
        rects() {
            const dest = (this.SIZE - this.RECT_WIDTH * this.COUNT) / (this.COUNT - 1)
            return Array.from({ length: this.COUNT }).map((_, index) => {
                const x = index * (dest + this.RECT_WIDTH)
                const yMin = this.SIZE / 2 - this.RECT_HEIGHT_MIN / 2
                const yMax = this.SIZE / 2 - this.RECT_HEIGHT_MAX / 2
                return { x, yMin, yMax }
            })
        },
    },
}
</script>

<style scoped></style> 