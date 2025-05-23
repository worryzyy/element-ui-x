import ElXConversations from './src/main.vue';

/* istanbul ignore next */
ElXConversations.install = function (Vue) {
  Vue.component(ElXConversations.name, ElXConversations);
};

export default ElXConversations;
