# Element UI X Storybook

这是Element UI X组件库的Storybook项目，用于展示和测试所有组件。

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run storybook
# 或
npm run dev
```

访问 http://localhost:6006 查看Storybook界面。

### 构建静态文件

```bash
npm run build-storybook
# 或
npm run build
```

构建后的文件将输出到 `storybook-static` 目录。

## 项目结构

```
packages/storybook/
├── .storybook/           # Storybook配置
│   ├── main.js          # 主配置文件
│   ├── preview.js       # 预览配置
│   └── manager.js       # 管理界面配置
├── stories/             # Story文件
│   └── Introduction.stories.mdx
├── package.json
└── README.md
```

## 技术栈

- **Storybook 7.x** - 组件开发工具
- **Vue 2.6.14** - JavaScript框架
- **Element UI 2.15.14** - UI组件库
- **Webpack 5** - 模块打包器
- **Sass** - CSS预处理器

## 配置说明

### Webpack配置

- 支持Vue单文件组件
- 支持SCSS样式预处理
- 配置了指向组件库源码的别名

### Element UI集成

- 自动导入Element UI样式
- 在preview.js中全局注册Element UI

## 开发指南

### 添加新Story

1. 在 `stories/` 目录下创建新的 `.stories.js` 或 `.stories.mdx` 文件
2. 使用 CSF (Component Story Format) 格式编写Story
3. 参考现有Story文件的结构

### 组件导入

使用别名 `@` 导入组件库中的组件：

```javascript
import Bubble from '@/components/Bubble';
```

## 部署

可以将构建后的静态文件部署到任何静态文件服务器，如：

- Vercel
- Netlify 
- GitHub Pages
- 自建服务器

## 相关链接

- [Element UI X 组件库](../element-ui-x/)
- [Storybook 官方文档](https://storybook.js.org/)
- [Element UI 文档](https://element.eleme.cn/)