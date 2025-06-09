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
// 导入所有 mixins
import * as customMixins from './mixins';
import {
  createSendUtils,
  createStreamUtils,
  recordMixin,
  sendMixin,
  streamMixin,
  XRequest,
  XStream,
} from './mixins';

const components = [
  ElXTypewriter,
  ElXBubble,
  ElXBubbleList,
  ElXPrompts,
  ElXConversations,
  ElXThinking,
  ElXThink,
  ElXThoughtChain,
  ElXSender,
  ElXFilesCard,
  ElXAttachments,
  ElXWelcome,
];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// 具名导出（按需引入）- 组件
export {
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
};

// 具名导出（按需引入）- Mixins
export {
  createSendUtils,
  createStreamUtils,
  customMixins,
  recordMixin,
  sendMixin,
  streamMixin,
  XRequest,
  XStream,
};
// 默认导出（完整引入）
const ElementUIX = {
  version: '1.0.0',
  install,
};

// 将组件添加到默认导出对象中
components.forEach(component => {
  ElementUIX[component.name] = component;
});

// 添加mixins
ElementUIX.customMixins = customMixins;
ElementUIX.streamMixin = streamMixin;
ElementUIX.sendMixin = sendMixin;
ElementUIX.recordMixin = recordMixin;
ElementUIX.createStreamUtils = createStreamUtils;
ElementUIX.createSendUtils = createSendUtils;
ElementUIX.XRequest = XRequest;
ElementUIX.XStream = XStream;

export default ElementUIX;
