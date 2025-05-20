<template>
    <div class="el-x-send-button">
        <el-button circle @click="$emit('cancel')" size="small">
            <loading class="loading-svg" />
        </el-button>
    </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
    name: 'LoadingButton',
    components: {
        Loading,
    },
}
</script>

<style scoped lang="scss">
@import '~element-ui/packages/theme-chalk/src/common/var';

.el-x-send-button {
    .el-button {
        padding: 0;
        width: 32px;
        height: 32px;
    }
    .loading-svg {
        color: $--color-primary;
        width: 100%;
        height: 100%;
    }
}
</style> 