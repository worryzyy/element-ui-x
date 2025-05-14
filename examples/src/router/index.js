import Vue from 'vue'
import Router from 'vue-router'
import Typewriter from '../views/Typewriter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/typewriter',
      name: 'Typewriter',
      component: Typewriter
    },
    {
      path: '*',
      redirect: '/typewriter'
    }
  ]
})
