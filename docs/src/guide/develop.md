# 本地开发

#### **一、克隆仓库**

```bash
git clone https://github.com/worryzyy/element-ui-x.git
cd element-ui-x
```

#### **二、安装依赖**

```bash
# 推荐使用 NPM 管理依赖
npm install:all
```

:::warning 注意
由于组件包使用了 `node-sass` 跟 `sass-loader`，跟 Element 保持一致了，建议 Node.js 版本使用 16.x，否则依赖可能安装失败，像下面这样：

`gyp ERR!....`

`gyp ERR!....`

`gyp ERR!....`
:::

#### **三、项目结构**

- docs：文档站

- examples：演示项目

- packages/element-ui-x：组件库项目源码，在调试前需要 **先构建此项目才能生效**

以下是主要的 **`项目目录结构`** 请先对照查看，方便你对项目目录有所了解

```plaintext
├── .github                     # CI/CD 配置
├── docs                        # 文档源码（基于 VuePress 1.x，真的不要用这个）
├── examples                    # 演示源码
├── packages
│   └── element-ui-x            # 组件源码
|       ├──build                # 打包配置
|       └──src
|          ├──— components      # 组件核心源码
|          |    ├── Bubble      # 气泡组件
|          |    ├── BubbleList  # 气泡列表
|          |    ├── Sender      # 输入框
|          |    ├── Typewriter  # 打字器组件
|          |    └── ...         # 更多组件
|          └── styles           # 组件样式
|          └── utils            # 工具函数
|          └── mixins           # 混入
|
|
└── package.json                # 项目配置
```

#### **四、开发命令**

**请先构建好组件在执行预览**

| 命令                   | 说明               |
| ---------------------- | ------------------ |
| `npm run build:lib`    | 在本地构建生产版本 |
| `npm run dev:examples` | 启动组件预览       |
| `npm run dev:docs`     | 本地预览文档       |

#### **五、成为贡献者**

> 欢迎加入我们的交流群

> 期待与你交流学习，共同改进项目

1. **创建一个自己的分支**：

   分支管理尤为重要，我们采用以下流程:

   master(主分支) ← dev(开发分支) ← feature(功能分支)

   ```bash
   git checkout -b feature/new-component (new-component 就是你的分支名)
   ```

2. **代码规范**：

   - 组件命名遵循 `PascalCase` 规范

   - 每个组件包含：

   ```plaintext
   ├── src            # 组件根目录
   |   └──components  # 子组件（如有）
   |   └──main.vue
   ├── index.js       # 组件入口
   ```

3. **提交 PR**：

   - 标题格式：`feat(component): 新增打字器组件`
   - 描述包含：功能说明、使用示例、变更影响

4. **审核**：

   **PR 审核工作流程**：

   ```
   提交 PR → 检查有效性 → 认可提交 → 创建新分支 → 合并代码 → 本地拉取审核 → 反馈结果
                ↓              ↓           ↓         ↓         ↓           ↓
             无效拒绝        通过认可     新分支创建   代码合并   本地运行    ├─ 通过：合并
                                                                      └─ 改进：反馈建议
   ```

   **流程说明**：

   - 我们会认真审核每个 PR 的有效性和必要性
   - 通过审核后会为您创建专属的功能分支
   - 将您的代码合并到功能分支进行测试
   - 本地运行并验证功能完整性
   - 24 小时内给出详细的反馈和建议
   - 如果测试通过,代码将被合并到开发分支

   我们鼓励开发者大胆提交创意,共同打造更好用的组件库！

#### **六、调试本地包**

在示例项目中链接本地代码：

修改 `docs/package.json` `examples/package.json`文件的依赖版本号：

```json
"dependencies": {
    "vue-element-ui-x": "file:../packages/element-ui-x",
  },
```

```bash
# 先本地构建
npm run build:lib

# 示例项目执行
npm run dev:examples
```
