<template>
  <div 
    :class="[
      'el-x-prompts', 
      { 'el-x-prompts-rtl': direction === 'rtl' },
      rootClassName
    ]" 
    :style="customStyle"
  >
    <!-- 标题 -->
    <h5 
      v-if="title" 
      class="el-x-prompts-title"
      :class="[classNames.title]"
      :style="titleStyle"
    >
      {{ title }}
    </h5>
    
    <!-- 提示列表 -->
    <div 
      :class="[
        'el-x-prompts-list', 
        { 
          'el-x-prompts-list-wrap': wrap,
          'el-x-prompts-list-vertical': vertical
        },
        classNames.list
      ]"
      :style="listStyle"
    >
      <div
        v-for="(info, index) in items"
        :key="info.key || `key_${index}`"
        :class="[
          'el-x-prompts-item',
          {
            'el-x-prompts-item-disabled': info.disabled,
            'el-x-prompts-item-has-nest': hasChildren(info)
          },
          classNames.item
        ]"
        :style="itemStyle"
        @click="handleItemClick(info)"
      >
        <!-- 图标 -->
        <div v-if="info.icon" class="el-x-prompts-icon">
          <slot name="icon" :item="info">
            <i :class="info.icon"></i>
          </slot>
        </div>
        
        <!-- 内容 -->
        <div 
          :class="[
            'el-x-prompts-content',
            classNames.itemContent
          ]"
          :style="itemContentStyle"
        >
          <!-- 标签 -->
          <h6 v-if="info.label" class="el-x-prompts-label">
            <slot name="label" :item="info">
              {{ info.label }}
            </slot>
          </h6>
          
          <!-- 描述 -->
          <p v-if="info.description" class="el-x-prompts-desc">
            <slot name="description" :item="info">
              {{ info.description }}
            </slot>
          </p>
          
          <!-- 子项 -->
          <component
            :is="$options.name"
            v-if="hasChildren(info)"
            class="el-x-prompts-nested"
            :items="info.children"
            :vertical="true"
            :on-item-click="onItemClick"
            :class-names="{
              list: classNames.subList,
              item: classNames.subItem
            }"
            :styles="{
              list: styles.subList,
              item: styles.subItem
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElXPrompts",
  
  props: {
    /**
     * 包含多个提示项的列表
     */
    items: {
      type: Array,
      default: () => []
    },
    
    /**
     * 显示在提示列表顶部的标题
     */
    title: {
      type: String,
      default: ''
    },
    
    /**
     * Item 提示项被点击时的回调函数
     */
    onItemClick: {
      type: Function,
      default: null
    },
    
    /**
     * 提示列表是否垂直排列
     */
    vertical: {
      type: Boolean,
      default: false
    },
    
    /**
     * 提示列表是否换行
     */
    wrap: {
      type: Boolean,
      default: false
    },
    
    /**
     * 自定义样式，用于各个提示项的不同部分
     */
    styles: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * 自定义样式类名，用于各个提示项的不同部分
     */
    classNames: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * 根节点的样式类名
     */
    rootClassName: {
      type: String,
      default: ''
    },
    
    /**
     * 自定义样式
     */
    customStyle: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * 方向
     */
    direction: {
      type: String,
      default: 'ltr'
    }
  },
  
  computed: {
    titleStyle() {
      return {
        ...this.styles.title
      };
    },
    
    listStyle() {
      return {
        ...this.styles.list
      };
    },
    
    itemStyle() {
      return {
        ...this.styles.item
      };
    },
    
    itemContentStyle() {
      return {
        ...this.styles.itemContent
      };
    }
  },
  
  methods: {
    hasChildren(item) {
      return item.children && item.children.length > 0;
    },
    
    handleItemClick(info) {
      if (this.onItemClick && !info.disabled) {
        this.onItemClick({ data: info });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/Prompts.scss';
</style>