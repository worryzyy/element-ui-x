export default {
  data() {
    return {
      // 侧边栏状态
      isSideCollapsed: false,
      // 移动端抽屉状态
      isMobileDrawerVisible: false,
    };
  },
  mounted() {
    // 添加窗口大小变化监听
    window.addEventListener('resize', this.handleResize);
    // 从localStorage恢复侧边栏状态
    const savedState = localStorage.getItem('dify-side-collapsed');
    if (savedState !== null) {
      this.isSideCollapsed = savedState === 'true';
    }
    // 初始化时检查屏幕大小
    this.handleResize();
  },
  beforeDestroy() {
    // 移除窗口大小变化监听
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 切换侧边栏展开/收起状态
    toggleSideMenu() {
      this.isSideCollapsed = !this.isSideCollapsed;
      // 保存状态到localStorage
      localStorage.setItem('dify-side-collapsed', this.isSideCollapsed);
    },
    // 切换移动端抽屉
    toggleMobileDrawer() {
      this.isMobileDrawerVisible = !this.isMobileDrawerVisible;
    },
    // 处理窗口大小变化
    handleResize() {
      const windowWidth = window.innerWidth;
      // 当屏幕宽度小于1024px时，如果侧边栏是展开的，则自动收缩
      if (windowWidth < 1024 && !this.isSideCollapsed) {
        this.isSideCollapsed = true;
        localStorage.setItem('dify-side-collapsed', 'true');
      }
    },
  },
};
