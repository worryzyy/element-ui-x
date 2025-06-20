module.exports = {
  title: 'Element-UI-X',
  description:
    '开箱即用的企业级 AI 交互组件库，让构建智能界面像搭积木一样简单。 RICH 设计范式，打造卓越 AI 界面解决方案，引领智能新体验',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#409EFF' }],
  ],
  themeConfig: {
    logo: '/images/logo.png',
    lastUpdated: 'Last Updated',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '开发计划', link: '/roadmap/' },
      { text: '更新日志', link: '/changelog/' },
      { text: '交流邀请', link: '/community/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: ['', 'develop', 'i18n'],
        },
      ],
      '/components/': [
        {
          title: '组件',
          collapsable: false,
          children: [
            '',
            {
              title: '通用',
              collapsable: false,
              children: ['typewriter'],
            },
            {
              title: '对话类组件',
              collapsable: false,
              children: ['bubble', 'bubble-list'],
            },
            {
              title: '交互类组件',
              collapsable: false,
              children: ['sender', 'attachments', 'files-card'],
            },
            {
              title: '导航类组件',
              collapsable: false,
              children: ['conversations', 'welcome', 'prompts'],
            },
            {
              title: '确认',
              collapsable: false,
              children: ['thinking', 'thought-chain'],
            },
            {
              title: '完整应用组件',
              collapsable: false,
              children: ['dify-chat'],
            },
            {
              title: '工具函数',
              collapsable: false,
              children: ['record-mixins', 'send-mixins', 'stream-mixins'],
            },
          ],
        },
      ],

      '/roadmap/': [
        {
          title: '开发计划',
          collapsable: false,
          children: [''],
        },
      ],
      '/changelog/': [
        {
          title: '更新日志',
          collapsable: false,
          children: [''],
        },
      ],
    },
    lastUpdated: '上次更新',
    repo: 'worryzyy/element-ui-x',
    docsDir: 'packages/docs/src',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    smoothScroll: true,
    sidebarDepth: 2, // 嵌套的标题链接深度，默认为1，最大为2，提取h2和h3标题
    activeHeaderLinks: true, // 页面滚动时自动激活侧边栏链接
    displayAllHeaders: false, // 默认值：false，设置为true会显示所有页面的标题链接
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/' },
          { text: '组件', link: '/components/' },
          { text: '开发计划', link: '/roadmap/' },
          { text: '更新日志', link: '/changelog/' },
          { text: '交流邀请', link: '/community/' },
        ],
        sidebar: {
          '/guide/': [
            {
              title: '指南',
              collapsable: false,
              children: ['', 'develop', 'i18n'],
            },
          ],
          '/components/': [
            {
              title: '组件',
              collapsable: false,
              children: [
                '',
                {
                  title: '通用',
                  collapsable: false,
                  children: ['typewriter'],
                },
                {
                  title: '对话类组件',
                  collapsable: false,
                  children: ['bubble', 'bubble-list'],
                },
                {
                  title: '交互类组件',
                  collapsable: false,
                  children: ['sender', 'attachments', 'files-card'],
                },
                {
                  title: '导航类组件',
                  collapsable: false,
                  children: ['conversations', 'welcome', 'prompts'],
                },
                {
                  title: '确认',
                  collapsable: false,
                  children: ['thinking', 'thought-chain'],
                },
                {
                  title: '完整应用组件',
                  collapsable: false,
                  children: ['dify-chat'],
                },
                {
                  title: '工具函数',
                  collapsable: false,
                  children: ['record-mixins', 'send-mixins', 'stream-mixins'],
                },
              ],
            },
          ],

          '/roadmap/': [
            {
              title: '开发计划',
              collapsable: false,
              children: [''],
            },
          ],
          '/changelog/': [
            {
              title: '更新日志',
              collapsable: false,
              children: [''],
            },
          ],
        },
        lastUpdated: '上次更新',
        editLinkText: '在 GitHub 上编辑此页',
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Components', link: '/en/components/' },
          { text: 'Roadmap', link: '/en/roadmap/' },
          { text: 'Changelog', link: '/en/changelog/' },
          { text: 'Community', link: '/en/community/' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              title: 'Guide',
              collapsable: false,
              children: ['', 'develop', 'i18n'],
            },
          ],
          '/en/components/': [
            {
              title: 'Components',
              collapsable: false,
              children: [
                '',
                {
                  title: 'General',
                  collapsable: false,
                  children: ['typewriter'],
                },
                {
                  title: 'Conversation Components',
                  collapsable: false,
                  children: ['bubble', 'bubble-list'],
                },
                {
                  title: 'Interactive Components',
                  collapsable: false,
                  children: ['sender', 'attachments', 'files-card'],
                },
                {
                  title: 'Navigation Components',
                  collapsable: false,
                  children: ['conversations', 'welcome', 'prompts'],
                },
                {
                  title: 'Confirmation',
                  collapsable: false,
                  children: ['thinking', 'thought-chain'],
                },
                {
                  title: 'Complete Application Components',
                  collapsable: false,
                  children: ['dify-chat'],
                },
                {
                  title: 'Utility Functions',
                  collapsable: false,
                  children: ['record-mixins', 'send-mixins', 'stream-mixins'],
                },
              ],
            },
          ],
          '/en/roadmap/': [
            {
              title: 'Roadmap',
              collapsable: false,
              children: [''],
            },
          ],
          '/en/changelog/': [
            {
              title: 'Changelog',
              collapsable: false,
              children: [''],
            },
          ],
        },
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
      },
    },
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Element-UI-X',
      description:
        '开箱即用的企业级 AI 交互组件库，让构建智能界面像搭积木一样简单。 RICH 设计范式，打造卓越 AI 界面解决方案，引领智能新体验基于 Element UI 和 Vue 2.x 的企业级 AI 组件库',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Element-UI-X',
      description:
        'Enterprise-level AI interaction component library, making intelligent interface construction as simple as building blocks.',
    },
  },
  markdown: {},

  plugins: {
    'demo-container': {
      component: 'demo-block',
      componentName: 'demo-block',
    },
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
    },
    '@vuepress/google-analytics': {
      ga: 'G-MG3JDD76KY',
    },
  },
};
