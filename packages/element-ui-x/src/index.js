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

const components = [
  ElXTypewriter,
  ElXBubble,
  ElXBubbleList,
  ElXWelcome,
  ElXPrompts,
  ElXConversations,
  ElXThinking,
  ElXThink,
  ElXThoughtChain,
  ElXSender,
  ElXFilesCard,
  ElXAttachments,
];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

export default {
  version: '1.0.0',
  install,
  customMixins,
  ...components,
};
// 单独导出 mixins 以便按需引入
export { customMixins };
