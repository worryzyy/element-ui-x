import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 Element UI 文档风格的代码高亮样式
import BackToTop from './components/BackToTop.vue';
import Hero from './components/Hero.vue';
export default ({ Vue, router, isServer }) => {
  Vue.use(ElementUI);
  Vue.component('BackToTop', BackToTop);
  Vue.component('Hero', Hero);
  Vue.prototype.$message = Message;

  // 添加全局的路由切换后回到顶部的功能
  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  };

  // 防止路由错误
  if (!isServer) {
    if (!isServer) {
      import('vue-element-ui-x').then(ElementUIX => {
        Vue.use(ElementUIX.default || ElementUIX);
      });
    }
    // 添加全局错误处理
    window.addEventListener('error', event => {
      // 忽略路由相关错误
      if (event.message && event.message.includes('Cannot read properties of undefined')) {
        event.preventDefault();
        console.warn('Suppressed router error:', event.message);
      }
    });
  }
};
