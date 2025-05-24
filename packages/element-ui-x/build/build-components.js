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
  console.log('📦 构建的文件:');
  info.assets.forEach(asset => {
    console.log(`   - ${asset.name} (${(asset.size / 1024).toFixed(1)}KB)`);
  });

  console.log('\n🎉 现在可以按需引入组件了：');
  console.log('   import ElXTypewriter from "element-ui-x/lib/typewriter"');
  console.log('   import ElXBubble from "element-ui-x/lib/bubble"');
  console.log('   // ... 其他组件');

  console.log('\n或者使用babel-plugin-component自动按需引入。');
});
