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
      <div style="display: flex; align-items: center">
        <i
          :class="getGroupIcon(group.title)"
          style="margin-right: 8px; color: #67c23a"
        ></i>
        <span>{{ group.title }}</span>
        <span style="margin-left: 5px; font-size: 12px; color: #909399">
          ({{ group.children.length }})
        </span>
      </div>
    </template>

    <template #label="{ item }">
      <div style="display: flex; align-items: center; width: 100%">
        <i
          :class="item.icon || 'el-icon-chat-dot-round'"
          style="color: #409eff; margin-right: 8px"
        ></i>
        <span style="flex: 1">{{ item.label }}</span>
        <span style="font-size: 12px; color: #909399">{{ item.time }}</span>
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
