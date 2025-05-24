import ElXAttachments from './components/Attachments/index.js';
import ElXBubble from './components/Bubble/index.js';
import ElXBubbleList from './components/BubbleList/index.js';
import ElXConversations from './components/Conversations/index.js';
import ElXFilesCard from './components/FilesCard/index.js';
import ElXPrompts from './components/Prompts/index.js';
import ElXSender from './components/Sender/index.js';
import ElXThink from './components/Think/index.js';
import ElXThinking from './components/Thinking/index.js';
import ElXThoughtChain from './components/ThoughtChain/index.js';
import ElXTypewriter from './components/Typewriter/index.js';
import ElXWelcome from './components/Welcome/index.js';
// 导入所有 mixins
import * as customMixins from './mixins';
import { streamMixin, sendMixin, recordMixin } from './mixins';

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

// 默认导出（完整引入）
export default {
  version: '1.0.0',
  install,
  customMixins,
  ...components,
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
  ElXThink,
  ElXThinking,
  ElXThoughtChain,
  ElXTypewriter,
  ElXWelcome,
};

// 具名导出（按需引入）- Mixins
export {
  customMixins,
  streamMixin,
  sendMixin,
  recordMixin,
};
