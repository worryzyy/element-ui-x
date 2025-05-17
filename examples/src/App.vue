<template>
    <div id="app">
        <el-container>
            <el-header>
                <h1>Element X UI 示例</h1>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="/typewriter">
                            <i class="el-icon-edit"></i>
                            <span>Typewriter</span>
                        </el-menu-item>
                        <el-menu-item index="/bubble">
                            <i class="el-icon-edit"></i>
                            <span>Bubble</span>
                        </el-menu-item>
                        <el-menu-item index="/bubblelist">
                            <i class="el-icon-edit"></i>
                            <span>BubbleList</span>
                        </el-menu-item>
                        <el-menu-item index="/welcome">
                            <i class="el-icon-edit"></i>
                            <span>Welcome</span>
                        </el-menu-item>
                        <el-menu-item index="/prompts">
                            <i class="el-icon-edit"></i>
                            <span>Prompts</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="scss">
#app {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
body {
    margin: 0;
    padding: 0;
    background-color: #f5f7fa;
    color: #333;
    overflow: hidden;
}
.el-header {
    color: #fff;
    line-height: 60px;
    text-align: center;
    flex: 0 0 auto;
}

.el-container {
    flex: 1;
    overflow: hidden;
    display: flex;
}

.el-aside {
    background-color: #545c64;
    color: #fff;
    width: 200px;
    flex-shrink: 0;
}

.el-main {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
}
</style>
