<template>
    <div class="el-x-conversations-container" :style="{
      '--conversation-label-height': `${labelHeight}px`,
      '--conversation-list-auto-bg-color': mergedStyle.backgroundColor,
    }">
        <slot name="header"></slot>
        <ul class="el-x-conversations-list" :style="mergedStyle">
            <!-- 滚动区域容器 -->
            <li class="el-x-conversations-scroll-wrapper">
                <div ref="scrollContainer" class="el-x-conversations-scrollbar" @scroll="handleScroll">
                    <div class="scroll-content">
                        <template v-if="shouldUseGrouping">
                            <!-- 分组显示 -->
                            <div v-for="group in groups" :key="group.key" :ref="el => bindGroupRef(el, group)" class="el-x-conversation-group">
                                <div class="el-x-conversation-group-title sticky-title" :class="{ 'active-sticky': stickyGroupKeys.has(group.key) }">
                                    <slot name="groupTitle" :group="group">{{ group.title }}</slot>
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
                                        :menu-offset="menuOffset"
                                        :menu-max-height="menuMaxHeight"
                                        :menu-style="menuStyle"
                                        :menu-show-arrow="menuShowArrow"
                                        :menu-class-name="menuClassName"
                                        :menu-teleported="menuTeleported"
                                        @click="handleClick(item)"
                                        @menu-command="handleMenuItemClick"
                                    >
                                        <!-- 传递插槽 -->
                                        <template v-if="$scopedSlots.label" #label>
                                            <slot name="label" :item="item"></slot>
                                        </template>

                                        <template v-if="$scopedSlots['more-filled']" #more-filled="moreFilledSoltProps">
                                            <slot name="more-filled" v-bind="moreFilledSoltProps"></slot>
                                        </template>

                                        <template v-if="$scopedSlots.menu" #menu>
                                            <slot name="menu" :item="item"></slot>
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
                                :menu-offset="menuOffset"
                                :menu-max-height="menuMaxHeight"
                                :menu-style="menuStyle"
                                :menu-show-arrow="menuShowArrow"
                                :menu-class-name="menuClassName"
                                :menu-teleported="menuTeleported"
                                @click="handleClick(item)"
                                @menu-command="handleMenuItemClick"
                            >
                                <!-- 传递插槽 -->
                                <template v-if="$scopedSlots.label" #label>
                                    <slot name="label" :item="item"></slot>
                                </template>

                                <template v-if="$scopedSlots['more-filled']" #more-filled="moreFilledSoltProps">
                                    <slot name="more-filled" v-bind="moreFilledSoltProps"></slot>
                                </template>

                                <template v-if="$scopedSlots.menu" #menu>
                                    <slot name="menu" :item="item"></slot>
                                </template>
                            </conversations-item>
                        </template>

                        <!-- 加载更多 -->
                        <div v-if="loadMoreLoading" class="el-x-conversations-load-more">
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
        <el-button v-show="showScrollTop && showToTopBtn" class="scroll-to-top-btn" size="small" circle :type="toTopBtnType" :style="toTopBtnStyle" @click="scrollToTop">
            <i class="el-icon-top"></i>
        </el-button>
    </div>
</template>

<script>
import ConversationsItem from './components/item.vue'
import { get } from 'lodash'

export default {
    name: 'ElXConversations',

    components: {
        ConversationsItem,
    },

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
        menuOffset: {
            type: Number,
            default: 50,
        },
        menuShowArrow: {
            type: Boolean,
            default: false,
        },
        menuClassName: {
            type: String,
            default: '',
        },
        menuTeleported: {
            type: Boolean,
            default: true,
        },
        menuStyle: {
            type: Object,
            default: () => ({}),
        },
        menuMaxHeight: Number,
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
            validator: (value) => ['primary', 'success', 'warning', 'danger', 'info', 'text'].includes(value),
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
    },

    data() {
        return {
            showScrollTop: false,
            groupRefs: {},
            stickyGroupKeys: new Set(),
        }
    },

    computed: {
        itemsUse() {
            return this.items.map((item, index) => ({
                ...item,
                uniqueKey: this.rowKey ? get(item, this.rowKey) : index.toString(),
                label: get(item, this.labelKey),
            }))
        },

        mergedStyle() {
            const defaultStyle = {
                padding: '10px 0 10px 10px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                width: '280px',
                height: '0',
            }
            return { ...defaultStyle, ...this.styleConfig }
        },

        shouldUseGrouping() {
            return !!this.groupable
        },

        filteredItems() {
            return this.itemsUse
        },

        groups() {
            // 如果不需要分组，则返回空数组
            if (!this.shouldUseGrouping) return []

            // 检查filteredItems是否有值
            if (!this.filteredItems || this.filteredItems.length === 0) {
                return []
            }

            // 用于存储每个组的项目
            const groupMap = {}

            // 使用过滤后的项目进行分组
            this.filteredItems.forEach((item) => {
                let groupName = null

                // 优先使用item中的group字段
                if (item.group) {
                    groupName = item.group
                }
                // 如果没有找到分组，使用未分组
                const finalGroupName = groupName || this.ungroupedTitle

                // 若该组尚未创建，则创建一个新组
                if (!groupMap[finalGroupName]) {
                    groupMap[finalGroupName] = {
                        title: finalGroupName,
                        key: finalGroupName,
                        children: [],
                        isUngrouped: !groupName, // 如果没有找到组名，则标记为未分组
                    }
                }

                // 将项目添加到相应的组中
                groupMap[finalGroupName].children.push(item)
            })

            // 将分组转换为数组
            const groupArray = Object.values(groupMap)

            // 如果有自定义排序函数，使用它排序
            if (typeof this.groupable === 'object' && this.groupable.sort) {
                return groupArray.sort((a, b) => {
                    // 确保未分组总是在最后
                    if (a.isUngrouped) return 1
                    if (b.isUngrouped) return -1

                    const sortFn = this.groupable.sort
                    return sortFn ? sortFn(a.key, b.key) : 0
                })
            }

            // 否则只确保未分组在最后，不做其他排序
            return groupArray.sort((a, b) => {
                // 确保未分组总是在最后
                if (a.isUngrouped) return 1
                if (b.isUngrouped) return -1

                // 不做其他排序
                return 0
            })
        },
    },

    mounted() {
        // 如果有分组，默认将第一个分组设置为吸顶状态
        if (this.shouldUseGrouping && this.groups.length > 0) {
            // 添加第一个组的key到吸顶状态集合中
            this.stickyGroupKeys.add(this.groups[0].key)
        }
    },

    methods: {
        handleClick(item) {
            // 如果是disabled状态，则不允许选中
            if (item.disabled) return
            this.$emit('change', item)
        },

        handleScroll(e) {
            // 获取滚动容器
            const scrollContainer = this.$refs.scrollContainer
            if (!scrollContainer) return

            const scrollTop = scrollContainer.scrollTop

            // 显示/隐藏回到顶部按钮
            this.showScrollTop = scrollTop > 200

            // 检查是否需要加载更多
            const bottomOffset = 20
            const scrollHeight = scrollContainer.scrollHeight
            const clientHeight = scrollContainer.clientHeight

            // 计算是否接近底部
            const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomOffset

            if (isNearBottom) {
                this.loadMoreData()
            }

            // 更新吸顶状态
            this.updateStickyStatus()
        },

        updateStickyStatus() {
            if (!this.shouldUseGrouping || this.groups.length === 0) return

            // 先清空当前的吸顶组
            this.stickyGroupKeys.clear()

            // 获取滚动容器
            const scrollContainer = this.$refs.scrollContainer
            if (!scrollContainer) return

            // 如果只有一个分组，直接设置为吸顶状态
            if (this.groups.length === 1) {
                this.stickyGroupKeys.add(this.groups[0].key)
                return
            }

            const scrollContainerTop = scrollContainer.getBoundingClientRect().top
            const containerHeight = scrollContainer.clientHeight
            const scrollHeight = scrollContainer.scrollHeight
            const scrollTop = scrollContainer.scrollTop

            // 判断是否已经滚动到底部
            const isNearBottom = scrollHeight - scrollTop - containerHeight < 20

            // 如果已接近底部，直接使最后一个分组吸顶
            if (isNearBottom && this.groups.length > 0) {
                this.stickyGroupKeys.add(this.groups[this.groups.length - 1].key)
                return
            }

            // 检查每个分组的位置
            const visibleGroups = []

            // 收集所有可见的分组
            for (const group of this.groups) {
                const groupElement = this.groupRefs[group.key]
                if (groupElement) {
                    const groupRect = groupElement.getBoundingClientRect()
                    const relativeTop = groupRect.top - scrollContainerTop

                    // 分组至少部分可见
                    if (relativeTop < containerHeight && relativeTop + groupRect.height > 0) {
                        visibleGroups.push({
                            group,
                            relativeTop,
                            height: groupRect.height,
                        })
                    }
                }
            }

            // 对可见分组按相对位置排序
            visibleGroups.sort((a, b) => a.relativeTop - b.relativeTop)

            // 如果有可见分组
            if (visibleGroups.length > 0) {
                // 寻找第一个完全进入视口的分组
                const fullyVisibleGroup = visibleGroups.find((g) => g.relativeTop >= 0)

                if (fullyVisibleGroup) {
                    // 如果有完全进入视口的分组，选择它
                    this.stickyGroupKeys.add(fullyVisibleGroup.group.key)
                } else {
                    // 否则选择第一个部分可见的分组（通常是标题已经滚出但内容还可见的）
                    this.stickyGroupKeys.add(visibleGroups[0].group.key)
                }
            } else if (this.groups.length > 0) {
                // 如果没有可见分组，则选择第一个分组
                this.stickyGroupKeys.add(this.groups[0].key)
            }
        },

        loadMoreData() {
            if (!this.loadMore) return
            this.loadMore()
        },

        scrollToTop() {
            if (this.$refs.scrollContainer) {
                this.$refs.scrollContainer.scrollTop = 0
            }

            // 确保吸顶组状态也被重置
            if (this.shouldUseGrouping && this.groups.length > 0) {
                this.stickyGroupKeys.clear()
                this.stickyGroupKeys.add(this.groups[0].key)
            }
        },

        handleMenuItemClick(command, item) {
            this.$emit('menuCommand', command, item)
        },

        bindGroupRef(el, item) {
            if (el) {
                this.groupRefs[item.key] = el
            }
        },
    },
}
</script>

<style lang="scss" scoped>
// 引入外部样式文件
@import '../../../../styles/Conversations.scss';

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

/* 为Firefox添加滚动条样式 */
@supports (scrollbar-width: thin) {
    .el-x-conversations-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;

        &:hover {
            scrollbar-color: #e0e0e0 transparent;
        }
    }
}
</style>
