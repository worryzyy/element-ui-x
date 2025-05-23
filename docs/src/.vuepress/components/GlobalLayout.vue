<template>
  <div class="global-layout">
    <component :is="layout" />
    <BackToTop />
  </div>
</template>

<script>
  import BackToTop from './BackToTop.vue';

  export default {
    name: 'GlobalLayout',
    components: {
      BackToTop,
    },
    computed: {
      layout() {
        const layout = this.$page.frontmatter.layout;
        if (
          layout &&
          (this.$vuepress.getLayoutAsyncComponent(layout) || this.$vuepress.getVueComponent(layout))
        ) {
          return layout;
        }
        return 'Layout';
      },
    },
  };
</script>

<style>
  .global-layout {
    position: relative;
  }
</style>
