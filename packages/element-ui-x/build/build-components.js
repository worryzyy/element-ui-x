const webpack = require('webpack');
const config = require('./webpack.component.conf');
const fs = require('fs');
const path = require('path');

console.log('开始构建组件级别的包...\n');

// 确保lib目录存在
const libDir = path.join(__dirname, '../lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir);
}

// 确保 components 和 mixins 目录存在
const componentsDir = path.join(libDir, 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, {
    recursive: true,
  });
}

const mixinsDir = path.join(libDir, 'mixins');
if (!fs.existsSync(mixinsDir)) {
  fs.mkdirSync(mixinsDir, {
    recursive: true,
  });
}

// 获取所有组件目录
const srcComponentsDir = path.join(__dirname, '../src/components');
const components = fs.readdirSync(srcComponentsDir);

webpack(config, (err, stats) => {
  if (err) {
    console.error('构建过程中发生错误:', err);
    process.exit(1);
  }

  if (stats.hasErrors()) {
    console.error('构建失败:', stats.toString('errors-only'));
    process.exit(1);
  }

  console.log('✅ 组件级别构建成功！\n');

  // 显示构建结果
  const info = stats.toJson();
  console.log('💶 构建的文件:');

  // 按目录分组显示文件
  const componentFiles = [];
  const otherFiles = [];

  info.assets.forEach(asset => {
    if (asset.name.startsWith('components/')) {
      componentFiles.push(asset);
    } else {
      otherFiles.push(asset);
    }
    console.log(`   - ${asset.name} (${(asset.size / 1024).toFixed(1)}KB)`);
  });

  console.log('\n🎉 现在可以按需引入组件了：');
  console.log('   import { ElXTypewriter, ElXBubble } from "vue-element-ui-x"');
  console.log('   Vue.component(ElXTypewriter.name, ElXTypewriter);');
  console.log('   Vue.component(ElXBubble.name, ElXBubble);');
  console.log('   // ... 其他组件');

  // 生成组件列表
  let componentList = '';
  components.forEach(component => {
    componentList += `ElX${component}, `;
  });
  componentList = componentList.replace(/, $/, '');

  console.log('\n📚 完整组件列表：');
  console.log(`   import { ${componentList} } from "vue-element-ui-x";`);

  console.log('\n或者使用babel-plugin-component自动按需引入，配置如下：');
  console.log(`
[
  "component",
  {
    "libraryName": "vue-element-ui-x",
    "libDir": "lib",
    "style": false
  }
]
`);
});
