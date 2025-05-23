import ElXTypewriter from './components/Typewriter/index.js';
import ElXBubble from './components/Bubble/index.js';
import ElXBubbleList from './components/BubbleList/index.js';
import ElXWelcome from './components/Welcome/index.js';
import ElXPrompts from './components/Prompts/index.js';
import ElXConversations from './components/Conversations/index.js';
import ElXThinking from './components/Thinking/index.js';
import ElXThink from './components/Think/index.js';
import ElXThoughtChain from './components/ThoughtChain/index.js';
import ElXSender from './components/Sender/index.js';
import ElXFilesCard from './components/FilesCard/index.js';
import ElXAttachments from './components/Attachments/index.js';

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
  ...components,
};
