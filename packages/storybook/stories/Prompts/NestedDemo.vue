<template>
  <el-x-prompts
    :items="items || antdItems"
    :title="title || '您需要什么？'"
    :vertical="vertical"
    :wrap="wrap !== undefined ? wrap : true"
    :direction="direction"
    :root-class-name="rootClassName"
    :styles="styles || antdStyles"
    :class-names="classNames"
    :custom-style="customStyle"
    @on-item-click="handleAntdItemClick"
  >
    <template v-slot:icon="{ item }">
      <i
        :class="item.icon"
        :style="item.iconStyle"
      ></i>
    </template>
  </el-x-prompts>
</template>

<script>
  import ElXPrompts from '@/components/Prompts';

  export default {
    name: 'NestedDemo',
    components: { ElXPrompts },
    props: {
      items: Array,
      title: String,
      vertical: Boolean,
      wrap: Boolean,
      direction: String,
      rootClassName: String,
      styles: Object,
      classNames: Object,
      customStyle: Object,
      onItemClick: Function,
    },
    data() {
      return {
        antdItems: [
          {
            key: '1',
            label: '热门话题',
            icon: 'el-icon-star-off',
            iconStyle: { color: '#FF4D4F' },
            description: '你对什么感兴趣？',
            children: [
              {
                key: '1-1',
                description: 'X的最新动态是什么？',
              },
              {
                key: '1-2',
                description: '什么是AGI？',
              },
              {
                key: '1-3',
                description: '文档在哪里？',
              },
            ],
          },
          {
            key: '2',
            label: '设计指南',
            icon: 'el-icon-reading',
            iconStyle: { color: '#1890FF' },
            description: '如何设计一个好产品？',
            children: [
              {
                key: '2-1',
                icon: 'el-icon-star-on',
                description: '了解用户需求',
              },
              {
                key: '2-2',
                icon: 'el-icon-ice-cream-round',
                description: '设定AI角色',
              },
              {
                key: '2-3',
                icon: 'el-icon-chat-dot-round',
                description: '表达情感',
              },
            ],
          },
          {
            key: '3',
            label: '开始创作',
            icon: 'el-icon-position',
            iconStyle: { color: '#722ED1' },
            description: '如何开始一个新项目？',
            children: [
              {
                key: '3-1',
                label: '快速开始',
                description: '安装Element UI X',
              },
              {
                key: '3-2',
                label: '在线演练场',
                description: '无需安装，直接在网页上体验',
              },
            ],
          },
        ],
        antdStyles: {
          item: {
            flex: 'none',
            width: 'calc(30% - 6px)',
            backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
            border: '0',
          },
          subItem: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
      };
    },
    methods: {
      handleAntdItemClick(info) {
        this.$message({
          message: `点击了: ${info.data.description}`,
          type: 'success',
        });
      },
    },
  };
</script>
