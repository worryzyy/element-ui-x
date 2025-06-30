<template>
  <div
    class="el-x-conversations-container"
    :style="{
      '--conversation-label-height': `${labelHeight}px`,
      '--conversation-list-auto-bg-color': mergedStyle.backgroundColor,
    }"
  >
    <slot name="header"></slot>
    <ul
      class="el-x-conversations-list"
      :style="mergedStyle"
    >
      <!-- 滚动区域容器 -->
      <li class="el-x-conversations-scroll-wrapper">
        <!-- 虚拟滚动模式 -->
        <template v-if="virtualScroll">
          <!-- 虚拟粘性分组标题 -->
          <div
            v-if="shouldUseGrouping && currentStickyGroup"
            class="virtual-sticky-header"
            :class="{ 'active-sticky': true }"
          >
            <div class="el-x-conversation-group-title sticky-title active-sticky">
              <slot
                name="group-title"
                :group="currentStickyGroup"
              >
                {{ currentStickyGroup.title }}
              </slot>
            </div>
          </div>

          <recycle-scroller
            ref="virtualScrollContainer"
            class="el-x-conversations-virtual-scrollbar"
            :class="{ 'has-sticky-header': shouldUseGrouping }"
            :items="flattenedList"
            :item-size="virtualScrollOptions.size || 60"
            :buffer="virtualScrollOptions.buffer || 200"
            key-field="key"
            @scroll="handleVirtualScroll"
          >
            <template #default="{ item }">
              <div class="virtual-item-wrapper">
                <!-- 会话项目 -->
                <conversations-item
                  :item="item"
                  :active="item.uniqueKey === active"
                  :items-style="itemsStyle"
                  :items-hover-style="itemsHoverStyle"
                  :items-active-style="itemsActiveStyle"
                  :items-menu-opened-style="itemsMenuOpenedStyle"
                  :prefix-icon="item.prefixIcon"
                  :show-tooltip="showTooltip"
                  :tooltip-placement="tooltipPlacement"
                  :tooltip-offset="tooltipOffset"
                  :suffix-icon="item.suffixIcon"
                  :active-key="active || ''"
                  :label-max-width="labelMaxWidth"
                  :menu="menu"
                  :show-built-in-menu="showBuiltInMenu"
                  :menu-placement="menuPlacement"
                  :menu-style="menuStyle"
                  :menu-show-arrow="menuShowArrow"
                  @click="handleClick(item)"
                  @menu-command="handleMenuItemClick"
                >
                  <!-- 传递插槽 -->
                  <template
                    v-if="$scopedSlots.label"
                    #label
                  >
                    <slot
                      name="label"
                      :item="item"
                    ></slot>
                  </template>

                  <template
                    v-if="$scopedSlots['more-filled']"
                    #more-filled="moreFilledSoltProps"
                  >
                    <slot
                      name="more-filled"
                      v-bind="moreFilledSoltProps"
                    ></slot>
                  </template>

                  <template
                    v-if="$scopedSlots.menu"
                    #menu
                  >
                    <slot
                      name="menu"
                      :item="item"
                    ></slot>
                  </template>
                </conversations-item>
              </div>
            </template>
          </recycle-scroller>
        </template>

        <!-- 原生滚动模式 -->
        <div
          v-else
          ref="scrollContainer"
          class="el-x-conversations-scrollbar"
          @scroll="handleScroll"
        >
          <div class="scroll-content">
            <template v-if="shouldUseGrouping">
              <!-- 分组显示 -->
              <div
                v-for="group in groups"
                :key="group.key"
                :ref="el => bindGroupRef(el, group)"
                class="el-x-conversation-group"
              >
                <div
                  class="el-x-conversation-group-title sticky-title"
                  :class="{ 'active-sticky': stickyGroupKeys.has(group.key) }"
                >
                  <slot
                    name="group-title"
                    :group="group"
                  >
                    {{ group.title }}
                  </slot>
                </div>
                <div class="el-x-conversation-group-items">
                  <conversations-item
                    v-for="item in group.children"
                    :key="item.uniqueKey"
                    :item="item"
                    :active="item.uniqueKey === active"
                    :items-style="itemsStyle"
                    :items-hover-style="itemsHoverStyle"
                    :items-active-style="itemsActiveStyle"
                    :items-menu-opened-style="itemsMenuOpenedStyle"
                    :prefix-icon="item.prefixIcon"
                    :show-tooltip="showTooltip"
                    :tooltip-placement="tooltipPlacement"
                    :tooltip-offset="tooltipOffset"
                    :suffix-icon="item.suffixIcon"
                    :active-key="active || ''"
                    :label-max-width="labelMaxWidth"
                    :menu="menu"
                    :show-built-in-menu="showBuiltInMenu"
                    :menu-placement="menuPlacement"
                    :menu-style="menuStyle"
                    :menu-show-arrow="menuShowArrow"
                    @click="handleClick(item)"
                    @menu-command="handleMenuItemClick"
                  >
                    <!-- 传递插槽 -->
                    <template
                      v-if="$scopedSlots.label"
                      #label
                    >
                      <slot
                        name="label"
                        :item="item"
                      ></slot>
                    </template>

                    <template
                      v-if="$scopedSlots['more-filled']"
                      #more-filled="moreFilledSoltProps"
                    >
                      <slot
                        name="more-filled"
                        v-bind="moreFilledSoltProps"
                      ></slot>
                    </template>

                    <template
                      v-if="$scopedSlots.menu"
                      #menu
                    >
                      <slot
                        name="menu"
                        :item="item"
                      ></slot>
                    </template>
                  </conversations-item>
                </div>
              </div>
            </template>

            <template v-else>
              <conversations-item
                v-for="item in filteredItems"
                :key="item.uniqueKey"
                :item="item"
                :items-style="itemsStyle"
                :items-hover-style="itemsHoverStyle"
                :items-active-style="itemsActiveStyle"
                :active="item.uniqueKey === active"
                :items-menu-opened-style="itemsMenuOpenedStyle"
                :prefix-icon="item.prefixIcon"
                :show-tooltip="showTooltip"
                :tooltip-placement="tooltipPlacement"
                :tooltip-offset="tooltipOffset"
                :suffix-icon="item.suffixIcon"
                :active-key="active || ''"
                :label-max-width="labelMaxWidth"
                :menu="menu"
                :show-built-in-menu="showBuiltInMenu"
                :menu-placement="menuPlacement"
                :menu-style="menuStyle"
                :menu-show-arrow="menuShowArrow"
                @click="handleClick(item)"
                @menu-command="handleMenuItemClick"
              >
                <!-- 传递插槽 -->
                <template
                  v-if="$scopedSlots.label"
                  #label
                >
                  <slot
                    name="label"
                    :item="item"
                  ></slot>
                </template>

                <template
                  v-if="$scopedSlots['more-filled']"
                  #more-filled="moreFilledSoltProps"
                >
                  <slot
                    name="more-filled"
                    v-bind="moreFilledSoltProps"
                  ></slot>
                </template>

                <template
                  v-if="$scopedSlots.menu"
                  #menu
                >
                  <slot
                    name="menu"
                    :item="item"
                  ></slot>
                </template>
              </conversations-item>
            </template>

            <!-- 加载更多 -->
            <div
              v-if="loadMoreLoading"
              class="el-x-conversations-load-more"
            >
              <slot name="load-more">
                <i class="el-icon-loading el-x-conversations-load-more-is-loading"></i>
                <span>加载更多...</span>
              </slot>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <slot name="footer"></slot>
    <!-- 滚动到顶部按钮 -->
    <el-button
      v-show="showScrollTop && showToTopBtn"
      class="scroll-to-top-btn"
      size="small"
      circle
      :type="toTopBtnType"
      :style="toTopBtnStyle"
      @click="scrollToTop"
    >
      <i class="el-icon-top"></i>
    </el-button>
  </div>
</template>

<script>
  import { get } from 'lodash';
  import { RecycleScroller } from 'vue-virtual-scroller';
  import ConversationsItem from './components/item.vue';
  export default {
    name: 'ElXConversations',

    components: { ConversationsItem, RecycleScroller },

    props: {
      items: {
        type: Array,
        default: () => [],
      },
      itemsStyle: {
        type: Object,
        default: () => ({}),
      },
      itemsHoverStyle: {
        type: Object,
        default: () => ({}),
      },
      itemsActiveStyle: {
        type: Object,
        default: () => ({}),
      },
      itemsMenuOpenedStyle: {
        type: Object,
        default: () => ({}),
      },
      styleConfig: {
        type: Object,
        default: () => ({}),
      },
      showTooltip: {
        type: Boolean,
        default: false,
      },
      groupable: {
        type: [Boolean, Object],
        default: false,
      },
      labelMaxWidth: {
        type: Number,
        default: undefined,
      },
      labelHeight: {
        type: Number,
        default: 20,
      },
      showBuiltInMenu: {
        type: Boolean,
        default: false,
      },
      menu: {
        type: Array,
        default: () => [
          {
            label: '重命名',
            key: 'rename',
            icon: 'el-icon-edit',
            command: 'rename',
          },
          {
            label: '删除',
            key: 'delete',
            icon: 'el-icon-delete',
            command: 'delete',
            menuItemHoverStyle: {
              color: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
          },
        ],
      },
      ungroupedTitle: {
        type: String,
        default: '未分组',
      },
      tooltipPlacement: {
        type: String,
        default: 'top',
      },
      tooltipOffset: {
        type: Number,
        default: 12,
      },
      menuPlacement: {
        type: String,
        default: 'bottom-start',
      },

      menuShowArrow: {
        type: Boolean,
        default: false,
      },
      menuClassName: {
        type: String,
        default: '',
      },

      menuStyle: {
        type: Object,
        default: () => ({}),
      },

      loadMoreLoading: {
        type: Boolean,
        default: false,
      },
      showToTopBtn: {
        type: Boolean,
        default: false,
      },
      toTopBtnType: {
        type: String,
        default: 'primary',
        validator: value =>
          ['primary', 'success', 'warning', 'danger', 'info', 'text'].includes(value),
      },
      toTopBtnStyle: {
        type: Object,
        default: () => ({}),
      },
      labelKey: {
        type: String,
        default: 'label',
      },
      rowKey: {
        type: String,
        default: 'id',
      },
      active: {
        type: [String, Number, Boolean],
        default: '',
      },
      loadMore: {
        type: Function,
        default: null,
      },
      virtualScroll: {
        type: Boolean,
        default: false,
      },
      virtualScrollOptions: {
        type: Object,
        default: () => ({
          size: 60,
          buffer: 200,
        }),
      },
      virtualScrollCustomHandler: {
        type: Function,
        default: null,
      },
    },

    data() {
      return {
        showScrollTop: false,
        groupRefs: {},
        stickyGroupKeys: new Set(),
        currentStickyGroup: null, // 当前虚拟粘性分组
      };
    },

    computed: {
      itemsUse() {
        return this.items.map((item, index) => ({
          ...item,
          uniqueKey: this.rowKey ? get(item, this.rowKey) : index.toString(),
          label: get(item, this.labelKey),
        }));
      },

      mergedStyle() {
        const defaultStyle = {
          padding: '10px 0 10px 10px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          width: '280px',
          height: '0',
        };
        return {
          ...defaultStyle,
          ...this.styleConfig,
        };
      },

      shouldUseGrouping() {
        return !!this.groupable;
      },

      filteredItems() {
        return this.itemsUse;
      },

      groups() {
        // 如果不需要分组，则返回空数组
        if (!this.shouldUseGrouping) return [];

        // 检查filteredItems是否有值
        if (!this.filteredItems || this.filteredItems.length === 0) {
          return [];
        }

        // 用于存储每个组的项目
        const groupMap = {};

        // 使用过滤后的项目进行分组
        this.filteredItems.forEach(item => {
          let groupName = null;

          // 优先使用item中的group字段
          if (item.group) {
            groupName = item.group;
          }
          // 如果没有找到分组，使用未分组
          const finalGroupName = groupName || this.ungroupedTitle;

          // 若该组尚未创建，则创建一个新组
          if (!groupMap[finalGroupName]) {
            groupMap[finalGroupName] = {
              title: finalGroupName,
              key: finalGroupName,
              children: [],
              isUngrouped: !groupName, // 如果没有找到组名，则标记为未分组
            };
          }

          // 将项目添加到相应的组中
          groupMap[finalGroupName].children.push(item);
        });

        // 将分组转换为数组
        const groupArray = Object.values(groupMap);

        // 如果有自定义排序函数，使用它排序
        if (typeof this.groupable === 'object' && this.groupable.sort) {
          return groupArray.sort((a, b) => {
            // 确保未分组总是在最后
            if (a.isUngrouped) return 1;
            if (b.isUngrouped) return -1;

            const sortFn = this.groupable.sort;
            return sortFn ? sortFn(a.key, b.key) : 0;
          });
        }

        // 否则只确保未分组在最后，不做其他排序
        return groupArray.sort((a, b) => {
          // 确保未分组总是在最后
          if (a.isUngrouped) return 1;
          if (b.isUngrouped) return -1;

          // 不做其他排序
          return 0;
        });
      },

      // 虚拟滚动用的扁平化列表
      flattenedList() {
        if (!this.virtualScroll) return [];

        if (this.shouldUseGrouping) {
          const result = [];
          this.groups.forEach(group => {
            // 直接添加分组内容，不添加分组标题项
            group.children.forEach(item => {
              result.push({
                type: 'item',
                ...item,
                groupKey: group.key,
                groupTitle: group.title, // 添加分组标题信息用于粘性标题显示
                isUngrouped: group.isUngrouped,
                // 为虚拟滚动指定项目的高度
                virtualHeight: this.virtualScrollOptions.size || 60,
                size: this.virtualScrollOptions.size || 60,
              });
            });
          });
          return result;
        } else {
          return this.filteredItems.map(item => ({
            type: 'item',
            ...item,
            virtualHeight: this.virtualScrollOptions.size || 60,
            size: this.virtualScrollOptions.size || 60,
          }));
        }
      },
    },

    mounted() {
      // 如果有分组，默认将第一个分组设置为吸顶状态
      if (this.shouldUseGrouping && this.groups.length > 0) {
        // 添加第一个组的key到吸顶状态集合中
        this.stickyGroupKeys.add(this.groups[0].key);

        // 虚拟滚动模式下初始化粘性分组
        if (this.virtualScroll) {
          this.currentStickyGroup = this.groups[0];
        }
      }
    },

    methods: {
      handleClick(item) {
        // 如果是disabled状态，则不允许选中
        if (item.disabled) return;
        this.$emit('change', item);
      },

      handleScroll(e) {
        // 获取滚动容器
        const scrollContainer = this.$refs.scrollContainer;
        if (!scrollContainer) return;

        const scrollTop = scrollContainer.scrollTop;

        // 显示/隐藏回到顶部按钮
        this.showScrollTop = scrollTop > 200;

        // 检查是否需要加载更多
        const bottomOffset = 20;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;

        // 计算是否接近底部
        const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset;

        if (isNearBottom) {
          this.loadMoreData();
        }

        // 更新吸顶状态
        this.updateStickyStatus();
      },

      handleVirtualScroll(e) {
        // 如果用户提供了自定义滚动处理方法，先调用它
        if (
          this.virtualScrollCustomHandler &&
          typeof this.virtualScrollCustomHandler === 'function'
        ) {
          const result = this.virtualScrollCustomHandler(e, {
            scrollTop: e.target.scrollTop,
            scrollHeight: e.target.scrollHeight,
            clientHeight: e.target.clientHeight,
            virtualContainer: this.$refs.virtualScrollContainer,
          });

          // 如果自定义处理返回 false，则跳过默认处理
          if (result === false) {
            return;
          }
        }

        // 虚拟滚动事件处理
        const scrollTop = e.target.scrollTop;

        // 显示/隐藏回到顶部按钮
        this.showScrollTop = scrollTop > 200;

        // 检查是否需要加载更多
        const bottomOffset = 20;
        const scrollHeight = e.target.scrollHeight;
        const clientHeight = e.target.clientHeight;

        // 计算是否接近底部
        const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset;

        if (isNearBottom) {
          this.loadMoreDataVirtual();
        }

        // 更新虚拟滚动模式下的吸顶状态
        this.updateVirtualStickyStatus();

        // 触发滚动事件
        this.$emit('scroll', e);
      },

      updateStickyStatus() {
        if (!this.shouldUseGrouping || this.groups.length === 0) return;

        // 先清空当前的吸顶组
        this.stickyGroupKeys.clear();

        // 获取滚动容器
        const scrollContainer = this.$refs.scrollContainer;
        if (!scrollContainer) return;

        // 如果只有一个分组，直接设置为吸顶状态
        if (this.groups.length === 1) {
          this.stickyGroupKeys.add(this.groups[0].key);
          return;
        }

        const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
        const containerHeight = scrollContainer.clientHeight;
        const scrollHeight = scrollContainer.scrollHeight;
        const scrollTop = scrollContainer.scrollTop;

        // 判断是否已经滚动到底部
        const isNearBottom = scrollHeight - scrollTop - containerHeight < 20;

        // 如果已接近底部，直接使最后一个分组吸顶
        if (isNearBottom && this.groups.length > 0) {
          this.stickyGroupKeys.add(this.groups[this.groups.length - 1].key);
          return;
        }

        // 检查每个分组的位置
        const visibleGroups = [];

        // 收集所有可见的分组
        for (const group of this.groups) {
          const groupElement = this.groupRefs[group.key];
          if (groupElement) {
            const groupRect = groupElement.getBoundingClientRect();
            const relativeTop = groupRect.top - scrollContainerTop;

            // 分组至少部分可见
            if (relativeTop < containerHeight && relativeTop + groupRect.height > 0) {
              visibleGroups.push({
                group,
                relativeTop,
                height: groupRect.height,
              });
            }
          }
        }

        // 对可见分组按相对位置排序
        visibleGroups.sort((a, b) => a.relativeTop - b.relativeTop);

        // 如果有可见分组
        if (visibleGroups.length > 0) {
          // 寻找第一个完全进入视口的分组
          const fullyVisibleGroup = visibleGroups.find(g => g.relativeTop >= 0);

          if (fullyVisibleGroup) {
            // 如果有完全进入视口的分组，选择它
            this.stickyGroupKeys.add(fullyVisibleGroup.group.key);
          } else {
            // 否则选择第一个部分可见的分组（通常是标题已经滚出但内容还可见的）
            this.stickyGroupKeys.add(visibleGroups[0].group.key);
          }
        } else if (this.groups.length > 0) {
          // 如果没有可见分组，则选择第一个分组
          this.stickyGroupKeys.add(this.groups[0].key);
        }
      },

      loadMoreData() {
        if (!this.loadMore) return;
        this.loadMore();
        // 确保loading元素可见
        this.$nextTick(() => {
          const scrollContainer = this.$refs.scrollContainer;
          if (scrollContainer) {
            // 滚动到底部，确保loading元素可见
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        });
      },

      scrollToTop() {
        if (this.virtualScroll) {
          // 虚拟滚动模式
          if (this.$refs.virtualScrollContainer) {
            this.$refs.virtualScrollContainer.scrollToPosition(0);
          }
        } else {
          // 原生滚动模式
          if (this.$refs.scrollContainer) {
            this.$refs.scrollContainer.scrollTop = 0;
          }
        }

        // 确保吸顶组状态也被重置
        if (this.shouldUseGrouping && this.groups.length > 0) {
          this.stickyGroupKeys.clear();
          this.stickyGroupKeys.add(this.groups[0].key);

          // 虚拟滚动模式下重置粘性分组
          if (this.virtualScroll) {
            this.currentStickyGroup = this.groups[0];
          }
        }
      },

      loadMoreDataVirtual() {
        if (!this.loadMore) return;
        this.loadMore();
        // 虚拟滚动模式下的加载更多不需要手动滚动
        // 虚拟列表会自动处理新数据的渲染
      },

      handleMenuItemClick(command, item) {
        this.$emit('menu-command', command, item);
      },

      bindGroupRef(el, item) {
        if (el) {
          this.groupRefs[item.key] = el;
        }
      },

      updateVirtualStickyStatus() {
        if (!this.shouldUseGrouping || this.groups.length === 0 || !this.virtualScroll) return;

        // 获取虚拟滚动容器
        const virtualContainer = this.$refs.virtualScrollContainer;
        if (!virtualContainer) return;

        // 获取滚动位置
        const scrollTop = virtualContainer.$el ? virtualContainer.$el.scrollTop : 0;

        // 计算当前应该显示的粘性分组
        let currentGroupKey = null;
        let accumulatedHeight = 0;
        const itemHeight = this.virtualScrollOptions.size || 60;

        // 遍历扁平化列表，找到当前滚动位置对应的分组
        for (const item of this.flattenedList) {
          if (accumulatedHeight + itemHeight > scrollTop) {
            // 直接使用项目的分组信息
            if (item.groupKey) {
              currentGroupKey = item.groupKey;
            }
            break;
          }

          accumulatedHeight += itemHeight;
        }

        // 更新当前粘性分组
        if (currentGroupKey) {
          const targetGroup = this.groups.find(g => g.key === currentGroupKey);
          if (targetGroup) {
            this.currentStickyGroup = targetGroup;
          }
        } else if (this.groups.length > 0) {
          // 如果没有找到，默认使用第一个分组
          this.currentStickyGroup = this.groups[0];
        }
      },

      // 公共方法：获取虚拟滚动容器引用
      getVirtualScrollContainer() {
        return this.$refs.virtualScrollContainer;
      },

      // 公共方法：获取原生滚动容器引用
      getScrollContainer() {
        return this.$refs.scrollContainer;
      },

      // 公共方法：滚动到指定位置
      scrollToPosition(position) {
        if (this.virtualScroll) {
          const virtualContainer = this.$refs.virtualScrollContainer;
          if (virtualContainer) {
            virtualContainer.scrollToPosition(position);
          }
        } else {
          const scrollContainer = this.$refs.scrollContainer;
          if (scrollContainer) {
            scrollContainer.scrollTop = position;
          }
        }
      },

      // 公共方法：滚动到指定项目
      scrollToItem(itemId) {
        if (this.virtualScroll) {
          const virtualContainer = this.$refs.virtualScrollContainer;
          if (virtualContainer) {
            const itemIndex = this.flattenedList.findIndex(
              item => item.id === itemId || item.uniqueKey === itemId,
            );
            if (itemIndex !== -1) {
              virtualContainer.scrollToItem(itemIndex);
            }
          }
        } else {
          // 原生滚动模式暂不支持滚动到指定项目
          console.warn('scrollToItem is only supported in virtual scroll mode');
        }
      },
    },
  };
</script>

<style lang="scss">
  // 引入外部样式文件
  @import '../../../styles/Conversations.scss';

  /* 自定义滚动条样式 */
  .el-x-conversations-scrollbar {
    height: 100%;
    overflow-y: auto;

    /* 隐藏默认滚动条 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 3px;
      transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    /* 鼠标悬停时显示滚动条 */
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #e0e0e0;
      }
    }
  }

  /* 虚拟滚动容器样式 */
  .el-x-conversations-virtual-scrollbar {
    height: 100%;

    /* 继承原滚动条样式 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 3px;
      transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #e0e0e0;
      }
    }

    /* 修复 vue-virtual-scroller 默认样式 */
    .vue-recycle-scroller {
      height: 100%;
    }

    .vue-recycle-scroller__item-wrapper {
      box-sizing: border-box;
      overflow: hidden;
    }

    .vue-recycle-scroller__item-view {
      width: 100%;
    }
  }

  /* 为Firefox添加滚动条样式 */
  @supports (scrollbar-width: thin) {
    .el-x-conversations-scrollbar,
    .el-x-conversations-virtual-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;

      &:hover {
        scrollbar-color: #e0e0e0 transparent;
      }
    }
  }

  /* 虚拟滚动项目包装器样式 */
  .virtual-item-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 覆盖 vue-virtual-scroller 的默认样式 */
  .el-x-conversations-virtual-scrollbar {
    ::v-deep .vue-recycle-scroller__item-wrapper {
      margin: 0 !important;
      padding: 0 !important;
    }

    ::v-deep .vue-recycle-scroller__item-view {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }
  }

  /* 虚拟粘性分组标题 */
  .virtual-sticky-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: var(--conversation-list-auto-bg-color, #fff);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* 确保虚拟滚动容器有正确的相对定位 */
  .el-x-conversations-scroll-wrapper {
    position: relative;
  }

  /* 有粘性标题时给虚拟滚动容器添加顶部padding */
  .el-x-conversations-virtual-scrollbar.has-sticky-header {
    ::v-deep .vue-recycle-scroller {
      padding-top: 40px; /* 为粘性标题留出空间 */
    }
  }
</style>
