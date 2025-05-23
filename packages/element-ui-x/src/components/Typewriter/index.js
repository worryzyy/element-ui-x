import ElXTypewriter from './src/main.vue';

/* istanbul ignore next */
ElXTypewriter.install = function (Vue) {
  Vue.component(ElXTypewriter.name, ElXTypewriter);
};

export default ElXTypewriter;
