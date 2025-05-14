import ElementUI from 'element-ui'
import ElementXUI from 'element-x-ui'
import 'element-ui/lib/theme-chalk/index.css' // 必须引入样式文件
import BackToTop from './components/BackToTop.vue'

export default ({ Vue, router }) => {
  Vue.use(ElementUI)
  Vue.use(ElementXUI)
  Vue.component('BackToTop', BackToTop)
  
  // 添加全局的路由切换后回到顶部的功能
  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}