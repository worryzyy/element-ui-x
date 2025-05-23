import Vue from 'vue';
import Router from 'vue-router';
import Typewriter from '../views/Typewriter.vue';
import Bubble from '../views/Bubble.vue';
import BubbleList from '../views/BubbleList.vue';
import Welcome from '../views/Welcome.vue';
import Prompts from '../views/Prompts.vue';
import Conversations from '../views/Conversations.vue';
import Thinking from '../views/Thinking.vue';
import Think from '../views/Think.vue';
import ThoughtChain from '../views/ThoughtChain.vue';
import Sender from '../views/Sender.vue';
import FilesCard from '../views/FilesCard.vue';
import Attachments from '../views/Attachments.vue';
import Record from '../views/record.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/typewriter',
      name: 'Typewriter',
      component: Typewriter,
    },
    {
      path: '/bubble',
      name: 'Bubble',
      component: Bubble,
    },
    {
      path: '/bubbleList',
      name: 'BubbleList',
      component: BubbleList,
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/prompts',
      name: 'Prompts',
      component: Prompts,
    },
    {
      path: '/conversations',
      name: 'Conversations',
      component: Conversations,
    },
    {
      path: '/thinking',
      name: 'Thinking',
      component: Thinking,
    },
    {
      path: '/think',
      name: 'Think',
      component: Think,
    },
    {
      path: '/thoughtchain',
      name: 'ThoughtChain',
      component: ThoughtChain,
    },
    {
      path: '/sender',
      name: 'Sender',
      component: Sender,
    },
    {
      path: '/filescard',
      name: 'FilesCard',
      component: FilesCard,
    },
    {
      path: '/attachments',
      name: 'Attachments',
      component: Attachments,
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
    },
    {
      path: '*',
      redirect: '/typewriter',
    },
  ],
});
