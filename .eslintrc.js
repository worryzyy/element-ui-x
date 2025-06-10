module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: { parser: 'babel-eslint' },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 允许未使用的变量
    'no-unused-vars': 'off',
    // 对象属性必须换行
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    // 对象大括号换行
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 3,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 4, // 允许3个或更少的属性在同一行
          consistent: true, // 保持一致性
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
      },
    ],
    // Vue组件属性换行
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    // 强制对象的最后一个属性有逗号
    'comma-dangle': ['error', 'always-multiline'],
    // 与Prettier集成
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
        endOfLine: 'auto',
      },
    ],
  },
};
