import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BackToTop from './components/BackToTop.vue';
import EnHero from './components/EnHero.vue';
import Hero from './components/Hero.vue';

export default async ({ Vue, router, isServer }) => {
  Vue.component('BackToTop', BackToTop);
  Vue.component('Hero', Hero);
  Vue.component('EnHero', EnHero);

  Vue.prototype.$message = Message;
  Vue.use(ElementUI);
  // 解决引入自己组件报错document未找到的问题
  let isElementUIXLoaded = false;
  Vue.mixin({
    mounted() {
      if (!isElementUIXLoaded) {
        import('vue-element-ui-x').then(function (m) {
          Vue.use(m.default);
          isElementUIXLoaded = true;
        });
      }
    },
  });
  if (!isServer) {
    const module = await import('vue-element-ui-x');
    Vue.use(module.default || module);
  }

  // // 修复锚点滚动和页面切换的滚动行为
  // router.options.scrollBehavior = (to, from, savedPosition) => {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else if (to.hash) {
  //     // 处理锚点跳转
  //     const position = { selector: to.hash };
  //     // 添加延迟以确保DOM已渲染
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         // 查找元素并滚动到位置
  //         const element = document.querySelector(to.hash);
  //         if (element) {
  //           const offsetTop = element.offsetTop - 80; // 留出顶部导航的空间
  //           resolve({ x: 0, y: offsetTop });
  //         } else {
  //           resolve({ x: 0, y: 0 });
  //         }
  //       }, 100);
  //     });
  //   } else if (to.path !== from.path) {
  //     return { x: 0, y: 0 };
  //   } else {
  //     return false;
  //   }
  // };
};
