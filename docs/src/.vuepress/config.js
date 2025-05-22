module.exports = {
  title: "Element-X",
  description: "基于 Element UI 和 Vue 2.x 的企业级 AI 组件库",
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#409EFF" }],
  ],
  themeConfig: {
    logo: "/images/logo.png",
    lastUpdated: 'Last Updated',
    nav: [
      { text: "首页", link: "/" },
      { text: "💌 交流邀请", link: "/community/" },
      { text: "🎀 开发计划", link: "/roadmap/" },
      { text: "📆 更新日志", link: "/changelog/" },
      { text: "🧭 指南", link: "/guide/" },
      { text: "🎨 组件", link: "/components/" },
      { text: "📚 示例", link: "/examples/simple-typewriter" },
      { text: "GitHub", link: "https://github.com/yourusername/element-x" },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "🧭 指南",
          collapsable: false,
          children: ["", "installation", "quickstart", "theme", "components"],
        },
      ],
      "/components/": [
        {
          title: "🎨 组件",
          collapsable: false,
          children: [
            "",
            {
              title: "通用",
              collapsable: true,
              children: ["typewriter"],
            },
            {
              title: "对话类组件",
              collapsable: true,
              children: ["bubble", "bubble-list"],
            },
            {
              title: "交互类组件",
              collapsable: true,
              children: [
                "sender",
                "mention-sender",
                "attachments",
                "files-card",
              ],
            },
            {
              title: "导航类组件",
              collapsable: true,
              children: ["conversations", "welcome", "prompts"],
            },
            {
              title: "确认",
              collapsable: true,
              children: ["thinking", "thought-chain"],
            },
          ],
        },
      ],

      "/roadmap/": [
        {
          title: "🎀 开发计划",
          collapsable: false,
          children: ["", "upcoming-features", "contribution"],
        },
      ],
      "/changelog/": [
        {
          title: "📆 更新日志",
          collapsable: false,
          children: [""],
        },
      ],
      "/community/": [
        {
          title: "💌 交流邀请",
          collapsable: false,
          children: ["", "team", "support"],
        },
      ],
    },
    lastUpdated: "上次更新",
    repo: "yourusername/element-x",
    docsDir: "packages/docs/src",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    smoothScroll: true,
    sidebarDepth: 2, // 嵌套的标题链接深度，默认为1，最大为2，提取h2和h3标题
    activeHeaderLinks: true, // 页面滚动时自动激活侧边栏链接
    displayAllHeaders: false, // 默认值：false，设置为true会显示所有页面的标题链接
  },
  locales: {
    "/": {
      lang: "zh-CN",
      title: "ElementUI-X",
      description: "基于 Element UI 和 Vue 2.x 的企业级 AI 组件库",
    },
  },
  markdown: {

  },

  plugins: {
    "demo-container": {
      component: "demo-block",
      componentName: "demo-block",
    },
    "@vuepress/active-header-links": {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
  }
};
