<template>
    <div class="el-x-send-button">
        <el-button circle @click="$emit('clear')" size="small">
            <i class="el-icon-brush"></i>
        </el-button>
    </div>
</template>

<script>
export default {
    name: 'ClearButton',
}
</script>

<style scoped lang="scss">
.el-x-send-button {
    .el-button {
        .el-icon-brush {
            // 旋转180
            transform: rotate(180deg);
        }
    }
}
</style> 