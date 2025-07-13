const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const fs = require('fs');

// 获取所有组件目录
const componentsDir = path.join(__dirname, '../src/components');
const components = fs.readdirSync(componentsDir);

// 构建多入口配置
const entry = {};
components.forEach(component => {
  const componentPath = path.join(componentsDir, component, 'index.js');
  if (fs.existsSync(componentPath)) {
    // 保持原始组件目录结构
    entry[`components/${component}/index`] = componentPath;
  }
});

// 添加主入口和mixins入口
entry['index'] = path.join(__dirname, '../src/index.js');
entry['mixins/index'] = path.join(__dirname, '../src/mixins/index.js');

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['legacy-js-api', 'import']
              }
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  externals: {
    vue: 'vue',
    'element-ui': 'element-ui',
  },
  // 优化配置
  optimization: {
    // 不要压缩，保持可读性
    minimize: false,
    // 不要分包，每个组件保持独立
    splitChunks: false,
  },
  // 确保每个模块都有正确的路径解析
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, '../src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};
