import defaultLang from './lang/zh-CN';

let lang = defaultLang;
let merged = false;
let i18nHandler = function () {
  // 检查是否存在 vue-i18n@5.x (Vue.locale)
  if (typeof window !== 'undefined' && window.Vue && window.Vue.locale) {
    const vuei18n = window.Vue.locale;
    if (typeof vuei18n === 'function') {
      if (!merged) {
        merged = true;
        window.Vue.locale(
          window.Vue.config.lang,
          deepMerge(lang, window.Vue.locale(window.Vue.config.lang) || {}, { clone: true }),
        );
      }
      return vuei18n.apply(this, arguments);
    }
  }

  // 检查是否存在 vue-i18n@6.x+ (this.$t)
  if (this && this.$t && typeof this.$t === 'function') {
    try {
      return this.$t.apply(this, arguments);
    } catch (e) {
      // 如果出错，回退到内置翻译
    }
  }
};

const deepMerge = function (target, source, options) {
  options = options || {};
  const clone = options.clone !== false;
  const mergedTarget = clone ? { ...target } : target;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        mergedTarget[key] = deepMerge(mergedTarget[key] || {}, value, options);
      } else {
        mergedTarget[key] = value;
      }
    }
  }

  return mergedTarget;
};

const t = function (path, options) {
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

const format = function (template, ...args) {
  if (typeof template === 'function') {
    return template(...args);
  }

  if (typeof template !== 'string') {
    return template;
  }

  const [options] = args;
  if (!options) return template;

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return options[key] !== undefined ? options[key] : match;
  });
};

const use = function (l) {
  lang = l || lang;
  merged = false;
};

const i18n = function (fn) {
  i18nHandler = fn || i18nHandler;
};

export default {
  use,
  t,
  i18n,
};
