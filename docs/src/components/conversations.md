# Conversations 会话列表组件

## 功能说明

会话列表组件，用于展示和管理多个对话会话，支持以下特性：

- 会话列表展示和滚动加载
- 分组显示和吸顶效果
- 内置下拉菜单和自定义菜单
- 自定义项目样式和容器样式
- 懒加载和回到顶部功能
- 自定义分组和项目内容

## 使用示例

### 基础用法

基本的会话列表组件使用，可以显示简单的会话列表并进行选中。

:::demo

```html
<template>
  <el-x-conversations
    :items="basicItems"
    :active="activeConversation"
    @change="handleConversationChange"
  />
</template>

<script>
  export default {
    data() {
      return {
        basicItems: [
          { id: '1', label: '最近对话1', prefixIcon: 'el-icon-chat-dot-round' },
          { id: '2', label: '最近对话2', prefixIcon: 'el-icon-chat-round' },
          {
            id: '3',
            label: '最近对话3',
            prefixIcon: 'el-icon-chat-line-round',
          },
          { id: '4', label: '最近对话4', prefixIcon: 'el-icon-chat-dot-round' },
          {
            id: '5',
            label: '最近对话5',
            prefixIcon: 'el-icon-chat-round',
            disabled: true,
          },
        ],
        activeConversation: '1',
      };
    },
    methods: {
      handleConversationChange(item) {
        this.activeConversation = item.uniqueKey;
      },
    },
  };
</script>
```

:::

### 分组与吸顶效果

启用分组功能后，滚动时分组标题会自动吸顶显示。

:::demo

```html
<template>
  <div style="height: 300px; overflow: hidden; border: 1px solid #ebeef5; border-radius: 4px;">
    <el-x-conversations
      :items="groupedItems"
      :active="activeGroupedConversation"
      :groupable="true"
      @change="handleGroupedChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        groupedItems: [
          {
            id: 'g1',
            label: '工作群1',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g2',
            label: '工作群2',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g3',
            label: '工作群3',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g4',
            label: '学习小组1',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g5',
            label: '学习小组2',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g6',
            label: '同学聊天群',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g7',
            label: '家人群聊',
            group: '家庭',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g8',
            label: '亲戚群',
            group: '家庭',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g9',
            label: '朋友圈1',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g10',
            label: '朋友圈2',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g11',
            label: '朋友圈3',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g12',
            label: '未分类会话1',
            prefixIcon: 'el-icon-chat-line-round',
          },
          {
            id: 'g13',
            label: '未分类会话2',
            prefixIcon: 'el-icon-chat-line-round',
          },
        ],
        activeGroupedConversation: 'g1',
      };
    },
    methods: {
      handleGroupedChange(item) {
        this.activeGroupedConversation = item.uniqueKey;
      },
    },
  };
</script>
```

:::

### 自定义分组排序

可以通过自定义排序函数控制分组的顺序，例如按字母排序或其他逻辑。

:::demo

```html
<template>
  <el-x-conversations
    :items="customGroupedItems"
    :groupable="groupSortOptions"
    :active="activeCustomGrouped"
    @change="handleCustomGroupedChange"
  />
</template>

<script>
  export default {
    data() {
      return {
        customGroupedItems: [
          {
            id: 'c1',
            label: '项目A讨论',
            group: 'A级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c2',
            label: '项目B规划',
            group: 'B级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c3',
            label: '项目C评审',
            group: 'C级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c4',
            label: '项目A需求',
            group: 'A级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c5',
            label: '项目B进度',
            group: 'B级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c6',
            label: '项目D立项',
            group: 'D级项目',
            prefixIcon: 'el-icon-s-flag',
          },
        ],
        groupSortOptions: {
          sort: (a, b) => {
            // 按项目级别排序: A > B > C > D > 未分组
            const levels = { A级项目: 1, B级项目: 2, C级项目: 3, D级项目: 4 };
            return (levels[a] || 999) - (levels[b] || 999);
          },
        },
        activeCustomGrouped: 'c1',
      };
    },
    methods: {
      handleCustomGroupedChange(item) {
        this.activeCustomGrouped = item.uniqueKey;
      },
    },
  };
</script>
```

:::

### 内置下拉菜单

启用内置菜单后，鼠标悬停在项目上会显示操作菜单，点击菜单项触发对应操作。

:::demo

```html
<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-switch
        v-model="showBuiltInMenu"
        active-text="启用内置菜单"
      />
    </div>
    <el-x-conversations
      :items="menuItems"
      :active="activeMenuItem"
      :show-built-in-menu="showBuiltInMenu"
      @change="handleMenuItemChange"
      @menu-command="handleMenuCommand"
    />
    <div
      v-if="operationLogs.length > 0"
      style="margin-top: 15px; padding: 10px; background-color: #f9f9f9; border-radius: 4px;"
    >
      <div style="margin-bottom: 8px; font-weight: 500; font-size: 14px;">操作记录：</div>
      <div
        v-for="(log, index) in operationLogs"
        :key="index"
        style="padding: 4px 0; border-bottom: 1px dashed #ebeef5; font-size: 13px;"
      >
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuItems: [
          { id: 'm1', label: '产品需求讨论', prefixIcon: 'el-icon-document' },
          { id: 'm2', label: '每周例会', prefixIcon: 'el-icon-date' },
          { id: 'm3', label: '营销策略', prefixIcon: 'el-icon-data-analysis' },
          { id: 'm4', label: '技术架构评审', prefixIcon: 'el-icon-cpu' },
        ],
        activeMenuItem: 'm1',
        showBuiltInMenu: true,
        operationLogs: [],
      };
    },
    methods: {
      handleMenuItemChange(item) {
        this.activeMenuItem = item.uniqueKey;
      },
      handleMenuCommand(command, item) {
        const actionMap = {
          rename: '重命名',
          delete: '删除',
        };
        const actionText = actionMap[command] || command;
        this.operationLogs.unshift(`${actionText} - ${item.label}`);

        // 最多显示5条记录
        if (this.operationLogs.length > 5) {
          this.operationLogs.pop();
        }
      },
    },
  };
</script>
```

:::

### 自定义菜单交互

可以自定义菜单项的图标、文本和样式，并处理菜单命令事件。

:::demo

```html
<template>
  <el-x-conversations
    :items="customMenuItems"
    :active="activeCustomMenuItem"
    :show-built-in-menu="true"
    :menu="customMenu"
    @change="handleCustomMenuItemChange"
    @menu-command="handleCustomMenuCommand"
  />
</template>

<script>
  export default {
    data() {
      return {
        customMenuItems: [
          {
            id: 'cm1',
            label: '重要客户A',
            prefixIcon: 'el-icon-user',
            suffixIcon: 'el-icon-star-on',
          },
          { id: 'cm2', label: '潜在客户B', prefixIcon: 'el-icon-user' },
          { id: 'cm3', label: '合作伙伴C', prefixIcon: 'el-icon-user-solid' },
          { id: 'cm4', label: '供应商D', prefixIcon: 'el-icon-user' },
        ],
        customMenu: [
          {
            label: '标为重要',
            key: 'star',
            icon: 'el-icon-star-off',
            command: 'star',
            menuItemHoverStyle: {
              color: '#E6A23C',
              backgroundColor: 'rgba(230, 162, 60, 0.1)',
            },
          },
          {
            label: '归档',
            key: 'archive',
            icon: 'el-icon-folder',
            command: 'archive',
          },
          {
            label: '删除',
            key: 'delete',
            icon: 'el-icon-delete',
            command: 'delete',
            menuItemHoverStyle: {
              color: '#F56C6C',
              backgroundColor: 'rgba(245, 108, 108, 0.1)',
            },
          },
        ],
        activeCustomMenuItem: 'cm1',
      };
    },
    methods: {
      handleCustomMenuItemChange(item) {
        this.activeCustomMenuItem = item.uniqueKey;
      },
      handleCustomMenuCommand(command, item) {
        this.$message({
          message: `执行操作: ${command} - ${item.label}`,
          type: 'success',
        });

        // 如果是星标操作，切换星标状态
        if (command === 'star') {
          const targetItem = this.customMenuItems.find(i => i.id === item.id);
          if (targetItem) {
            targetItem.suffixIcon = targetItem.suffixIcon ? null : 'el-icon-star-on';
          }
        }
      },
    },
  };
</script>
```

:::

### 懒加载功能

滚动到底部时自动加载更多项目，并支持回到顶部按钮。

:::demo

```html
<template>
  <div>
    <div style="border: 1px solid #ebeef5; border-radius: 4px; height: 300px; overflow: hidden;">
      <el-x-conversations
        ref="lazyConversations"
        :items="lazyItems"
        :active="activeLazyItem"
        :load-more="loadMoreItems"
        :load-more-loading="isLoadingMore"
        :show-to-top-btn="true"
        :to-top-btn-type="toTopBtnType"
        @change="handleLazyItemChange"
      />
    </div>
    <div style="margin-top: 15px;">
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <h4 style="margin: 0 10px 0 0; font-size: 14px; font-weight: normal; width: 80px;">
          按钮样式：
        </h4>
        <el-radio-group
          v-model="toTopBtnType"
          size="small"
        >
          <el-radio-button label="primary">主要</el-radio-button>
          <el-radio-button label="success">成功</el-radio-button>
          <el-radio-button label="warning">警告</el-radio-button>
          <el-radio-button label="danger">危险</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lazyItems: [],
        activeLazyItem: '',
        isLoadingMore: false,
        currentLazyPage: 0,
        maxLazyPages: 5,
        toTopBtnType: 'primary',
      };
    },
    created() {
      this.loadMoreItems();
    },
    methods: {
      loadMoreItems() {
        if (this.currentLazyPage >= this.maxLazyPages) {
          return;
        }

        this.isLoadingMore = true;

        // 模拟异步加载
        setTimeout(() => {
          const newPage = this.currentLazyPage + 1;
          // 第一页加载10条，其他页加载5条
          const itemsCount = newPage === 1 ? 10 : 5;
          const newItems = Array(itemsCount)
            .fill(0)
            .map((_, index) => {
              const itemId = `lazy${newPage}-${index + 1}`;
              return {
                id: itemId,
                label: `懒加载项目 ${newPage}-${index + 1}`,
                prefixIcon: 'el-icon-time',
              };
            });

          this.lazyItems = [...this.lazyItems, ...newItems];
          this.currentLazyPage = newPage;
          this.isLoadingMore = false;

          // 如果是第一页，默认选中第一项
          if (newPage === 1 && newItems.length > 0) {
            this.activeLazyItem = newItems[0].id;
          }
        }, 1000);
      },
      handleLazyItemChange(item) {
        this.activeLazyItem = item.uniqueKey;
      },
    },
  };
</script>
```

:::

### 自定义样式与分组标题

可以自定义项目样式、容器样式，以及通过插槽自定义分组标题和项目内容。

:::demo

```html
<template>
  <el-x-conversations
    :items="styledItems"
    :active="activeStyledItem"
    :groupable="true"
    :items-style="customItemsStyle"
    :items-hover-style="customItemsHoverStyle"
    :items-active-style="customItemsActiveStyle"
    :style-config="customContainerStyle"
    @change="handleStyledItemChange"
  >
    <template #group-title="{ group }">
      <div style="display: flex; align-items: center;">
        <i
          :class="getGroupIcon(group.title)"
          style="margin-right: 8px; color: #67C23A;"
        ></i>
        <span>{{ group.title }}</span>
        <span style="margin-left: 5px; font-size: 12px; color: #909399;">
          ({{ group.children.length }})
        </span>
      </div>
    </template>

    <template #label="{ item }">
      <div style="display: flex; align-items: center; width: 100%;">
        <i
          :class="item.icon || 'el-icon-chat-dot-round'"
          style="color: #409EFF; margin-right: 8px;"
        ></i>
        <span style="flex: 1;">{{ item.label }}</span>
        <span style="font-size: 12px; color: #909399;">{{ item.time }}</span>
      </div>
    </template>
  </el-x-conversations>
</template>

<script>
  export default {
    data() {
      return {
        styledItems: [
          {
            id: 's1',
            label: '设计讨论',
            group: '设计部',
            time: '10:30',
            icon: 'el-icon-picture-outline',
          },
          {
            id: 's2',
            label: 'UI评审',
            group: '设计部',
            time: '昨天',
            icon: 'el-icon-picture',
          },
          {
            id: 's3',
            label: '后端架构',
            group: '技术部',
            time: '周一',
            icon: 'el-icon-s-operation',
          },
          {
            id: 's4',
            label: 'API讨论',
            group: '技术部',
            time: '周二',
            icon: 'el-icon-s-platform',
          },
          {
            id: 's5',
            label: '产品规划',
            group: '产品部',
            time: '3天前',
            icon: 'el-icon-s-goods',
          },
          {
            id: 's6',
            label: '需求梳理',
            group: '产品部',
            time: '上周',
            icon: 'el-icon-document',
          },
        ],
        activeStyledItem: 's1',
        customItemsStyle: {
          borderRadius: '4px',
          margin: '4px 10px 4px 0',
          padding: '10px 12px',
        },
        customItemsHoverStyle: {
          backgroundColor: '#f0f9eb',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        customItemsActiveStyle: {
          backgroundColor: '#f0f9eb',
          borderLeft: '3px solid #67C23A',
        },
        customContainerStyle: {
          borderRadius: '8px',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
          width: '320px',
        },
      };
    },
    methods: {
      handleStyledItemChange(item) {
        this.activeStyledItem = item.uniqueKey;
      },
      getGroupIcon(group) {
        const iconMap = {
          设计部: 'el-icon-picture-outline',
          技术部: 'el-icon-s-operation',
          产品部: 'el-icon-s-goods',
        };
        return iconMap[group] || 'el-icon-folder';
      },
    },
  };
</script>
```

:::

## 属性

| 参数                 | 说明                         | 类型                  | 默认值                                                                                                                                                                                                                                    |
| -------------------- | ---------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items                | 会话列表数据                 | Array                 | []                                                                                                                                                                                                                                        |
| itemsStyle           | 项目自定义样式               | Object                | {}                                                                                                                                                                                                                                        |
| itemsHoverStyle      | 项目悬停样式                 | Object                | {}                                                                                                                                                                                                                                        |
| itemsActiveStyle     | 项目选中样式                 | Object                | {}                                                                                                                                                                                                                                        |
| itemsMenuOpenedStyle | 项目菜单打开时样式           | Object                | {}                                                                                                                                                                                                                                        |
| styleConfig          | 容器样式配置                 | Object                | { padding: '10px 0 10px 10px', backgroundColor: '#fff', borderRadius: '8px', width: '280px', height: '0' }                                                                                                                                |
| showTooltip          | 是否显示提示框               | Boolean               | false                                                                                                                                                                                                                                     |
| groupable            | 是否启用分组，可传入排序函数 | Boolean/Object        | false                                                                                                                                                                                                                                     |
| labelMaxWidth        | 标签最大宽度                 | Number                | undefined                                                                                                                                                                                                                                 |
| labelHeight          | 标签高度                     | Number                | 20                                                                                                                                                                                                                                        |
| showBuiltInMenu      | 是否显示内置菜单             | Boolean               | false                                                                                                                                                                                                                                     |
| menu                 | 自定义菜单项配置             | Array                 | [{ label: '重命名', key: 'rename', icon: 'el-icon-edit', command: 'rename' }, { label: '删除', key: 'delete', icon: 'el-icon-delete', command: 'delete', menuItemHoverStyle: { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)' } }] |
| ungroupedTitle       | 未分组项标题                 | String                | '未分组'                                                                                                                                                                                                                                  |
| tooltipPlacement     | 提示框位置                   | String                | 'top'                                                                                                                                                                                                                                     |
| tooltipOffset        | 提示框偏移量                 | Number                | 12                                                                                                                                                                                                                                        |
| menuPlacement        | 菜单位置                     | String                | 'bottom-start'                                                                                                                                                                                                                            |
| menuShowArrow        | 菜单是否显示箭头             | Boolean               | false                                                                                                                                                                                                                                     |
| menuStyle            | 菜单自定义样式               | Object                | {}                                                                                                                                                                                                                                        |
| loadMoreLoading      | 加载更多状态                 | Boolean               | false                                                                                                                                                                                                                                     |
| showToTopBtn         | 是否显示回到顶部按钮         | Boolean               | false                                                                                                                                                                                                                                     |
| toTopBtnType         | 回到顶部按钮类型             | String                | 'primary'                                                                                                                                                                                                                                 |
| toTopBtnStyle        | 回到顶部按钮自定义样式       | Object                | {}                                                                                                                                                                                                                                        |
| labelKey             | 项目标签字段名               | String                | 'label'                                                                                                                                                                                                                                   |
| rowKey               | 项目唯一键字段名             | String                | 'id'                                                                                                                                                                                                                                      |
| active               | 当前激活项                   | String/Number/Boolean | ''                                                                                                                                                                                                                                        |
| loadMore             | 加载更多函数                 | Function              | null                                                                                                                                                                                                                                      |

## 方法

| 方法名      | 说明       | 参数 | 返回值 |
| ----------- | ---------- | ---- | ------ |
| scrollToTop | 滚动到顶部 | -    | -      |

## 事件

| 事件名      | 说明           | 回调参数                            |
| ----------- | -------------- | ----------------------------------- |
| change      | 选择项改变事件 | 选中的项目对象                      |
| menuCommand | 菜单命令事件   | (command, item)：命令名称和项目对象 |

## 插槽

| 插槽名      | 说明           | 插槽参数            |
| ----------- | -------------- | ------------------- |
| header      | 列表顶部内容   | -                   |
| footer      | 列表底部内容   | -                   |
| group-title | 分组标题       | { group: 分组对象 } |
| label       | 项目标签内容   | { item: 项目对象 }  |
| menu        | 自定义菜单内容 | { item: 项目对象 }  |
| more-filled | 更多图标内容   | 菜单相关属性        |
| load-more   | 加载更多内容   | -                   |
