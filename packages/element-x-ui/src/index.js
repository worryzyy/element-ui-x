import ElXTypewriter from './components/Typewriter.vue'

const components = [
  ElXTypewriter
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
