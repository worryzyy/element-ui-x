import Vue from 'vue';
import Router from 'vue-router';
import Attachments from '../views/Attachments.vue';
import Bubble from '../views/Bubble.vue';
import BubbleList from '../views/BubbleList.vue';
import Conversations from '../views/Conversations.vue';
import FilesCard from '../views/FilesCard.vue';
import Overview from '../views/Overview.vue';
import Prompts from '../views/Prompts.vue';
import RecordMixins from '../views/RecordMixins.vue';
import Sender from '../views/Sender.vue';
import SendMixins from '../views/SendMixins.vue';
import StreamMixins from '../views/StreamMixins.vue';
import Thinking from '../views/Thinking.vue';
import ThoughtChain from '../views/ThoughtChain.vue';
import Typewriter from '../views/Typewriter.vue';
import Welcome from '../views/Welcome.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Overview,
    },
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
      path: '/bubblelist',
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
      name: 'RecordMixins',
      component: RecordMixins,
    },
    {
      path: '/sendmixins',
      name: 'SendMixins',
      component: SendMixins,
    },
    {
      path: '/streammixins',
      name: 'StreamMixins',
      component: StreamMixins,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
