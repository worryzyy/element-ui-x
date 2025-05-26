# Element UI X 示例项目

这是 Element UI X 组件库的示例项目，基于 Vue 2.x 和 Element UI 2.15.14 构建。

## 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建项目

```bash
# 构建生产版本
npm run build
```

### 清理构建目录

```bash
npm run clean
```

## Vercel 部署

本项目已配置 Vercel 部署流程，可以通过以下方式部署：

### 手动部署

```bash
# 关联 Vercel 项目（首次使用）
npm run vercel:link

# 查看环境变量
npm run vercel:env

# 部署到生产环境
npm run deploy
```

### 自动部署 (CI/CD)

本项目已配置 GitHub Actions 工作流，当 `examples` 目录的文件发生变更并推送到 `master` 分支时，会自动触发部署流程。

#### 配置 GitHub Secrets

在使用自动部署前，需要在 GitHub 仓库中配置以下 Secrets：

1. `VERCEL_TOKEN`: Vercel API 令牌
2. `VERCEL_ORG_ID`: Vercel 组织 ID
3. `VERCEL_PROJECT_ID_EXAMPLES`: Examples 项目的 Vercel 项目 ID

获取这些值的方法：

1. 安装 Vercel CLI: `npm i -g vercel`
2. 运行 `vercel login` 并登录
3. 在项目目录运行 `vercel link` 关联项目
4. 运行 `vercel env ls` 查看环境信息

在输出中可以找到 orgId 和 projectId，token 可以在 Vercel 网站的账户设置中生成。

## 项目结构

- `public/`: 静态资源文件
- `src/`: 源代码
  - `components/`: 组件示例
  - `views/`: 页面视图
  - `router/`: 路由配置
  - `App.vue`: 应用入口组件
  - `main.js`: 应用入口文件
- `vercel.json`: Vercel 部署配置
