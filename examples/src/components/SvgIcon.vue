<template>
  <svg
    :class="svgClass"
    :style="iconStyle"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  export default {
    name: 'SvgIconSprite',
    props: {
      iconClass: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: 'currentColor',
      },
      size: {
        type: [String, Number],
        default: '16px',
      },
    },
    computed: {
      iconName() {
        return `#icon-${this.name}`;
      },
      svgClass() {
        return ['svg-icon', this.iconClass];
      },
      iconStyle() {
        const sizeValue = typeof this.size === 'number' ? this.size + 'px' : this.size;
        return {
          color: this.color,
          width: sizeValue,
          height: sizeValue,
          fill: 'currentColor',
          verticalAlign: 'middle',
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~element-ui/packages/theme-chalk/src/common/var';

  .svg-icon {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    fill: currentColor;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
