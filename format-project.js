const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 要格式化的目录
const directories = ['packages/element-ui-x/src', 'examples/src', 'docs/src'];

// 要排除的目录
const excludePatterns = ['dist', 'lib', 'node_modules', '.vuepress/dist', 'build/dist'];

// 检查目录是否存在，如果存在则格式化
directories.forEach(dir => {
  const fullPath = path.join(__dirname, dir);

  if (fs.existsSync(fullPath)) {
    console.log(`正在格式化 ${dir} 目录...`);
    try {
      // 构建排除目录参数
      const excludeArgs = excludePatterns.map(pattern => `--ignore-pattern "${pattern}"`).join(' ');

      // 使用Prettier格式化，排除指定目录
      execSync(`npx prettier --write "${dir}/**/*.{js,vue,scss,css}" --ignore-path .gitignore`, {
        stdio: 'inherit',
      });

      // 使用ESLint修复，排除指定目录
      execSync(`npx eslint --ext .js,.vue ${dir} --fix ${excludeArgs}`, {
        stdio: 'inherit',
      });

      console.log(`${dir} 目录格式化完成`);
    } catch (error) {
      console.error(`格式化 ${dir} 时出错:`, error);
    }
  } else {
    console.warn(`目录 ${dir} 不存在，已跳过`);
  }
});

console.log('所有目录格式化完成！');
