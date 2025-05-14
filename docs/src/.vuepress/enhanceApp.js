import ElementUI from 'element-ui'
import ElementXUI from 'element-x-ui'
import 'element-ui/lib/theme-chalk/index.css' // 必须引入样式文件

export default ({ Vue }) => {
  Vue.use(ElementUI)
  Vue.use(ElementXUI)
}