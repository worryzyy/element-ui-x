import Locale from './index';

export default {
  methods: {
    elXt(...args) {
      return Locale.t.apply(this, args);
    },
  },
};
