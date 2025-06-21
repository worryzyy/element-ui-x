# Conversations

## Features

A component for displaying and managing multiple conversation sessions, with the following features:

- Display conversation list with scroll loading
- Grouped display with sticky headers
- Built-in and custom dropdown menus
- Custom item and container styles
- "Load more" and "back to top" functionality
- Custom grouping and item content

## Usage Examples

### Basic Usage

Basic usage of the conversation list component, displaying a simple list of conversations with selection.

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
          { id: '1', label: 'Recent Conversation 1', prefixIcon: 'el-icon-chat-dot-round' },
          { id: '2', label: 'Recent Conversation 2', prefixIcon: 'el-icon-chat-round' },
          {
            id: '3',
            label: 'Recent Conversation 3',
            prefixIcon: 'el-icon-chat-line-round',
          },
          { id: '4', label: 'Recent Conversation 4', prefixIcon: 'el-icon-chat-dot-round' },
          {
            id: '5',
            label: 'Recent Conversation 5',
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

### Grouping with Sticky Headers

When grouping is enabled, the group titles will automatically become sticky during scrolling.

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
            label: 'Work Group 1',
            group: 'Work',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g2',
            label: 'Work Group 2',
            group: 'Work',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g3',
            label: 'Work Group 3',
            group: 'Work',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g4',
            label: 'Study Group 1',
            group: 'Study',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g5',
            label: 'Study Group 2',
            group: 'Study',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g6',
            label: 'Classmate Chat Group',
            group: 'Study',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g7',
            label: 'Family Chat',
            group: 'Family',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g8',
            label: 'Relatives Group',
            group: 'Family',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g9',
            label: 'Friends Circle 1',
            group: 'Friends',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g10',
            label: 'Friends Circle 2',
            group: 'Friends',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g11',
            label: 'Friends Circle 3',
            group: 'Friends',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g12',
            label: 'Uncategorized Conversation 1',
            prefixIcon: 'el-icon-chat-line-round',
          },
          {
            id: 'g13',
            label: 'Uncategorized Conversation 2',
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

### Custom Group Sorting

You can control the order of groups with a custom sort function, for example, by alphabetical order or other logic.

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
            label: 'Project A Discussion',
            group: 'Project Level A',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c2',
            label: 'Project B Planning',
            group: 'Project Level B',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c3',
            label: 'Project C Review',
            group: 'Project Level C',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c4',
            label: 'Project A Requirements',
            group: 'Project Level A',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c5',
            label: 'Project B Progress',
            group: 'Project Level B',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c6',
            label: 'Project D Kick-off',
            group: 'Project Level D',
            prefixIcon: 'el-icon-s-flag',
          },
        ],
        groupSortOptions: {
          sort: (a, b) => {
            // Sort by project level: A > B > C > D > Ungrouped
            const levels = {
              'Project Level A': 1,
              'Project Level B': 2,
              'Project Level C': 3,
              'Project Level D': 4,
            };
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

### Built-in Dropdown Menu

With the built-in menu enabled, hovering over an item will display an action menu. Clicking a menu item triggers the corresponding action.

:::demo

```html
<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-switch
        v-model="showBuiltInMenu"
        active-text="Enable Built-in Menu"
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
      <div style="margin-bottom: 8px; font-weight: 500; font-size: 14px;">Operation Log:</div>
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
          { id: 'm1', label: 'Product Requirement Discussion', prefixIcon: 'el-icon-document' },
          { id: 'm2', label: 'Weekly Meeting', prefixIcon: 'el-icon-date' },
          { id: 'm3', label: 'Marketing Strategy', prefixIcon: 'el-icon-data-analysis' },
          { id: 'm4', label: 'Tech Architecture Review', prefixIcon: 'el-icon-cpu' },
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
          rename: 'Rename',
          delete: 'Delete',
        };
        const actionText = actionMap[command] || command;
        this.operationLogs.unshift(`Action: ${actionText} on item "${item.label}"`);

        // Show a maximum of 5 records
        if (this.operationLogs.length > 5) {
          this.operationLogs.pop();
        }
      },
    },
  };
</script>
```

:::

### Custom Menu Interaction

You can customize the icon, text, and style of menu items, and handle menu command events.

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
            label: 'Important Client A',
            prefixIcon: 'el-icon-user',
            suffixIcon: 'el-icon-star-on',
          },
          { id: 'cm2', label: 'Potential Client B', prefixIcon: 'el-icon-user' },
          { id: 'cm3', label: 'Partner C', prefixIcon: 'el-icon-user-solid' },
          { id: 'cm4', label: 'Supplier D', prefixIcon: 'el-icon-user' },
        ],
        customMenu: [
          {
            label: 'Mark as Important',
            key: 'star',
            icon: 'el-icon-star-off',
            command: 'star',
            menuItemHoverStyle: {
              color: '#E6A23C',
              backgroundColor: 'rgba(230, 162, 60, 0.1)',
            },
          },
          {
            label: 'Archive',
            key: 'archive',
            icon: 'el-icon-folder',
            command: 'archive',
          },
          {
            label: 'Delete',
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
          message: `Executing action: ${command} on ${item.label}`,
          type: 'success',
        });

        // If it is a star operation, toggle the star status
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

### Load More Functionality

Automatically load more items when scrolling to the bottom, with support for a "back to top" button.

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
          Button Style:
        </h4>
        <el-radio-group
          v-model="toTopBtnType"
          size="small"
        >
          <el-radio-button label="primary">Primary</el-radio-button>
          <el-radio-button label="success">Success</el-radio-button>
          <el-radio-button label="warning">Warning</el-radio-button>
          <el-radio-button label="danger">Danger</el-radio-button>
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
      // Debounced method for loading more items
      loadMoreItems() {
        // If already loading, return directly
        if (this.isLoadingMore) return;

        console.log(`Reached bottom, loading page ${this.currentLazyPage + 1}`);
        this.isLoadingMore = true;

        // Simulate asynchronous loading
        setTimeout(() => {
          const newPage = this.currentLazyPage + 1;
          // Load 10 items each time
          const itemsCount = 10;
          const newItems = Array(itemsCount)
            .fill(0)
            .map((_, index) => {
              const itemId = `lazy${newPage}-${index + 1}`;
              return {
                id: itemId,
                label: `Loaded Item ${newPage}-${index + 1}`,
                prefixIcon: 'el-icon-time',
              };
            });

          this.lazyItems = [...this.lazyItems, ...newItems];
          this.currentLazyPage = newPage;
          this.isLoadingMore = false;

          console.log(
            `Page ${newPage} loaded, ${newItems.length} items this time, total ${this.lazyItems.length}`,
          );

          // If it's the first page, select the first item by default
          if (newPage === 1 && newItems.length > 0) {
            this.activeLazyItem = newItems[0].id;
          }
        }, 2000);
      },
      handleLazyItemChange(item) {
        this.activeLazyItem = item.uniqueKey;
      },
    },
  };
</script>
```

:::

### Custom Styles and Group Titles

You can customize item styles, container styles, and use slots to customize group titles and item content.

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
            label: 'Design Discussion',
            group: 'Design Dept.',
            time: '10:30',
            icon: 'el-icon-picture-outline',
          },
          {
            id: 's2',
            label: 'UI Review',
            group: 'Design Dept.',
            time: 'Yesterday',
            icon: 'el-icon-picture',
          },
          {
            id: 's3',
            label: 'Backend Architecture',
            group: 'Tech Dept.',
            time: 'Monday',
            icon: 'el-icon-s-operation',
          },
          {
            id: 's4',
            label: 'API Discussion',
            group: 'Tech Dept.',
            time: 'Tuesday',
            icon: 'el-icon-s-platform',
          },
          {
            id: 's5',
            label: 'Product Planning',
            group: 'Product Dept.',
            time: '3 days ago',
            icon: 'el-icon-s-goods',
          },
          {
            id: 's6',
            label: 'Requirement Analysis',
            group: 'Product Dept.',
            time: 'Last week',
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
          'Design Dept.': 'el-icon-picture-outline',
          'Tech Dept.': 'el-icon-s-operation',
          'Product Dept.': 'el-icon-s-goods',
        };
        return iconMap[group] || 'el-icon-folder';
      },
    },
  };
</script>
```

:::

## Attributes

| Attribute            | Description                                          | Type                  | Default                                                                                                                                                                                                                                     |
| -------------------- | ---------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items                | Conversation list data                               | Array                 | []                                                                                                                                                                                                                                          |
| itemsStyle           | Custom style for items                               | Object                | {}                                                                                                                                                                                                                                          |
| itemsHoverStyle      | Hover style for items                                | Object                | {}                                                                                                                                                                                                                                          |
| itemsActiveStyle     | Style for active items                               | Object                | {}                                                                                                                                                                                                                                          |
| itemsMenuOpenedStyle | Style for items when the menu is open                | Object                | {}                                                                                                                                                                                                                                          |
| styleConfig          | Container style configuration                        | Object                | { padding: '10px 0 10px 10px', backgroundColor: '#fff', borderRadius: '8px', width: '280px', height: '0' }                                                                                                                                  |
| showTooltip          | Whether to show a tooltip                            | Boolean               | false                                                                                                                                                                                                                                       |
| groupable            | Whether to enable grouping, can pass a sort function | Boolean/Object        | false                                                                                                                                                                                                                                       |
| labelMaxWidth        | Maximum width for the label                          | Number                | undefined                                                                                                                                                                                                                                   |
| labelHeight          | Height of the label                                  | Number                | 20                                                                                                                                                                                                                                          |
| showBuiltInMenu      | Whether to show the built-in menu                    | Boolean               | false                                                                                                                                                                                                                                       |
| menu                 | Custom menu item configuration                       | Array                 | [{ label: 'Rename', key: 'rename', icon: 'el-icon-edit', command: 'rename' }, { label: 'Delete', key: 'delete', icon: 'el-icon-delete', command: 'delete', menuItemHoverStyle: { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)' } }] |
| ungroupedTitle       | Title for ungrouped items                            | String                | 'Ungrouped'                                                                                                                                                                                                                                 |
| tooltipPlacement     | Tooltip position                                     | String                | 'top'                                                                                                                                                                                                                                       |
| tooltipOffset        | Tooltip offset                                       | Number                | 12                                                                                                                                                                                                                                          |
| menuPlacement        | Menu position                                        | String                | 'bottom-start'                                                                                                                                                                                                                              |
| menuShowArrow        | Whether the menu shows an arrow                      | Boolean               | false                                                                                                                                                                                                                                       |
| menuStyle            | Custom style for the menu                            | Object                | {}                                                                                                                                                                                                                                          |
| loadMoreLoading      | Loading state for "load more"                        | Boolean               | false                                                                                                                                                                                                                                       |
| showToTopBtn         | Whether to show the "back to top" button             | Boolean               | false                                                                                                                                                                                                                                       |
| toTopBtnType         | Type of the "back to top" button                     | String                | 'primary'                                                                                                                                                                                                                                   |
| toTopBtnStyle        | Custom style for the "back to top" button            | Object                | {}                                                                                                                                                                                                                                          |
| labelKey             | Field name for the item label                        | String                | 'label'                                                                                                                                                                                                                                     |
| rowKey               | Field name for the unique key of the item            | String                | 'id'                                                                                                                                                                                                                                        |
| active               | Currently active item                                | String/Number/Boolean | ''                                                                                                                                                                                                                                          |
| loadMore             | Function to load more items                          | Function              | null                                                                                                                                                                                                                                        |

## Methods

| Method Name | Description    | Parameters | Return Value |
| ----------- | -------------- | ---------- | ------------ |
| scrollToTop | Scrolls to top | -          | -            |

## Events

| Event Name  | Description         | Callback Parameters                           |
| ----------- | ------------------- | --------------------------------------------- |
| change      | On selection change | The selected item object                      |
| menuCommand | On menu command     | (command, item): command name and item object |

## Slots

| Slot Name   | Description                       | Scope Parameters        |
| ----------- | --------------------------------- | ----------------------- |
| header      | Content at the top of the list    | -                       |
| footer      | Content at the bottom of the list | -                       |
| group-title | Group title                       | { group: group object } |
| label       | Item label content                | { item: item object }   |
| menu        | Custom menu content               | { item: item object }   |
| more-filled | More icon content                 | Menu related attributes |
| load-more   | Load more content                 | -                       |
