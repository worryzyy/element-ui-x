import ElXTypewriter from './components/Typewriter/main.vue'
import ElXBubble from './components/Bubble/main.vue'
import ElXBubbleList from './components/BubbleList/main.vue'
import ElXWelcome from './components/Welcome/main.vue'
import ElXPrompts from './components/Prompts/main.vue'
import ElXConversations from './components/Conversations/main.vue';



const components = [
  ElXTypewriter,
  ElXBubble,
  ElXBubbleList,
  ElXWelcome,
  ElXPrompts,
  ElXConversations
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

}

export default {
  version: '1.0.0',
  install,
  ...components
}
