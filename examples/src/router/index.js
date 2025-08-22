import Vue from 'vue';
import Router from 'vue-router';
import Attachments from '../views/Attachments.vue';
import Bubble from '../views/Bubble.vue';
import BubbleList from '../views/BubbleList.vue';
import Conversations from '../views/Conversations.vue';
import DifyChat from '../views/DifyChat/index.vue';
import EditorSender from '../views/EditorSender.vue';
import FilesCard from '../views/FilesCard.vue';
import Overview from '../views/Overview.vue';
import Prompts from '../views/Prompts.vue';
import RecordMixins from '../views/RecordMixins.vue';
import Request from '../views/Request.vue';
import Sender from '../views/Sender.vue';
import SendMixins from '../views/SendMixins.vue';
import StreamMixins from '../views/StreamMixins.vue';
import Thinking from '../views/Thinking.vue';
import ThoughtChain from '../views/ThoughtChain.vue';
import Typewriter from '../views/Typewriter.vue';
import Welcome from '../views/Welcome.vue';

Vue.use(Router);

// 解决 NavigationDuplicated 错误
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;

Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
  }
  return originalReplace.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

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
      path: '/editorsender',
      name: 'EditorSender',
      component: EditorSender,
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
      path: '/difychat',
      name: 'DifyChat',
      component: DifyChat,
      meta: { hideInMenu: true },
    },
    {
      path: '/xRequest',
      name: 'xRequest',
      component: Request,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
