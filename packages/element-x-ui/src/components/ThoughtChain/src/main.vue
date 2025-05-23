<template>
  <div class="el-x-thoughtchain">
    <el-timeline
      ref="timelineRef"
      :style="{
        maxWidth: maxWidth,
      }"
    >
      <transition-group
        name="thought-chain"
        tag="div"
      >
        <el-timeline-item
          v-for="item in thinkingItems"
          :key="getId(item)"
          :type="getType(item)"
          :icon="dotIsIcon ? item.icon : 'el-icon-more'"
          :color="dotIsIcon ? item.iconColor : null"
          :size="dotIsIcon ? item.iconSize : 'normal'"
          :timestamp="getTitle(item)"
          :hide-timestamp="item.hideTitle"
          :placement="item.placement || 'top'"
        >
          <div v-if="!item.isCanExpand">
            <el-x-typewriter
              :content="getThinkTitle(item)"
              :is-markdown="item.isMarkdown"
              :typing="item.typing"
            />
          </div>
          <el-collapse
            v-else-if="!item.isDefaultExpand"
            @change="() => handleExpand(item)"
          >
            <el-collapse-item :title="getThinkTitle(item)">
              <el-x-typewriter
                :content="getThinkContent(item)"
                :is-markdown="item.isMarkdown"
                :typing="item.typing"
              />
            </el-collapse-item>
          </el-collapse>
          <el-collapse
            v-else
            v-model="defaultActiveNodes"
            @change="() => handleExpand(item)"
          >
            <el-collapse-item
              :title="getThinkTitle(item)"
              :name="String(getId(item))"
            >
              <el-x-typewriter
                :content="getThinkContent(item)"
                :is-markdown="item.isMarkdown"
                :typing="item.typing"
              />
            </el-collapse-item>
          </el-collapse>

          <template
            v-if="!dotIsIcon"
            slot="dot"
          >
            <div
              class="el-x-thoughtchain-item-dot"
              :style="{ margin: dotMargin }"
            >
              <slot
                name="icon"
                :item="item"
              >
                <el-button
                  circle
                  :type="getType(item)"
                  :loading="isLoading(item)"
                  :size="dotSize"
                >
                  <template slot="loading">
                    <i class="el-icon-loading el-x-thoughtchain-loading"></i>
                  </template>

                  <i
                    v-if="!isLoading(item) && !isError(item)"
                    class="el-icon-check"
                  ></i>
                  <i
                    v-if="!isLoading(item) && isError(item)"
                    class="el-icon-close"
                  ></i>
                </el-button>
              </slot>
            </div>
          </template>
        </el-timeline-item>
      </transition-group>
    </el-timeline>
  </div>
</template>

<script>
  import { get } from 'lodash';
  import ElXTypewriter from '../../Typewriter/index.js';
  export default {
    name: 'ElXThoughtChain',
    components: {
      ElXTypewriter,
    },
    props: {
      thinkingItems: {
        type: Array,
        default: () => [],
      },
      dotIsIcon: {
        type: Boolean,
        default: false,
      },
      dotSize: {
        type: String,
        default: 'small',
      },
      maxWidth: {
        type: String,
        default: '600px',
      },
      lineGradient: {
        type: Boolean,
        default: false,
      },
      rowKey: {
        type: String,
        default: 'id',
      },
      statusKey: {
        type: String,
        default: 'status',
      },
      statusEnum: {
        type: Object,
        default: () => ({
          loading: {
            value: 'loading',
            type: 'warning',
          },
          error: {
            value: 'error',
            type: 'danger',
          },
          success: {
            value: 'success',
            type: 'success',
          },
        }),
      },
      titleKey: {
        type: String,
        default: 'title',
      },
      thinkTitleKey: {
        type: String,
        default: 'thinkTitle',
      },
      thinkContentKey: {
        type: String,
        default: 'thinkContent',
      },
    },
    data() {
      return {
        colorArr: {
          // 使用与SCSS变量对应的字符串表示
          info: 'var(--color-info, #909399)',
          success: 'var(--color-success, #67C23A)',
          warning: 'var(--color-warning, #E6A23C)',
          danger: 'var(--color-danger, #F56C6C)',
          primary: 'var(--color-primary, #409EFF)',
        },
        defaultActiveNodes: [],
      };
    },
    computed: {
      dotMargin() {
        switch (this.dotSize) {
          case 'mini':
            return '-8px 0 0 -9px';
          case 'small':
            return '-8px 0 0 -11px';
          case 'medium':
            return '-8px 0 0 -13px';
          default:
            return '-8px 0 0 -16px';
        }
      },
      getLineColor() {
        if (this.thinkingItems.length) {
          const arr = this.thinkingItems.map(item => {
            const _type_ = this.getType(item);
            if (_type_) {
              return this.colorArr[_type_];
            }
            return '';
          });
          return arr;
        }
        return [];
      },
      activeNamesComputed() {
        return this.thinkingItems
          .filter(item => item.isCanExpand && item.isDefaultExpand)
          .map(item => String(this.getId(item)));
      },
    },
    watch: {
      activeNamesComputed: {
        handler(v) {
          this.defaultActiveNodes = [...v];
        },
        immediate: true,
      },
      getLineColor() {
        this.$nextTick(() => {
          this.getEle();
        });
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.getEle();
      });
    },
    methods: {
      handleExpand(item) {
        this.$emit('handleExpand', item);
      },
      setRadialGradient(colors, ele) {
        const length = ele.length;
        Array.from(ele).forEach((item, index) => {
          const line = item.children[0];
          if (line) {
            line.setAttribute(
              'style',
              `
            border: none;
            width:2px;
            background: linear-gradient(to bottom, ${colors[index]} 0% , ${
                colors[index < length ? index + 1 : index]
              } 100%);
          `,
            );
          }
        });
      },
      getEle() {
        if (this.getLineColor && this.$refs.timelineRef && this.lineGradient) {
          const ele = this.$refs.timelineRef.$el.children[0].children;
          this.setRadialGradient(this.getLineColor, ele);
        }
      },
      isLoading(item) {
        const status = this.getStatus(item);
        return status === this.statusEnum.loading.value;
      },
      isError(item) {
        const status = this.getStatus(item);
        return status === this.statusEnum.error.value;
      },
      getId(item) {
        return get(item, this.rowKey);
      },
      getType(item) {
        const status = this.getStatus(item);
        // 优先查找statusEnum中value匹配的项
        const matchedStatus = Object.values(this.statusEnum).find(s => s.value === status);
        return matchedStatus ? matchedStatus.type : 'success';
      },

      getTitle(item) {
        return get(item, this.titleKey) || '';
      },
      getThinkTitle(item) {
        return get(item, this.thinkTitleKey) || '';
      },
      getThinkContent(item) {
        return get(item, this.thinkContentKey) || '';
      },
      getStatus(item) {
        return get(item, this.statusKey);
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../../styles/ThoughtChain.scss';
</style>
