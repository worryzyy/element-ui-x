<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Conversations 会话列表</h2>
      </div>

      <!-- 基础用法演示 -->
      <BasicUsageDemo />

      <!-- 分组与吸顶效果演示 -->
      <GroupStickyDemo />

      <!-- 自定义分组排序演示 -->
      <CustomGroupSortDemo />

      <!-- 内置下拉菜单演示 -->
      <BuiltInMenuDemo />

      <!-- 自定义菜单交互演示 -->
      <CustomMenuDemo />

      <!-- 加载更多功能演示 -->
      <LoadMoreDemo />

      <!-- 自定义样式与分组标题演示 -->
      <CustomStyleDemo />
    </el-card>
  </div>
</template>

<script>
  // 导入所有demo组件
  import {
    BasicUsageDemo,
    BuiltInMenuDemo,
    CustomGroupSortDemo,
    CustomMenuDemo,
    CustomStyleDemo,
    GroupStickyDemo,
    LoadMoreDemo,
  } from '@/components/Conversations';

  export default {
    name: 'ConversationsDemo',
    components: {
      BasicUsageDemo,
      GroupStickyDemo,
      CustomGroupSortDemo,
      BuiltInMenuDemo,
      CustomMenuDemo,
      LoadMoreDemo,
      CustomStyleDemo,
    },
  };
</script>
