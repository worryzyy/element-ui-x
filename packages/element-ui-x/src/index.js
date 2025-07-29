import ElXAttachments from './components/Attachments/index.js';
import ElXBubble from './components/Bubble/index.js';
import ElXBubbleList from './components/BubbleList/index.js';
import ElXConversations from './components/Conversations/index.js';
import ElXFilesCard from './components/FilesCard/index.js';
import ElXPrompts from './components/Prompts/index.js';
import ElXSender from './components/Sender/index.js';
import ElXThinking from './components/Thinking/index.js';
import ElXThoughtChain from './components/ThoughtChain/index.js';
import ElXTypewriter from './components/Typewriter/index.js';
import ElXWelcome from './components/Welcome/index.js';

// 导入 mixins
import {
  createSendUtils,
  createStreamUtils,
  recordMixin,
  sendMixin,
  streamMixin,
  XRequest,
  XStream,
} from './mixins';
// 导入国际化功能
import locale from './locale';
import lang from './locale/lang';

const components = [
  ElXTypewriter,
  ElXBubble,
  ElXBubbleList,
  ElXPrompts,
  ElXConversations,
  ElXThinking,
  ElXThoughtChain,
  ElXSender,
  ElXFilesCard,
  ElXAttachments,
  ElXWelcome,
];

const install = function (Vue, opts = {}) {
  // 处理国际化配置
  if (opts.locale) {
    locale.use(opts.locale);
  }
  if (opts.i18n) {
    locale.i18n(opts.i18n);
  }

  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// 具名导出（按需引入）- 组件和Mixins
export {
  // Mixins
  createSendUtils,
  createStreamUtils,
  recordMixin,
  sendMixin,
  streamMixin,
  XRequest,
  XStream,
  // 组件
  ElXAttachments,
  ElXBubble,
  ElXBubbleList,
  ElXConversations,
  ElXFilesCard,
  ElXPrompts,
  ElXSender,
  ElXThinking,
  ElXThoughtChain,
  ElXTypewriter,
  ElXWelcome,
  lang,
  // 国际化
  locale,
};

// 默认导出（完整引入）
const ElementUIX = {
  version: '0.2.2',
  install,
  locale,
  lang,
};

// 将组件添加到默认导出对象中
components.forEach(component => {
  ElementUIX[component.name] = component;
});

// 添加mixins
ElementUIX.streamMixin = streamMixin;
ElementUIX.sendMixin = sendMixin;
ElementUIX.recordMixin = recordMixin;
ElementUIX.createStreamUtils = createStreamUtils;
ElementUIX.createSendUtils = createSendUtils;
ElementUIX.XRequest = XRequest;
ElementUIX.XStream = XStream;

export default ElementUIX;
