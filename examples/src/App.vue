<template>
  <div id="app">
    <el-container
      v-if="$route.path !== '/difychat'"
      class="app-container"
    >
      <!-- 侧边栏 -->
      <el-aside class="app-aside">
        <div class="aside-content">
          <!-- Logo 区域 -->
          <div class="logo-section">
            <img
              src="../public/logo.png"
              alt="Logo"
              class="header-logo"
            />
            <h1
              @click="goHome"
              class="header-title"
            >
              Element-UI-X
            </h1>
          </div>

          <!-- 侧边栏菜单 -->
          <div class="sidebar-nav">
            <el-menu
              :default-active="$route.path"
              router
              class="nav-menu"
            >
              <!-- 总览 -->
              <el-menu-item
                v-for="item in menuConfig"
                :key="item.index"
                :index="item.index"
                :data-index="item.index"
              >
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </el-menu-item>

              <!-- 分组菜单 -->
              <el-menu-item-group
                v-for="group in menuGroups"
                :key="group.title"
                :title="group.title"
              >
                <el-menu-item
                  v-for="item in group.items"
                  :key="item.index"
                  :index="isProjectItem(group.title) ? '' : item.index"
                  @click="handleMenuClick(item, group.title)"
                >
                  <i :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </div>
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-container class="main-container">
        <!-- 顶部标题栏 -->
        <el-header class="app-header">
          <div class="header-content">
            <h2 class="page-title">{{ getCurrentPageTitle() }}</h2>
            <div class="header-links">
              <el-tooltip
                content="查看文档"
                placement="bottom"
              >
                <a
                  href="https://element-ui-x.com"
                  target="_blank"
                  class="header-link"
                >
                  <i class="el-icon-document"></i>
                </a>
              </el-tooltip>
              <el-tooltip
                content="GitHub 仓库"
                placement="bottom"
              >
                <a
                  href="https://github.com/worryzyy/element-ui-x"
                  target="_blank"
                  class="header-link github-link"
                ></a>
              </el-tooltip>
            </div>
          </div>
        </el-header>

        <!-- 主内容 -->
        <el-main class="app-main">
          <div class="main-content">
            <!-- 页面内容 -->
            <div
              class="page-content"
              ref="pageContent"
            >
              <router-view></router-view>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- DifyChat 独立页面 -->
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { menuConfig, menuGroups, getPageTitle } from './utils/menuConfig';

  export default {
    name: 'App',
    data() {
      return {
        isDark: false,
        menuConfig,
        menuGroups,
      };
    },
    watch: {
      $route() {
        this.$nextTick(() => {
          if (this.$refs.pageContent) {
            this.$refs.pageContent.scrollTop = 0;
          }
        });
      },
    },

    methods: {
      getCurrentPageTitle() {
        return getPageTitle(this.$route.path);
      },
      goHome() {
        this.$router.push('/');
      },
      isProjectItem(groupTitle) {
        return groupTitle === '实战项目';
      },
      handleMenuClick(item, groupTitle) {
        if (this.isProjectItem(groupTitle)) {
          const newUrl = window.location.origin + window.location.pathname + '#' + item.index;
          window.open(newUrl, '_blank');
        } else {
          this.$router.push(item.index);
        }
      },
    },
  };
</script>

<style lang="scss">
  // 导入主布局样式
  @import './assets/styles/app-layout.scss';
</style>
