# 提交规范说明

本项目使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范来标准化提交消息格式。

## 提交消息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档变更
- **style**: 代码格式(不影响代码运行的变动)
- **refactor**: 重构(既不增加新功能，也不是修复 bug)
- **perf**: 性能优化
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回退
- **build**: 打包
- **ci**: CI 配置

### Scope 范围

- **core**: packages/core 核心组件
- **examples**: examples 示例应用
- **docs**: docs 文档
- **server**: server 服务端
- **build**: 构建相关
- **deps**: 依赖更新
- **config**: 配置文件
- **workflow**: GitHub Actions 工作流
- **release**: 发布相关

scope 是可选的，如果变更影响多个模块，可以省略。

### Subject 主题

- 使用第一人称现在时，比如使用"change"而不是"changed"或"changes"
- 第一个字母小写
- 结尾不加句号（.）
- 简洁明了地描述变更内容

## 使用方法

### 1. 交互式提交

推荐使用交互式提交工具，它会引导你填写规范的提交消息：

```bash
npm run commit
```

### 2. 手动提交

如果你熟悉格式，也可以直接使用 git commit：

```bash
git add .
git commit -m "feat(core): 添加DifyChat组件"
```

### 3. 提交消息模板

项目已配置提交消息模板，使用以下命令设置：

```bash
git config commit.template .gitmessage
```

## 示例

### 基本示例

```
feat(core): 添加DifyChat组件

新增支持Dify平台的聊天组件，包含消息发送和接收功能。
```

### 完整示例

```
feat(core): 添加DifyChat组件

新增支持Dify平台的聊天组件，包含以下功能：
- 消息发送和接收
- 文件上传支持
- 移动端适配

BREAKING CHANGE: 调整了ChatBot组件的API接口

Closes #123
```

### 其他示例

```
fix(examples): 修复移动端样式问题
docs(README): 更新安装说明
style(core): 统一代码格式
refactor(server): 重构API路由结构
test(core): 添加DifyChat组件单元测试
chore(deps): 升级Vue版本到2.7.14
```

## 自动化工具

### 提交验证

项目已配置 commitlint 和 husky，每次提交时会自动验证提交消息格式。如果格式不符合规范，提交会被拒绝。

### 生成更新日志

使用以下命令可以自动生成更新日志：

```bash
npm run changelog
```

### 检查最近提交

检查最近一次提交的消息格式：

```bash
npm run lint:commit
```

## 常见错误

### 1. type 不能为空

```
✖ type may not be empty [type-empty]
```

**解决**: 确保提交消息以有效的 type 开头，如 `feat:`、`fix:` 等。

### 2. subject 不能为空

```
✖ subject may not be empty [subject-empty]
```

**解决**: 在冒号后添加主题描述，如 `feat: 添加新功能`。

### 3. scope 不在允许范围内

```
✖ scope must be one of [core, examples, docs, server, build, deps, config, workflow, release] [scope-enum]
```

**解决**: 使用项目定义的 scope 范围，或者省略 scope。

## 工具配置

- **commitlint**: `.commitlint.config.js` - 提交消息验证规则
- **husky**: `.husky/commit-msg` - Git commit-msg 钩子
- **commitizen**: `.czrc` - 交互式提交工具配置
- **模板**: `.gitmessage` - Git 提交消息模板

## 参考资料

- [约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
- [commitlint 文档](https://commitlint.js.org/)
- [commitizen 文档](https://github.com/commitizen/cz-cli)
