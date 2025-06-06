<template>
  <div>
    <el-x-welcome
      variant="borderless"
      title="我是 Dify 的智能助手，很高兴见到你！"
      description="我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~"
    >
      <template #image>
        <img
          :src="require('@/assets/images/dify-logo.svg')"
          alt="Dify"
        />
      </template>
    </el-x-welcome>
    <br />
    <el-x-prompts
      :items="promptItems"
      :wrap="true"
      :styles="promptStyles"
      @on-item-click="handlePromptItemClick"
    >
      <template v-slot:icon="{ item }">
        <i
          :class="item.icon"
          :style="item.iconStyle"
        ></i>
      </template>
    </el-x-prompts>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    data() {
      return {
        promptItems: [
          {
            key: '1',
            label: '热门话题',
            icon: 'el-icon-star-off',
            iconStyle: {
              color: '#FF4D4F',
            },
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
            iconStyle: {
              color: '#1890FF',
            },
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
        ],
        promptStyles: {
          item: {
            flex: 'none',
            backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
            border: '0',
            width: 'calc(50% - 6px)',
          },
          subItem: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
      };
    },
    methods: {
      handlePromptItemClick({ data }) {
        this.$emit('click-prompt', data);
      },
    },
  };
</script>

<style></style>
