<template>
  <div
    :class="containerClass"
    :style="styleConfig"
    class="el-x-welcome"
  >
    <!--  image - 使用条件渲染兼容 Vue 2.5.x -->
    <slot
      v-if="$slots.image"
      name="image"
    />
    <div
      v-else-if="hasIcon"
      :class="iconClass"
      :style="styles && styles.icon"
      class="el-x-welcome-icon"
    >
      <el-image
        :src="icon"
        class="icon-image"
      />
    </div>

    <div class="content-wrapper">
      <!-- extra -->
      <div
        v-if="hasTitleOrExtra"
        class="title-wrapper"
      >
        <div
          v-if="title"
          :class="titleClass"
          :style="styles && styles.title"
          class="el-x-welcome-title"
        >
          {{ title }}
        </div>
        <div
          v-if="hasExtraOrSlot"
          :class="extraClass"
          :style="styles && styles.extra"
          class="el-x-welcome-extra"
        >
          <!-- 使用条件渲染兼容 Vue 2.5.x -->
          <slot
            v-if="$slots.extra"
            name="extra"
          />
          <template v-else>{{ extra }}</template>
        </div>
      </div>

      <!--  description -->
      <div
        v-if="hasDescription"
        :class="descriptionClass"
        :style="styles && styles.description"
        class="el-x-welcome-description"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElXWelcome',
    props: {
      className: {
        type: String,
        default: '',
      },
      rootClassName: {
        type: String,
        default: '',
      },
      variant: {
        type: String,
        default: 'filled',
        validator: value => ['filled', 'borderless'].includes(value),
      },
      direction: {
        type: String,
        default: 'ltr',
        validator: value => ['ltr', 'rtl'].includes(value),
      },
      classNames: {
        type: Object,
        default: () => ({}),
      },
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      extra: {
        type: [String, Object],
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
      styleConfig: {
        type: Object,
        default: () => ({}),
      },
      styles: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      hasIcon() {
        return !!this.icon;
      },
      hasTitleOrExtra() {
        return !!this.title || !!this.extra;
      },
      hasExtraOrSlot() {
        return !!this.extra || !!this.$slots.extra;
      },
      hasDescription() {
        return !!this.description;
      },
      containerClass() {
        return [
          this.className,
          this.rootClassName,
          `el-x-welcome-${this.variant}`,
          { 'el-x-welcome-rtl': this.direction === 'rtl' },
        ];
      },
      iconClass() {
        return this.classNames && this.classNames.icon;
      },
      titleClass() {
        return this.classNames && this.classNames.title;
      },
      extraClass() {
        return this.classNames && this.classNames.extra;
      },
      descriptionClass() {
        return this.classNames && this.classNames.description;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/Welcome.scss';
</style>
