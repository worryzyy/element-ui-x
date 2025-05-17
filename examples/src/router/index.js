import Vue from 'vue'
import Router from 'vue-router'
import Typewriter from '../views/Typewriter.vue'
import Bubble from '../views/Bubble.vue'
import BubbleList from '../views/BubbleList.vue'
import Welcome from '../views/Welcome.vue'
import Prompts from '../views/Prompts.vue'


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
      path: '/bubbleList',
      name: 'BubbleList',
      component: BubbleList
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/prompts',
      name: 'Prompts',
      component: Prompts
    },
    {
      path: '*',
      redirect: '/typewriter'
    }
  ]
})
