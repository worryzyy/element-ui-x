import ElXThink from './src/main.vue';

/* istanbul ignore next */
ElXThink.install = function (Vue) {
  Vue.component(ElXThink.name, ElXThink);
};

export default ElXThink;
