# Element UI X 文档

欢迎使用 Element UI X 组件库文档

## 快速开始

```bash
npm install vue-element-ui-x
```

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import ElementUIX from 'vue-element-ui-x';

Vue.use(ElementUI);
Vue.use(ElementUIX);
```

## 特性

- 基于 Element UI 2.x
- 企业级 AI 聊天组件
- 主题可定制

# Element-UI-X 文档站部署指南

## 自动部署到 Vercel

### 1. 准备工作

#### 1.1 安装 Vercel CLI

```bash
npm i -g vercel
```

#### 1.2 登录 Vercel

```bash
vercel login
```

### 2. 本地部署测试

```bash
# 进入文档目录
cd docs

# 安装依赖
npm install

# 构建文档
npm run build

# 本地预览
vercel dev
```

### 3. 手动部署

#### 3.1 预览部署

```bash
cd docs
vercel
```

#### 3.2 生产部署

```bash
cd docs
vercel --prod
```

### 4. 自动部署配置

#### 4.1 GitHub Secrets 配置

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加以下密钥：

- `VERCEL_TOKEN`: Vercel 个人访问令牌
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: Vercel 项目 ID

#### 4.2 获取 Vercel 配置信息

```bash
# 获取 Vercel Token
# 访问 https://vercel.com/account/tokens 创建新的 token

# 获取 Org ID 和 Project ID
cd docs
vercel link
# 查看 .vercel/project.json 文件获取 orgId 和 projectId
```

#### 4.3 GitHub Actions 工作流

工作流文件位于 `.github/workflows/deploy.yml`，会在以下情况触发：

- 推送到 `main` 或 `master` 分支
- 修改了 `docs/` 或 `packages/element-ui-x/` 目录下的文件
- 创建 Pull Request

### 5. 部署流程

1. **代码推送**: 推送代码到 GitHub
2. **自动构建**: GitHub Actions 自动安装依赖并构建文档
3. **自动部署**:
   - PR: 部署到预览环境
   - Main/Master: 部署到生产环境

### 6. 自定义域名配置

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Vercel
3. 等待 SSL 证书自动配置

### 7. 环境变量

如果需要环境变量，可以在 Vercel 项目设置中配置：

- `NODE_ENV`: production
- `BASE_URL`: 你的域名

### 8. 故障排除

#### 8.1 构建失败

- 检查依赖版本兼容性
- 查看构建日志中的错误信息
- 确保 Node.js 版本正确

#### 8.2 部署失败

- 检查 Vercel 配置文件
- 验证输出目录路径
- 确保静态资源路径正确

#### 8.3 访问问题

- 检查路由配置
- 验证 SPA 重写规则
- 确保资源缓存策略正确

## 项目结构

```
docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── src/
│   ├── .vuepress/
│   │   ├── config.js          # VuePress 配置
│   │   ├── dist/              # 构建输出目录
│   │   └── public/            # 静态资源
│   ├── components/            # 组件文档
│   ├── guide/                 # 指南文档
│   └── README.md              # 首页
├── .vercelignore              # Vercel 忽略文件
├── vercel.json                # Vercel 配置
├── package.json               # 项目配置
└── README.md                  # 部署说明
```

## 相关链接

- [Vercel 官方文档](https://vercel.com/docs)
- [VuePress 官方文档](https://vuepress.vuejs.org/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
