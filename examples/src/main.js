import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import './assets/styles/reset.css';

import ElementUIX from 'vue-element-ui-x';
import enlang from 'vue-element-ui-x/lib/locale/lang/en';
import zhCNlang from 'vue-element-ui-x/lib/locale/lang/zh-CN';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';

// 导入 SVG 图标
import './utils/svg-icons';

// 导入并全局注册 SvgIcon 组件
import SvgIcon from '../components/SvgIcon.vue';
Vue.component('SvgIcon', SvgIcon);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en', // 设置默认语言
  messages: {
    en: enlang,
    'zh-CN': zhCNlang,
  },
});

Vue.use(ElementUI);
// 正确的 ElementUIX i18n 配置
Vue.use(ElementUIX, { i18n: (key, value) => i18n.t(key, value) });

Vue.config.productionTip = false;

new Vue({
  router,
  el: '#app',
  i18n,
  render: h => h(App),
});
