import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/styles/reset.css'
// import './assets/styles/theme.css'
import 'element-ui/lib/theme-chalk/index.css'

import ElementXUI from 'element-x-ui'
import App from './App.vue'
import router from './router'

Vue.use(ElementUI)
Vue.use(ElementXUI)

Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
