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
          <recycle-scroller
            ref="virtualScrollContainer"
            class="el-x-conversations-virtual-scrollbar"
            :items="flattenedList"
            :item-size="shouldUseGrouping ? null : virtualScrollOptions.size || 60"
            size-field="size"
            :buffer="virtualScrollOptions.buffer || 200"
            key-field="key"
            :emit-update="true"
            @update="onUpdate"
            @scroll="onScroll"
            @resize="onResize"
          >
            <template #default="{ item }">
              <div
                class="virtual-item-wrapper"
                :class="{ 'with-margin': !shouldUseGrouping }"
              >
                <!-- 分组标题 -->
                <div
                  v-if="item.type === 'group-title'"
                  class="el-x-conversation-group-title virtual-group-title sticky-group-title"
                >
                  <slot
                    name="group-title"
                    :group="{
                      key: item.groupKey,
                      title: item.groupTitle,
                      isUngrouped: item.isUngrouped,
                    }"
                  >
                    {{ item.groupTitle }}
                  </slot>
                </div>

                <!-- 会话项目 -->
                <conversations-item
                  v-else
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
          groupTitleHeight: 40,
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
            // 添加分组标题项
            result.push({
              type: 'group-title',
              key: `group-${group.key}`,
              groupKey: group.key,
              groupTitle: group.title,
              isUngrouped: group.isUngrouped,
              size: this.virtualScrollOptions.groupTitleHeight || 40,
              virtualHeight: this.virtualScrollOptions.groupTitleHeight || 40,
            });

            // 添加分组内容项
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

    watch: {
      virtualScroll(newVal, oldVal) {
        // 模式切换时清理状态
        if (newVal !== oldVal) {
          // 清理吸顶状态
          this.stickyGroupKeys.clear();
          this.showScrollTop = false;

          // 重新初始化分组状态
          this.$nextTick(() => {
            if (this.shouldUseGrouping && this.groups.length > 0) {
              this.stickyGroupKeys.add(this.groups[0].key);
            }
          });
        }
      },
    },

    mounted() {
      // 如果有分组，默认将第一个分组设置为吸顶状态
      if (this.shouldUseGrouping && this.groups.length > 0) {
        // 添加第一个组的key到吸顶状态集合中
        this.stickyGroupKeys.add(this.groups[0].key);

        // 虚拟滚动模式下的初始化已简化，无需特殊处理
      }
    },

    beforeDestroy() {
      // 组件销毁时清理状态
      this.stickyGroupKeys.clear();
    },

    methods: {
      handleClick(item) {
        // 如果是disabled状态，则不允许选中
        if (item.disabled) return;
        this.$emit('change', item);
      },

      handleScroll(e) {
        // 虚拟滚动模式下不处理原生滚动事件
        if (this.virtualScroll) return;

        // 获取滚动容器
        const scrollContainer = this.$refs.scrollContainer;
        if (!scrollContainer) return;

        // 安全获取滚动信息
        let scrollTop = 0;
        let scrollHeight = 0;
        let clientHeight = 0;

        try {
          scrollTop = scrollContainer.scrollTop || 0;
          scrollHeight = scrollContainer.scrollHeight || 0;
          clientHeight = scrollContainer.clientHeight || 0;
        } catch (error) {
          console.warn('无法获取滚动容器信息:', error);
          return;
        }

        // 显示/隐藏回到顶部按钮
        this.showScrollTop = scrollTop > 200;

        // 检查是否需要加载更多
        const bottomOffset = 20;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset;

        if (isNearBottom) {
          this.loadMoreData();
        }

        // 更新吸顶状态
        this.updateStickyStatus();
      },
      onScroll(event) {
        // 透传滚动事件给使用者
        this.$emit('scroll', event);
      },
      onResize(event) {
        // 透传调整大小事件给使用者
        this.$emit('resize', event);
      },
      onUpdate(viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex) {
        // 控制回到顶部按钮显示
        // 如果开始索引大于10，说明已经滚动了一定距离，显示回到顶部按钮
        this.showScrollTop = viewStartIndex > 10;

        // 检查是否需要加载更多（接近底部）
        const totalItems = this.flattenedList.length;
        const isNearBottom = viewEndIndex >= totalItems - 5; // 距离底部5个项目时触发加载更多

        if (isNearBottom) {
          this.loadMoreDataVirtual();
        }

        // 如果用户提供了自定义滚动处理方法，调用它
        if (
          this.virtualScrollCustomHandler &&
          typeof this.virtualScrollCustomHandler === 'function'
        ) {
          this.virtualScrollCustomHandler({
            startIndex: viewStartIndex,
            endIndex: viewEndIndex,
            visibleStartIndex,
            visibleEndIndex,
            totalItems,
            isNearBottom,
          });
        }

        // 透传更新事件给使用者
        this.$emit('update', {
          startIndex: viewStartIndex,
          endIndex: viewEndIndex,
          visibleStartIndex,
          visibleEndIndex,
          totalItems,
          isNearBottom,
        });

        // 同时触发虚拟更新事件（兼容旧版本）
        this.$emit('virtual-update', {
          startIndex: viewStartIndex,
          endIndex: viewEndIndex,
          visibleStartIndex,
          visibleEndIndex,
        });
      },

      updateStickyStatus() {
        // 虚拟滚动模式下不处理原生吸顶逻辑
        if (this.virtualScroll) return;

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

        // 安全获取滚动容器信息
        let scrollContainerTop = 0;
        let containerHeight = 0;
        let scrollHeight = 0;
        let scrollTop = 0;

        try {
          scrollContainerTop = scrollContainer.getBoundingClientRect().top;
          containerHeight = scrollContainer.clientHeight || 0;
          scrollHeight = scrollContainer.scrollHeight || 0;
          scrollTop = scrollContainer.scrollTop || 0;
        } catch (error) {
          console.warn('无法获取滚动容器信息:', error);
          return;
        }

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
        // 虚拟滚动模式下不处理原生加载更多逻辑
        if (this.virtualScroll) return;

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
</style>
