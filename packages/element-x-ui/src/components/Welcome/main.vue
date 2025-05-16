<template>
    <div :class="[
        'el-x-welcome',
        className,
        rootClassName,
        `el-x-welcome-${variant}`,
        { [`el-x-welcome-rtl`]: direction === 'rtl' }
      ]" :style="style">
        <!-- Icon -->
        <div v-if="iconNode" :class="[`el-x-welcome-icon`, classNames.icon]" :style="styles.icon">
            <img v-if="typeof icon === 'string' && icon.startsWith('http')" :src="icon" alt="icon" />
            <template v-else>
                {{ icon }}
                <i :class="`el-icon-${icon}`"></i>
            </template>
        </div>

        <!-- Content -->
        <div :class="`el-x-welcome-content-wrapper`">
            <!-- Title -->
            <div v-if="extra" :class="`el-x-welcome-title-wrapper`">
                <div v-if="title" :class="[`el-x-welcome-title`, classNames.title]" :style="styles.title">
                    <h4>{{ title }}</h4>
                </div>
                <div v-if="extra" :class="[`el-x-welcome-extra`, classNames.extra]" :style="styles.extra">{{ extra }}</div>
            </div>
            <div v-else-if="title" :class="[`el-x-welcome-title`, classNames.title]" :style="styles.title">
                <h4>{{ title }}</h4>
            </div>

            <!-- Description -->
            <div v-if="description" :class="[`el-x-welcome-description`, classNames.description]" :style="styles.description">{{ description }}</div>
        </div>
    </div>
</template>
  
  <script>
export default {
    name: 'ElXWelcome',
    props: {
        rootClassName: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
        style: {
            type: Object,
            default: () => ({}),
        },
        variant: {
            type: String,
            default: 'filled',
            validator: (value) => ['filled', 'borderless'].includes(value),
        },
        // Semantic
        classNames: {
            type: Object,
            default: () => ({}),
        },
        styles: {
            type: Object,
            default: () => ({}),
        },
        // Layout
        icon: {
            type: [String, Object],
            default: null,
        },
        title: {
            type: [String, Object],
            default: null,
        },
        description: {
            type: [String, Object],
            default: null,
        },
        extra: {
            type: [String, Object],
            default: null,
        },
        direction: {
            type: String,
            default: 'ltr',
        },
    },
    computed: {
        iconNode() {
            return this.icon !== null
        },
    },
}
</script>
  
 <style scoped lang="scss">
@import '../../styles/Welcome.scss';
</style>