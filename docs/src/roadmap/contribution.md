# 贡献指南

我们非常欢迎并感谢你对 Element-UI-X 项目的贡献。无论是提交 bug、建议新功能，还是改进代码和文档，你的贡献都将帮助我们构建更好的组件库。

## 提交 Issues

使用 GitHub Issues 来报告 bug 或提出新功能建议：

1. 在提交前，请先搜索是否已经存在相关的 issue
2. 使用清晰的标题和详细的描述
3. 对于 bug 报告，请提供重现步骤和环境信息
4. 对于功能建议，请描述具体的使用场景

## 代码贡献

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/worryzyy/element-ui-x
cd element-ui-x

# 安装依赖
npm run install:all

# 启动文档服务器
npm run dev:docs

# 启动示例站
npm run dev:examples

# 构建组件库
npm run build:lib
```

### 分支管理

- `master` 分支是稳定版本
- `dev` 分支是开发版本
- 建议从 `dev` 分支创建功能分支，命名为 `feature/your-feature-name`
- Bug 修复分支命名为 `fix/bug-name`

### 提交规范

使用约定式提交规范（Conventional Commits）格式：

```
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

常用的类型包括：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更改
- `style`: 代码风格调整，不影响代码功能
- `refactor`: 代码重构
- `test`: 添加或修改测试代码
- `build`: 构建系统或外部依赖修改
- `ci`: CI 配置和脚本修改

### Pull Request 流程

1. 确保本地代码是最新的
2. 创建一个新分支来进行更改
3. 编写代码并添加测试
4. 通过测试和 lint 检查
5. 提交你的更改，使用规范的提交消息
6. 推送到你的分支
7. 创建 Pull Request 到 `dev` 分支

## 组件开发指南

### 组件结构

新组件应遵循以下目录结构：

```
packages/element-ui-x/src/components/YourComponent/
├── index.js                 # 组件入口
├── src/
│   └── main.vue             # 组件实现

```

### 样式指南

- 确保组件样式与 Element UI 的主题系统兼容
- 从 Element UI 主题变量继承颜色和动画效果

## 文档贡献

### 文档结构

- `/guide/` - 使用指南
- `/components/` - 组件文档

### 编写文档指南

- 在组件文档中包含清晰的示例
- 使用 demo-container 展示可交互的组件示例
- 记录组件的所有 props、events 和 slots
- 提供不同场景的使用示例

感谢你的贡献！
