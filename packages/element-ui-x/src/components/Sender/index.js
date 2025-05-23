import ElXSender from './src/main.vue';

/* istanbul ignore next */
ElXSender.install = function (Vue) {
  Vue.component(ElXSender.name, ElXSender);
};

export default ElXSender;
