import ElXTypewriter from './components/Typewriter.vue'
import ElXBubble from './components/Bubble.vue'


const components = [
  ElXTypewriter,
  ElXBubble
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
