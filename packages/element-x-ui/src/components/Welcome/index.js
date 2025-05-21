import ElXWelcome from './src/main.vue';

/* istanbul ignore next */
ElXWelcome.install = function (Vue) {
  Vue.component(ElXWelcome.name, ElXWelcome);
};

export default ElXWelcome;
