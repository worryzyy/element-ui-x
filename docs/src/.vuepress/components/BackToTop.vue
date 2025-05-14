<template>
  <div class="back-to-top" :class="{ 'back-to-top-show': show }" @click="scrollToTop">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      show: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.show = window.pageYOffset > 300
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary, #409EFF);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top-show {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--color-primary-light, #66b1ff);
}
</style>
