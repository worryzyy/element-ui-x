import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 Element UI 文档风格的代码高亮样式
import BackToTop from './components/BackToTop.vue';
import Hero from './components/Hero.vue';
export default async ({ Vue, router, isServer }) => {
  // Vue.use(ElementUI);
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
  // 同步加载UI库，确保SSR和客户端都能使用
  if (isServer) {
    // 服务端也需要注册组件，避免SSR错误
    const ElementUI = require('element-ui');
    const ElementUIX = require('vue-element-ui-x');
    Vue.use(ElementUI);
    Vue.use(ElementUIX.default || ElementUIX);
  } else {
    // 客户端立即加载
    const [ElementUI, ElementUIX] = await Promise.all([
      import('element-ui'),
      import('vue-element-ui-x'),
    ]);
    Vue.use(ElementUI.default || ElementUI);
    Vue.use(ElementUIX.default || ElementUIX);
  }
  // // 防止路由错误
  // if (!isServer) {
  //   if (!isServer) {
  //     import('vue-element-ui-x').then(ElementUIX => {
  //       Vue.use(ElementUIX.default || ElementUIX);
  //     });
  //   }
  //   // 添加全局错误处理
  //   window.addEventListener('error', event => {
  //     // 忽略路由相关错误
  //     if (event.message && event.message.includes('Cannot read properties of undefined')) {
  //       event.preventDefault();
  //       console.warn('Suppressed router error:', event.message);
  //     }
  //   });
  // }
};
