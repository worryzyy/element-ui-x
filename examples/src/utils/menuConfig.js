// 菜单配置文件
export const menuConfig = [
  {
    index: '/',
    icon: 'el-icon-s-home',
    title: '总览',
    isHome: true,
  },
];

export const menuGroups = [
  {
    title: '基础组件',
    items: [
      {
        index: '/typewriter',
        icon: 'el-icon-edit-outline',
        title: 'Typewriter - 打字器效果',
      },
      {
        index: '/bubble',
        icon: 'el-icon-chat-dot-round',
        title: 'Bubble - 对话气泡',
      },
      {
        index: '/bubblelist',
        icon: 'el-icon-chat-line-round',
        title: 'BubbleList - 气泡列表',
      },
      {
        index: '/thinking',
        icon: 'el-icon-loading',
        title: 'Thinking - 思考动画',
      },
    ],
  },
  {
    title: '交互组件',
    items: [
      {
        index: '/welcome',
        icon: 'el-icon-star-on',
        title: 'Welcome - 欢迎界面',
      },
      {
        index: '/prompts',
        icon: 'el-icon-magic-stick',
        title: 'Prompts - 提示词',
      },
      {
        index: '/conversations',
        icon: 'el-icon-message',
        title: 'Conversations - 对话管理',
      },
      {
        index: '/sender',
        icon: 'el-icon-s-promotion',
        title: 'Sender - 消息发送',
      },
    ],
  },
  {
    title: '高级组件',
    items: [
      {
        index: '/thoughtchain',
        icon: 'el-icon-connection',
        title: 'ThoughtChain - 思维链',
      },
      {
        index: '/filescard',
        icon: 'el-icon-folder-opened',
        title: 'FilesCard - 文件卡片',
      },
      {
        index: '/attachments',
        icon: 'el-icon-paperclip',
        title: 'Attachments - 附件管理',
      },
      {
        index: '/difychat-demo',
        icon: 'el-icon-postcard',
        title: 'DifyChat - 聊天卡片',
      },
    ],
  },
  {
    title: '功能组件',
    items: [
      {
        index: '/record',
        icon: 'el-icon-microphone',
        title: 'RecordMixin - 语音录制',
      },
      {
        index: '/sendmixins',
        icon: 'el-icon-setting',
        title: 'SendMixin - 发送配置',
      },
      {
        index: '/streammixins',
        icon: 'el-icon-connection',
        title: 'StreamMixin - 流式处理',
      },
    ],
  },
  {
    title: '实战项目',
    items: [
      {
        index: '/difychat',
        icon: 'el-icon-postcard',
        title: 'DifyChat - Dify 聊天机器人',
      },
    ],
  },
];

// 获取页面标题的映射
export const getPageTitle = path => {
  // 检查首页
  const homeItem = menuConfig.find(item => item.index === path);
  if (homeItem) return homeItem.title;

  // 检查各分组中的项目
  for (const group of menuGroups) {
    const item = group.items.find(item => item.index === path);
    if (item) return item.title;
  }

  return '组件展示';
};
