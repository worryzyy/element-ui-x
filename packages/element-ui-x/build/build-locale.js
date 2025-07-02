const fs = require('fs');
const path = require('path');

console.log('开始构建国际化语言包...\n');

// 确保目标目录存在
const libDir = path.join(__dirname, '../lib');
const localeDir = path.join(libDir, 'locale');
const langDir = path.join(localeDir, 'lang');

// 创建目录
[libDir, localeDir, langDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 源目录
const srcLocaleDir = path.join(__dirname, '../src/locale');
const srcLangDir = path.join(srcLocaleDir, 'lang');

// 将 ES6 模块转换为 CommonJS
function transformToCommonJS(code) {
  return code
    .replace(/export default\s+/, 'module.exports = ')
    .replace(/import\s+(.+?)\s+from\s+['"](.+?)['"];?/g, 'const $1 = require("$2");');
}

// 构建单个文件
function buildFile(srcPath, destPath) {
  try {
    const code = fs.readFileSync(srcPath, 'utf8');
    const transformedCode = transformToCommonJS(code);

    fs.writeFileSync(destPath, transformedCode);
    console.log(`✅ 构建成功: ${path.relative(process.cwd(), destPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ 构建失败: ${path.relative(process.cwd(), srcPath)}`);
    console.error(error.message);
    return false;
  }
}

// 构建主 locale/index.js
const localeIndexSrc = path.join(srcLocaleDir, 'index.js');
const localeIndexDest = path.join(localeDir, 'index.js');
if (fs.existsSync(localeIndexSrc)) {
  buildFile(localeIndexSrc, localeIndexDest);
}

// 构建 locale/mixin.js
const mixinSrc = path.join(srcLocaleDir, 'mixin.js');
const mixinDest = path.join(localeDir, 'mixin.js');
if (fs.existsSync(mixinSrc)) {
  buildFile(mixinSrc, mixinDest);
}

// 构建所有语言包
if (fs.existsSync(srcLangDir)) {
  const langFiles = fs.readdirSync(srcLangDir);

  langFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const srcPath = path.join(srcLangDir, file);
      const destPath = path.join(langDir, file);
      buildFile(srcPath, destPath);
    }
  });
}

// 创建语言包入口文件 lib/locale/lang/index.js
const langIndexContent = `// 语言包入口文件
module.exports = {
  // 中文
  'zh-CN': require('./zh-CN'),
  'zh-cn': require('./zh-CN'),
  'zh-TW': require('./zh-TW'),
  'zh-tw': require('./zh-TW'),
  
  // 英文
  'en': require('./en'),
  'en-US': require('./en'),
  'en-GB': require('./en'),
  
  // 日语
  'ja-JP': require('./ja'),
  'ja': require('./ja'),
  
  // 韩语
  'ko-KR': require('./ko'),
  'ko': require('./ko'),
  
  // 法语
  'fr-FR': require('./fr'),
  'fr': require('./fr'),
  
  // 德语
  'de-DE': require('./de'),
  'de': require('./de'),
  
  // 西班牙语
  'es-ES': require('./es'),
  'es': require('./es'),
  
  // 俄语
  'ru-RU': require('./ru-RU'),
  'ru': require('./ru-RU'),
  
  // 葡萄牙语
  'pt-BR': require('./pt-br'),
  'pt-br': require('./pt-br'),
  'pt': require('./pt-br'),
  
  // 意大利语
  'it-IT': require('./it'),
  'it': require('./it'),
  
  // 阿拉伯语
  'ar-SA': require('./ar'),
  'ar': require('./ar')
};
`;

fs.writeFileSync(path.join(langDir, 'index.js'), langIndexContent);
// console.log(`✅ 构建成功: lib/locale/lang/index.js`);

// 创建便于 CDN 使用的 UMD 格式语言包
const createUMDLang = (langName, langCode) => {
  const srcPath = path.join(srcLangDir, `${langCode}.js`);
  if (fs.existsSync(srcPath)) {
    const langContent = fs.readFileSync(srcPath, 'utf8');
    // 提取语言数据对象
    const langDataMatch = langContent.match(/export default\s+(\{[\s\S]*\});?\s*$/);
    if (langDataMatch) {
      const langData = langDataMatch[1];

      const umdContent = `(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (global.ELEMENT_UI_X = global.ELEMENT_UI_X || {}, global.ELEMENT_UI_X.lang = global.ELEMENT_UI_X.lang || {}, global.ELEMENT_UI_X.lang.${langName} = factory()));
}(this, function () { 'use strict';

  return ${langData};

}));
`;

      const umdPath = path.join(langDir, `${langCode}.umd.js`);
      fs.writeFileSync(umdPath, umdContent);
      console.log(`✅ 构建成功: lib/locale/lang/${langCode}.umd.js (UMD格式)`);
    }
  }
};

// 构建 UMD 格式的语言包
const umdLanguages = [
  { name: 'zhCN', code: 'zh-CN' },
  { name: 'zhTW', code: 'zh-TW' },
  { name: 'en', code: 'en' },
  { name: 'ja', code: 'ja' },
  { name: 'ko', code: 'ko' },
  { name: 'fr', code: 'fr' },
  { name: 'de', code: 'de' },
  { name: 'es', code: 'es' },
  { name: 'ru', code: 'ru-RU' },
  { name: 'ptBr', code: 'pt-br' },
  { name: 'it', code: 'it' },
  { name: 'ar', code: 'ar' },
];

umdLanguages.forEach(({ name, code }) => {
  createUMDLang(name, code);
});

console.log('\n🎉 国际化语言包构建完成！');
