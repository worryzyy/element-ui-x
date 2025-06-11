module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
        'ci', // CI配置
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
    // scope 范围定义，适配 monorepo 结构
    'scope-enum': [
      2,
      'always',
      [
        'core', // packages/core 核心组件
        'examples', // examples 示例应用
        'docs', // docs 文档
        'server', // server 服务端
        'build', // 构建相关
        'deps', // 依赖更新
        'config', // 配置文件
        'workflow', // GitHub Actions 工作流
        'release', // 发布相关
      ],
    ],
    // 允许空 scope
    'scope-empty': [0],
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],
    // type 不能为空
    'type-empty': [2, 'never'],
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // subject 结尾不能有句号
    'subject-full-stop': [2, 'never', '.'],
    // header 最大长度
    'header-max-length': [2, 'always', 100],
    // body 每行最大长度
    'body-max-line-length': [2, 'always', 100],
  },
};
