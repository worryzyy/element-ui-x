import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import './assets/styles/reset.css';

import ElementUIX from 'vue-element-ui-x';
import App from './App.vue';
import router from './router';
Vue.use(ElementUI);
Vue.use(ElementUIX);

Vue.config.productionTip = false;

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
