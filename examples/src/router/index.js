import Vue from 'vue'
import Router from 'vue-router'
import Typewriter from '../views/Typewriter.vue'
import Bubble from '../views/Bubble.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/typewriter',
      name: 'Typewriter',
      component: Typewriter
    },
    {
      path: '/bubble',
      name: 'Bubble',
      component: Bubble
    },
    {
      path: '*',
      redirect: '/typewriter'
    }
  ]
})
